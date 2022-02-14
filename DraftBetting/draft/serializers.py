from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault
from django.contrib.auth import get_user_model
from .models import Player, Competitor, CompPick, League

User = get_user_model()

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = (
            'id', 'first_name', 'last_name', 'pos', 'col_class', 
            'college', 'rank',
                )

class PlayerDraftedSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(validators=[])

    class Meta:
        model = Player
        fields = ('id', 'taken_round', 'taken_pick' ,'picked')

class CompPickSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompPick
        fields = ( 'round', 'pick', 'comp', 'player', 'pos',)
        
class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = ('name', 'owner')

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model= User
#         fields = ('id')

class CompetitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competitor
        fields = ('user', 'league',)