from django.urls import path
from .views import *

urlpatterns = [
    path('cars/', CarListAPIView.as_view()),
    path('reservations/', ReservationCreateAPIView.as_view()),
]
