from rest_framework import permissions
from rest_framework.permissions import BasePermission

class IsGameRegistrationOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # if request.method in permissions.SAFE_METHODS:
        #     return True
        # Instance must have an attribute named `owner`.
        return False


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS


