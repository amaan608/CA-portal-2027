from logging import currentframe
from time import timezone
from django.http.response import HttpResponse
from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from .models import PostUrl, Promotions, ShareablePost
from users.models import Profile, UserGroup, NewUser
from submissions.models import Media,User
from django.db.models import Exists,OuterRef
import datetime
from datetime import datetime
from submissions.models import Idea
from .models import Notifications
from django.utils import timezone
from django.db.models import Q
from django.contrib import messages
from django.core.paginator import Paginator
import time
from django.http import HttpResponse 

start_time = datetime.now().date()


# api = -1
# insta_id_list1 = [
#     {
#         "username": "1alfikhan48@gmail.com",
#         "password": "Qwerty@9760"
#     },
#     {
#         "username": "rahuldua9760@gmail.com",
#         "password": "Qwerty@9760"
#     },
#     {
#         "username": "fake27_28",
#         "password": "sid1234"
#     }
# ]

# for account in insta_id_list1:
#     try:
#         api = Client(account['username'],account['password'])
#     except:
#         print("Error")
#     if api!=-1:
#         break
# user_name = 'fake27_28'
# password = 'sid1234'
# api = Client(user_name, password)

def dashboard(request):
    if request.user.is_authenticated:
        post_list = ShareablePost.objects.all().order_by('-created_on'
        ).exclude(last_date__lt=datetime.now().date()
        ).annotate(is_shared=Exists(Media.objects.filter(
            shared_post__id=OuterRef('id'),
            user=request.user,
            ))
        ).exclude(is_shared=True)
        promotions = Promotions.objects.all().order_by('-created_on')
        # Leaderboard

        for post in post_list:
            post_url = PostUrl.objects.filter(post = post, user = request.user).first().url_id
            post.url_id = post_url

        all_points=[]
        all_points.sort(key=lambda x:x[1]) 
        profile = Profile.objects.filter(user = request.user).first()
        comp = []
        sum = 0
        if request.user.instahandle:
            sum+=1
        if request.user.position_of_responsibility:
            sum+=1
        if request.user.interested_modules:
            sum+=1
        if profile and profile.fb_handle:
            sum+=1
        if sum==0:
            comp = [60, 40]
        elif sum==1:
            comp = [70, 30]
        elif sum==2:
            comp = [80, 20]
        elif sum==3:
            comp = [90, 10]
        else:
            comp = [100,0]
        # top_solousers = NewUser.objects.all().order_by('-points')[:10]
        # group_leader_ids=UserGroup.objects.values_list('executive_id',flat=True)
        # group_executive_ids=UserGroup.objects.values_list('leader_id',flat=True)
        # users1 = NewUser.objects.all().order_by('-points').exclude(id__in=group_executive_ids)
        # top_solousers = users1.exclude(id__in=group_leader_ids)[:10]
        # top_solousers2 = users1.exclude(id__in=group_leader_ids)
        top_solousers1 = NewUser.objects.filter(is_staff=False).order_by('-points')
        rank=0
        if top_solousers1 and  not request.user.is_staff:

            while request.user.id != top_solousers1[rank].id:
                if(rank>=len(top_solousers1)):
                    break
                rank+=1
               
        leader = executive = ""
        groupUsers=sorted(UserGroup.objects.all(), key=lambda t: t.getPoints,reverse=True)[:5]
        isread=True
        notification_list = Notifications.objects.filter(Q(user=request.user) | Q(user=None)).order_by('-created_on')
        isgrp = 1
        if UserGroup.objects.filter(leader=request.user):
            grp_points = UserGroup.objects.filter(leader=request.user).first().getPoints
            grp_tasks = request.user.tasks + UserGroup.objects.filter(leader=request.user).first().executive.tasks
            grp_referrals = request.user.referrals + UserGroup.objects.filter(leader=request.user).first().executive.referrals
            grp_leaderimg=request.user.img
            grp_exeimg=UserGroup.objects.filter(leader=request.user).first().executive.img
            leader = request.user.firstname
            executive = UserGroup.objects.filter(leader=request.user).first().executive.firstname
            all_points.append({ 'leader':request.user.firstname,'points': grp_points,'Lpimg':grp_leaderimg,'Epimg':grp_exeimg})
        elif UserGroup.objects.filter(executive=request.user):
            grp_points = UserGroup.objects.filter(executive=request.user).first().getPoints
            grp_tasks = request.user.tasks + UserGroup.objects.filter(executive=request.user).first().executive.tasks
            grp_referrals = request.user.referrals + UserGroup.objects.filter(executive=request.user).first().executive.referrals
            grp_leaderimg=UserGroup.objects.filter(executive=request.user).first().leader.img
            grp_exeimg=request.user.img
            leader = UserGroup.objects.filter(executive=request.user).first().leader.firstname
            executive = request.user.firstname
            all_points.append({ 'leader':request.user.firstname,'points': grp_points,'Lpimg':grp_leaderimg,'Epimg':grp_exeimg})
        else:
            isgrp = 0
            grp_points = request.user.points
            grp_tasks = request.user.tasks
            grp_referrals = request.user.referrals
            grp_leaderimg=request.user.img
             
            all_points.append({ 'leader':request.user.firstname,'points': grp_points,'Lpimg':grp_leaderimg})
        for notif in notification_list:
            if not notif.isread:
                isread=False
                break

        context = {
            'post_list': post_list,
            'promotions': promotions,
            'heading':'Dashboard',
            'notification_list': notification_list,
            'grp_points':grp_points,
            'grp_tasks':grp_tasks,
            'grp_referrals':grp_referrals,
            # 'top_solousers': top_solousers,
            'leader':leader,
            'executive': executive,
            'rank':rank-1,
            'isread':isread,
            'isgrp': isgrp,
            'comp': comp,
            # 'grpusers':groupUsers
        }
        
        if sum<4:
            context['show_popup'] = 1
        if sum<4:
            context['color_code'] = '#E86B73'
        else:
            context['color_code'] = 'rgba(0, 201, 92, 1)'

        # if profile.update_status==1 and sum==4:
        #     request.user.points+=200
        #     profile.update_status=0
        
        return render(request, 'dashboard/dashboard_page.html',context)
    else:
        return render(request, 'dashboard/landing_page.html')

@login_required
def contactus(request):
    if request.user.is_authenticated:
        # Notifications List
        notification_list = Notifications.objects.filter(
            Q(user=request.user) | Q(user=None)).order_by('-created_on')
        isread = True
        notification_list = Notifications.objects.filter(
            Q(user=request.user) | Q(user=None)).order_by('-created_on')
        for notif in notification_list:
            if not notif.isread:
                isread = False
                break
        comp = []
        sum = 0
        profile = Profile.objects.filter(user = request.user).first()
        if request.user.instahandle:
            sum+=1
        if request.user.position_of_responsibility:
            sum+=1
        if request.user.interested_modules:
            sum+=1
        if profile.fb_handle:
            sum+=1
        if sum==0:
            comp = [60, 40]
        elif sum==1:
            comp = [70, 30]
        elif sum==2:
            comp = [80, 20]
        elif sum==3:
            comp = [90, 10]
        else:
            comp = [100,0]
        
        if sum<4:
            color_code = '#E86B73'
        else:
            color_code= 'rgba(0, 201, 92, 1)'
        context = {
            'heading': 'Contact us',
            'notification_list': notification_list, 'isread': isread, 'comp':comp, 'color_code':color_code
        }
        return render(request, 'dashboard/contactus.html', context)
    else:
        return render(request, 'dashboard/landing_page.html')

@login_required
def guidelines(request):
    if request.user.is_authenticated:
        # Notifications List
        notification_list = Notifications.objects.filter(
            Q(user=request.user) | Q(user=None)).order_by('-created_on')
        isread = True
        notification_list = Notifications.objects.filter(
            Q(user=request.user) | Q(user=None)).order_by('-created_on')
        for notif in notification_list:
            if not notif.isread:
                isread = False
                break
        comp = []
        sum = 0
        profile = Profile.objects.filter(user = request.user).first()
        if request.user.instahandle:
            sum+=1
        if request.user.position_of_responsibility:
            sum+=1
        if request.user.interested_modules:
            sum+=1
        if profile.fb_handle:
            sum+=1
        if sum==0:
            comp = [60, 40]
        elif sum==1:
            comp = [70, 30]
        elif sum==2:
            comp = [80, 20]
        elif sum==3:
            comp = [90, 10]
        else:
            comp = [100,0]
        
        if sum<4:
            color_code = '#E86B73'
        else:
            color_code= 'rgba(0, 201, 92, 1)'
        context = {
            'heading': 'Guidelines',
            'notification_list': notification_list, 'isread': isread, 'comp':comp, 'color_code':color_code
        }
        return render(request, 'dashboard/guidelines.html', context)
    else:
        return render(request, 'dashboard/landing_page.html')


@login_required
def leaderboard(request):
    notification_list = Notifications.objects.filter(
            Q(user=request.user) | Q(user=None)).order_by('-created_on')
    isread = True
    notification_list = Notifications.objects.filter(
        Q(user=request.user) | Q(user=None)).order_by('-created_on')
    for notif in notification_list:
        if not notif.isread:
            isread = False
            break
    group_leader_ids=UserGroup.objects.values_list('executive_id',flat=True)
    group_executive_ids=UserGroup.objects.values_list('leader_id',flat=True)
    users1 = NewUser.objects.filter(is_staff=False).order_by('-points').exclude(id__in=group_executive_ids)
    users = users1.exclude(id__in=group_leader_ids)[:10]
    teamPoints=[]
    if UserGroup.objects.first():
        teamPoints.append(UserGroup.objects.first().getPoints)
    
    groupUsers=sorted(UserGroup.objects.all(), key=lambda t: t.getPoints,reverse=True)[:5]
    paginator1 = Paginator(users,5)
    paginator2 = Paginator(groupUsers,5)
    page_number1 = request.GET.get('page')
    page_number2 = request.GET.get('page')
    page_obj1= paginator1.get_page(page_number1)
    page_obj2= paginator2.get_page(page_number2)
    comp = []
    sum = 0
    profile = Profile.objects.filter(user = request.user).first()
    if request.user.instahandle:
        sum+=1
    if request.user.position_of_responsibility:
        sum+=1
    if request.user.interested_modules:
        sum+=1
    if profile and profile.fb_handle:
        sum+=1
    if sum==0:
        comp = [60, 40]
    elif sum==1:
        comp = [70, 30]
    elif sum==2:
        comp = [80, 20]
    elif sum==3:
        comp = [90, 10]
    else:
        comp = [100,0]
    
    if sum<4:
        color_code = '#E86B73'
    else:
        color_code= 'rgba(0, 201, 92, 1)'
    context = {
        'heading': "Leaderboard",
        'users': users,
        'grpusers': groupUsers,
        'notification_list': notification_list, 'isread': isread,
        'index': page_obj1,
        'index1':page_obj2,
        'comp':comp, 
        'color_code':color_code
    }
    return render(request, 'dashboard/complete_leaderboard.html', context)

# @login_required
# def verify_like(request):
#     print("Came to verify like")
#     post = ShareablePost.objects.get(id=str(list(request.GET.keys())[0]))
#     curr_time = time.localtime() 
#     curr_time1 = time.strftime("%H:%M:%S") 
#     created_on=post.created_on
#     created_on1=created_on.strftime("%H:%M:%S")
#     last_date=post.last_date.strftime("%H:%M:%S")
#     timeformat = "%H:%M:%S"
#     delta = (datetime.strptime(curr_time1, timeformat) - datetime.strptime(created_on1, timeformat))
#     diff=delta.seconds
#     check = 1
#     if post.likedusers != '':
#         arr = post.likedusers.split()
#         for item in arr:
#             if item==request.user.instahandle:
#                 check=0
#                 break
#     if check == 0:
#         messages.error(request,"You have already liked this post!")
#         return redirect('dashboard_page') 
#     curr_time=datetime.now().date()
#     delta = curr_time-start_time
#     if api==-1:
#         return HttpResponse("<b>Oops, there has been an error while verifying your like!</b>")
#     results = api.media_likers_chrono(post.media_id)
#     items = results['users']
#     flag=0
    
#     for item in items: 
#         print(item['username'])
#         if item['username'] == request.user.instahandle:
#             flag=1
#             break
#     if flag==1:
#         if(diff<43200):
#             request.user.points+=25
#             request.user.tasks+=1
#             messages.success(request,"Thank you for liking this post! You have gained 25 points")
#         elif(diff<86400):
#             request.user.points+=15
#             request.user.tasks+=1
#             messages.success(request,"Thank you for liking this post! You have gained 15 points")
#         elif(diff<172800):
#             request.user.points+=10
#             request.user.tasks+=1
#             messages.success(request,"Thank you for liking this post! You have gained 10 points")
#         else:
#             request.user.points+=5
#             request.user.tasks+=1
#             messages.success(request,"Thank you for liking this post! You have gained 5 points")
            
#         request.user.save()
#         post.likedusers+=request.user.instahandle+' '
#         post.save()


#     else:
#         messages.warning(request,f"Looks like you have not liked this post yet!")
#     return redirect('dashboard_page') 

@login_required
def notif_unread(request):
    if request.method == 'PUT':
        notification_list = Notifications.objects.filter(
        Q(user=request.user) | Q(user=None)).order_by('-created_on')
        for notif in notification_list:
            if not notif.isread:
                notif.isread=True
                notif.save()
        return HttpResponse("OK")

@login_required
def verify_insta_share(request, url_id):
    print(url_id)
    post_url = PostUrl.objects.filter(url_id=url_id).first()
    user = post_url.user
    post = post_url.post
    response = redirect(post.link_instagram) 
    if f"{post_url.url_id}-insta" in request.COOKIES:
        return response 
    response.set_cookie(f"{post_url.url_id}-insta", "t493k01m84", max_age = None, expires = None)
    if post.is_instagram:
        user.points += 25
    user.save()
    return response


@login_required
def verify_fb_share(request, url_id):
    print(url_id)
    post_url = PostUrl.objects.filter(url_id=url_id).first()
    user = post_url.user
    post = post_url.post
    print(post)
    response = redirect(post.link_facebook) 
    if f"{post_url.url_id}-fb" in request.COOKIES:
        return response
    response.set_cookie(f"{post_url.url_id}-fb", "t493k01m82", max_age = None, expires = None)
    if post.is_facebook == True:
        print("points added")
        user.points += 25
    user.save()
    return response