__author__ = 'rami'
from django.conf.urls.defaults import *
from geoyagur.yagur.views import *
from django.conf import settings

urlpatterns = patterns('',
    (r'^ajaxListPeople$','yagur.views.ajaxListPeople'),
)

  