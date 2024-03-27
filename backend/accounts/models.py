from django.contrib.auth.models import AbstractUser

class Account(AbstractUser):
    """Extended User"""
    
    class Meta: 
        verbose_name_plural='Account'