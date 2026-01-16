from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *
# Create your views here.

class CarListAPIView(generics.ListCreateAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer

class ReservationCreateAPIView(generics.ListCreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
