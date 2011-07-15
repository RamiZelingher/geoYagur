$(document).ready(function() {
                                                $("#peopleTable tr:odd").css("backgroundColor", "#ffcc99");
                                                 $("#peopleTable tr").click(ajaxTenantChoose);
                                                 $("#searchTenantButton").click(ajaxListPeople);
                                                $("#neighborhoodTable tr").click(ajaxNeighbourhoodChoose);
                                                $("#streetTable tr").click(ajaxStreetChoose);
                                                $("#login").click(loginClick);
                                                }
                                );
loginClick=function(){
   $("#login").html(logout)
}
ajaxListPeople=function() {
    var clientData = { familyReqest:  $("input#familyNameSearch").val(), privetReqest:  $("input#privetNameSearch").val()};
    $.getJSON("ajaxListPeople",clientData, responseAjaxListPeople)
    };
responseAjaxListPeople = function(data){
    $("#peopleTable tr").remove();
    $.each(data, function(i,record){
                                                     $('#peopleTable').append('<tr> <td>'+  record.fields.family+'</td> <td>'+record.fields.given+'</td> <td  id="zeut">'+ record.pk+'</td> </tr>')
                                                     });
    $("#totalPeople").html (data.length)
    $("#peopleTable tr:odd").css("backgroundColor", "#ffcc99");
    $("#peopleTable tr").click(ajaxTenantChoose);
}
ajaxTenantChoose = function() {
    ajaxFindDepartmentIdFromTenant(this.cells[2].innerHTML)
    $.ajax({
                type: "GET",
                 url: "ajaxFindAddressFromPeopleId",
                data:  {id_selected: this.cells[2].innerHTML},
                 success: responseAjaxTenantChoose
                });
    };
ajaxFindDepartmentIdFromTenant = function(id_selected) {
    $.ajax({
                type:"GET",
                url: "ajaxFindDepartmentIdFromTenant",
                data:  {id_selected:id_selected},
                success: responseAjaxFindDepartmentIdFromTenant
              })
};
 responseAjaxFindDepartmentIdFromTenant = function(data){
            kmlFileName = "a"+data+".kml";
            view (32.741433,35.078658,2000);
             loadKml(kmlFileName);
             drawKmlOnMap( yagurMap,kmlFileName)

 }
responseAjaxTenantChoose = function(data){
// createPlacemark("",  32.741433,35.078658);
// address = data[streetName] +"   "+data[streetNumber]+"    "+data[neighborhoodName]
//  showBallon(placemark,data );
//    drawMarker( yagurMap, mapnik,vector_layer,35.08,32.739);
    alert(data);
};
ajaxNeighbourhoodChoose = function(){
            $("#neigborhoodChoseName").html (this.cells[0].innerHTML);
             var clientData = { neighborhood_id: this.cells[1].innerHTML};
             $.getJSON("ajaxFindTenantInNeighborhood",clientData, responseAjaxNeighbourhoodChoose)
//            $.getJSON("ajaxGetNeighborhoodPolygon",clientData, responseAjaxNeighbourhoodPolygon)
            kmlFileName = "n"+ this.cells[1].innerHTML+".kml";
             loadKml(kmlFileName);
            drawKmlOnMap( yagurMap,kmlFileName)
            }
responseAjaxNeighbourhoodChoose = function(data1){
    $("#tenantInNeighborhoodTable tr").remove();
    $("#totalTenantsInNiegborhood").html(data1.length)
    $.each(data1, function(i,record){
                                                     $('#tenantInNeighborhoodTable').append('<tr> <td>'+  record.fields.family+'</td> <td>'+record.fields.given+'</td> <td id=zeut1>'+ record.pk+'</td> </tr>')
                                                     });
    $("#tenantInNeighborhoodTable tr:odd").css("backgroundColor", "#ffcc99");
    $("#tenantInNeighborhoodTable tr").click(ajaxTenantChoose);

}
responseAjaxNeighbourhoodPolygon = function(vertex){
     var arrayOfPoints = [];
     $.each(vertex, function(i,record){
                                                        arrayOfPoints.push({x:parseFloat(record.fields. position_x), y:parseFloat(record.fields. position_y)});
                                                         });
  
     showPoligon(arrayOfPoints );

}
ajaxStreetChoose = function(){
            $("#streetChoseName").html (this.cells[0].innerHTML);
             clientData = { street_id: this.cells[1].innerHTML};
             $.getJSON("ajaxFindTenantInStreet",clientData, responseAjaxStreetChoose)
//            $.getJSON("ajaxGetStreetPolygon",clientData, responseAjaxStreetPolygon)
             kmlFileName = "s"+ this.cells[1].innerHTML+".kml";
             loadKml(kmlFileName);
            alert(kmlFileName)
            drawKmlOnMap( yagurMap,kmlFileName)
            }
responseAjaxStreetChoose = function(data2){
    $("#tenantInStreetTable tr").remove();
    $("#totalTenantsInStreet").html(data2.length)
    $.each(data2, function(i,record){
                                                     $('#tenantInStreetTable').append('<tr> <td>'+  record.fields.family+'</td> <td>'+record.fields.given+'</td> <td id=zeut1>'+ record.pk+'</td> </tr>')
                                                     });
    $("#tenantInStreetTable tr:odd").css("backgroundColor", "#ffcc99");
    $("#tenantInStreetTable tr").click(ajaxTenantChoose);
}
responseAjaxStreetPolygon = function(vertex){
     var arrayOfPoints = [];
     $.each(vertex, function(i,record){
                                                        arrayOfPoints.push({x:parseFloat(record.fields. position_x), y:parseFloat(record.fields. position_y)});
                                                         });

     showPoligon(arrayOfPoints );
}