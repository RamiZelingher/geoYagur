﻿<!-- 
    // <![CDATA[
		function handleClick(row)
			{
			id = row.cells[0].zeut;
			document.forms['tableForm'].id_selected.value = id; 
			alert ("id "+id);     
			document.forms["tableForm"].submit();
			}
		function choseNeighborhood1(row)
			{
			id = row.cells[0].neighborhood_id;
			document.forms['tableForm'].id_selected.value = id; 
			alert ("קוד השכונה"+id);     

			}
		function clickTenantTab(tab)
			{
			tab.style.backgroundPosition="100% -120px";
			document.getElementById("tenantDiv").style.display = "block";
			document.getElementById("appartmentDiv").style.display = "none";
			document.getElementById("neigborhoodDiv").style.display = "none";	
			}
		function clickApprtmentTab(tab)
			{
			tab.style.backgroundPosition="100% -120px";
			document.getElementById("tenantDiv").style.display = "none";
			document.getElementById("appartmentDiv").style.display = "block";
			document.getElementById("neigborhoodDiv").style.display = "none";	
			}
		function clickNeigborhoodTab(tab)
			{
			tab.style.backgroundPosition="100% -120px";
			document.getElementById("tenantDiv").style.display = "none";
			document.getElementById("appartmentDiv").style.display = "none";
			document.getElementById("neigborhoodDiv").style.display = "block";	
			}	
	    // ]]>
      //      -->