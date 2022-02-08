import re
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .serializers import UserSerializer
from .models import User
from rest_framework.authtoken.models import Token

# Create your views here.
class RegisterUser(generics.CreateAPIView):
    serializer_class = UserSerializer

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.data.get('email')
            name = serializer.data.get('name')

            password = serializer.data.get('password')
            
            user = User.objects.create_user(email=email, name=name, password=password)
            user.save()

            return Response(UserSerializer(user).data, status.HTTP_201_CREATED)
        else:
            print(serializer.errors)

            




# class UserCreate(generics.CreateAPIView):
#     serializer_class = UserSerializer

#     def post(self, request, format='json'):
#         serializer = UserSerializer(data=request.data)

#         if serializer.is_valid():
#             user = serializer.save()
          
#             return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



