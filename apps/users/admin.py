from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.forms import Textarea
from import_export.admin import ImportExportModelAdmin

from .models import NewUser, Profile, UserSingle, UserGroup


class UserAdminConfig(UserAdmin, ImportExportModelAdmin):
    model = NewUser
    search_fields = ('email', 'username', 'firstname',)
    list_filter = (
        'email',
        'username',
        'firstname',
        'is_active',
        'is_staff',
        'id',
        'points',
        'tasks',
        'alcherid',
    )
    ordering = ('-date_joined',)
    list_display = (
        'email',
        'username',
        'firstname',
        'is_active',
        'is_staff',
        'id',
    )
    fieldsets = (
        (None, {
            'fields': (
                'email',
                'username',
                'firstname',
                'id',
                'alcherid',
                'points',
            )
        }),
        ('Permissions', {
            'fields': (
                'is_staff',
                'is_active',
            )
        }),
        ('Personal', {
            'fields': (
                'img',
                'about',
                'phone',
                'college_state',
                'graduation_year',
                'college_city',
                'college_name',
                'position_of_responsibility',
                'interested_modules',
                'instahandle',
                'referred_by',
                'referrals',
                'provider',
            )
        }),
    )
    formfield_overrides = {
        NewUser.about: {'widget': Textarea(attrs={'rows': 10, 'cols': 40})},
    }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email',
                'username',
                'firstname',
                'password1',
                'password2',
                'is_active',
                'is_staff',
            )
        }),
    )


# Attach import/export support to the other models
@admin.register(Profile)
class ProfileAdmin(ImportExportModelAdmin):
    pass


@admin.register(UserSingle)
class UserSingleAdmin(ImportExportModelAdmin):
    pass


@admin.register(UserGroup)
class UserGroupAdmin(ImportExportModelAdmin):
    pass


# Register NewUser with the custom admin
admin.site.register(NewUser, UserAdminConfig)
