

import random
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from six import text_type
# from .models import NewUser
class AppTokenGenerator(PasswordResetTokenGenerator):

    def _make_hash_value(self, user, timestamp):
        return (text_type(user.is_active)+text_type(user.pk)+text_type(timestamp))


token_generator = AppTokenGenerator()


def create_new_ref_number():
     return "ALC"+str(random.randint(100000, 999999))

