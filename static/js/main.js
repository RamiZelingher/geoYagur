$(document).ready(function() {
                                                $("#peopleTable tr:odd").css("backgroundColor", "#ffcc99");
                                                 $("#peopleTable tr").click(ajaxTenantChoose);
                                                 $("#searchTenantButton").click(ajaxListPeople);
                                                $("#neighborhoodTable tr").click(ajaxNeighbourhoodChoose);
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
                                                     $('#peopleTable').append('<tr> <td>'+  record.fields.family+'</td> <td>'+record.fields.given+'</td> <td >'+ record.pk+'</td> </tr>')
                                                     });
    $("#totalPeople").html (data.length)
    $("#peopleTable tr:odd").css("backgroundColor", "#ffcc99");
    $("#peopleTable tr").click(ajaxTenantChoose);
}



ajaxTenantChoose = function() {
    $.ajax({
                type: "GET",
                 url: "ajaxFindAddressFromPeopleId",
                data:  {id_selected: this.cells[2].innerHTML},
                 success: responseAjaxTenantChoose
                });
    };

responseAjaxTenantChoose = function(data){
 createPlacemark("",  32.741433,35.078658);
  showBallon(placemark,data );
//    drawMarker( yagurMap, mapnik,vector_layer,35.08,32.739);
//    alert(data);
};

/* the usr choose the neighboorhod for the table
neighborhoodChoose = function() {
    document.forms['choseNeighborhoodForm'].neighborhood_selected.value =  this.cells[1].innerHTML;
     document.forms["choseNeighborhoodForm"].submit();
   alert(this.cells[1].innerHTML+"2")
};
*/
ajaxNeighbourhoodChoose = function(){
            $("#neigborhoodChoseName").html (this.cells[0].innerHTML);
             var clientData = { neighborhood_id: this.cells[1].innerHTML};
             $.getJSON("ajaxFindTenantInNeighborhood",clientData, responseAjaxNeighbourhoodChoose)
            $.getJSON("ajaxGetNeighborhoodPolygon",clientData, responseAjaxNeighbourhoodPolygon)
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
