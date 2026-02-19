from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import Reservation
from decimal import Decimal

# -------------------- BUSINESS NOTIFICATION --------------------
@receiver(post_save, sender=Reservation)
def notify_business_new_reservation(sender, instance, created, **kwargs):
    if not created:
        return

    extras_lines = ""
    if instance.extras:
        for extra in instance.extras:
            name = extra.get("name", "Extra")
            price = Decimal(str(extra.get("price", 0)))
            extras_lines += f"  - {name}: {price} €\n"
    else:
        extras_lines = "  None\n"

    subject = f"New Car Reservation Request: {instance.name_surname}"

    message = f"""
================ NEW RESERVATION =================

Customer Information:
  Name: {instance.name_surname or "-"}
  Phone: {instance.phone_number or "-"}
  Email: {instance.email or "-"}

Reservation Details:
  Car: {instance.car.name if instance.car else "-"}
  Destination: {instance.destination.name if instance.destination else "-"}
  Pickup Date: {instance.pickup_datetime or "-"}
  Return Date: {instance.return_datetime or "-"}
  Total Days: {instance.total_days or "-"}
  Total Price: {instance.total_price or "-"} €

Extras Selected:
{extras_lines}

Status: Pending
==================================================
"""
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [settings.BUSINESS_EMAIL],
        fail_silently=False,
    )


# -------------------- CUSTOMER NOTIFICATION --------------------
@receiver(pre_save, sender=Reservation)
def notify_customer_approved(sender, instance, **kwargs):

    if not instance.pk:
        return

    previous = Reservation.objects.get(pk=instance.pk)

    if previous.status != Reservation.STATUS_APPROVED and instance.status == Reservation.STATUS_APPROVED:

        if not instance.email:
            return

        extras_lines = ""
        if instance.extras:
            for extra in instance.extras:
                name = extra.get("name", "Extra")
                price = Decimal(str(extra.get("price", 0)))
                extras_lines += f"  - {name}: {price} €\n"
        else:
            extras_lines = "  None\n"

        subject = f"Your Car Reservation is Approved, {instance.name_surname}"

        message = f"""
================ RESERVATION CONFIRMATION =================

Hello {instance.name_surname},

Your reservation has been approved. Here are the details:

Car & Destination:
  Car: {instance.car.name if instance.car else "-"}
  Destination: {instance.destination.name if instance.destination else "-"}

Reservation Period:
  Pickup Date: {instance.pickup_datetime or "-"}
  Return Date: {instance.return_datetime or "-"}
  Total Days: {instance.total_days or "-"}
  Total Price: {instance.total_price or "-"} €

Extras Selected:
{extras_lines}

Thank you for choosing our service! Your vehicle is reserved and ready.

==========================================================
"""
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [instance.email],
            fail_silently=False,
        )
