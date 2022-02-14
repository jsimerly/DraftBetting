from django.urls import path
from . import views

urlpatterns = [
    path('pick-player/', views.CompPickView.as_view() ,name='home'),
    path('create-league/', views.CreateLeagueView.as_view(), name='create-league'),
    path('get-players/', views.PlayersView.as_view()),
    path('add-player-to-league', views.AddCompetitorToLeague.as_view())
]
