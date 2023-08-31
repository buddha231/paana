from django.db import models

# Create your models here.


class Salary(models.Model):
    amount = models.IntegerField()

    def __str__(self):
        return f"${self.amount}"


class Qualification(models.Model):
    qualification = models.CharField(max_length=100)

    def __str__(self):
        return self.qualification


class Employee(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    salary = models.ForeignKey(
        Salary, on_delete=models.CASCADE, blank=True, null=True)
    qualifications = models.ManyToManyField(
        Qualification, blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
