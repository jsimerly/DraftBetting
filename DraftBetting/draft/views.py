#External
from datetime import datetime
from rest_framework.fields import CurrentUserDefault
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from accounts import serializers

#My Imports
from .models import *
from draft.serializers import *
# Create your views here.

class AddCompetitorToLeague(APIView):
    serializer_class = CompetitorSerializer

    def post(self, request):
        serializers = CompetitorSerializer(data=request.data, context={'request': request})

        if serializers.is_valid():
            userId = serializers.data.get('user')
            leagueId = serializers.data.get('league')

            user = User.objects.get(id=userId)
            league = League.objects.get(id=leagueId)

            comp = Competitor(user=user, league=league)
            comp.save()

            return Response(CompetitorSerializer(comp).data, status=status.HTTP_201_CREATED)
        print('---------------')
        print(serializers.errors)

class DraftView(APIView):
    serializer_class = DraftSerializer

    def post(self, request, format='json'):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            player_id = serializer.data.get('player')
            player = Player.objects.get(id=player_id)
            
            draft = Draft()
            overall = draft.get_next_overall()
            pick = draft.get_next_pick()
            round = draft.get_next_round()

            draft = Draft(round=round, overall=overall, pick=pick, player=player)
            draft.save()
        
            queryset = CompPick.objects.filter(overall=overall)
            for pick in queryset:
                pick.check_pos_pick()
                pick.check_player_pick()
                pick.save()

            return Response(DraftSerializer(draft).data, status=status.HTTP_201_CREATED)

class PlayersView(APIView):
    serializer_class = PlayerSerializer

    def get(self, request, format='json'):
        allPlayers = Player.objects.filter(picked=False)
        
        data = PlayerSerializer(allPlayers, many=True).data
        return Response(data, status=status.HTTP_200_OK)

class PlayerDraftedView(APIView):
    serializer_class = PlayerDraftedSerializer

    def patch(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            playerId = serializer.data.get('id')
            picked = serializer.data.get('picked')
            taken_round = serializer.data.get('taken_round')
            taken_pick = serializer.data.get('taken_pick')

            player = Player.objects.get(id=playerId)

            player.taken_round = taken_round
            player.taken_pick = taken_pick

            player.picked = picked

            player.save(update_fields=['picked', 'taken_round', 'taken_pick'])
            
            return Response(PlayerDraftedSerializer(player).data, status=status.HTTP_200_OK)

        return Response({'Bad Request' : 'Invalid Data', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class CreateLeagueView(APIView):
    serializer_class = LeagueCreatorSerializer

    def post(self, request, format='json'):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            name = serializer.data.get('name')
            year = datetime.now().year

            league = League(name=name, year=year, owner=request.user)
            league.save()

            comp = Competitor(user=request.user, league=league)
            comp.save()

            return Response(LeagueCreatorSerializer(league).data, status=status.HTTP_201_CREATED)

        else:
            print('-------------------------------')
            print(serializer.errors)

class CompPickView(APIView):
    serializer_class = CompPickSerializer

    def post(self, request, format='json'):
        serializer = self.serializer_class(data=request.data)
  
        if serializer.is_valid():
     
            playerId = serializer.data.get('player')
            player = Player.objects.get(id=playerId)
            
            compId = serializer.data.get('comp')
            comp = Competitor.objects.get(id=compId)

            pos = serializer.data.get('pos')

            draft = Draft()

            overall = draft.get_next_overall()
            pick = draft.get_next_pick()
            round = draft.get_next_round()

            compPick = CompPick(player=player, pos=pos, round=round,pick=pick, comp=comp, overall=overall)
            compPick.save()


            return Response(CompPickSerializer(compPick).data, status=status.HTTP_201_CREATED)
        else:
            print("---------------")
            print(serializer.errors)

class LeaguesUsersInView(APIView):
    def get(self, request, format='json'):
        user = request.user
        json = {}

        if user.is_authenticated:

            userObj = User.objects.get(id=user.id)
            leagues = userObj.league_set.all()

            return Response(LeagueSerializer(leagues, many=True).data, status=status.HTTP_200_OK)
            
    

        
def index(request):
    return HttpResponse('Hello world')
