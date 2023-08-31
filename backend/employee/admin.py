from django.contrib import admin
from .models import Salary, Qualification, Employee


@admin.register(Salary)
class SalaryAdmin(admin.ModelAdmin):
    list_display = ('amount',)


@admin.register(Qualification)
class QualificationAdmin(admin.ModelAdmin):
    list_display = ('qualification',)


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'salary')
    filter_horizontal = ('qualifications',)


# Register your models here.
