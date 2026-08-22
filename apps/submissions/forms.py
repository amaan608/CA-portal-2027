from django.db.models import fields
from django.forms import ModelForm
from django.forms import Textarea
from submissions.models import POC,Idea,Media, POCBulk,Question
from django import forms


class IdeaForm(ModelForm):
    class Meta:
        model = Idea
        fields = ["title","description"]
        widgets = {
            'title': Textarea(attrs={'cols':30, 'rows':1,'placeholder': 'Your Idea *', 'class':'form-input'}),
            'description': Textarea(attrs={'cols':40, 'rows':10,'placeholder': 'Tell us more about your idea*', 'class':'form-input'}),
        }

class POCForm(ModelForm):
    class Meta:
        model = POC
        fields = ['name','design','college','contact']
        widgets = {
            'name': Textarea(attrs={'cols':30, 'rows':1,'placeholder': 'POC Name *', 'class':'form-input'}),
            'design': Textarea(attrs={'cols':30, 'rows':1,'placeholder': 'POC Designation *', 'class':'form-input'}),
            'college': Textarea(attrs={'cols':30, 'rows':1,'placeholder': 'POC College *', 'class':'form-input'}),
            'contact': Textarea(attrs={'cols':30, 'rows':1,'placeholder': 'POC Contact *', 'class':'form-input'}),
        }
        
class POCBulkForm(ModelForm):
    class Meta:
        model = POCBulk
        fields = ["csv_file"]


class MediaForm(ModelForm):
    class Meta:
        model = Media
        fields = ["shared_post"]
  
