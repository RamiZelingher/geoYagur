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
   alert(data)
};


neighborhoodChoose = function() {
    document.forms['choseNeighborhoodForm'].neighborhood_selected.value =  this.cells[1].innerHTML;
     document.forms["choseNeighborhoodForm"].submit();
   alert(this.cells[1].innerHTML+"2")
};

ajaxNeighbourhoodChoose = function(){
            $("#neigborhoodChoseName").html (this.cells[0].innerHTML);
             var clientData = { neighborhood_id: this.cells[1].innerHTML};
             $.getJSON("ajaxFindTenantInNeighborhood",clientData, responseAjaxNeighbourhoodChoose)
            }

responseAjaxNeighbourhoodChoose = function(data){

    $("#tenantInNeighborhoodTable tr").remove();
    $("#totalTenantsInNiegborhood").html(data.length)
    $.each(data, function(i,record){
                                                     $('#tenantInNeighborhoodTable').append('<tr> <td>'+  record.fields.tenant+'</td> <td>'+record.fields.apprtmentNumber+'</td> <td >'+ record.pk+'</td> </tr>')
                                                     });
    $("#tenantInNeighborhood").click(ajaxTenantChoose);
}