from django.contrib import admin
from .models import Notifications, PostUrl, ShareablePost,Promotions
# Register your models here.
admin.site.register(ShareablePost)
admin.site.register(Notifications)
admin.site.register(Promotions)
admin.site.register(PostUrl)