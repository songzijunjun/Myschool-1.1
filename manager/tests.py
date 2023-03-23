from django.test import TestCase
from manager.models import Major, Clazz
# Create your tests here.
#Test whether a class will belong to two majors#
class ClazzTestCase(TestCase):
    def setUp(self):
        self.major1 = Major.objects.create(major_code='111', name='Major 1')
        self.major2 = Major.objects.create(major_code='222', name='Major 2')
        self.clazz1 = Clazz.objects.create(name='Class 1', major_id=self.major1)
        self.clazz2 = Clazz.objects.create(name='Class 2', major_id=self.major2)

    def test_clazz_belongs_to_one_major(self):
        self.assertEqual(self.clazz1.major_id, self.major1)
        self.assertEqual(self.clazz2.major_id, self.major2)
        self.assertNotEqual(self.clazz1.major_id, self.major2)
        self.assertNotEqual(self.clazz2.major_id, self.major1)