from rest_framework import serializers

from .models import Account, Post, Game, TeamRegistration, Team
from django.contrib.auth.models import User

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ["cin", "first_name", "last_name", "gender", "phone", "address", "city", "position", "description"]
        def create(self, validated_data):
            return Account.objects.create(**validated_data)

        def update(self, instance, validated_data):
            instance.phone = validated_data.get('phone', instance.phone)
            instance.address = validated_data.get('address', instance.address)
            instance.city = validated_data.get('city', instance.city)
            instance.description = validated_data.get('description', instance.description)
            instance.save()
            return instance



class PostSerializer(serializers.ModelSerializer):
    publishedByUsername = serializers.CharField(source='publishedBy.username', read_only=True)
    createdAt = serializers.DateTimeField(format="%b %d %Y", read_only=True)
    class Meta:
        model = Post
        fields = "__all__"

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = "__all__"

class TeamRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamRegistration
        fields = "__all__"

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = "__all__"


class PostBaseSerializer(serializers.BaseSerializer):
    def to_representation(self, instance):
        return {
            'id': instance.id,
            'title':instance.title,
            'preview':instance.preview,     
            'content':instance.content, 
            'picture':instance.picture.url,   
            'category':instance.category,            
            'publishedBy':instance.publishedBy.username,
            'editedBy':instance.editedBy.username,    
            'createdAt':instance.createdAt.strftime("%b %d %Y")
        }

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'is_active')
        # fields = "__all__"
        # extra_kwargs = {'password': {'write_only': True}}



class ChangePasswordSerializer(serializers.Serializer):
    model = User

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


# Team Registration Creation Serializer
class TrCreateSerializer(serializers.ModelSerializer):
    game = serializers.IntegerField(required=True)

    class Meta:
        model = TeamRegistration
        fields = ["game", 'position', 'status', 'player', 'team']

    



    