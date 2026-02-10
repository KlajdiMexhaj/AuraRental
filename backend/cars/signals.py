from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import Reservation


@receiver(post_save, sender=Reservation)
def notify_business_new_reservation(sender, instance, created, **kwargs):
    if not created:
        return
    
    subject = "New Car Reservation Request"

    message =f"""
New reservation request received

Customer: {instance.name_surname}
Phone: {instance.phone_number}
Email: {instance.email}

Car: {instance.car.name}
Pickup: {instance.pickup_datetime}
Return: {instance.return_datetime}

Status: Pending
"""
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [settings.BUSINESS_EMAIL],   # <-- your email
        fail_silently=False,
    )


# 2️⃣ ADMIN APPROVED → EMAIL CUSTOMER
@receiver(pre_save, sender=Reservation)
def notify_customer_approved(sender, instance, **kwargs):

    if not instance.pk:
        return

    previous = Reservation.objects.get(pk=instance.pk)

    if previous.status != Reservation.STATUS_APPROVED and instance.status == Reservation.STATUS_APPROVED:

        if not instance.email:
            return

        subject = "Your car reservation is approved"

        message = f"""
Hello {instance.name_surname},

Your reservation has been approved.

Car: {instance.car.name}
Pickup: {instance.pickup_datetime}
Return: {instance.return_datetime}

The vehicle is reserved for you.

Thank you for choosing us.
"""

        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [instance.email],
            fail_silently=False,
        )