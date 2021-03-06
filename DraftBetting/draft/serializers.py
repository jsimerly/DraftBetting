from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault
from django.contrib.auth import get_user_model
from .models import Draft, Player, Competitor, CompPick, League, Draft

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


        
class LeagueCreatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = ('name', 'owner')

class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = ('name', 'owner', 'year', 'id',)


class CompetitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competitor
        fields = ('user', 'league',)

class CompPickSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompPick
        fields = ('player', 'pos',)


class DraftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Draft
        fields = ('player',)