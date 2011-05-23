$(document).ready(function() {

    $("#peopleTable tr:odd").css("backgroundColor", "#ffcc99");
    $("#peopleTable tr").click(tenantChoose);
    $("#searchTenantButton1").click(tenantSearch)
    $("#neighborhoodTable tr").click(neighborhoodChoose);


});
tenantChoose = function() {
    document.forms['tableForm'].id_selected.value =  this.cells[2].innerHTML;
     document.forms["tableForm"].submit();
};

tenantSearch = function() {
    var privetName = $("input#privetNameSearch").val();
    var familyName = $("input#privetNameSearch").val();
     var data = { privetNameRequest:privetName, familyNameRequest:familyName };
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
}