# Create your views here.
from django.shortcuts import render_to_response
from django.utils import simplejson
from django.core import serializers
from django.http import HttpResponse
from django.contrib.auth.models import User
import urllib2
import urllib2
from xml.dom.minidom import parseString
from decimal import *
getcontext().prec =14
from address.models import Tenants,Appartments,Streets,Buildings,Neighborhoods,NeighborhoodView,StreetView

def updateKML(request):
    recordsOfNeighborhood=Neighborhoods.objects.all()
    recordsOfStreet=Streets.objects.all()
    return  render_to_response('updateKML.html',locals());

def ajaxupdateNeighborhood(request):
    if request.is_ajax():
        mimetype = 'text/plain'
        oldPoint = NeighborhoodView.objects.filter(neighborhood=request.GET.get("neighbrhoodIdSelected"))
        totaldelete= oldPoint.count()
        oldPoint.delete()
        urltext="http://localhost/geoyagur/static/kml/n"+request.GET.get("neighbrhoodIdSelected")+".kml"
        file = urllib2.urlopen( urltext)
        data = file.read()
        file.close()
        dom = parseString(data)
        xmlData = dom.getElementsByTagName('coordinates')[0].firstChild.data
        coordinatesList =  xmlData.split()
        i= 0
        for point in coordinatesList:
            pointRecord = NeighborhoodView()
            pointRecord.neighborhood_id=request.GET.get("neighbrhoodIdSelected")
            pointRecord.point=i
            pointRecord.position_x= point.split(",")[1]
            pointRecord.position_y=point.split(",")[0]
            pointRecord.save()
            i=i+1
        messages = "delete "
    else:
        messages = "call ajaxListPeople function without ajax"
    return HttpResponse(messages,mimetype)

def ajaxupdateStreet(request):
    mimetype = 'text/plain'
    if request.is_ajax():
        oldPoint = StreetView.objects.filter(street =int(request.GET.get("streetIdSelected")))
        totaldelete = oldPoint.count()
        oldPoint.delete()
        urltext="http://localhost/geoyagur/static/kml/s"+request.GET.get("streetIdSelected")+".kml"
        kmlStreetFile = urllib2.urlopen( urltext)
        data =  kmlStreetFile.read()
        kmlStreetFile.close()
        dom = parseString(data)
        xmlData = dom.getElementsByTagName('coordinates')[0].firstChild.data
        coordinatesList =  xmlData.split()
        i= 0
        for point in coordinatesList:
            pointRecord = StreetView()
            pointRecord.street_id=int(request.GET.get("streetIdSelected"))
            pointRecord.point=i
            pointRecord.position_x=point.split(",")[1]
            pointRecord.position_y=point.split(",")[0]
            pointRecord.save()
            i=i+1
        messages =pointRecord.point
    else:
        messages = "call ajaxupdateStreet function without ajax"
    return HttpResponse(messages,mimetype)

def ajaxFindDepartmentIdFromTenant(request):
    mimetype5 = 'text/plain'
    if request.is_ajax():
        messages = FindDepartmentIdFromTenant(request.GET['id_selected'])
    else :
        messages = "problem in ajaxFindDepartmentIdFromTenant function in view file"
    return HttpResponse(messages,mimetype5)
def FindDepartmentIdFromTenant(peopleID):
     try:
        tenantObject = Tenants.objects.get(tenant=int(peopleID))
        msg = tenantObject.appartment
     except :
         msg ="problem in FindDepartmentIdFromTenant function in view file"
     return msg