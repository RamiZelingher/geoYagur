from django.db import models
from django.utils.translation import ugettext_lazy as _

class People (models.Model):
    family = models.CharField(max_length=25)
    given = models.CharField(max_length=25)
    sex = models.CharField(max_length=1)

    def __unicode__(self):
        return u"%s %s" % (self.given.decode('utf-8'),self.family.decode('utf-8'))
 
    class Meta:
        verbose_name=_("yagur member")
        verbose_name_plural=_("yagur members")

