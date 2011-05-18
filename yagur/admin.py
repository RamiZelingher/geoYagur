from django.contrib import admin
from yagur.models import People

class PeopleAdmin (admin.ModelAdmin):
    list_display = ['id', 'given', 'family']
    search_fields = ['id', 'given', 'family']
    pass

admin.site.register(People, PeopleAdmin)

