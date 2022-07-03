document.getElementById("commentry").addEventListener("keyup", addAutoResize)//for comments
document.getElementById("categorysdescr").addEventListener("keyup", addAutoResize)//for category description
//document.querySelectorAll(".harmtext").addEventListener("keyup", addAutoResize)
function addAutoResize() {
  document.querySelectorAll('[data-autoresize]').forEach(function (element) {
    element.style.boxSizing = 'border-box';
    var offset = element.offsetHeight - element.clientHeight;
    element.addEventListener('input', function (event) {
      event.target.style.height = 'auto';
      event.target.style.height = event.target.scrollHeight + offset + 'px';
    });
    element.removeAttribute('data-autoresize');
  });
}

function commentryselect() { //select post in comment
	var HCS = '<option value="">Select Post</option>';
	blogposlgblobe.forEach(function(item, index) {
		HCS += `<option value="${item.pcc}">${item.ptitle.substr(0, 30)}</option>`;
	});
		document.getElementById("commentonpost").innerHTML = HCS;
}
function runPostComment() {
		
	var commtp  = document.commentform.commtp.value;	
	var commentonpost  = document.commentform.commentonpost.value;	
	var commenter  = document.commentform.commenter.value;	
	var commentry  = document.commentform.commentry.value; 

	var commtpDrl = commentonpostDrl = commenterDrl = commentryDrl = true; 
	
		// Validate commtp
	if(myTrim(commtp) == "create" || myTrim(commtp) == "create") {
        //printError("commtpDrl", "");
		commtpDrl = false;
    }
		// Validate commenter
		if(myTrim(commentonpost) == "") {
        printError("commentonpostDrl", "<i class='fa fa-window-close'></i> *Select Post");
    } else {
        // Check if its lesser than 0
        if(myTrim(commentonpost).length < 5) {
            printError("commentonpostDrl", "<i class='fa fa-window-close'></i> *Select Post.");
        } else{
            printError("commentonpostDrl", "");
            commentonpostDrl = false;
        }
    }
    	// Validate commenter
		if(myTrim(commenter) == "") {
        printError("commenterDrl", "<i class='fa fa-window-close'></i> *Enter Your Name");
    } else {
        // Check if its lesser than 0
        if(myTrim(commenter).length < 2) {
            printError("commenterDrl", "<i class='fa fa-window-close'></i> *Name Too Short.");
        } else{
            printError("commenterDrl", "");
            commenterDrl = false;
        }
    }
		// Validate commentry
		if(myTrim(commentry) == "") {
        printError("commentryDrl", "<i class='fas fa-window-close'></i> *Enter Comment");
    } else {
        // Check if its lesser than 0
        if(myTrim(commentry).length < 3) {
            printError("commentryDrl", "<i class='fas fa-window-close'></i> *Comment too short.");
        } else{
            printError("commentryDrl", "");
            commentryDrl = false;
        }
    } 
		// Prevent the form from being submitted if there are any errors
	if ((commtpDrl || commenterDrl || commentryDrl || commentonpostDrl) == true) {
	   return false;
    } else {
        sendPostComment();
    }  
	}
	function sendPostComment(){
		
	var commtp  = document.getElementById("commtp").value;	
	var commentonpost  = document.getElementById("commentonpost").value;	
	var commenter  = document.getElementById("commenter").value;	
	var commenterdate  = document.getElementById("commenterdate").value;
	var commentry  = document.getElementById("commentry").value;
		
	$.ajax({
		type: "POST",
		url: "https://mytech.cu.ma/app/", 
		dataType: "json",
		data: {olaprium: olaprium, auth_ola: auth_ola, commtp: commtp, commentonpost: commentonpost, commenter: commenter, commenterdate:commenterdate, commentry: commentry, },
		success: function(data){
			
		var slf = data;
		if(slf.ErrorNote == "none"){
			//commenter = "";
			//document.getElementById("commentry").innerHTML = "";
			document.getElementById("commentform").reset()
			document.getElementById("pcommentcol").style.display = 'none';
			
			$("#setcmmsg").fadeIn("slow");
        }else{
			document.getElementById("pcommentcol").style.display = 'none';
			var setcmmsg = document.getElementById("setcmmsg");
			setcmmsg.style.display = 'block';
			setcmmsg.classList.remove("btn-info");
			setcmmsg.classList.add("btn-danger");
			setcmmsg.innerHTML = slf.ErrorMsg;	
        }
	  }
		 
	});
}

function loadallcomments(){
    var ewi4n20jsl = "ewi4n20jsl";
    $.ajax({
		type: "POST",
		url: "https://mytech.cu.ma/app/", 
		dataType: "json",
		data: {olaprium: olaprium, auth_ola: auth_ola, ewi4n20jsl: ewi4n20jsl},
		success: function(ListResponds){
            pcommentglobe = ListResponds;
            pcommentglobeCount = 1;
			var no = 1;
            var JAI = "";
            JAI += '<table id="listcmtable" cellspacing="24px" cellpadding="10px" class="display table table-head-bg-secondary " style="width:100%">'+
            '<thead>'+
                '<tr>'+ 
                    '<th style="width:1%" scope="col">#</th>'+ 
		'<th style="width:10%" scope="col">Name</th>'+
		'<th style="width:10%" scope="col">Comment</th>'+
		'<th style="width:10%" scope="col">Post</th>'+
		'<th style="width:10%" scope="col">Others</th>'+
                    '<th style="width:5%" scope="col">Action</th>'+	
                    
                '</tr>'+
                '</thead>'+
                '<tbody >';	
            var ListPack = ListResponds;
            ListPack.forEach(function(item, index) {
			JAI +='<tr>';
			JAI += '<td>';
			JAI += no++;
			JAI += '</td>'; 
			JAI +='<td>'+item.commenter+'</td>'+
			'<td>'+item.commenti.substr(0, 15)+'...</td>';
			var jtmn = blogposlgblobe.filter(rilj => rilj.pcc == item.wpost); 
		var ptitle = jtmn.map(kzyf => kzyf.ptitle.substr(0, 15)); 
			
			JAI += '<td>'+ptitle+'...</td>';

			JAI += '<td><b>Page:</b> '+item.cpag+'<br><br> <b>User-Type:</b>  '+item.cuser+'<br><br> <b>IsReply:</b>  '+item.cmreply+'<br><br> <b>Date:</b>  '+item.cdate+'</td>'+

			'<td> <i class="fa fa-trash dtableaction text-danger" id="dele'+item.cmcc+'"></i> </td>'+
			// '<td> <button type="button" class="btn btn-primary" id="view'+item.cmcc+'">View</button> </td>'+
			// '<td> <button type="button" class="btn btn-warning" id="edit'+item.cmcc+'">Update</button> </td>'+
			// '<td> <button type="button" class="btn btn-danger" id="dele'+item.cmcc+'">Delete</button> </td>'+
			'</tr>';
                    
                });
                JAI += '</tbody>'+
                '</table>';
                $("#listcommentcol").html(JAI);
                $("#listcmtable").DataTable();

                ListPack.forEach(function(item, index) { 
                    $('#listcmtable').on('click', '#view'+item.cmcc+'', function(event) {
                      var buqq = item.cmcc;
                       pcommentView(buqq);
                      });
                    });
                ListPack.forEach(function(item, index) { 
                    $('#listcmtable').on('click', '#edit'+item.cmcc+'', function(event) {
                        var buqq = item.cmcc;
                        pcommentUpdate(buqq);
                        });
                    });
                ListPack.forEach(function(item, index) { 
                    $('#listcmtable').on('click', '#dele'+item.cmcc+'', function(event) {
                        var buqq = item.cmcc;
                        pcommentDelete(buqq);
                        });
                    });
		}
	});
}
function pcommentDelete(bpnh) {
	var zzzx = pcommentglobe.filter(kfwt => kfwt.cmcc == bpnh); 
	var commenter = zzzx.map(looq => looq.commenter); 
	var commenti = zzzx.map(looq => looq.commenti);
	var wpost = zzzx.map(looq => looq.wpost); 

	var jtmn = blogposlgblobe.filter(rilj => rilj.pcc == wpost); 
	var ptitle = jtmn.map(kzyf => kzyf.ptitle); 
	$("#modalIm").modal("show");
		document.getElementById("mefhhead").innerHTML = 'Are you sure you want to delete this comment? <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
		document.getElementById("mefbody").innerHTML = `<p><b class="text-primary">User</b><br>
														${commenter}</p>
														<p></p>
														<p><b class="text-primary">Post Title</b><br>
														${ptitle}</p>
														<p></p>
														<p><b class="text-primary">Comment</b><br>
														${commenti}</p>`;
		document.getElementById("meffoot").innerHTML = `<button class="btn btn-danger" onclick="pushcommentDelete('${bpnh}')">Yes</button> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>`;
}
function pushcommentDelete(bpnh) {
	var commentsroid = bpnh;
	$.ajax({
		type: "POST",
		url: "https://mytech.cu.ma/app/",  
		dataType: "json",
		data: {olaprium: olaprium, auth_ola: auth_ola, commentsroid: commentsroid},
		success: function(data){
			
			var slf = data;
			if(slf.ErrorNote == "none"){
				loadallcomments()
				$("#modalIm").modal("hide");
				$("#pcommentmsg").fadeIn("slow");
				loadimagesdb();
				setTimeout(function(){
				$("#pcommentmsg").fadeOut("slow");
			     }, 3000);
	        }else{
				var setpcmsg = document.getElementById("pcommentmsg");
				//pcommentmsg.style.display = 'block';
				$("#pcommentmsg").fadeIn("slow");
				pcommentmsg.classList.remove("btn-info");
				pcommentmsg.classList.add("btn-danger");
				pcommentmsg.innerHTML = slf.ErrorMsg;

				setTimeout(function(){
	        		$("#pcommentmsg").fadeOut("slow");
			     }, 4000);
	        }
		}
		 
	});
}
