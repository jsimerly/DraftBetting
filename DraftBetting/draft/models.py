from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Player(models.Model):
    name = models.CharField(max_length=256, null=False)
    position = models.CharField(max_length=4, null=True)

    EstimatedRound = models.IntegerField(default=7)

    college = models.CharField(max_length=256)
    age = models.CharField(max_length=30)

    TakenRound = models.IntegerField(null=True, blank=True)
    TakenPick = models.IntegerField(null=True, blank=True)

    def get_estimated_overall(self):
        return self.EstimatedRound*32 + self.EstimatedPick
    
    def get_taken_overall(self):
        return self.TakenRound*32 + self.TakenPick


class League(models.Model):
    year = models.IntegerField()
    name = models.CharField(max_length=256)

    winner = models.ManyToManyField('Competitor', related_name='leagueWinner')
    runnerUp = models.ManyToManyField('Competitor', related_name='leagueRunnerUp')


class Competitor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(null=True, max_length = 30)
    league = models.ManyToManyField(League)

    pointsFromPos = models.IntegerField(default=0)
    pointsFromPick = models.IntegerField(default=0)

    def total_points(self):
        return self.pointsFromPos + self.pointsFromPick

class CompPick(models.Model):
    player = models.CharField(max_length=256)
    #player = models.ForeignKey(Player, on_delete=models.PROTECT)
    pos = models.CharField(max_length=4, null=True)

    #comp = models.ForeignKey(Competitor, on_delete=models.CASCADE)
    
    round = models.IntegerField()
    pick = models.IntegerField()

    def get_pick_full_string(self):
        return 'Round: {} Pick: {}'.format(self.round, self.pick)

    def get_pick_short_string(self):
        return '{}.{}'.format(self.round, self.pick)

    def get_overall(self):
        return self.pick + self.round*32

class DraftPick(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)  

    round = models.IntegerField()
    pick = models.IntegerField()
    pass

