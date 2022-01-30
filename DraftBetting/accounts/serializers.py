from wsgiref.validate import validator
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    email= serializers.EmailField(
        max_length = 256,
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username= serializers.CharField(
        max_length = 32,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password= serializers.CharField(
        min_length=8,
        write_only=True
    )

    def create(self, validate_data):
        user = User.objects.create_user(validate_data['username'], 
                                        validate_data['email'],
                                        validate_data['password'])
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')