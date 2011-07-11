/**
 * Created by .
 * User: rami
 * Date: 05/07/11
 * Time: 17:42
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
     $("#neigborhoodList").change(neighborhoodSelect);
     $("#streetList").change(streetSelect);


});
neighborhoodSelect=function() {
        $.ajax({
                type: "GET",
                 url: "ajaxupdateNeighborhood",
                data:  { neighbrhoodIdSelected: $("#neigborhoodList").val()},
                 success:  responseAjaxNiegborhoodKLM
         });
    };
responseAjaxNiegborhoodKLM=function(data){
alert(data)
}
streetSelect=function() {
        alert ($("#streetList").val())
       $.ajax({
                type: "GET",
                 url: "ajaxupdateStreet",
                data:  { streetIdSelected: $("#streetList").val()},
                 success:  responseAjaxStreetKLM
         });
    };
responseAjaxStreetKLM=function(data){
alert(data)
}

