loadallCategory() 
function runPostCategory() {
	var categorys  = document.categoryform.categorys.value; 
	var categorysdescr  = document.categoryform.categorysdescr.value; 
	var crage  = document.categoryform.crage.value; 
	var cplace  = document.categoryform.cplace.value; 
	var categorysDrl = categorysdescrDrl = crageDrl = true; 
	
		// Validate categorys
		if(myTrim(categorys) == "") {
        printError("categorysDrl", "<i class='fa fa-asterisk'></i> Enter Post Category");
    } else {
        // Check if its lesser than 0
        if(myTrim(categorys).length < 2) {
            printError("categorysDrl", "<i class='fa fa-asterisk'></i> Enter Valid Post Category.");
        } else{
            printError("categorysDrl", "");
            categorysDrl = false;
        }
    } 

   	if(myTrim(categorysdescr).length > 0){
   		if(myTrim(categorysdescr).length < 2) {
       		printError("categorysdescrDrl", "<i class='fa fa-asterisk'></i> Enter Category Discription");
    	}else{
    		printError("categorysdescrDrl", "");
      		categorysdescrDrl = false;
    	}
   	}else{
		printError("categorysdescrDrl", "");
      	categorysdescrDrl = false;
   	}

    if(crage == "create" || crage == "edit"){
		    crageDrl = false;
		}

		// Prevent the form from being submitted if there are any errors
	if ((categorysDrl || categorysdescrDrl || crageDrl) == true) {
	   return false;
    } else {
        pushPCategory()
    }  
}

function pushPCategory(){		
	var categorys  = document.getElementById("categorys").value;
	var categorysdescr  = document.getElementById("categorysdescr").value;
	var crage  = document.getElementById("crage").value; 
	var cplace  = document.getElementById("cplace").value; 
	var categoryrubies = "categoryrubies"
	$.ajax({
		type: "POST",
		url: "./app/", 
		dataType: "json",
		data: {olaprium: olaprium, auth_ola: auth_ola, categorys: categorys, categorysdescr:categorysdescr, categoryrubies:categoryrubies, crage:crage, cplace:cplace},
		success: function(data){
			
		var slf = data; 
		if(slf.ErrorNote == "none"){
			document.getElementById("pcategorycol").style.display = 'none';
			$("#setpcmsg").fadeIn("slow");
			loadallCategory() 
        }else{
			document.getElementById("pcategorycol").style.display = 'none';
			var setpcmsg = document.getElementById("setpcmsg");
			setpcmsg.style.display = 'block';
			setpcmsg.classList.remove("btn-info");
			setpcmsg.classList.add("btn-danger");
			setpcmsg.innerHTML = slf.ErrorMsg;		
        }
			
		}
		 
	});
}
function loadallCategory(){
	 var brairgiugaq = "brairgiugaq";
    $.ajax({
		type: "POST",
		url: "./app/", 
		dataType: "json",
		data: {olaprium: olaprium, auth_ola: auth_ola, brairgiugaq: brairgiugaq},
		success: function(ListResponds){
            pcategoryglobal = ListResponds;
            pcategoryglobalCount = 1;
			var no = 1;
            var DVH = "";
            DVH += '<table id="listctable" cellspacing="24px" cellpadding="10px" class="display table table-head-bg-secondary ">'+
            '<thead>'+
                '<tr>'+ 
                    '<th style="width:1%" scope="col">#</th>'+ 
		'<th style="width:10%" scope="col">Name</th>'+
		'<th style="width:10%" scope="col">Edited</th>'+
                    '<th style="width:5%" scope="col">Action</th>'+	
                    
                '</tr>'+
                '</thead>'+
                '<tbody >';	
            var ListPack = ListResponds;
            ListPack.forEach(function(item, index) {
			DVH +='<tr>';
			DVH += '<td>';
			DVH += no++;
			DVH += '</td>'; 
			DVH +='<td>'+item.categoryName+'</td>'+
			'<td>'+item.categoryEditDate+'</td>'+
			
			'<td> <i class="fa fa-edit dtableaction text-warning" id="editc'+item.ccCc+'"></i> <i class="fa fa-trash dtableaction text-danger" id="delec'+item.ccCc+'"></i> </td>'+
			'</tr>';
                    
                });
                DVH += '</tbody>'+
                '</table>';
                $("#listcategorycol").html(DVH);
                $("#listctable").DataTable();

                // ListPack.forEach(function(item, index) { 
                //     $('#listctable').on('click', '#viewc'+item.id+'', function(event) {
                //       var xeir = item.ccCc;
                //        pcategoryglobalView(xeir);
                //       });
                //     });
                ListPack.forEach(function(item, index) { 
                    $('#listctable').on('click', '#editc'+item.ccCc+'', function(event) {
                        var xeir = item.ccCc;
                        pcategoryedit(xeir);
                        });
                    });
                ListPack.forEach(function(item, index) { 
                    $('#listctable').on('click', '#delec'+item.ccCc+'', function(event) {
                        var xeir = item.ccCc;
                        pcategorydelete(xeir);
                        });
                    });
		}
		 
	});
}
function pcategoryedit(ggow) {
	crcrtmenu()
	document.getElementById("headlodge").innerHTML = "Edit Current Category";
	document.getElementById("pcategoryptbt").innerHTML = "Edit Current Category";
	var dxeo = pcategoryglobal.filter(bjbs => bjbs.ccCc == ggow); 
		var categoryName = dxeo.map(dijc => dijc.categoryName); 
		var categoryDescription = dxeo.map(dijc => dijc.categoryDescription); 
		var ccCc = dxeo.map(dijc => dijc.ccCc); 
		var categoryCreateDate = dxeo.map(dijc => dijc.categoryCreateDate); 
		var categoryEditDate = dxeo.map(dijc => dijc.categoryEditDate); 

		document.getElementById("crage").value = "edit";
		document.getElementById("categorys").value = categoryName;	
		document.getElementById("categorysdescr").value = categoryDescription;	
		document.getElementById("cplace").value = ccCc;	
}
function pcategorydelete(xeir) {
	var zrse = pcategoryglobal.filter(rxcf => rxcf.ccCc == xeir); 
		var categoryName = zrse.map(ctck => ctck.categoryName); 
		var ccCc = zrse.map(ctck => ctck.ccCc); 


		$("#modalIm").modal("show");

		document.getElementById("mefhhead").innerHTML = 'Are you sure you want to delete this Category? <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
		document.getElementById("mefbody").innerHTML = `<center><b>${categoryName}</b></center>
				Deleting this category will affect post(s) that are under the category`;
		document.getElementById("meffoot").innerHTML = `<button class="btn btn-danger" onclick="pushcatDelete('${ccCc}')">Yes</button> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>`;
}
function pushcatDelete(params) {
	var catldel = params;
		$.ajax({
			type: "POST",
			url: "./app/",
			dataType: 'json',
			data: {olaprium: olaprium, auth_ola: auth_ola, catldel: catldel},
			success: function(deleteData){
				var slf = deleteData;
				if(slf.ErrorNote == "none"){
					$("#modalIm").modal("hide");
					//document.getElementById("listcategorycol").style.display = 'none';
					//document.getElementById("setpcmsg").style.display = 'block';
					loadallCategory() 
				}else{
					$("#modalIm").modal("hide");
					alert("An error occured. Please Refresh you page.")
				}
			}
	});
}