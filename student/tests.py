from django.test import Client, RequestFactory, TestCase
from django.urls import reverse

from manager.models import Clazz, ClazzStudents, Curriculum, Major, StudentCurriculumScore
from student.views import get_student_score
from teacher.models import TeacherInfo
from .models import Account, StudentInfo
# Create your tests here.
#Test that when a student type record in the account model is deleted#
#the student information associated with that record is also deleted#
class TestAccountModel(TestCase):
    def setUp(self):
        self.account = Account.objects.create(
            username='testuser',
            password='testpassword',
            customer_type=0
        )
        self.student = StudentInfo.objects.create(
            student_id=123456789,
            name='Test Student',
            sex='Male',
            birth_day='2000-01-01',
            native_place='Test Hometown',
            major='Test Major',
            clazz='Test Class',
            user_id=self.account
        )

    def test_student_info_deletion(self):
        self.assertEqual(StudentInfo.objects.count(), 1)
        self.account.delete()
        self.assertEqual(StudentInfo.objects.count(), 0)

#Test whether students can check their results properly #
class GetStudentScoreTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.account1 = Account.objects.create(
            username='test_student',
            password='test_password',
            customer_type=0
        )
        self.account2 = Account.objects.create(
            username='test_teacher',
            password='test_password',
            customer_type=1
        )
        self.student = StudentInfo.objects.create(
            student_id=123456789,
            name='Test Student1',
            sex='Male',
            birth_day='2000-01-01',
            native_place='Test Hometown',
            major='Test Major',
            clazz='Test Class',
            user_id=self.account1
        )
        self.teacher = TeacherInfo.objects.create(
            teacher_id=123456789,
            name='Test Teacher',
            sex='Male',
            birth_day='1970-01-01',
            user_id=self.account2
        )
        self.major = Major.objects.create(
            major_code='cs',
            name='computer science'
        )
        self.clazz = Clazz.objects.create(
            name='Test Class',
            major_id=self.major,
        )
        self.clazz_student = ClazzStudents.objects.create(
            student_id=self.student,
            clazz_id=self.clazz
        )
        self.curriculum = Curriculum.objects.create(
            name='Curriculum 1',
            teacher_id=self.teacher
        )
        self.score = StudentCurriculumScore.objects.create(
            student_id=self.student,
            curriculum_id=self.curriculum,
            score=80
        )

    def test_get_student_score(self):
        self.client.login(username=self.account1.username, password=self.account1.password)

        url = reverse('get_student_score')
        response = self.client.get(url, HTTP_X_REQUESTED_WITH='XMLHttpRequest')

        self.assertEqual(response.status_code, 302)