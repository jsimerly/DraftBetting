#External
from datetime import datetime
from os import stat
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from accounts import serializers

#My Imports
from .models import *
from draft.serializers import PlayerSerializer, CompPickSerializer, LeagueSerializer

# Create your views here.
class PlayersView(APIView):
    serializer_class = PlayerSerializer

    def get(self, request, format='json'):
        allPlayers = Player.objects.all()
        
        data = PlayerSerializer(allPlayers, many=True).data
        return Response(data, status=status.HTTP_200_OK)

class CreateLeagueView(APIView):
    serializer_class = LeagueSerializer

    def post(self, request, format='json'):
        serializer = self.serializer_class(data=request.data)

        print(serializer)
        if serializer.is_valid():
            name = serializer.data.get('name')
            year = datetime.now().year

            league = League(name=name, year=year)
            league.save()

            return Response(LeagueSerializer(league).data, status=status.HTTP_201_CREATED)

        else:
            print('Not Valid')

class CompPickView(APIView):
    serializer_class = CompPickSerializer

    def post(self, request, format='json'):
      
        serializer = self.serializer_class(data=request.data)
        print(request.data)
        if serializer.is_valid():
     
            playerQSet = Player.objects.filter(id=serializer.data.get('player'))
            
            player = playerQSet[0]
            comp = serializer.data.get('comp')
            pos = serializer.data.get('pos')
            round = serializer.data.get('round')
            pick = serializer.data.get('pick')

            compPick = CompPick(player=player, pos=pos, round=round,pick=pick, comp=comp,)
            compPick.save()


            return Response(CompPickSerializer(compPick).data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            print("NOT VALID")

    

        
def index(request):
    return HttpResponse('Hello world')
