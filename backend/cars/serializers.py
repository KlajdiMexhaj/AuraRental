from rest_framework import serializers
from .models import Car, Reservation, CarExtra, Destination, ImgCarExtra,CarPricePeriod


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
    extras = serializers.JSONField(required=False, allow_null=True)
    preview_days = serializers.SerializerMethodField(read_only=True)
    preview_total_price = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Reservation
        fields = "__all__"
        read_only_fields = ("status", "total_days", "car_price_total", "total_price")

    def get_preview_days(self, obj):
        try:
            days, _ = obj.calculate_price()
            return days
        except:
            return None

    def get_preview_total_price(self, obj):
        try:
            _, total = obj.calculate_price()
            return total
        except:
            return None


class CarExtraSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarExtra
        fields = ("id", "name", "price")
