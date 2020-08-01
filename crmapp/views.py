from django.shortcuts import render
from rest_framework import generics
from .models import Account, Post, Game, GameRegistration
# from .serializers import AccountSerializer, PostSerializer, GameSerializer, GameRegistrationSerializer, PostBaseSerializer
from .serializers import AccountSerializer, PostSerializer, GameSerializer, GameRegistrationSerializer, PostBaseSerializer, UserSerializer

from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.models import User

from rest_framework.parsers import JSONParser
import io

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
    # try:
    account = Account.objects.get(user=request.user)
    user = request.user
    userSerializer = UserSerializer(user)
    accountSerializer = AccountSerializer(account)
    
    
    return Response({
        'user':userSerializer.data,
        'account': accountSerializer.data})
        # return Response({
        #     "username": request.user.username,
        #     "is_staff": request.user.is_staff,
        #     "is_active": request.user.is_active,
        #     "is_superuser": request.user.is_superuser,
        #     "last_login": request.user.last_login,
        #     "email": request.user.email,

        #     "first_name": account.first_name,
        #     "last_name": account.last_name,
        #     "gender": account.gender,
        #     # "email": account.email,
        #     "phone": account.phone,
        #     "address": account.address,
        #     "city": account.city,
        #     "position": account.position,
        #     "description": account.description,
        # })
    # except:
    #     return Response(status=status.HTTP_400_BAD_REQUEST)


# class RegisterUserAPIView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer # Connected only
#     # new_user = User.objects.create_user('john', 'lennon@thebeatles.com', 'johnpassword')
    

# This function receive a JSON {user:"",account:""} and creates a new account and user
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    # Deserialize Account
    print(request.data['account'])
    accountSerializer = AccountSerializer(data=request.data['account'])
    accountSerializer.is_valid(raise_exception=True)
    account = accountSerializer.validated_data
    # user_id = serializerdata.validated_data.get('user_id')
    
    # # # Create User
    user_json = request.data['user']
    user = User.objects.create_user(user_json['username'], user_json['email'], password=user_json['password'], account=Account(account))
    userSerializer = UserSerializer(user)

    # # # Create Account after Creating User
    # account.id = None
    # account['is_Accepted'] = False
    # account['user'] = user
    accountSerializer.is_valid(raise_exception=True)
    accountSerializer.save(is_Accepted=False, user=user)
    # print('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO=')
    # print(account)
    # # accountSerializer = AccountSerializer(data=account)
    # # accountSerializer.is_valid()
    # accountSerializer = AccountSerializer(Account(account))
    # # accountSerializer.save()
    
    # serializer = AccountSerializer(accountSerializer.validated_data)
    # accountReturn = accountSerializer.data
    
    
    return Response({
        'user':userSerializer.data,
        'account': account })
    










# @api_view(['POST'])
# @permission_classes([AllowAny])
# def register_user(request):
#     # Deserialize Account
#     accountSerializer = AccountSerializer(data=request.data['account'])
#     accountSerializer.is_valid()
#     account = Account(accountSerializer.validated_data)
    
#     # # Create User
#     user_json = request.data['user']
#     user = User.objects.create_user(user_json['username'], user_json['email'], password=user_json['password'], account=account)
#     userSerializer = UserSerializer(user)

#     # # Create Account after Creating User
#     account.id = None
#     account.user = user
#     print('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO=')
#     print(account)
#     # accountSerializer = AccountSerializer(data=account)
#     # accountSerializer.is_valid()
#     accountSerializer = AccountSerializer(Account(account))
#     # accountSerializer.save()

#     return Response({
#         # 'user':userSerializer.data,
#         'account': accountSerializer.data})