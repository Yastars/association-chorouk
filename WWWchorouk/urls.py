"""WWWchorouk URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from crmapp import views
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic.base import TemplateView
from rest_framework.authtoken.views import obtain_auth_token

from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView,TokenVerifyView)
from django.contrib.auth.models import User
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'teams', views.TeamViewSet)

urlpatterns = [
    # path('', views.index, name='index'),
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path(r'api/accounts/', views.AccountAPIView.as_view(), name='account-list'),
    path(r'api/posts/', views.PostAPIView.as_view(), name='posts-list'),
    path(r'api/games/', views.GameAPIView.as_view(), name='games-list'),
    path(r'api/teamRegistrations/', views.TeamRegistrationAPIView.as_view(), name='game-registrations-list'),
    path('upload/', include('crmapp.urls')),
    path('posts/<pk>', views.getOnePost, ),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    
    # Json Web Token
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # JWT Token obtain
    path('api/current/', views.current_user, ),
    
    path(r'api/update_user/', views.ChangePasswordView.as_view(), name='update-user'),
    # trying regits
    path('api/register_user/', views.register_user, ),
    # path(r'api/teams', views.TeamViewSet),

    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # JWT Token refresh
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),    # HMAC , Hash- based message authentification code
    
    # Team View Set
    
    

    # Re-path rest to this location
    re_path(r'^association/(?P<path>.*)$', views.index),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



