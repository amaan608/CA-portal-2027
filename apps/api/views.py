from rest_framework.response import Response
from rest_framework.decorators import api_view
from users.models import NewUser
import html.parser
from django.http import JsonResponse

@api_view(['PUT'])
def points_referal_id(request):
    if(request.data.get('alcherid')):
        user = NewUser.objects.filter(alcherid = request.data.get('alcherid')).first()
        user.points += int(request.data.get('points'))
        user.referrals += 1
        user.save()
        # print('success')
        return Response('success')
    else:
        # print('error')
        return Response('error')


def decrypt_data(encrypted_data, key):
    """Decrypt the data using XOR encryption and a given key"""
    data = bytearray(len(encrypted_data))
    key_len = len(key)
    for i in range(len(encrypted_data)):
        data[i] = encrypted_data[i] ^ key[i % key_len]
    return bytes(data)


@api_view(['GET'])
def get_decrypted_data(request):
    if(request.GET.get('encrypted_data')):
        encrypted_data = request.data.get('encrypted_data')
        encrypted_data = str.encode(html.unescape(encrypted_data))
        key = b'mysecretkey'
        decrypted_data = decrypt_data(encrypted_data, key).decode()
        # print('success')
        return JsonResponse({'decrypted_data':decrypted_data})
    else:
        # print('error')
        return JsonResponse({'error':'error'})
