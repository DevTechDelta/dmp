var imageglobe = '';
var imageglobeCount = 0;
var blogposlgblobe = '';
var blogposlgblobeCount = 0;
var pcategoryglobal = '';
var pcategoryglobalCount = 0;
var pcommentglobe = '';
var pcommentglobeCount = 0;
var olaprium = getCookie("olaprium");
var auth_ola = getCookie("auth_ola");
loadallposts();
function loadallposts() { //load post from server
	var pychhauemq = "pychhauemq";
    $.ajax({
		type: "POST",
		url: "https://leaptvnews.com/nk/app/", 
		dataType: "json",
		data: {olaprium: olaprium, auth_ola: auth_ola, pychhauemq: pychhauemq},
		success: function(ListResponds){	
            blogposlgblobe = ListResponds;
            blogposlgblobeCount = 1;

            var no = 1;
            var JQE = "";
            JQE += '<table id="listtable" cellspacing="24px" cellpadding="10px" class="display table table-head-bg-secondary dtableflex" >'+
            '<thead>'+
                '<tr>'+ 
                    '<th style="width:2%" scope="col">#</th>'+
                    '<th style="width:10%" scope="col">Title</th>'+
					'<th style="width:10%" scope="col">Date</th>'+
                    '<th style="width:5%" scope="col">Action</th>'+

                    // '<th style="width:5%" scope="col">View</th>'+	
                    // '<th style="width:5%" scope="col">Update</th>'+	
                    // '<th style="width:5%" scope="col">Delete</th>'+	
                '</tr>'+
                '</thead>'+
                '<tbody >';	
            var ListPack = ListResponds;
            ListPack.forEach(function(item, index) {
			JQE +='<tr>';
			JQE += '<td>';
			JQE += no++;
			JQE += '</td>'; 
			JQE +='<td>'+item.ptitle.substr(0, 30)+'...</td>'+
			'<td>'+item.pdate+'</td>'+
			
			'<td> <i class="fa fa-edit dtableaction text-warning" id="edit'+item.pcc+'"></i> <i class="fa fa-trash dtableaction text-danger" id="dele'+item.pcc+'"></i> </td>'+
			// '<td> <button type="button" class="btn btn-primary" id="view'+item.pcc+'">View</button> </td>'+
			// '<td> <button type="button" class="btn btn-warning" id="edit'+item.pcc+'">Update</button> </td>'+
			// '<td> <button type="button" class="btn btn-danger" id="dele'+item.pcc+'">Delete</button> </td>'+
			'</tr>';
                    
                });
                JQE += '</tbody>'+
                '</table>';
                $("#listpostcol").html(JQE);
                $("#listtable").DataTable();

                // ListPack.forEach(function(item, index) { 
                //     $('#listtable').on('click', '#view'+item.pcc+'', function(event) {
                //       var esjr = item.pcc;
                //        hillsblogpostView(esjr);
                //       });
                //     });
                ListPack.forEach(function(item, index) { 
                    $('#listtable').on('click', '#edit'+item.pcc+'', function(event) {
                        var esjr = item.pcc;
                      
                        blogpostedit(esjr);
                        });
                    });
                ListPack.forEach(function(item, index) { 
                    $('#listtable').on('click', '#dele'+item.pcc+'', function(event) {
                        var esjr = item.pcc;
                        hillsblogpostDelete(esjr);
                        });
                    });
         } 
	});
}

function blogpostedit(hgqw){
	document.getElementById("headlodge").innerHTML = "Edit Current Post";
	onform()
	var strpcago = '';
    var dgee = blogposlgblobe.filter(mmza => mmza.pcc == hgqw); 
		var pcago = dgee.map(ryuq => ryuq.pcago); 
		var ptitle = dgee.map(ryuq => ryuq.ptitle); 
		var ppost = dgee.map(ryuq => ryuq.ppost); 
		var pimage = dgee.map(ryuq => ryuq.pimage); 
		var purl = dgee.map(ryuq => ryuq.purl); 
		var ptag = dgee.map(ryuq => ryuq.ptag); 
		var pfeatured = dgee.map(ryuq => ryuq.pfeatured); 
		var pcc = dgee.map(ryuq => ryuq.pcc); 
		var ppublish = dgee.map(ryuq => ryuq.ppublish); 
		var pdraft = dgee.map(ryuq => ryuq.pdraft); 
		var pdate = dgee.map(ryuq => ryuq.pdate); 
		var pip = dgee.map(ryuq => ryuq.pip); 

		strpcago = pcago
		strpcago = JSON.stringify(strpcago);
		
		if(strpcago.length > 5){
			pcago = JSON.parse(pcago);
		}else{
			pcago = '';
		}
		
		categrInPostform("edit", pcago)
		document.getElementById("topwhat").value = "edit";


		document.getElementById("featuredImage").innerHTML= `<img src="${pimage}" width="50" class="">`;
		document.getElementById("featureimageinput").value = pimage;
		document.getElementById("pagestrip").value = purl;	
		document.getElementById("title").value = ptitle;
		document.getElementById("pgdero").value = pcc;

		document.getElementById("messg").value = ppost;
		document.querySelector(".note-editable").innerHTML = ppost;	
		/*document.getElementById("divmessg").innerHTML = '<textarea data-autoresize id="messg" class=" summernote" name="messg" ></textarea>'
 		document.getElementById("messg").value = ppost; 
			//USED WHEN UPDATING AS ID
			//LOOKING FOR BETTER VERSION OF SOLVING THE BUG, BUT THIS WILL WORK FOR NOW
			$('.summernote').summernote({
				toolbar: [
				 	['style', ['style']],
				 	['fontname', ['fontname']],
					['style', ['bold', 'italic', 'underline', 'clear']],
					['font', ['strikethrough', 'superscript', 'subscript']],
					['fontsize', ['fontsize']],
					['color', ['color']],
					['para', ['ul', 'ol', 'paragraph']],
					['table', ['table']],
					['height', ['height']],
					['insert', ['link', 'picture', 'video', 'hr']],
					['view', ['fullscreen', 'codeview']]
				  ],
	  			disableDragAndDrop:true,
			});
			ImageSummerNote() 
			var icoimage = document.querySelector(".note-icon-picture")
			icoimage.addEventListener("click", ImageSummerNote); //calling same function 
			document.getElementById("featuredFiles").addEventListener("click", function() { 
				$("#modalIm").modal('show');
				mediafilefuc("mdl");
			});*/
}
function hillsblogpostDelete(hgqw){
	var dgee = blogposlgblobe.filter(mmza => mmza.pcc == hgqw); 
		
		var ptitle = dgee.map(ryuq => ryuq.ptitle); 
		var pcc = dgee.map(ryuq => ryuq.pcc); 


		$("#modalIm").modal("show");

		document.getElementById("mefhhead").innerHTML = 'Are you sure you want to delete this Post? <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
		document.getElementById("mefbody").innerHTML = `<center><b>${ptitle}</b></center>`;
		document.getElementById("meffoot").innerHTML = `<button class="btn btn-danger" onclick="pushpostDelete('${pcc}')">Yes</button> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>`;
}
function pushpostDelete(params) {
	var psttdel = params;
		$.ajax({
			type: "POST",
			url: "https://leaptvnews.com/nk/app/",
			dataType: 'json',
			data: {olaprium: olaprium, auth_ola: auth_ola, psttdel: psttdel},
			success: function(deleteData){
				var slf = deleteData;
				if(slf.ErrorNote == "none"){
					$("#modalIm").modal("hide");
					//document.getElementById("listcategorycol").style.display = 'none';
					//document.getElementById("setpcmsg").style.display = 'block';
					loadallposts() 
				}else{
					$("#modalIm").modal("hide");
					alert("An error occured. Please Refresh you page.")
				}
			}
	});
}
function getCookie(name) {
	var cookieArr = document.cookie.split(";");
	for(var i = 0; i < cookieArr.length; i++) {
		var cookiePair = cookieArr[i].split("=");
		if(name == cookiePair[0].trim()) {
			return decodeURIComponent(cookiePair[1]);
		}
	}
	return null;
  }


