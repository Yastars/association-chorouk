from django.shortcuts import render
from rest_framework import generics
from .models import Account, Post, Game, GameRegistration
from .serializers import AccountSerializer, PostSerializer, GameSerializer, GameRegistrationSerializer, PostBaseSerializer, UserSerializer

from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated  # <-- Here

from rest_framework_simplejwt.authentication import JWTAuthentication

# Create your views here.

def index(request, path=''):
    # Render the HTML template index.html with the data in the context variable
    return render(request, 'index.html')

class AccountAPIView(generics.ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer # Connected only

class PostAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `category` query parameter in the URL.
        """
        queryset = Post.objects.all()
        category = self.request.query_params.get('category', None)
        if category is not None:
            queryset = queryset.filter(category=category)
        return queryset

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


@api_view(['GET'])
def getOnePost(request, pk):
    instance = Post.objects.get(pk=pk)
    serializer = PostBaseSerializer(instance)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    # authentification = JWTAuthentication.authenticate(*args, **kwargs)
    # print(authentification)
    # user = JWTAuthentication.get_user(authentification[1])
    # serializer = UserSerializer(user)
    # return Response(serializer.data)
    try:
        account = Account.objects.get(user=request.user)
        return Response({
            "username": request.user.username,
            "is_staff": request.user.is_staff,
            "is_active": request.user.is_active,
            "is_superuser": request.user.is_superuser,
            "last_login": request.user.last_login,

            "first_name": account.first_name,
            "last_name": account.last_name,
            "gender": account.gender,
            "email": account.email,
            "phone": account.phone,
            "address": account.address,
            "city": account.city,
            "position": account.position,
            "description": account.description,
        })
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)
