from django.db import models

class User(models.Model):
    First_name = models.CharField(max_length=150, unique=True)
    Last_name = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=256) 
    contact_no = models.CharField(max_length=15, blank=True)

    def __str__(self):
        return self.First_name
