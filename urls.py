from django.conf.urls.defaults import *
from geoyagur.yagur.views import *
from django.conf import settings



# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Example:
    # (r'^geoyagur/', include('geoyagur.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    (r'^admin/', include(admin.site.urls)),
	(r'^home$','yagur.views.homePage'),
	(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
    (r'^ajaxListPeople$','yagur.views.ajaxListPeople'),
     (r'^ajaxFindAddressFromPeopleId$','yagur.views.ajaxFindAddressFromPeopleId'),
     (r'^ajaxFindTenantInNeighborhood','yagur.views.ajaxFindTenantInNeighborhood'),
     (r'^ajaxFindTenantInStreet','yagur.views.ajaxFindTenantInStreet'),
      (r'^ajaxFindDepartmentIdFromTenant','address.views.ajaxFindDepartmentIdFromTenant'),
      (r'^ajaxGetNeighborhoodPolygon','yagur.views.ajaxGetNeighborhoodPolygon'),
       (r'^ajaxGetStreetPolygon','yagur.views.ajaxGetStreetPolygon'),
      (r'^KML','address.views.updateKML'),
      (r'^ajaxupdateNeighborhood','address.views.ajaxupdateNeighborhood'),
      (r'^ajaxupdateStreet','address.views.ajaxupdateStreet'),
    (r'^$','yagur.views.homePage'),
     (r'^googleEarth','yagur.views.googleEarth'),
)

if settings.DEBUG:
        from django.views.static import serve
        _media_url = settings.MEDIA_URL
        if _media_url.startswith('/'):
            _media_url = _media_url[1:]
            urlpatterns += patterns('',
                                    (r'^%s(?P<path>.*)$' % _media_url,
                                    serve,
                                    {'document_root': settings.MEDIA_ROOT}))
        del(_media_url, serve)
