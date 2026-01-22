from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ("name", "price")


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = (
        "name_surname",
        "car",
        "pickup_datetime",
        "return_datetime",
        "status",
    )
    list_filter = ("status", "car")
    search_fields = ("name_surname", "email")