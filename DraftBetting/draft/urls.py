from django.urls import path
from . import views

urlpatterns = [
    path('pick-player/', views.CompPickView.as_view() ,name='home'),
    path('create-league/', views.CreateLeagueView.as_view(), name='create-league'),
    path('get-players/', views.PlayersView.as_view()),
    path('add-player-to-league', views.AddCompetitorToLeague.as_view()),
    path('player-drafted', views.PlayerDraftedView.as_view(), name='drafted'),
    path('drafted-player', views.DraftView.as_view()),
    path('get-user-leagues', views.LeaguesUsersInView.as_view())
]
