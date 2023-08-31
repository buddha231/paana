from rest_framework import serializers
from .models import Salary, Qualification, Employee


class SalarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Salary
        fields = '__all__'


class QualificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Qualification
        fields = '__all__'


class EmployeeSerializer(serializers.ModelSerializer):
    qualifications = serializers.PrimaryKeyRelatedField(
        queryset=Qualification.objects.all(),
        many=True)
    salary = serializers.PrimaryKeyRelatedField(
        queryset=Salary.objects.all())

    class Meta:
        model = Employee
        fields = ('id', 'first_name', 'last_name', 'salary', 'qualifications')
        read_only_fields = ('salary', 'qualifications')
