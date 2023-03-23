from django.test import TestCase
from .models import Account, TeacherInfo
# Create your tests here.
#Test that when a teacher type record in the account model is deleted#
#the teacher information associated with that record is also deleted#
class TestAccountModel(TestCase):
    def setUp(self):
        self.account = Account.objects.create(
            username='testuser',
            password='testpassword',
            customer_type=1
        )
        self.teacher = TeacherInfo.objects.create(
            teacher_id=123456789,
            name='Test Teacher',
            sex='Male',
            birth_day='1970-01-01',
            user_id=self.account
        )

    def test_teacher_info_deletion(self):
        self.assertEqual(TeacherInfo.objects.count(), 1)
        self.account.delete()
        self.assertEqual(TeacherInfo.objects.count(), 0)