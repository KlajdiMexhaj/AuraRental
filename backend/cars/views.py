from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

# Create your views here.

class CarListAPIView(generics.ListAPIView):
    serializer_class = CarSerializer

    def get_queryset(self):
        # prefetch related extra images for efficiency
        return Car.objects.prefetch_related(
            "extra_images",
            "price_periods"
        ).order_by("id")

    def get_serializer_context(self):
        return {"request": self.request}

class ReservationCreateAPIView(generics.ListCreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    parser_classes = (MultiPartParser, FormParser)

class CarAvailabilityAPIView(APIView):
    def get(self, request):
        car_id = request.query_params.get("car")
        pickup = request.query_params.get("pickup")
        return_dt = request.query_params.get("return")

        is_available = not Reservation.objects.filter(
            car_id=car_id,
            status=Reservation.STATUS_APPROVED,
            pickup_datetime__lt=return_dt,
            return_datetime__gt=pickup,
        ).exists()

        return Response({"available": is_available})
    
class CarDetailAPIView(generics.RetrieveAPIView):
    serializer_class = CarSerializer

    def get_queryset(self):
        return Car.objects.prefetch_related("extra_images")

    def get_serializer_context(self):
        return {"request": self.request}

class CarExtraListAPIView(generics.ListAPIView):
    queryset = CarExtra.objects.all().order_by("id")
    serializer_class = CarExtraSerializer

class DestinationListAPIView(generics.ListAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer