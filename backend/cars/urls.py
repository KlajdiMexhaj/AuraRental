from django.urls import path
from .views import *

urlpatterns = [
    path('cars/', CarListAPIView.as_view(), name='cars'),
    path('reservations/', ReservationCreateAPIView.as_view()),
    path('cars/<int:pk>/', CarDetailAPIView.as_view(), name='car-detail'),
    path("car-extras/", CarExtraListAPIView.as_view(), name="car-extras"),
]
