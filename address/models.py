from django.db import models
from django.utils.translation import ugettext_lazy as _
from yagur.models import People


class Neighborhoods (models.Model):
    name = models.CharField(verbose_name=_("neighborhood name"), max_length=20)
    
    def __unicode__(self):
        return self.name.decode('utf-8')
    
    class Meta:
        verbose_name=_("Neighborhood")
        verbose_name_plural=_("Neighborhoods")
       




class NeighborhoodView (models.Model):
    neighborhood     =  models.ForeignKey(Neighborhoods,related_name="neighborhood", verbose_name=_("neighborhood"))
    point                  =   models.PositiveIntegerField(verbose_name=_("point"))
    position_x          =   models.DecimalField( max_digits=14, decimal_places=12,verbose_name=_("x axis"))
    position_y          =   models.DecimalField( max_digits=14, decimal_places=12,verbose_name=_("y axis"))
    
    def __unicode__(self):
        return str(self.point)

    class Meta:
        verbose_name=_("neighborhood View ")
        verbose_name_plural=_("neighborhoods view")


class Streets (models.Model):
    name                =   models.CharField( max_length=20,verbose_name=_("street name"))
    en_name           =   models.CharField( max_length=20,verbose_name=_("street name en"))
    neighborhood    =   models.ForeignKey (Neighborhoods, verbose_name=_("neighborhood name"),related_name="neighborhood1")
    color                 =   models.PositiveIntegerField(verbose_name=_("color"))
    
    def __unicode__(self):
        return self.name.decode('utf-8')

    class Meta:
        verbose_name=_("streets")
        verbose_name_plural=_("streets")

class StreetView (models.Model):
    street               =  models.ForeignKey(Streets,verbose_name=_("street name"),related_name="street1")
    point                =  models.PositiveIntegerField(verbose_name=_("point"))
    position_x        =  models.PositiveIntegerField(verbose_name=_("x axis"))
    position_y        =  models.PositiveIntegerField(verbose_name=_("y axis"))
    
    def __unicode__(self):
        return u"%s %s" %(self.street.decode('utf-8'),self.point)
    
    class Meta:
        verbose_name=_("Street View")
        verbose_name_plural=_("Street View")
        
class Buildings (models.Model):
    name = models.CharField( verbose_name=_("building name"), max_length=20)
    neighborhood = models.ForeignKey (Neighborhoods,verbose_name=_("neighborhood name"),related_name="neighborhood2")
    streetName = models.ForeignKey (Streets,verbose_name=_("street name"),related_name="street2")
    streetNumber = models.PositiveIntegerField(verbose_name=_("the number of the building "))
    scale = models.DecimalField(verbose_name=_("scale"), max_digits=3, decimal_places=2)
    position_x = models.PositiveIntegerField(verbose_name=_("x axis"))
    position_y = models.PositiveIntegerField(verbose_name=_("y axis"))
    color = models.PositiveIntegerField(verbose_name=_("color"))
    
    def __unicode__(self):
        return self.name.decode('utf-8')
    
    class Meta:
        verbose_name=_("building")
        verbose_name_plural=_("buildings")

class BuildingView (models.Model):
    building = models.ForeignKey(Buildings, verbose_name=_("building name"),related_name="building1")
    point = models.PositiveIntegerField(verbose_name=_("point"))
    position_x = models.PositiveIntegerField(verbose_name=_("x axis"))
    position_y = models.PositiveIntegerField(verbose_name=_("y axis"))
    
    def __unicode__(self):
        return u"%s %s" %(self.buildings.decode('utf-8'),self.point)


    class Meta:
        verbose_name=_("building view")
        verbose_name_plural=_("buildings view")

class Appartments (models.Model):
    building = models.ForeignKey (Buildings, verbose_name=_("building name"),related_name="building2")
    streetName = models.ForeignKey (Streets,verbose_name=_("street name"),related_name="street3")
    streetNumber = models.PositiveIntegerField(verbose_name=_("the number of the building "))
    floor = models.PositiveIntegerField(verbose_name=_("floor number"))
    apprtmentNumber = models.PositiveIntegerField(verbose_name=_("appartment number in the building"))
    neighborhood = models.ForeignKey (Neighborhoods,verbose_name=_("neighborhood name"),related_name="neighborhood3")
    scale = models.DecimalField(verbose_name=_("scale"), max_digits=3, decimal_places=2)
    position_x = models.PositiveIntegerField(verbose_name=_("x axis"))
    position_y = models.PositiveIntegerField(verbose_name=_("y axis"))
    color = models.PositiveIntegerField(verbose_name=_("color"))
    notes = models.CharField( max_length=20,verbose_name=_("notes"))

    
    def __unicode__(self):
        return unicode(str(self.id).decode('utf-8'))

class AppartmentView (models.Model):
    appartment = models.ForeignKey(Appartments, related_name= "appartment1")
    point = models.PositiveIntegerField(verbose_name=_("point"))
    position_x = models.PositiveIntegerField(verbose_name=_("x axis"))
    position_y = models.PositiveIntegerField(verbose_name=_("y axis"))
    
    def __unicode__(self):
        return u"%s %s" %(self.appartment.decode('utf-8'),self.point.decode('utf-8'))

class Tenants (models.Model):
    tenant = models.ForeignKey(People,related_name="man2", verbose_name=_("tenant id"))
    appartment = models.ForeignKey(Appartments, related_name= "appartment2" , verbose_name=_("appartment name"))
    start_time = models.DateField(verbose_name=_("start date"))
    notes = models.CharField ( max_length=20,verbose_name=_("notes "))

    def __unicode__(self):
        return  self.tenant.family.decode('utf-8')
    

