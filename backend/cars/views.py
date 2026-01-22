from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.

class CarListAPIView(generics.ListCreateAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer

class ReservationCreateAPIView(generics.ListCreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer


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