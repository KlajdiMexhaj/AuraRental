from django.db import models
from django.core.exceptions import ValidationError
from django.db.models import JSONField
import phonenumbers
# Create your models here.

class Car(models.Model):
    TRANSMISSION_CHOICES = [
        ('manual', 'Manual'),
        ('automatic', 'Automatic'),
    ]

    name = models.CharField(max_length=200, blank=True, null=True)
    image = models.ImageField(upload_to='cars/', blank=True, null=True)
    detail = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    seats = models.PositiveSmallIntegerField(blank=True, null=True)
    transmission = models.CharField(
        max_length=10,
        blank=True, null=True,
        choices=TRANSMISSION_CHOICES
    )
    air_conditioning = models.BooleanField(default=False, blank=True, null=True)
    doors = models.PositiveSmallIntegerField(blank=True, null=True)
    def __str__(self):
        return self.name or f"Car #{self.pk}"
class Destination(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name
class Reservation(models.Model):
    STATUS_PENDING = 'pending'
    STATUS_APPROVED = 'approved'

    STATUS_CHOICES = [
        (STATUS_PENDING, 'Pending'),
        (STATUS_APPROVED, 'Approved'),
    ]

    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='reservations')
    destination = models.ForeignKey(
        Destination,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="reservations"
    )
    name_surname = models.CharField(max_length=200, blank=True, null=True)
    phone_number = models.CharField(max_length=30, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)

    pickup_datetime = models.DateTimeField(blank=True, null=True)
    return_datetime = models.DateTimeField(blank=True, null=True)

    passport_front = models.ImageField(upload_to='passports/', blank=True, null=True)
    passport_back = models.ImageField(upload_to='passports/', blank=True, null=True)
    extras = models.JSONField(default=list, blank=True)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default=STATUS_PENDING
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        super().clean()

        if self.phone_number:
            try:
                parsed = phonenumbers.parse(self.phone_number, None)
                if not phonenumbers.is_valid_number(parsed):
                    raise ValidationError({
                        'phone_number': 'Invalid phone number.'
                    })
                
                self.phone_number = phonenumbers.format_number(
                    parsed,
                    phonenumbers.PhoneNumberFormat.E164
                )

            except phonenumbers.NumberParseException:
                raise ValidationError({
                    'phone_number': 'Invalid phone number format.'
                })
        # Allow pending reservations without date/time
        if self.status == self.STATUS_PENDING:
            return
        
        if not self.pickup_datetime or not self.return_datetime:
            raise ValidationError(
                "Pickup and return date/time are required before approving a reservation."
            )

        if self.pickup_datetime >= self.return_datetime:
            raise ValidationError("Return datetime must be after pickup datetime")
        
        # ONLY block when approving
        if self.status == self.STATUS_APPROVED:
            overlapping = Reservation.objects.filter(
                car=self.car,
                status=self.STATUS_APPROVED,
                pickup_datetime__lt=self.return_datetime,
                return_datetime__gt=self.pickup_datetime,
            ).exclude(pk=self.pk).exists()

            if overlapping:
                raise ValidationError(
                    "This car is already booked for the seleceted date and time"
                )
    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name_surname} - {self.car.name}"
    

class CarExtra(models.Model):
    name = models.CharField(max_length=200, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.price})"
