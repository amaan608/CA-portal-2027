from django.db.models.signals import pre_save,post_save
from .models import POC, Idea, Media, POCBulk
from django.dispatch import receiver
from dashboard.models import Notifications


@receiver(post_save, sender=Media)
def media_save(sender, instance, created, *args, **kwargs):
    if instance.shared_post.is_facebook:
        if instance.points > 0:
            instance.user.tasks += 1
            instance.user.tasks += 1
            notif = Notifications()
            notif.message = "Post shared to facebook successfully"
            notif.user = instance.user
            notif.type = "Success"
            notif.save()
        instance.user.points += instance.points
        print(instance.points)
        instance.user.save()


@receiver(post_save, sender=Idea)
def idea_save(sender, instance, created, *args, **kwargs):
    if instance.title:
        if instance.points > 0:
            instance.user.tasks += 1
            notif = Notifications()
            notif.message = "Your idea submission has been validated"
            notif.user = instance.user
            notif.type = "Success"
            notif.save()
        else:
            notif = Notifications()
            notif.message = "Your submission of an Idea was successful"
            notif.user = instance.user
            notif.type = "Success"
            notif.save()
        instance.user.points += (instance.points)
        print(instance)
        print(instance.points)
        instance.user.save()



@receiver(post_save, sender=POC)
def poc_save(sender, instance, created, *args, **kwargs):
    if instance.name:
        if instance.points > 0:
            instance.user.tasks += 1
            notif = Notifications()
            notif.message = "Your POC submission has been validated"
            notif.user = instance.user
            notif.type = "Success"
            notif.save()
        else:
            notif = Notifications()
            notif.message = "Your submission of a POC was successful"
            notif.user = instance.user
            notif.type = "Success"
            notif.save()
        instance.user.points += (instance.points)
        print(instance)
        print(instance.points)
        instance.user.save()


@receiver(post_save, sender=POCBulk)
def pocbulk_save(sender, instance, created, *args, **kwargs):
    if instance.csv_file:
        if instance.points > 0:
            instance.user.tasks += 1
            notif = Notifications()
            notif.message = "Your POC Bulk submission has been validated"
            notif.user = instance.user
            notif.type = "Success"
            notif.save()
        else:
            notif = Notifications()
            notif.message = "Your submission of an POC Bulk was successful"
            notif.user = instance.user
            notif.type = "Success"
            notif.save()
        instance.user.points += (instance.points)
        print(instance)
        print(instance.points)
        instance.user.save()
