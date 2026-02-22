from rest_framework import serializers
from .models import Car, Reservation, CarExtra, Destination, ImgCarExtra,CarPricePeriod
import json

class ImgCarExtraSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = ImgCarExtra
        fields = ("id", "name", "image")

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None

class CarPricePeriodSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarPricePeriod
        fields = ("id", "start_date", "end_date", "price_per_day")
class CarSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    extra_images = ImgCarExtraSerializer(many=True, read_only=True)
    price_periods = CarPricePeriodSerializer(many=True, read_only=True)

    class Meta:
        model = Car
        fields = (
            "id",
            "name",
            "price",
            "image",
            "detail",
            "seats",
            "transmission",
            "air_conditioning",
            "doors",
            "fuel_type",
            "extra_images",
            "price_periods",
        )

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None


class CarDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = "__all__"


class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = ("id", "name")


class ReservationSerializer(serializers.ModelSerializer):
    passport_front = serializers.ImageField(required=False, allow_null=True)
    passport_back = serializers.ImageField(required=False, allow_null=True)

    extras = serializers.JSONField(required=False)

    preview_days = serializers.SerializerMethodField(read_only=True)
    preview_total_price = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Reservation
        fields = "__all__"
        read_only_fields = (
            "status",
            "total_days",
            "car_price_total",
            "total_price",
        )

    def validate_extras(self, value):
        if not isinstance(value, list):
            return []

        extras_data = []
        for item in value:
            try:
                extra = CarExtra.objects.get(id=item.get("id"))
                extras_data.append({
                    "id": extra.id,
                    "name": extra.name,
                    "price": str(extra.price)
                })
            except:
                continue

        return extras_data
    def get_preview_days(self, obj):
        try:
            days, _, _ = obj.calculate_price()
            return days
        except:
            return None

    def get_preview_total_price(self, obj):
        try:
            _, _, total = obj.calculate_price()
            return total
        except:
            return None

class CarExtraSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarExtra
        fields = ("id", "name", "price")
