from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.hashers import make_password
from .models import Account
# Create your tests here.

#Test if an error message pops up when the username and password don't match#
class LoginTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.username = 'testuser'
        self.password = 'testpassword'
        self.user = Account.objects.create(
            username=self.username,
            password=make_password(self.password),
            customer_type=0
        )

    def test_login_with_incorrect_password(self):
        response = self.client.post(reverse('login'), {'username': self.username, 'password': 'wrongpassword'})
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Incorrect password')
