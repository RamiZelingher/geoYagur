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
from address.models import Tenants,Appartments,Streets,Buildings,Neighborhoods,NeighborhoodView

def updateKML(request):
    recordsOfNeighborhood=Neighborhoods.objects.all()
    return  render_to_response('updateKML.html',locals());

def ajaxupdateNeighborhood1(request):
    if request.is_ajax():
        mimetype = 'text/plain'
        oldPoint = NeighborhoodView.objects.filter(neighborhood=12)
        messages = "line 23"
        oldPoint.delete()
        urltext="http://localhost/geoyagur/static/kml/n"+request.GET.get("neighbrhoodIdSelected")+".kml"
        file = urllib2.urlopen( "http://localhost/geoyagur/static/kml/n12.klm")
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
    else:
        messages = "call ajaxListPeople function without ajax"
    return HttpResponse(messages,mimetype)
