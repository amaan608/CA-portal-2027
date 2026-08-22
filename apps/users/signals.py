from django.db.models.signals import pre_save, post_save
from .models import NewUser, Profile
from django.dispatch import receiver
from dashboard.models import Notifications

# @receiver(pre_save, sender=NewUser)
# def user_pre_save(sender, instance, **kwargs):
#     if instance is None:
#         pass
#     else:
#         current = instance
#         try:
#             previous = NewUser.objects.get(id=instance.id)
#             if previous.points != current.points:
#                 notif = Notifications()
#                 notif.message = "Your points increased from " + str(previous.points)+" to "+str(current.points)
#                 notif.user=instance
#                 notif.type="Success"
#                 notif.save()

#                 if current.points>=900 and previous.points<900:
#                     notif = Notifications()
#                     notif.message = "Congratualations, you reached Bronze level"
#                     notif.user = instance
#                     notif.type = "Success"
#                     notif.save()

#                 if current.points >= 1500 and previous.points < 1500:
#                     notif = Notifications()
#                     notif.message = "Congratualations, you reached Silver level"
#                     notif.user = instance
#                     notif.type = "Success"
#                     notif.save()
                    
#                 if current.points >= 3000 and previous.points < 3000:
#                     notif = Notifications()
#                     notif.message = "Congratualations, you reached Gold level"
#                     notif.user = instance
#                     notif.type = "Success"
#                     notif.save()
                    
#                 if previous.referrals != current.referrals:
#                     notif = Notifications()
#                     notif.message = "Congratualations, someone used your AlcherID to register. Your points are updated"
#                     notif.user = instance
#                     notif.type = "Success"
#                     notif.save()
#         except:
#             pass



# @receiver(post_save, sender=NewUser)
# def create_profile(sender, instance, **kwargs):
#     instance.profile.save()