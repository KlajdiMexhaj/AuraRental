from rest_framework import serializers
from .models import Car, Reservation, CarExtra, Destination


class CarListSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Car
        fields = ("id", "name", "price", "image","detail","seats","transmission","air_conditioning","doors")

    def get_image(self, obj):
        return obj.image.url if obj.image else None


class CarDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = "__all__"

class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = ("id", "name")
class ReservationSerializer(serializers.ModelSerializer):
    # ✅ CORRECT field for FormData + JSON
    extras = serializers.JSONField(required=False, allow_null=True)

    class Meta:
        model = Reservation
        fields = "__all__"
        read_only_fields = ("status",)

    def validate_extras(self, extras):
        if extras is None:
            return extras

        if not isinstance(extras, list):
            raise serializers.ValidationError("Extras must be a list.")

        for extra in extras:
            if not isinstance(extra, dict):
                raise serializers.ValidationError(
                    "Each extra must be an object."
                )

            if "name" not in extra or "price" not in extra:
                raise serializers.ValidationError(
                    "Each extra must contain name and price."
                )

        return extras

    def validate(self, data):
        pickup = data.get("pickup_datetime")
        return_dt = data.get("return_datetime")
        car = data.get("car")

        # Allow pending reservations without dates
        if not pickup or not return_dt:
            return data

        if pickup >= return_dt:
            raise serializers.ValidationError(
                "Return datetime must be after pickup datetime."
            )

        overlapping = Reservation.objects.filter(
            car=car,
            status=Reservation.STATUS_APPROVED,
            pickup_datetime__lt=return_dt,
            return_datetime__gt=pickup,
        ).exclude(pk=self.instance.pk if self.instance else None).exists()

        if overlapping:
            raise serializers.ValidationError(
                "This car is not available for the selected date and time."
            )

        return data


class CarExtraSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarExtra
        fields = ("id", "name", "price")
