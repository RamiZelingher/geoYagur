from django.shortcuts import render_to_response
from django.utils import simplejson
from django.core import serializers
from django.http import HttpResponse
from django.contrib.auth.models import User


from yagur.models import People
from address.models import Tenants,Appartments,Streets,Buildings,Neighborhoods


def homePage(request):

    recordsOfPeople = People.objects.order_by("family")
    recordsOfNeighborhood = Neighborhoods.objects.all();

    if request.user.is_authenticated():
        userName=request.user
    else:
        userName="visitor";


    if 'privetNameRequest' in request.GET and request.GET['privetNameRequest']:
        privetNameRequest = request.GET['privetNameRequest'];
        recordsOfPeople = recordsOfPeople.filter( given__contains=privetNameRequest);

    if 'familyNameRequest' in request.GET and request.GET['familyNameRequest']:
        familyNameRequest = request.GET['familyNameRequest'];
        recordsOfPeople = recordsOfPeople.filter(family__contains=familyNameRequest);
    '''
    if 'id_selected' in request.GET and request.GET['id_selected']:
        privetAddress=findAddressFromPeopleId(request.GET['id_selected'])
    '''
    if 'neighborhood_selected' in request.GET and request.GET['neighborhood_selected']:
        neighborhoodSelectedId = request.GET['neighborhood_selected']
        neighborhoodSelectedName = Neighborhoods.objects.get(id=neighborhoodSelectedId).name
        recordsOfAppartmentInNeighborhood = Appartments.objects.filter(neighborhood=neighborhoodSelectedId)
        tenantInNeighborhood =[]
        for eachAppartment in recordsOfAppartmentInNeighborhood:
            for eachTenant in Tenants.objects.filter(appartment=eachAppartment):
                tenantInNeighborhood.append(eachTenant.tenant)
    else:
        return render_to_response('mainpage.html',locals());

def ajaxListPeople(request):
    if request.is_ajax():
        mimetype = 'application/xml'
        format = 'json'
        messages = serializers.serialize(format, People.objects.filter(family__contains=request.GET.get("familyReqest"),given__contains=request.GET.get("privetReqest")))
    else:
        messages = "call ajaxListPeople function without ajax"
    return HttpResponse(messages,mimetype)

def ajaxFindAddressFromPeopleId(request):
    global mimetype
    if request.is_ajax():
        mimetype = 'text/plain'
        privetAddress = findAddressFromPeopleId(request.GET['id_selected'])
    else:
       privetAddress = "call ajaxListPeople function without ajax"
    return HttpResponse( privetAddress , mimetype)

def findAddressFromPeopleId(peopleID):
        try:
                    oneRecordOfTenants = Tenants.objects.get(tenant=peopleID)
                    oneRecordOfAppartments = Appartments.objects.get(id=oneRecordOfTenants.appartment.id)
                    oneRecordOfStreet = Streets.objects.get(id=oneRecordOfAppartments.streetName.id)
                    oneRecordofBuilding = Buildings.objects.get(id=oneRecordOfAppartments.building.id)
                    oneRecordofNeighborhood = Neighborhoods.objects.get(id=oneRecordOfAppartments.neighborhood.id)
                    privetAddress =oneRecordOfStreet.name+" "+str(oneRecordOfAppartments.streetNumber)+" "+oneRecordofNeighborhood.name
        except :
                    privetAddress ="not found the address of  "+peopleID
        return privetAddress

def ajaxFindTenantInNeighborhood (request):
    if request.is_ajax():
        mimetype1 = 'application/xml'
        format = 'json'
        messages = serializers.serialize(format,FindTenantInNeighborhood (request.GET.get("neighborhood_id")))
    else:
        messages = "call ajaxListPeople function without ajax"
    return HttpResponse(messages,mimetype1)

def  FindTenantInNeighborhood (neighborhoodId):
    try:
        tenantInNeighborhood=People.objects.filter(man2__appartment__neighborhood__exact =neighborhoodId)
    except:
         tenantInNeighborhood = []
    return tenantInNeighborhood
