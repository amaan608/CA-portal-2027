from typing import NewType
from django.contrib.auth.forms import UserCreationForm
from django import forms
from .models import Profile, UserGroup, NewUser
from django.contrib.auth import get_user_model
from phonenumber_field.formfields import PhoneNumberField
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

User = get_user_model()

class SingleUserRegisterForm(UserCreationForm):
    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(attrs={
            'class': 'input_field',
            'placeholder': 'Enter Email*',
            'title': 'Enter a valid email address'
        })
    )

    firstname = forms.CharField(
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'input_field',
            'placeholder': 'Enter Full Name*',
            'pattern': '^[A-Za-z ]+$',
            'title': 'Full name can only contain letters and spaces'
        })
    )

    referred_by = forms.CharField(
        required=False,
        widget=forms.TextInput(attrs={
            'class': 'input_field',
            'placeholder': 'Enter referral id'
        })
    )

    phone = forms.CharField(
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'input_field',
            'type': 'tel',
            'pattern': '^[0-9]{10}$',
            'title': 'Enter a valid 10-digit phone number',
            'placeholder': 'Enter Phone Number*'
        })
    )

    graduation_year = forms.IntegerField(
        required=True,
        widget=forms.NumberInput(attrs={
            'class': 'input_field',
            'min': '2025',
            'max': '2035',
            'title': 'Enter a graduation year between 2025 and 2035',
            'placeholder': 'Graduation Year*'
        })
    )

    college_city = forms.CharField(
        required=True,
        widget=forms.TextInput(attrs={'class': 'input_field', 'placeholder': 'College City*'})
    )

    college_state = forms.CharField(
        required=True,
        widget=forms.TextInput(attrs={'class': 'input_field', 'placeholder': 'College State*'})
    )

    college_name = forms.CharField(
        required=True,
        widget=forms.TextInput(attrs={'class': 'input_field', 'placeholder': 'College Name*'})
    )

    password1 = forms.CharField(
        required=True,
        widget=forms.PasswordInput(attrs={
            'class': 'input_field',
            'placeholder': 'Set Password*',
            'pattern': '(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}',
            'title': 'Must contain at least one number, one uppercase and lowercase letter, one special character, and at least 8 characters long.'
    })
)

    password2 = forms.CharField(
        required=True,
        widget=forms.PasswordInput(attrs={
            'class': 'input_field',
            'placeholder': 'Confirm Password*',
            'title': 'Must match the password above'
        })
    )

    class Meta:
        model = User
        fields = ['firstname', 'email', 'phone', 'graduation_year', 'college_state', 'college_city',
                  'college_name', 'referred_by', 'password1', 'password2']

    def clean(self):
        cleaned_data = super().clean()
        password1 = cleaned_data.get("password1")
        password2 = cleaned_data.get("password2")
        referred_by = cleaned_data.get("referred_by")

        # Password match check
        if password1 and password2 and password1 != password2:
            self.add_error('password2', "Passwords do not match")

        # Password strength check
        if password1:
            try:
                validate_password(password1)
            except ValidationError as e:
                self.add_error('password1', e)

        # Referral check
        if referred_by:
            if not NewUser.objects.filter(alcherid=referred_by).exists():
                self.add_error('referred_by', "Referral ID is invalid")

        return cleaned_data


class GroupUserRegisterFormForSingle(forms.ModelForm):
    firstname = forms.CharField(
        required=True,
        widget=forms.TextInput(
            attrs={
                'class': 'input_field',
                'placeholder': 'Enter Full Name*',
                'pattern': '^[A-Za-z ]+$',
                'title': 'Full name can only contain letters and spaces'
            }
        )
    )
    
    phone = forms.CharField(
        required=True,
        widget=forms.TextInput(
        attrs={
            'class': 'input_field',
            'type': 'tel',
            'pattern': '^[0-9]{10}$',
            'title': 'Enter a valid 10-digit phone number',
            'placeholder': 'Enter Phone Number*'
        }
    )
    )

    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(
        attrs={
            'class': 'input_field',
            'placeholder': 'Enter Email*',
            'title': 'Enter a valid email address'
        }
    )   
    )

    graduation_year = forms.IntegerField(
        required=True,
        widget=forms.NumberInput(
        attrs={
            'class': 'input_field',
            'min': '2025',
            'max': '2035',
            'title': 'Enter a graduation year between 2020 and 2035',
            'placeholder': 'Graduation Year*'
        }
    )
    )

    class Meta:
        model = User
        fields = ['firstname', 'phone', 'email', 'graduation_year']


# incomplete
class GroupUserRegisterForm(forms.ModelForm):
    college_city = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'input_field', 'placeholder': 'College City*'}), required=True)
    college_state = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'input_field', 'placeholder': 'College State*'}), required=True)
    college_name = forms.CharField(
        label="Full Name", widget=forms.TextInput(attrs={'class': 'input_field', 'placeholder': 'College Name*'}), required=True)
    referred_by = forms.CharField(required=False, widget=forms.TextInput(
        attrs={'class': 'input_field', 'placeholder': 'Enter referral id'}))

    def clean(self):
        cleaned_data = super(GroupUserRegisterForm, self).clean()
        referred_by = cleaned_data.get("referred_by")
        if referred_by:
            user = NewUser.objects.filter(alcherid=referred_by)
            if not user:
                raise forms.ValidationError("Referral ID is invalid")
        return self.cleaned_data

    class Meta:
        model = UserGroup
        fields = ['college_state', 'college_city',
                  'college_name', 'referred_by']


class UserUpdateForm(forms.ModelForm):

    firstname = forms.CharField(
        label="Full Name",
        widget=forms.TextInput(attrs={
            'placeholder': 'Enter your full name',
            'class': 'form-input'
        })
    )
    
    phone = forms.CharField(
        label="Phone Number",
        widget=forms.TextInput(attrs={
            'placeholder': 'e.g., +91 98765 43210',
            'class': 'form-input'
        }),
        required=True
    )
    
    graduation_year = forms.CharField(
        label="Graduation Year",
        widget=forms.TextInput(attrs={
            'placeholder': 'e.g., 2027',
            'class': 'form-input'
        })
    )
    
    college_state = forms.CharField(
        label="College State",
        widget=forms.TextInput(attrs={
            'placeholder': 'e.g., Assam',
            'class': 'form-input'
        })
    )
    
    college_city = forms.CharField(
        label="College City",
        widget=forms.TextInput(attrs={
            'placeholder': 'e.g., Guwahati',
            'class': 'form-input'
        })
    )
    
    college_name = forms.CharField(
        label="College Name",
        widget=forms.TextInput(attrs={
            'placeholder': 'e.g., IIT Guwahati',
            'class': 'form-input'
        })
    )
    
    position_of_responsibility = forms.CharField(
        label="Position of Responsibility",
        required=False,
        widget=forms.TextInput(attrs={
            'placeholder': 'e.g., Student Council President',
            'class': 'form-input'
        })
    )
    
    interested_modules = forms.CharField(
        label="Interested Modules",
        required=False,
        widget=forms.Textarea(attrs={
            'placeholder': 'e.g., Marketing, Event Management, Social Media',
            'class': 'form-input',
            'rows': 3
        })
    )
    
    about = forms.CharField(
        label="About Me",
        required=False,
        widget=forms.Textarea(attrs={
            'placeholder': 'Tell us about yourself, your interests, and goals...',
            'class': 'form-input',
            'rows': 4
        })
    )
    
    fb_handle = forms.CharField(
        required=False,
        label="Facebook Handle",
        widget=forms.TextInput(attrs={
            'placeholder': 'e.g., @username or facebook.com/username',
            'class': 'form-input'
        })
    )
    
    instahandle = forms.CharField(
        required=False,
        label="Instagram Handle",
        widget=forms.TextInput(attrs={
            'placeholder': 'e.g., @username',
            'class': 'form-input'
        })
    )
    
    img = forms.ImageField(
        label="Profile Picture",
        required=False,
        widget=forms.FileInput(attrs={
            'accept': 'image/*',
            'class': 'form-input'
        })
    )

    class Meta:
        model = User
        fields = ['firstname', 'phone', 'graduation_year', 'college_state',
                  'college_city', 'college_name', 'position_of_responsibility', 
                  'interested_modules', 'about', 'img', 'instahandle', 'fb_handle']
