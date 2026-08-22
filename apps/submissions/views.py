from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.views.generic import CreateView

from dashboard.models import Notifications
from .models import POC, Answer, Idea, Media, POCBulk, Quiz, Question, QuizSubmission
from django.http import JsonResponse
import json
from .forms import POCBulkForm, POCForm, IdeaForm, MediaForm
from django.contrib import messages
from django import forms
from django.conf import settings

from django.db.models import Q
from dashboard.models import Promotions, ShareablePost
from users.models import Profile, UserGroup
from datetime import datetime
from django.db.models import Exists,OuterRef
from django.core.mail import EmailMultiAlternatives
from django.core.mail import BadHeaderError
from django.template.loader import render_to_string


def sendNotification(type):
    subject = "New submission"
    email_template_name = "submissions/notification_mail.html"
    poc = {
        'type': "POC",
        'link': 'https://caportal.alcheringa.co.in/admin/submissions/poc/'
    }
    pocbulk = {
        'type': "POC",
        'link': 'https://caportal.alcheringa.co.in/admin/submissions/pocbulk/'
    }
    idea = {
        'type': "idea",
        'link': 'https://caportal.alcheringa.co.in/admin/submissions/idea/'
    }
    if(type==1):
        email = render_to_string(email_template_name, poc)
    elif(type==2):
        email = render_to_string(email_template_name, pocbulk)
    else:
        email = render_to_string(email_template_name, idea)
    try:
        message = EmailMultiAlternatives(
            subject=subject,
            body="mail testing",
            from_email='Alcheringa Campus Ambassador',
            to=["commonwebops@gmail.com",
                "shashank.d@alcheringa.co.in", 
                "khushi.g@alcheringa.co.in",
            ]
        )
        message.attach_alternative(email, "text/html")
        message.send(fail_silently=False)
    except BadHeaderError:
        return


class IdeaCreateView(CreateView):
    model = Idea
    form_class = IdeaForm

    def form_valid(self, form):
        form.instance.user = self.request.user
        messages.success(
            self.request, f'Your idea has been submitted! Verification - Pending')
        sendNotification(3)
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        ctx = super(IdeaCreateView, self).get_context_data(**kwargs)
        notification_list = Notifications.objects.filter(
            Q(user=self.request.user) | Q(user=None)).order_by('-created_on')
        isread = True
        notification_list = Notifications.objects.filter(
            Q(user=self.request.user) | Q(user=None)).order_by('-created_on')
        for notif in notification_list:
            if not notif.isread:
                isread = False
                break
        comp = []
        sum = 0
        profile = Profile.objects.filter(user = self.request.user).first()
        if self.request.user.instahandle:
            sum+=1
        if self.request.user.position_of_responsibility:
            sum+=1
        if self.request.user.interested_modules:
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
        ctx['comp'] = comp
        ctx['isread'] = isread
        ctx['notification_list'] = notification_list
        ctx['heading'] = 'Submissions'
        if sum<4:
            ctx['color_code'] = '#E86B73'
        else:
            ctx['color_code'] = 'rgba(0, 201, 92, 1)'
        return ctx


class POCCreateView(CreateView):
    model = POC
    form_class = POCForm

    def form_valid(self, form):
        form.instance.user = self.request.user
        messages.success(
            self.request, f'Your POC has been submitted! Verification - Pending')
        sendNotification(1)
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        ctx = super(POCCreateView, self).get_context_data(**kwargs)
        notification_list = Notifications.objects.filter(
            Q(user=self.request.user) | Q(user=None)).order_by('-created_on')
        isread = True
        notification_list = Notifications.objects.filter(
            Q(user=self.request.user) | Q(user=None)).order_by('-created_on')
        for notif in notification_list:
            if not notif.isread:
                isread = False
                break
        comp = []
        sum = 0
        profile = Profile.objects.filter(user = self.request.user).first()
        if self.request.user.instahandle:
            sum+=1
        if self.request.user.position_of_responsibility:
            sum+=1
        if self.request.user.interested_modules:
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
        ctx['comp'] = comp
        ctx['isread'] = isread
        ctx['notification_list'] = notification_list
        ctx['heading'] = 'Submissions'
        if sum<4:
            ctx['color_code'] = '#E86B73'
        else:
            ctx['color_code'] = 'rgba(0, 201, 92, 1)'
        return ctx


class POCBulkCreateView(CreateView):
    model = POCBulk
    form_class = POCBulkForm

    def form_valid(self, form):
        form.instance.user = self.request.user
        messages.success(
            self.request, f'Your POCs has been submitted! Verification - Pending')
        sendNotification(2)
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        ctx = super(POCBulkCreateView, self).get_context_data(**kwargs)
        notification_list = Notifications.objects.filter(
            Q(user=self.request.user) | Q(user=None)).order_by('-created_on')
        isread = True
        notification_list = Notifications.objects.filter(
            Q(user=self.request.user) | Q(user=None)).order_by('-created_on')
        for notif in notification_list:
            if not notif.isread:
                isread = False
                break
        comp = []
        sum = 0
        profile = Profile.objects.filter(user = self.request.user).first()
        if self.request.user.instahandle:
            sum+=1
        if self.request.user.position_of_responsibility:
            sum+=1
        if self.request.user.interested_modules:
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
        ctx['comp'] = comp
        ctx['isread'] = isread
        ctx['notification_list'] = notification_list
        ctx['heading'] = 'Submissions'
        if sum<4:
            ctx['color_code'] = '#E86B73'
        else:
            ctx['color_code'] = 'rgba(0, 201, 92, 1)'
        return ctx


class MediaCreateView(CreateView):
    model = Media
    form_class = MediaForm

    def get_form(self):
        data = json.loads(self.request.body)
        return MediaForm({
            "shared_post": data.get("shared_post")
        })

    def form_invalid(self, form):
        response = super(MediaCreateView, self).form_invalid(form)
        print(form)
        print(self.request.POST)
        return JsonResponse({
            "success": False,
            "error": form.errors
        }, status=400)

    def form_valid(self, form):
        form.instance.user = self.request.user
        response = super(MediaCreateView, self).form_valid(form)
        data = {
            "success": True,
            'message': "Successfully submitted form data."
        }
        return JsonResponse(data)

    def get_context_data(self, **kwargs):
        ctx = super(MediaCreateView, self).get_context_data(**kwargs)
        notification_list = Notifications.objects.filter(
            Q(user=self.request.user) | Q(user=None)).order_by('-created_on')
        isread = True
        notification_list = Notifications.objects.filter(
            Q(user=self.request.user) | Q(user=None)).order_by('-created_on')
        for notif in notification_list:
            if not notif.isread:
                isread = False
                break
        ctx['isread'] = isread
        ctx['notification_list'] = notification_list
        ctx['heading'] = 'Submissions'
        return ctx


@login_required(login_url='dashboard_page')
def home(request):
    notification_list = Notifications.objects.filter(
        Q(user=request.user) | Q(user=None)).order_by('-created_on')
    # Notifications List
    isread = True
    notification_list = Notifications.objects.filter(
        Q(user=request.user) | Q(user=None)).order_by('-created_on')
    for notif in notification_list:
        if not notif.isread:
            isread = False
            break
    return render(request, 'submissions/home.html', {'heading': 'Submissions', 'notification_list': notification_list,'isread': isread})


@login_required(login_url='dashboard_page')
def tasks(request):
    post_list = ShareablePost.objects.all().order_by('-created_on'
    ).exclude(last_date__lt=datetime.now().date()
    ).annotate(is_shared=Exists(Media.objects.filter(
        shared_post__id=OuterRef('id'),
        user=request.user,
        ))
    ).exclude(is_shared=True)
    promotions = Promotions.objects.all().order_by('-created_on')
    all_quizzes = Quiz.objects.all()
    tbd = []
    completed = []
    for quiz in all_quizzes:
        if not QuizSubmission.objects.filter(user=request.user, quiz=quiz).exists():
            tbd.append(quiz)
        else:
            completed.append(quiz)
    
    # Notifications List
    isread=True
    notification_list = Notifications.objects.filter(Q(user=request.user) | Q(user=None)).order_by('-created_on')
    if list(UserGroup.objects.filter(leader=request.user)):
        grp_points = request.user.points + UserGroup.objects.filter(leader=request.user).first().executive.points
        grp_tasks = request.user.tasks + UserGroup.objects.filter(leader=request.user).first().executive.tasks
        grp_referrals = request.user.referrals + UserGroup.objects.filter(leader=request.user).first().executive.referrals
    elif list(UserGroup.objects.filter(executive=request.user)):
        grp_points = request.user.points + UserGroup.objects.filter(executive=request.user).first().executive.points
        grp_tasks = request.user.tasks + UserGroup.objects.filter(executive=request.user).first().executive.tasks
        grp_referrals = request.user.referrals + UserGroup.objects.filter(executive=request.user).first().executive.referrals
    else:
            grp_points = request.user.points
            grp_tasks = request.user.tasks
            grp_referrals = request.user.referrals
    for notif in notification_list:
        if not notif.isread:
            isread=False
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
    context = {
        'post_list': post_list,
        'promotions': promotions,
        'heading':'Tasks',
        'notification_list': notification_list,
        'grp_points':grp_points,
        'grp_tasks':grp_tasks,
        'grp_referrals':grp_referrals,
        'quizzes': tbd,
        'completed_quizzes': completed,
        'isread':isread,
        'comp': comp
    }
    if sum<4:
        context['color_code'] = '#E86B73'
    else:
        context['color_code'] = 'rgba(0, 201, 92, 1)'
    notification_list = Notifications.objects.filter(
        Q(user=request.user) | Q(user=None)).order_by('-created_on')
    # Notifications List
    isread = True
    notification_list = Notifications.objects.filter(
        Q(user=request.user) | Q(user=None)).order_by('-created_on')
    for notif in notification_list:
        if not notif.isread:
            isread = False
            break
    return render(request, 'submissions/tasks.html', context)


@login_required(login_url='dashboard_page')
def ideas(request):
    userNow = request.user
    notification_list = Notifications.objects.filter(
        Q(user=request.user) | Q(user=None)).order_by('-created_on')
    # Notifications List
    isread = True
    notification_list = Notifications.objects.filter(
        Q(user=request.user) | Q(user=None)).order_by('-created_on')
    for notif in notification_list:
        if not notif.isread:
            isread = False
            break
    context = {
        'ideas': userNow.idea_submissions.all(), 'notification_list': notification_list, 'isread': isread
    }
    return render(request, 'submissions/ideas.html', context)


@login_required(login_url='dashboard_page')
def pocs(request):
    userNow = request.user
    notification_list = Notifications.objects.filter(
        Q(user=request.user) | Q(user=None)).order_by('-created_on')
    # Notifications List
    isread = True
    notification_list = Notifications.objects.filter(
        Q(user=request.user) | Q(user=None)).order_by('-created_on')
    for notif in notification_list:
        if not notif.isread:
            isread = False
            break
    context = {
        'pocs': userNow.poc_submissions.all(), 'notification_list': notification_list, 'isread': isread
    }
    return render(request, 'submissions/pocs.html', context)

@login_required(login_url='dashboard_page')
def idea_submitted(request):
    return render(request,'submissions/idea_submitted.html')


@login_required(login_url='dashboard_page')
def quiz(request, quiz_id):
    quiz = Quiz.objects.get(id=quiz_id)
    user = request.user
    submitted=QuizSubmission.objects.filter(user=user)
  
    questions = Question.objects.filter(quiz=quiz)
    if request.method=="POST":
        # A browser retry (or a second click on submit) must not create another
        # submission for the same quiz.  The database constraint remains the
        # source of truth, while get_or_create makes this request idempotent.
        submission, created = QuizSubmission.objects.get_or_create(
            user=user,
            quiz=quiz,
        )
        if not created:
            return redirect('idea-submitted')

        print(request.POST)
        for question in questions:
            print(request.POST[str(question.id)])
            Answer(submission = submission, question = question, answer = request.POST[str(question.id)]).save()
        return redirect('idea-submitted')
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
    context = {
        "quiz": quiz,
        "questions": questions,
        'submitted':submitted,
        'comp': comp
    }
    if sum<4:
        context['color_code'] = '#E86B73'
    else:
        context['color_code'] = 'rgba(0, 201, 92, 1)'
    return render(request, 'submissions/quiz.html', context)
