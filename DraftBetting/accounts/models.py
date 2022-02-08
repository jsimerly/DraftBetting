from operator import mod
from pyexpat import model
from uuid import uuid4
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None):

        if not email:
            raise ValueError("Users must have an email address")
        
        user = self.model(
            email=self.normalize_email(email),
            name=name
        )

        user.set_password(password)
        user.save()
        return user

class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    email=models.EmailField(
        verbose_name='Email',
        max_length=255,
        unique=True
    )

    name = models.CharField(max_length=32, blank=False, null=False)
    is_active = models.BooleanField(default=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email
