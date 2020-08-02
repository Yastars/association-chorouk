from django.shortcuts import render
from rest_framework import generics
from rest_framework import status
from .models import Account, Post, Game, GameRegistration
# from .serializers import AccountSerializer, PostSerializer, GameSerializer, GameRegistrationSerializer, PostBaseSerializer
from .serializers import AccountSerializer, PostSerializer, GameSerializer, GameRegistrationSerializer, PostBaseSerializer, UserSerializer, ChangePasswordSerializer
from .permissions import *
from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.models import User

from rest_framework.parsers import JSONParser
import io
from rest_framework.serializers import ValidationError

# Create your views here.

def index(request, path=''):
    # Render the HTML template index.html with the data in the context variable
    return render(request, 'index.html')

# We need Generic ListCreateAPIVIEW in order to automaticcaly manage the permissions and requests
class AccountAPIView(generics.ListCreateAPIView):
    # http_method_names = ['GET', 'HEAD', 'OPTIONS']
    permission_classes = [IsAdminUser]
    queryset = Account.objects.all()
    serializer_class = AccountSerializer # Connected only

class PostAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAdminUser | ReadOnly]
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
    permission_classes = [IsAdminUser | ReadOnly]
    queryset = Game.objects.all()
    serializer_class = GameSerializer



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
    accountSerializer = AccountSerializer(data=request.data['account'])
    accountSerializer.is_valid(raise_exception=True)
    account = accountSerializer.validated_data
    
    # # # Create User
    user_json = request.data['user']
    user = User.objects.create_user(user_json['username'], user_json['email'], password=user_json['password'], account=Account(account))
    userSerializer = UserSerializer(user)

    # Create Account
    accountSerializer.is_valid(raise_exception=True)
    accountSerializer.save(is_Accepted=False, user=user) 
    
    return Response({
        'user':userSerializer.data,
        'account': account })
    


class ChangePasswordView(generics.UpdateAPIView):
        """
        An endpoint for changing password.
        """
        serializer_class = ChangePasswordSerializer
        model = User
        permission_classes = (IsAuthenticated,)

        def get_object(self, queryset=None):
            obj = self.request.user
            return obj

        def update(self, request, *args, **kwargs):
            self.object = self.get_object()
            serializer = self.get_serializer(data=request.data)

            if serializer.is_valid():
                # Check old password
                if not self.object.check_password(serializer.data.get("old_password")):
                    return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
                # set_password also hashes the password that the user will get
                self.object.set_password(serializer.data.get("new_password"))
                self.object.save()
                response = {
                    'status': 'success',
                    'code': status.HTTP_200_OK,
                    'message': 'Password updated successfully', 
                    'data': []
                }

                return Response(response)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GameRegistrationAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated] #Needed
    queryset = GameRegistration.objects.all()
    serializer_class = GameRegistrationSerializer

    # Return The Game Registrations For Current User Working
    def get_queryset(self):
        player = self.request.user
        return GameRegistration.objects.all().filter(player=player)

        # def get_object(self, queryset=None):
        #     obj = self.request.user
        #     return obj

        # def update(self, request, *args, **kwargs):
        #     self.object = self.get_object()

    # def get_object(self, queryset=None):
    #     obj = self.request.user
    #     return obj

    # def perform_create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     if serializer.is_valid():
    #         # game = Game.objects.filter(id=(serializer.data.get("game")['game']))
    #         # count_game_registered = GameRegistration.objects.filter(game=game, status='REGISTERED').count()

    #         # if count_game_registered < game.max_players:
    #         #     raise ValidationError('GameRegistration.create.Error: Max_players')
    #         # serializer.save(player=self.request.user)
    #         return serializer.data['game']['game']


     

    def perform_create(self, serializer):
        # GR = GameRegistration
        GRserializer = GameRegistrationSerializer(data=serializer.data)
        GRserializer.is_valid(raise_exception=True)
        GR_validated = GRserializer.validated_data

        newGR = GameRegistration(
            position= GR_validated['position'],
            game= GR_validated['game'],
            # player = GR_validated['player'],
            player = None,
            status = GR_validated['status'])

        count_game_registered = GameRegistration.objects.filter(game=newGR.game, status="REGISTERED").count()
        if GameRegistration.objects.filter(game=newGR.game, player = self.request.user).exists():
            raise ValidationError('Current User {} Already Registered in this game : {}'.format(self.request.user.username, newGR.game.title) )
        if count_game_registered > newGR.game.max_players:
            raise ValidationError('GameRegistration.create.Error: Max_players')    
        newGR.player = self.request.user
        newGR.save()
    #     # return type(self)
        print("HELLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOoo=", count_game_registered)



        # count_game_registered = GameRegistration.objects.filter(game=game, status=REGISTERED)
        # if count_game_registered < game.max_players:
        #     raise ValidationError('GameRegistration.create.Error: Max_players')
        # serializer.save(player=self.request.user)
