from django.urls import path
from . import views


urlpatterns = [
    path('register/', views.RegisterUser.as_view(), name='account-create'),
    path('login/', views.LogInUser.as_view(), name='log-in'),
    path('current-user/', views.CurrentUser.as_view(), name='current-user'),
    path('logout/', views.LogOutUser.as_view(), name='logout')
]
