from django.urls import path
from . import views

urlpatterns = [
    path('pick-player/', views.CompPickView.as_view() ,name='home')
]
