from django.urls import path
from dashboard import views as dashboard_views
urlpatterns = [
    path('', dashboard_views.dashboard, name='dashboard_page'),
    path('guidelines', dashboard_views.guidelines, name='guidelines'),
    path('contactus', dashboard_views.contactus, name='contactus'),
    # path('checkLike', dashboard_views.verify_like, name='verifymylike'),
    path('notif_unread', dashboard_views.notif_unread, name='notif_unread'),
    path('leaderboard/', dashboard_views.leaderboard, name='leaderboard'),
    path('instagram/<url_id>', dashboard_views.verify_insta_share, name='verify_insta_share'),
    path('facebook/<url_id>', dashboard_views.verify_fb_share, name='verify_fb_share'),
]
