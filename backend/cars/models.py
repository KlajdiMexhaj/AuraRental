from django.db import models
from django.core.exceptions import ValidationError
from datetime import timedelta
from decimal import Decimal
import phonenumbers


# ---------------- CAR ----------------
class Car(models.Model):
    TRANSMISSION_CHOICES = [
        ('manual', 'Manual'),
        ('automatic', 'Automatic'),
    ]

    name = models.CharField(max_length=200, blank=True, null=True)
    image = models.ImageField(upload_to='cars/', blank=True, null=True)
    detail = models.TextField(blank=True, null=True)

    # fallback price
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    fuel_type = models.CharField(max_length=50, blank=True, null=True)
    seats = models.PositiveSmallIntegerField(blank=True, null=True)
    transmission = models.CharField(max_length=10, blank=True, null=True, choices=TRANSMISSION_CHOICES)
    air_conditioning = models.BooleanField(default=False)
    doors = models.PositiveSmallIntegerField(blank=True, null=True)

    def __str__(self):
        return self.name or f"Car #{self.pk}"


# ---------------- SEASONAL PRICE ----------------
class CarPricePeriod(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name="price_periods")
    start_date = models.DateField()
    end_date = models.DateField()
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        ordering = ["start_date"]

    def clean(self):
        if self.start_date >= self.end_date:
            raise ValidationError("End date must be after start date")

        overlap = CarPricePeriod.objects.filter(
            car=self.car,
            start_date__lt=self.end_date,
            end_date__gt=self.start_date
        ).exclude(pk=self.pk).exists()

        if overlap:
            raise ValidationError("Price already exists for this date range")

    def __str__(self):
        return f"{self.car.name} {self.start_date} → {self.end_date} = {self.price_per_day}"


# ---------------- DESTINATION ----------------
class Destination(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


# ---------------- EXTRA IMAGES ----------------
class ImgCarExtra(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name="extra_images")
    name = models.CharField(max_length=150, blank=True, null=True)
    image = models.ImageField(upload_to='cars/extras/')

    def __str__(self):
        return f"{self.car.name} - {self.name or 'Extra Image'}"


# ---------------- RESERVATION ----------------
class Reservation(models.Model):
    STATUS_PENDING = 'pending'
    STATUS_APPROVED = 'approved'

    STATUS_CHOICES = [
        (STATUS_PENDING, 'Pending'),
        (STATUS_APPROVED, 'Approved'),
    ]

    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='reservations')
    destination = models.ForeignKey(Destination, on_delete=models.SET_NULL, null=True, blank=True)

    name_surname = models.CharField(max_length=200, blank=True, null=True)
    phone_number = models.CharField(max_length=30, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)

    pickup_datetime = models.DateTimeField(blank=True, null=True)
    return_datetime = models.DateTimeField(blank=True, null=True)

    passport_front = models.ImageField(upload_to='passports/', blank=True, null=True)
    passport_back = models.ImageField(upload_to='passports/', blank=True, null=True)

    extras = models.JSONField(default=list, blank=True)

    # FINAL STORED VALUES
    total_days = models.PositiveIntegerField(null=True, blank=True)
    car_price_total = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=STATUS_PENDING)
    created_at = models.DateTimeField(auto_now_add=True)

    # ---------- PRICE CALCULATOR ----------
    def calculate_price(self):
        if not self.pickup_datetime or not self.return_datetime:
            return 0, Decimal("0.00"), Decimal("0.00")

        car_total = Decimal("0.00")
        extras_total = Decimal("0.00")
        days = 0

        current = self.pickup_datetime.date()
        end = self.return_datetime.date()

        # Load all periods once (performance fix)
        periods = list(self.car.price_periods.all())

        while current < end:
            # Find matching seasonal period
            period = next(
                (p for p in periods if p.start_date <= current < p.end_date),
                None
            )

            if period:
                price = Decimal(period.price_per_day)
            else:
                if not self.car.price:
                    raise ValidationError(f"No price defined for {current}")
                price = Decimal(self.car.price)

            car_total += price
            days += 1
            current += timedelta(days=1)

        # -------- EXTRAS --------
        if self.extras:
            for extra in self.extras:
                try:
                    extra_price = Decimal(str(extra.get("price", 0)))
                    extras_total += extra_price * days
                except:
                    pass

        final_total = car_total + extras_total

        return days, car_total, final_total
    # ---------- VALIDATION ----------
    def clean(self):
        super().clean()

        if self.phone_number:
            try:
                parsed = phonenumbers.parse(self.phone_number, None)
                if not phonenumbers.is_valid_number(parsed):
                    raise ValidationError({'phone_number': 'Invalid phone number.'})
                self.phone_number = phonenumbers.format_number(parsed, phonenumbers.PhoneNumberFormat.E164)
            except phonenumbers.NumberParseException:
                raise ValidationError({'phone_number': 'Invalid phone number format.'})

        if self.status == self.STATUS_PENDING:
            return

        if not self.pickup_datetime or not self.return_datetime:
            raise ValidationError("Pickup and return required before approval")

        if self.pickup_datetime >= self.return_datetime:
            raise ValidationError("Return must be after pickup")

        overlapping = Reservation.objects.filter(
            car=self.car,
            status=self.STATUS_APPROVED,
            pickup_datetime__lt=self.return_datetime,
            return_datetime__gt=self.pickup_datetime,
        ).exclude(pk=self.pk).exists()

        if overlapping:
            raise ValidationError("Car already booked for selected period")

    # ---------- SAVE ----------
    def save(self, *args, **kwargs):
        self.full_clean()

        if self.pickup_datetime and self.return_datetime:
            days, car_total, final_total = self.calculate_price()
            self.total_days = days
            self.car_price_total = car_total
            self.total_price = final_total

        super().save(*args, **kwargs)


# ---------------- OPTIONAL EXTRAS ----------------
class CarExtra(models.Model):
    name = models.CharField(max_length=200, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.price})"
