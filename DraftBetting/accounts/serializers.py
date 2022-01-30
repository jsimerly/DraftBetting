
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        max_length = 256,
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    first_name = serializers.CharField(
        max_length = 32,
    )
    username = serializers.CharField(
        max_length = 32,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        min_length=8,
        write_only=True,
        style={'input_type':'password'}
    )

    def create(self, validate_data):
        user = User.objects.create_user(
            username=validate_data['username'], 
            email=validate_data['email'],
            first_name=validate_data['first_name']
            )

        user.set_password(validate_data['password'])
        user.save()
        
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name')
        extra_kwargs = {
            'password' : {'write_only':True},
            'id' : {'read_only':True}
        }