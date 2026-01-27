from rest_framework import serializers
from .models import *


class CarListSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Car
        fields = ("id", "name", "price", "image")  # exclude detail

    def get_image(self, obj):
        return obj.image.url if obj.image else None
    
class CarDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = "__all__"
class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'
        read_only_fields = ("status",)
    
    def validate(self, data):
        car = data["car"]
        pickup = data["pickup_datetime"]
        return_dt = data["return_datetime"]

        if pickup >= return_dt:
            raise serializers.ValidationError(
                "Return datetime must be after pickup datetime."
            )
        
        overlapping = Reservation.objects.filter(
            car=car,
            status=Reservation.STATUS_APPROVED,
            pickup_datetime__lt=return_dt,
            return_datetime__gt=pickup,
        ).exists()

        if overlapping:
            raise serializers.ValidationError(
                "This car is not available for the selected date and time."
            )
        return data