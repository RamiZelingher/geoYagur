from django.shortcuts import render_to_response, get_object_or_404
from django.utils import simplejson
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponseRedirect, HttpResponseServerError


from yagur.models import People
from address.models import Tenants,Appartments,Streets,Buildings,Neighborhoods


def homePage(request):

    recordsOfPeople = People.objects.all();
    recordsOfNeighborhood = Neighborhoods.objects.all();

    if 'privetNameRequest' in request.GET and request.GET['privetNameRequest']:
        privetNameRequest = request.GET['privetNameRequest'];
        recordsOfPeople = recordsOfPeople.filter( given__contains=privetNameRequest);

    if 'familyNameRequest' in request.GET and request.GET['familyNameRequest']:
        familyNameRequest = request.GET['familyNameRequest'];
        recordsOfPeople = recordsOfPeople.filter(family__contains=familyNameRequest);
        
    if 'id_selected' in request.GET and request.GET['id_selected']:
        idSelectedMember = request.GET['id_selected']
        try:
            onRecordOfPeople = People.objects.get(id=idSelectedMember)
            oneRecordOfTenants = Tenants.objects.get(tenant=idSelectedMember)
            oneRecordOfAppartments = Appartments.objects.get(id=oneRecordOfTenants.appartment.id)
            oneRecordOfStreet = Streets.objects.get(id=oneRecordOfAppartments.streetName.id)
            oneRecordofBuilding = Buildings.objects.get(id=oneRecordOfAppartments.building.id)
            oneRecordofNeighborhood = Neighborhoods.objects.get(id=oneRecordOfAppartments.neighborhood.id)
            privetAdress =oneRecordOfStreet.name+" "+str(oneRecordOfAppartments.streetNumber)+" "+oneRecordofNeighborhood.name
        except :
           privetAdress="no data"

    if 'neighborhood_selected' in request.GET and request.GET['neighborhood_selected']:
        neighborhoodSelectedId = request.GET['neighborhood_selected']
        neighborhoodSelectedName = Neighborhoods.objects.get(id=neighborhoodSelectedId).name
        recordsOfAppartmentInNeighborhood = Appartments.objects.filter(neighborhood=neighborhoodSelectedId)
        tenantInNeighborhood =[]
        for eachAppartment in recordsOfAppartmentInNeighborhood:
            for eachTenant in Tenants.objects.filter(appartment=eachAppartment):
                tenantInNeighborhood.append(eachTenant.tenant)

    if request.is_ajax():
        jsonData = simplejson.dumps(recordsOfPeople);
        mimetype = 'application/xml'
        return HttpResponse(jsonData,mimetype)
    else:
        return render_to_response('c:/project/geoyagur/templates/mainpage.html',locals());
