from wsgiref.validate import validator
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'name', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

# class UserSerializer(serializers.ModelSerializer):
#     email = serializers.EmailField(
#         max_length = 256,
#         required=True,
#         validators=[UniqueValidator(queryset=User.objects.all())]
#     )
#     first_name = serializers.CharField(
#         max_length = 32,
#     )
 
#     password = serializers.CharField(
#         min_length=8,
#         write_only=True,
#         style={'input_type':'password'}
#     )

#     def create(self, validate_data):
#         user = User.objects.create_user(
#             email=validate_data['email'],
#             first_name=validate_data['first_name']
#             )

#         user.set_password(validate_data['password'])
#         user.save()
        
#         return user

#     class Meta:
#         model = User
#         fields = ('id', 'first_name', 'email', 'password', )
#         extra_kwargs = {
#             'password' : {'write_only':True},
#             'id' : {'read_only':True}
#         }