from django.contrib import admin

from .models import Account, Post, Game, TeamRegistration, Team

from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

admin.site.register(Account)
admin.site.register(Post)
admin.site.register(Game)
admin.site.register(TeamRegistration)
admin.site.register(Team)


# Define an inline admin descriptor for Account model
# which acts a bit like a singleton
class AccountInline(admin.StackedInline):
    model = Account
    can_delete = False
    verbose_name_plural = 'account'

# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = (AccountInline,)

# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)