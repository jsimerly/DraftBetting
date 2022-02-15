from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('register/', index),
    path('pick-a-player/', index),
    path('create-league/', index),
    path('login/', index)
]
