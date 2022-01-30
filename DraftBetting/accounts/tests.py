from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import status

# Create your tests here.
class AccountsTest(APITestCase):

    def test_create_user_with_preexisting_email(self):
        data = {
            'username' : 'testUser2',
            'email':'test@test.com',
            'password': 'Welcome1!',
            'first_name' : 'Jacob'
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(),1)
        self.assertEqual(len(response.data['email']), 1)

    def test_create_user_with_invalid_email1(self):
        data = {
            'username': 'foobarbaz',
            'email':  'testing',
            'passsword': 'foobarbaz',
            'first_name' : 'Jacob'
        }


        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data['email']), 1)

    def test_create_user_with_invalid_email2(self):
        data = {
            'username': 'foobarbaz',
            'email':  'testing@abc',
            'passsword': 'foobarbaz',
            'first_name' : 'Jacob'
        }


        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data['email']), 1)

    def test_create_user_with_no_email(self):
        data = {
            'username' : 'foobar',
            'email': '',
            'password': 'foobarbaz',
            'first_name' : 'Jacob'
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data['email']), 1)

    def test_create_user_with_preexistering_username(self):
        data = {
            'username' : 'testUser',
            'email':'tmail22@test.com',
            'password': 'Welcome1!',
            'first_name' : 'Jacob'
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data['username']), 1)

    def test_create_user_with_too_long_username(self):
        data = {
            'username' : 'Simerly'*10,
            'email' : 'legit@email.com',
            'password' : 'Welcome1!',
            'first_name' : 'Jacob'
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data['username']),1)

    def test_create_user_with_no_username(self):
        data = {
            'username' : '',
            'email' : 'legit@email.com',
            'password' : 'Welcome1!',
            'first_name' : 'Jacob'
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data['username']),1)



    def test_create_user_with_short_password(self):
        data = {
            'username' : 'whater',
            'email' : 'legit@email.com',
            'password' : 'short',
            'first_name' : 'Jacob'
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data['password']), 1)

    def test_create_user_with_no_password(self):
        data = {
            'username' : 'whater',
            'email' : 'legit@email.com',
            'password' : '',
            'first_name' : 'Jacob'
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data['password']), 1)


    def setUp(self):
        self.test_user = User.objects.create_user('testUser', 'test@test.com', 'testpassword')

        self.create_url = reverse('account-create')

    def test_create_user(self):
        data = {
            'username' : 'tuser',
            'email':'temail@test.com',
            'password': 'Welcome1!',
            'first_name' : 'Jacob'
        }

        response = self.client.post(self.create_url, data, format='json')
        user = User.objects.latest('id')
        token = Token.objects.get(user=user)

        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['username'], data['username'])
        self.assertEqual(response.data['email'], data['email'])
        self.assertEqual(response.data['first_name'], data['first_name'])
        self.assertFalse('password' in response.data)

        self.assertEqual(response.data['token'], token.key)

