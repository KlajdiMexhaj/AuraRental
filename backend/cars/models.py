from django.db import models

# Create your models here.

class Car(models.Model):
    name = models.CharField(max_length=200,blank=True,null=True)
    image = models.ImageField(upload_to='cars/',blank=True,null=True)
    detail = models.TextField(blank=True,null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2,blank=True,null=True)

    def __str__(self):
        return self.name
    



class Reservation(models.Model):
    car = models.ForeignKey(
        Car,
        on_delete=models.CASCADE,
        related_name='reservations'
    )

    name_surname = models.CharField(max_length=200,blank=True,null=True)
    phone_number = models.CharField(max_length=30,blank=True,null=True)
    email = models.EmailField(blank=True,null=True)
    
    pickup_date = models.DateField(blank=True,null=True)
    pickup_date = models.TimeField(blank=True,null=True)

    return_date = models.DateField(blank=True,null=True)
    return_date = models.TimeField(blank=True,null=True)

    passport_front = models.ImageField(upload_to='passports/',blank=True,null=True)
    passport_back = models.ImageField(upload_to='passports/',blank=True,null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name_surname} - {self.car.name}"