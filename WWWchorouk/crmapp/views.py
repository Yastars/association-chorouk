from django.shortcuts import render
from rest_framework import generics
from .models import Account, Post, Game, GameRegistration
from .serializers import AccountSerializer, PostSerializer, GameSerializer, GameRegistrationSerializer

from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser

# Create your views here.

def index(request):
    # Render the HTML template index.html with the data in the context variable
    return render(request, 'index.html')

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


class FileUploadView(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):

      file_serializer = PostSerializer(data=request.data)

      if file_serializer.is_valid():
          file_serializer.save()
          return Response(file_serializer.data, status=status.HTTP_201_CREATED)
      else:
          return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)