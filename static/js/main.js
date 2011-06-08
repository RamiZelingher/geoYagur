$(document).ready(function() {

    $("#peopleTable tr:odd").css("backgroundColor", "#ffcc99");
    $("#peopleTable tr").click(tenantChoose);
    $("#searchTenantButton").click(ajaxListPeople);
    $("#neighborhoodTable tr").click(neighborhoodChoose);
    $("#login").click(loginClick);

});

loginClick=function(){
   $("#login").html(logout)
}

ajaxListPeople=function() {
    var clientData = { familyReqest:  $("input#familyNameSearch").val(), privetReqest:  $("input#privetNameSearch").val()};
    $.getJSON("ajaxListPeople",clientData, responseAjaxListPeople)
    };

responseAjaxListPeople=function(data){
    $("#peopleTable tr").remove();
    $.each(data, function(i,record){
         $('#peopleTable').append('<tr> <td>'+  record.fields.family+'</td> <td>'+record.fields.given+'</td> <td >'+ record.pk+'</td> </tr>')
           });
    $("#totalPeople").html (data.length)
    $("#peopleTable tr:odd").css("backgroundColor", "#ffcc99");
    $("#peopleTable tr").click(tenantChoose);
}



tenantChoose = function() {
    document.forms['tableForm'].id_selected.value =  this.cells[2].innerHTML;
     document.forms["tableForm"].submit();
};

tenantSearch = function() {
    var clientPrivetName = $("input#privetNameSearch").val();
    var clientFamilyName = $("input#privetNameSearch").val();
     var data = { privetNameRequest:clientPrivetName, familyNameRequest:clientFamilyName };
    var ajaxArgs = { type:"get", url:"", data:data, complete:updatePeopleList};
    $.getJSON("",data,function(json) {
          var result = "Language code is \"<strong>" + json.responseData.language + "\"";
        alert("of step1")}  )
    return false;
}

neighborhoodChoose = function() {
    document.forms['choseNeighborhoodForm'].neighborhood_selected.value =  this.cells[1].innerHTML;
     document.forms["choseNeighborhoodForm"].submit();
   alert(this.cells[1].innerHTML)
};

updatePeopleList=function(res, status) {
  if (status == "success") {
      alert("ok");
    var txt = res.responseText;
    var data = eval('('+txt+')');
      alert(data.recordsOfPeople[0].toString());
  }
  else {
    alert("no ok")
  }

 alert("updatePeopleList")
};



noteA=function(){
    alert("note function")
};
