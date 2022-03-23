
import re
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.contrib.auth import authenticate, login, logout
from rest_framework.authentication import  SessionAuthentication, BasicAuthentication
from .serializers import UserSerializer, LogInSerializer
from . import serializers
from django.contrib.auth import get_user_model

User = get_user_model()
# Create your views here.
class CurrentUser(APIView):
    def get(self, request, format='json'):
        json = {}

        if request.user.is_authenticated:
            json['email'] = request.user.email
            json['name'] = request.user.name
            json['isLoggedIn'] = True

            return Response(json, status=status.HTTP_200_OK)

        json['email'] = ''
        json['name'] = 'Unregisted User'
        json['isLoggedIn'] = False
        return Response(json, status=status.HTTP_200_OK)

class RegisterUser(APIView):
    serializer_class = UserSerializer

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.data.get('email')
            name = serializer.data.get('name')

            password = request.data.get('password')

            user = User.objects.create_user(email=email, name=name, password=password)
            user.save()

            return Response(UserSerializer(user).data, status.HTTP_201_CREATED)
        
        print(serializer.errors)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class LogInUser(APIView):
    serializer_class = LogInSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]

    def post(self, request, format='json'):
        serializer = LogInSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.data.get('email')
            password = serializer.data.get('password')

            user = authenticate(email=email, password=password)

            if user is not None:
                if user.is_active:
                    login(request, user)
                    json = {
                            'email':user.email,
                            'name' : user.name,
                            'isLoggedIn': True
                            }
                    return Response(json, status=status.HTTP_202_ACCEPTED)
           
        
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogOutUser(APIView):
    def post(self, request, format='json'):
        print(request)
        logout(request)
        return Response('User Logged Out', status=status.HTTP_200_OK)

        


            







