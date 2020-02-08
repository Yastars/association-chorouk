from django.shortcuts import render
from rest_framework import generics
from .models import Account, Post, Game, GameRegistration
from .serializers import AccountSerializer, PostSerializer, GameSerializer, GameRegistrationSerializer


# Create your views here.

class AccountAPIView(generics.ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class PostAPIView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class GameAPIView(generics.ListCreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class GameRegistrationAPIView(generics.ListCreateAPIView):
    queryset = GameRegistration.objects.all()
    serializer_class = GameRegistrationSerializer
