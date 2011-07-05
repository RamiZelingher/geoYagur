/**
 * Created by .
 * User: rami
 * Date: 05/07/11
 * Time: 17:42
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
     $("#neigborhoodList").change(neighborhoodSelect);


});

neighborhoodSelect=function()
    {
        $.ajax({
                type: "GET",
                 url: "KML",
                data:  { neighbrhoodIdSelected: $("#neigborhoodList").val()},
                 success:  responseAjaxNiegborhoodKLM
         });
    };

responseAjaxNiegborhoodKLM=function(data){
alert(data)
}

