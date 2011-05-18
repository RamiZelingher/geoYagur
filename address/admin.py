from django.contrib import admin
from address.models import Neighborhoods,NeighborhoodView
from address.models import Streets,StreetView
from address.models import Buildings, BuildingView
from address.models import Appartments, AppartmentView,Tenants


class NeighborhoodsAdmin (admin.ModelAdmin):
    list_display = ["id","name"]
    pass

admin.site.register(Neighborhoods, NeighborhoodsAdmin)

class NeighborhoodViewAdmin (admin.ModelAdmin):
    list_display = ["id","neighborhood","point","position_x","position_y"]
    pass

admin.site.register(NeighborhoodView, NeighborhoodViewAdmin)

class StreetsAdmin (admin.ModelAdmin):
    list_display = ["id","name","en_name","neighborhood","color"]
    pass

admin.site.register(Streets, StreetsAdmin)

class StreetViewAdmin (admin.ModelAdmin):
    list_display = ["id","street","point","position_x","position_y"]
    pass

admin.site.register(StreetView, StreetViewAdmin)

class BuildingsAdmin (admin.ModelAdmin):
    list_display = ["id","name","neighborhood","streetName","streetNumber","scale","position_x","position_y","color"]
    pass

admin.site.register(Buildings, BuildingsAdmin)

class BuildingViewAdmin (admin.ModelAdmin):
    list_display = ["id","building","point","position_x","position_y"]
    pass

admin.site.register(BuildingView, BuildingViewAdmin)

class  AppartmentsAdmin (admin.ModelAdmin):
    list_display = ["id","neighborhood","streetName","streetNumber","building","scale","position_x","position_y","color","notes"]
    pass

admin.site.register( Appartments,  AppartmentsAdmin)

class  AppartmentViewAdmin (admin.ModelAdmin):
    list_display = ["id","appartment","point","position_x","position_y"]
    pass

admin.site.register(AppartmentView, AppartmentViewAdmin)

class  TenantsAdmin (admin.ModelAdmin):
    list_display = ["id","tenant","appartment","start_time","notes"]
    pass

admin.site.register( Tenants,  TenantsAdmin)



