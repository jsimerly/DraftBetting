#Django
from django.shortcuts import render
from django.http import HttpResponse

#My Imports
from .models import *

# Create your views here.
def index(request):
    return HttpResponse('Hello world')
