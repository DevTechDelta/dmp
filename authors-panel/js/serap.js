loadimagesdb();
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

//document.addEventListener('DOMContentLoaded', () =>{
		ImageSummerNote() 
		//Onclick Image Icon in Summernote Toolbar
		var icoimage = document.querySelector(".note-icon-picture")
		icoimage.addEventListener("click", ImageSummerNote); //calling same function 
		document.getElementById("featuredFiles").addEventListener("click", function() { 
			$("#modalIm").modal('show');
			mediafilefuc("mdl");
		});
		document.getElementById("title").addEventListener("input", function() { 
			chunkurl();
		});
//})

function loadimagesdb() { //load images from server
	document.getElementById("listimagecol").innerHTML = `<center><i class="fa fa-spinner fa-spin spiff-mode"></i></center>`;
	var imgdate1 = Date.now(); //for network timing
	var imgreas = "imgreas";
    $.ajax({
		type: "POST",
		url: "https://mytech.cu.ma/app/", 
		dataType: "json",
		//"timeout": 10000,
		data: {olaprium: olaprium, auth_ola: auth_ola, imgreas: imgreas},
		success: function(ListResponds){	
						imageconnect = 1;
            imageglobe = ListResponds;
            imageglobeCount = 1;

            var no = 1;
            var EAX = "";
            EAX += '<table id="listimagetable" cellspacing="24px" cellpadding="10px" class="display table table-head-bg-secondary ">'+
            '<thead>'+
                '<tr>'+ 
                    '<th style="width:1%" scope="col">#</th>'+ 
						'<th style="width:10%" scope="col">Image Name</th>'+
						'<th style="width:10%" scope="col">Dir</th>'+
						'<th style="width:10%" scope="col">Action</th>'+
				                '</tr>'+
				                '</thead>'+
				                '<tbody >';	
				            var ListPack = ListResponds;
				            ListPack.forEach(function(item, index) {
							EAX +='<tr>';
							EAX += '<td>';
							EAX += no++;
							EAX += '</td>'; 
							EAX +='<td><img src="'+item.imagedir+'" width="80"></td>'+
							'<td>'+item.imageurl.slice(0, -4)+'</td>'+
							
							'<td> <i class="fa fa-trash dtableaction text-danger" id="dele'+item.imagecc+'"></i> </td>'+
							/*'<td> <button type="button" class="btn btn-primary" id="view'+item.imagecc+'">View</button> </td>'+
							'<td> <button type="button" class="btn btn-warning" id="edit'+item.imagecc+'">Update</button> </td>'+
							'<td> <button type="button" class="btn btn-danger" id="dele'+item.imagecc+'">Delete</button> </td>'+*/
							'</tr>';      
                });
                EAX += '</tbody>'+
                '</table>';
                $("#listimagecol").html(EAX);
                $("#listimagetable").DataTable();
                /*
                ListPack.forEach(function(item, index) { 
                    $('#listimagetable').on('click', '#view'+item.imagecc+'', function(event) {
                      var rzqm = item.imagecc;
                       imagegView(rzqm);
                      });
                    });
                ListPack.forEach(function(item, index) { 
                    $('#listimagetable').on('click', '#edit'+item.imagecc+'', function(event) {
                        var rzqm = item.imagecc;
                        imagegUpdate(rzqm);
                        });
                    });
                */
                ListPack.forEach(function(item, index) { 
                    $('#listimagetable').on('click', '#dele'+item.imagecc+'', function(event) {
                        var rzqm = item.imagecc;
                        imagegDelete(rzqm);
                        });
                    });

       },
       error : function(jqXHR, textStatus, errorThrown) {
	       	var imgdate2 = Date.now();
	       	var alldate = imgdate2 - imgdate1;
	       	var networkshow = onlineoffline();
	       	


	       	if(alldate > 3000){
	       	//if (onlineoffline() == 0) {} //THIS CHECKS NETWORK IN THE REMOTE SERVER. YOU CAN ONLY USE WHEN FILES ARE UPLOADED REMOTELY
	       		document.getElementById("listimagecol").innerHTML = `<center><button type="button" class="btn btn-primary btn-sm" onclick="loadimagesdb()">Your Nework is Down. Reconnect & Try Again <i class="fa fa-rotate-right"></i></button></center>`;
	       	}else{
	       		document.getElementById("listimagecol").innerHTML = `<center><button type="button" class="btn btn-primary btn-sm" onclick="loadimagesdb()">Something is Wrong. Try Again <i class="fa fa-rotate-right"></i></button></center>`;
	       	}
                                    
       }
	});
}
function imagegDelete(rzqm) { //image delete function
	 var zrse = imageglobe.filter(rxcf => rxcf.imagecc == rzqm); 
		var imageurl = zrse.map(ctck => ctck.imageurl); 
		var imagedir = zrse.map(ctck => ctck.imagedir); 
		var imagecc = zrse.map(ctck => ctck.imagecc); 

		$("#modalIm").modal("show");

		document.getElementById("mefhhead").innerHTML = 'Are you sure you want to delete this image? <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
		document.getElementById("mefbody").innerHTML = `<center><img src="${imagedir}" width="80"></center>`;
		document.getElementById("meffoot").innerHTML = `<button class="btn btn-danger" onclick="pushimagegDelete('${rzqm}')">Yes</button> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>`;
}
function pushimagegDelete(rzqm) { //delete image
	var delid = rzqm;
            $.ajax({
                type: "POST",
                url: "https://mytech.cu.ma/app/",
                dataType: 'json',
                data: {olaprium: olaprium, auth_ola: auth_ola, delid: delid},
                success: function(deleteData){
                    var slf = deleteData;
                    if(slf.ErrorNote == "none"){
                    	$("#modalIm").modal("hide");
						$("#pcimgmsg").fadeIn("slow");
						loadimagesdb()
						setTimeout(function(){
					        $("#pcimgmsg").fadeOut("slow");
					     }, 2000);
                    }else{
											var setpcmsg = document.getElementById("pcimgmsg");
											//pcimgmsg.style.display = 'block';
											$("#pcimgmsg").fadeIn("slow");
											pcimgmsg.classList.remove("btn-info");
											pcimgmsg.classList.add("btn-danger");
											pcimgmsg.innerHTML = slf.ErrorMsg;

											setTimeout(function(){
								        $("#pcimgmsg").fadeOut("slow");
								     }, 2000);
                    }
                }
        });
}
function ImageSummerNote(){ //remove the image button and replace with this function
	document.querySelector(".note-group-select-from-files").innerHTML = `<button class="btn btn-secondary" id="mediaFiles" onclick="mediafilefuc('smno')"> Media Files</button> 
																		<button class="btn btn-secondary" id="uploadMediaFiles" onclick="uploadmediafilefuc()">Upload Files</button>`;
	document.querySelector(".note-group-image-url").style.display = 'block';
	document.querySelector(".note-image-url").value = "";
	var notesmbtn = document.querySelector(".note-image-btn");
		notesmbtn.setAttribute("type", "button");
}
function mediafilefuc(el){ //when media files is clicked show images side by side
	var HCA = '';

	if(imageglobeCount == 1){
		var no = 1;
		var nu = 1;

			if(el == "smno"){
				HCA = '<center><button class="btn btn-secondary btn-sm" onclick="ImageSummerNote()">Back</button></center><br>';
				imageglobe.forEach(function (item, index, array) { 
					HCA += `<img src="${item.imagedir}" width="50" class="imgsnin" id="${no++}" onclick="inImageForm('${item.imagedir}', '${nu++}', '${el}')"> `;
				});
					document.querySelector(".note-group-select-from-files").innerHTML = HCA;
			}else if(el == "mdl"){
				document.querySelector("#mefhhead").innerHTML = `Select Featured Image <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>`;
				document.querySelector("#meffoot").innerHTML = `<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>`;
				imageglobe.forEach(function (item, index, array) { 
					HCA += `<img src="${item.imagedir}" width="50" class="imgsninf" id="${no++}" onclick="inImageForm('${item.imagedir}', '${nu++}', '${el}')"> `;
				});
					document.querySelector("#mefbody").innerHTML = HCA;
			}		
	}else{
		loadimagesdb()
	}
	

}

function inImageForm(url, noid, el) { //when image is selected insert into input. Add an active class and remove disable from insert image
	if(el == "smno"){
		document.querySelector(".note-image-url").value = url;
		var notesmbtn = document.querySelector(".note-image-btn");

		 var imgcrew = document.querySelectorAll(".imgsnin");
		 imgcrew.forEach(function (item, index, array) { 
					document.getElementById(index+1).classList.remove("activeimo")
				});
		document.getElementById(noid).classList.add("activeimo")
		notesmbtn.removeAttribute("disabled");
	}else if(el == "mdl"){
		var imgsninf = document.querySelectorAll(".imgsninf");
		 imgsninf.forEach(function (item, index, array) { 
					document.getElementById(index+1).classList.remove("activeimo")
				});
		document.getElementById(noid).classList.add("activeimo")
		$("#modalIm").modal('hide');
		document.getElementById("featuredImage").innerHTML= `<img src="${url}" width="50" class="">`
		document.getElementById("featureimageinput").value= url;

	}
}

function uploadmediafilefuc(){ //when upload media file is click show upload form
	var HCQ = '<center><button class="btn btn-secondary btn-sm" onclick="ImageSummerNote()">Back</button></center><br>';

	 HCQ += `<form id="upload_form" onsubmit="return false;" enctype="multipart/form-data" method="post">
	 	  <div id="divinputs">
		  <input type="file" name="userfiles" id="userfiles" multiple required="required"  accept="image/*"><br><br>
		  <input type="button" value="Upload File" onclick="uploadFile()">
		  </div>
		  <div id="divprogress" style="display:none;">
		  <div class="progress"  >
		  <div class="progress-bar progress-bar-striped progress-bar-animated"  id="progressBar" value="0" max="100" style="width:0%;"></div>
		  </div>
		  </div>
		  <p id="progresstatus" class="text-primary"></p>
		</form>`;
		document.querySelector(".note-group-select-from-files").innerHTML = HCQ;
		document.querySelector(".note-group-image-url").style.display = 'none';
		var notesmbtn = document.querySelector(".note-image-btn");
		notesmbtn.setAttribute("type", "hidden");
}

function uploadFile(){ //upload image(s) to erver
	//var file = document.getElementById("file1").files[0];
	// alert(file.name+" | "+file.size+" | "+file.type);	
	var ufiles = document.getElementById("userfiles").files;
	if(ufiles.length > 0){
		//document.getElementById("divinputs").style.display = "none";
		$("#divinputs").fadeOut();
		var formdata = new FormData();
		formdata.append("olaprium", olaprium);
		formdata.append("auth_ola", auth_ola);
		for (var i = 0; i < ufiles.length; i++) {
		formdata.append("file_"+i, ufiles[i]);
		
		}
		formdata.append("wormonay", "ok");
		var ajax = new XMLHttpRequest();
		ajax.upload.addEventListener("progress", progressHandler, false);
		ajax.addEventListener("load", completeHandler, false);
		ajax.addEventListener("error", errorHandler, false);
		ajax.addEventListener("abort", abortHandler, false);
		ajax.open("POST", "https://mytech.cu.ma/app/");
		ajax.send(formdata);
	}
	
}

function progressHandler(event){ //image upload progress bar
	document.getElementById("divprogress").style.display = 'block';
	//document.getElementById("loaded_n_total").innerHTML = "Uploaded "+event.loaded+" bytes of "+event.total; //I DON'T NEED TO SHOW BYTES, SO I REMOVED THE ID IN HTML TOO
	var percent = (event.loaded / event.total) * 100;
	document.getElementById("progressBar").style.width = Math.round(percent)+"%";
	document.getElementById("progresstatus").innerHTML = Math.round(percent)+"% uploaded... please wait";
}
function completeHandler(event){ //image upload progress bar complete
	document.getElementById("progresstatus").innerHTML = event.target.responseText;
	//document.getElementById("progressBar").value = 0;
	document.getElementById("progressBar").style.width = 100+"%";
	loadimagesdb();
	setTimeout(function(){
            uploadmediafilefuc();
         }, 3000);
}
function errorHandler(event){ //image upload progress bar error
	document.getElementById("progresstatus").innerHTML = "Upload Failed";
}
function abortHandler(event){ //image upload progress bar abort
	document.getElementById("progresstatus").innerHTML = "Upload Aborted";
}

function chunkurl(){ //oninput of title (post page url hidden & showing input)

	var topwhat  = document.getElementById("topwhat").value
		if (topwhat == "create" || topwhat == "edit") { //remove || topwhat == "edit" if not blog $$$
			var hdurl = document.getElementById("hdurl");
			var blgurl = document.getElementById("blgurl");
			var pagestrip = document.getElementById("pagestrip");//hidden input for url
			var title  = document.getElementById("title").value;

			if(myTrim(title).length > 5){
				var noSurl = myTrim(title).replace(/[@\.\,\;\|\&\[\*\+\?\^\=\!\:\$\{\}\(\)[\]\/\#\-\" "]+/g, ' ');
				var dSurl = noSurl.replace(/[" "]+/g, '-');
						hdurl.style.display = "block";
						//This is best way to save it. Because am using netlify & will change to .com letter post# will be change to post/ in the future
						//blgurl.value = "http://localhost/old/hills/post#"+dSurl.toLowerCase(); 
						blgurl.value = dSurl.toLowerCase(); //used temporily because of netlify
						pagestrip.value = noSurl;
			}else if(myTrim(title).length < 5){
						hdurl.style.display = "none";
						blgurl.value = "";
			}
		}
}
function tendorl(){ //ondoubleClick of post url input
		
		var hdurl = document.getElementById("hdurl");
		var blgurl = document.getElementById("blgurl");
		var pagestrip = document.getElementById("pagestrip");//hidden input for url
		var title  = document.getElementById("title").value;
				blgurl.removeAttribute("readonly");
		setTimeout(function(){
        blgurl.setAttribute("readonly", "readonly");
     }, 15000);

		document.getElementById("blgurl").addEventListener("input", function() { 
			var noSurl = blgurl.value.replace(/[@\.\;\|\&\[\*\+\?\^\=\!\:\$\{\}\(\)[\]\/\#\-\" "]+/g, ' ');
			pagestrip.value = noSurl;
		});
}
function categrInPostform(hsdd, pcago) { //making category an checkbox in post form
	if(pcategoryglobal.length > 0){
			var DIH = '';
				pcategoryglobal.forEach(function (item, index, array) {
					DIH += `<input type="checkbox" class="" name="chkcagr[]" id="chkcagr${index}" value="${item.ccCc}"> <label for="${item.categoryName}">${item.categoryName}</label>&ensp;&ensp;`;
				})
			document.getElementById("chpostcategrdiv").innerHTML = DIH;
			if(hsdd == "edit"){
				pcategoryglobal.forEach(function (item, index, array) {	
				for (var i = 0; i < pcago.length; i++) {
						if(item.ccCc == pcago[i]){
							document.getElementById("chkcagr"+index).setAttribute("checked", "checked")
							}
						}
				})
			}
	}else{
		document.getElementById("chpostcategrdiv").innerHTML = "<i>No Post Category Yet</i>"
	}
	
}
function runPostOn(oiue) {			
			var featureimageinput  = document.blogform.featureimageinput.value;	
			var title  = document.blogform.title.value;	
			var messg  = document.blogform.messg.value;
			var topwhat  = document.blogform.topwhat.value;
			var categryofpst = '';
			if(pcategoryglobal.length > 0){
				var casech = '';
				for (var i = 0; i < pcategoryglobal.length; i++) {
					if(document.getElementById("chkcagr"+[i]).checked){
						casech += document.getElementById("chkcagr"+[i]).value+"-"; 
					}
				}
				var mseper =  casech.split("-");
				mseper.pop()

				categryofpst = JSON.stringify(mseper)
				//categryofpst = mseper;
			}


			var featureimageinputDrl = titleDrl = messgDrl = oiueDrl = topwhatDrl = true; 
			
				// Validate featureimageinput
				if(myTrim(featureimageinput) == "") {
		        printError("featureimageinputDrl", "<i class='fas fa-window-close'></i> *Select Your Post Featured Image.");
		    } else {
		        // Check if its lesser than 0
		        if(myTrim(featureimageinput).length < 6) {
		            printError("featureimageinputDrl", "<i class='fas fa-window-close'></i> *Select Your Post Featured Image.");
		        } else{
		            printError("featureimageinputDrl", "");
		            featureimageinputDrl = false;
		        }
		    }
				// Validate title
				if(myTrim(title) == "") {
		        printError("titleDrl", "<i class='fas fa-window-close'></i> *Your Post Title Is Empty");
		    } else {
		        // Check if its lesser than 0
		        if(myTrim(title).length < 2) {
		            printError("titleDrl", "<i class='fas fa-window-close'></i> *Enter Post Title.");
		        } else{
		            printError("titleDrl", "");
		            titleDrl = false;
		        }
		    }
				// Validate messg
				if(myTrim(messg) == "") {
		        printError("messgDrl", "<i class='fas fa-window-close'></i> *Your Post Body Is Empty");
		    } else {
		        // Check if its lesser than 0
		        if(myTrim(messg).length < 10) {
		            printError("messgDrl", "<i class='fas fa-window-close'></i> *Enter A Post.");
		        } else{
		            printError("messgDrl", "");
		            messgDrl = false;
		        }
		    }

		    

		    if(topwhat == "create" || topwhat == "edit"){
		    		topwhatDrl = false;
		    }

		    if(oiue == "publish" || oiue == "draft"){
		    		oiueDrl = false;
		    }

		    if (messg.includes("data:image/")) {
		    	printError("messgDrl", "<i class='fas fa-window-close'></i> *Remove the Coppied Image in Your Post.");
		    	messgDrl = true;
		    }else{
		    	printError("messgDrl", "");
		      messgDrl = false;
		    }

				// Prevent the form from being submitted if there are any errors
			if ((featureimageinputDrl || titleDrl || messgDrl || oiueDrl || topwhatDrl) == true) {
			   return false;
		    } else {
		        pushPost(oiue, categryofpst);
		    }  
}

function pushPost(oiue, categryofpst){		
			var featureimageinput  = document.getElementById("featureimageinput").value;	
			var title  = document.getElementById("title").value;	
			var messg  = document.getElementById("messg").value;
			var blgurl = document.getElementById("blgurl").value;
			var pagestrip = document.getElementById("pagestrip").value;//hidden input for url
			var topwhat = document.getElementById("topwhat").value;//create or edit
			var pgdero = document.getElementById("pgdero").value;//hold id

			
			$.ajax({
				type: "POST",
				url: "https://mytech.cu.ma/app/", 
				dataType: "json",
				data: {olaprium: olaprium, auth_ola: auth_ola, featureimageinput: featureimageinput, title: title, categryofpst: categryofpst, messg: messg, pagestrip: pagestrip, topwhat: topwhat, oiue:oiue, pgdero:pgdero},
				success: function(data){
					
				//FOR PHP
				//$NotMes = array("notification"=>"0", "message"=>"0", "cart"=>"0");
							//echo json_encode($NotMes);
				var slf = data; 
						if(slf.ErrorNote == "none"){
								document.getElementById("postformrow").style.display = 'none';
					 			$("#setpostmsg").fadeIn("slow");
					 			loadallposts();
		        }else{
								document.getElementById("postformrow").style.display = 'none';
								var setpostmsg = document.getElementById("setpostmsg");
								setpostmsg.style.display = 'block';
								setpostmsg.classList.remove("btn-info");
								setpostmsg.classList.add("btn-danger");
								setpostmsg.innerHTML = slf.ErrorMsg;		
		        }
				}
				 
			});
}


function myTrim(x) {
  return x.replace(/^\s+|\s+$/gm,'');
}

String.prototype.nl2br = function(){
	return this.replace(/\n/g, "<br />");
}
function printError(elemId, hintMsg) {
  document.getElementById(elemId).innerHTML = hintMsg;
} 
