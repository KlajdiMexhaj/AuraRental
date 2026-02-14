from django.contrib import admin
from .models import *
from django import forms
# Register your models here.

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ("name", "price")
@admin.register(ImgCarExtra)
class ImgCarExtraAdmin(admin.ModelAdmin):
    list_display = ("name", "car")
@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ("name",)
class ReservationAdminForm(forms.ModelForm):
    extras_select = forms.ModelMultipleChoiceField(
        queryset=CarExtra.objects.all(),
        required=False,
        widget=forms.CheckboxSelectMultiple,
        label="Car Extras"
    )

    class Meta:
        model = Reservation
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        if self.instance.pk and self.instance.extras:
            names = [e["name"] for e in self.instance.extras]
            self.fields["extras_select"].initial = CarExtra.objects.filter(
                name__in=names
            )

    def save(self, commit=True):
        reservation = super().save(commit=False)

        extras = []
        for extra in self.cleaned_data.get("extras_select", []):
            extras.append({
                "name": extra.name,
                "price": str(extra.price)
            })

        reservation.extras = extras

        if commit:
            reservation.save()
        return reservation


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    form = ReservationAdminForm
    fields = (
        "car",
        "destination",
        "name_surname",
        "phone_number",
        "email",
        "pickup_datetime",
        "return_datetime",
        "passport_front",
        "passport_back",
        "extras_select",   # 👈 visible extras UI
        "status",          # 👈 LAST field
        "created_at",
    )

    readonly_fields = ("created_at",)
    list_display = (
        "id",
        "name_surname",
        "car",
        "pickup_datetime",
        "return_datetime",
        "status",
    )

    
    list_filter = ("status", "car")
    search_fields = ("name_surname", "email")


@admin.register(CarExtra)
class CarExtraAdmin(admin.ModelAdmin):
    list_display = ("name", "price")