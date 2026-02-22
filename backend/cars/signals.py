from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import Reservation
from decimal import Decimal


def format_datetime(dt):
    return dt.strftime("%Y-%m-%d %H:%M") if dt else "-"


def format_extras(extras, days):
    if not extras:
        return "None", Decimal("0.00")

    lines = []
    extras_total = Decimal("0.00")

    for extra in extras:
        name = extra.get("name", "Extra")
        price = Decimal(str(extra.get("price", 0)))
        total = price * days
        extras_total += total
        lines.append(f"- {name}: {price} € x {days} days = {total} €")

    return "\n".join(lines), extras_total


def calculate_price_per_day(instance):
    if instance.total_days and instance.car_price_total:
        return (instance.car_price_total / instance.total_days).quantize(Decimal("0.00"))
    return Decimal("0.00")


# ---------------- ADMIN EMAIL ----------------
@receiver(post_save, sender=Reservation)
def notify_business_new_reservation(sender, instance, created, **kwargs):
    if not created:
        return

    days = instance.total_days or 0
    price_per_day = calculate_price_per_day(instance)
    extras_lines, extras_total = format_extras(instance.extras, days)

    pickup = format_datetime(instance.pickup_datetime)
    return_date = format_datetime(instance.return_datetime)

    subject = f"New Reservation #{instance.id} – {instance.name_surname}"

    message = f"""
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEW CAR RESERVATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reservation ID: #{instance.id}
Status: Pending

CUSTOMER
----------------------------------
Name: {instance.name_surname or "-"}
Phone: {instance.phone_number or "-"}
Email: {instance.email or "-"}

BOOKING DETAILS
----------------------------------
Car: {instance.car.name if instance.car else "-"}
Price per Day: {price_per_day} €
Pickup: {pickup}
Return: {return_date}
Total Days: {days}

CAR TOTAL: {instance.car_price_total or 0} €
EXTRAS TOTAL: {extras_total} €
FINAL TOTAL: {instance.total_price or 0} €

EXTRAS
----------------------------------
{extras_lines}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"""

    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [settings.BUSINESS_EMAIL],
        fail_silently=False,
    )


# ---------------- CUSTOMER EMAIL ----------------
@receiver(pre_save, sender=Reservation)
def notify_customer_approved(sender, instance, **kwargs):

    if not instance.pk:
        return

    previous = Reservation.objects.get(pk=instance.pk)

    if previous.status != Reservation.STATUS_APPROVED and instance.status == Reservation.STATUS_APPROVED:

        if not instance.email:
            return

        days = instance.total_days or 0
        price_per_day = calculate_price_per_day(instance)
        extras_lines, extras_total = format_extras(instance.extras, days)

        pickup = format_datetime(instance.pickup_datetime)
        return_date = format_datetime(instance.return_datetime)

        subject = f"Reservation Confirmed | ID #{instance.id}"

        message = f"""
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR RESERVATION IS CONFIRMED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hello {instance.name_surname},

Your booking has been approved.

Reservation ID: #{instance.id}

CAR DETAILS
----------------------------------
Car: {instance.car.name if instance.car else "-"}
Price per Day: {price_per_day} €
Pickup: {pickup}
Return: {return_date}
Total Days: {days}

PRICE SUMMARY
----------------------------------
Car Total: {instance.car_price_total or 0} €
Extras Total: {extras_total} €
Final Total: {instance.total_price or 0} €

EXTRAS
----------------------------------
{extras_lines}

Your vehicle is now reserved.

Thank you for choosing us.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"""

        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [instance.email],
            fail_silently=False,
        )