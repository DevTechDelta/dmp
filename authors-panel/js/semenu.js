function imrmenu(){ //image
	document.getElementById("headlodge").innerHTML = "All Media";
	document.getElementById("listpimages").style.display = "block";
	document.getElementById("pcimgmsg").style.display = "none";
	document.getElementById("listpcategory").style.display = "none";
	document.getElementById("pcategory").style.display = "none";
	document.getElementById("listofposts").style.display = "none";
	document.getElementById("summerpost").style.display = "none";
	document.getElementById("pcomment").style.display = "none";
	document.getElementById("listpcomment").style.display = "none";
}
function npmenu(){ //new post
	document.getElementById("headlodge").innerHTML = "Create New Post";
	onform()
	document.getElementById("listpimages").style.display = "none";
	document.getElementById("pcomment").style.display = "none";
	document.getElementById("listpcomment").style.display = "none";
	document.getElementById("blogform").reset();
	document.getElementById("topwhat").value = "create";
	document.getElementById("featureimageinput").value = "";
	document.getElementById("messg").value = ""; 
	document.getElementById("pgdero").value = "";
	document.getElementById("featuredImage").innerHTML = "";
	document.querySelector(".note-editable").innerHTML = "";
	var pcago = '';
	categrInPostform("create", pcago)
}
function apmenu() { //all post
	document.getElementById("headlodge").innerHTML = "All Post";
	document.getElementById("listpimages").style.display = "none";
	document.getElementById("summerpost").style.display = "none";
	document.getElementById("pcomment").style.display = "none";
	document.getElementById("listofposts").style.display = "block";
	document.getElementById("listpcategory").style.display = "none";
	document.getElementById("pcategory").style.display = "none";
	document.getElementById("listpcomment").style.display = "none";
	//offform()
	//document.getElementById("topwhat").value = "create";
}
function crallmenu() { //all cat
	document.getElementById("headlodge").innerHTML = "All Category";
	document.getElementById("listpimages").style.display = "none";
	document.getElementById("pcomment").style.display = "none";
	document.getElementById("listpcomment").style.display = "none";
	document.getElementById("summerpost").style.display = "none";
	document.getElementById("listofposts").style.display = "none";
	document.getElementById("pcategory").style.display = "none";
	document.getElementById("listpcategory").style.display = "block";
}
function crcrtmenu() { //create cat
	document.getElementById("headlodge").innerHTML = "Create New Category";
	document.getElementById("pcategoryptbt").innerHTML = "Create Post Category";
	document.getElementById("listpimages").style.display = "none";
	document.getElementById("pcomment").style.display = "none";
	document.getElementById("listpcomment").style.display = "none";
	document.getElementById("categoryform").reset();
	document.getElementById("summerpost").style.display = "none";
	document.getElementById("listofposts").style.display = "none";
	document.getElementById("listpcategory").style.display = "none";
	document.getElementById("setpcmsg").style.display = "none";
	document.getElementById("pcategory").style.display = "block";
	document.getElementById("pcategorycol").style.display = "block";
	document.getElementById("categorysDrl").innerHTML = "";
	document.getElementById("categorysdescrDrl").innerHTML = "";
	document.getElementById("crage").value = "create";	
}
function cmmctmenu() { //create comment
	commentryselect();
	document.getElementById("listpimages").style.display = "none";
	document.getElementById("summerpost").style.display = "none";
	document.getElementById("listofposts").style.display = "none";
	document.getElementById("listpcategory").style.display = "none";
	document.getElementById("listpcomment").style.display = "none";
	document.getElementById("pcategory").style.display = "none";
	document.getElementById("pcomment").style.display = "block";
	document.getElementById("pcommentcol").style.display = "block";
	document.getElementById("setcmmsg").style.display = "none";
	document.getElementById("commentonpostDrl").innerHTML = "";
	document.getElementById("commenterDrl").innerHTML = "";
	document.getElementById("commentryDrl").innerHTML = "";

}
function cmmalmenu() { //all cooment
	loadallcomments();
	document.getElementById("listpimages").style.display = "none";
	document.getElementById("summerpost").style.display = "none";
	document.getElementById("listofposts").style.display = "none";
	document.getElementById("listpcategory").style.display = "none";
	document.getElementById("pcomment").style.display = "none";
	document.getElementById("pcategory").style.display = "none";
	document.getElementById("listpcomment").style.display = "block";
}

function onform() {
	document.getElementById("summerpost").style.display = "block";
	document.getElementById("postformrow").style.display = "block";
	document.getElementById("listofposts").style.display = "none";
	document.getElementById("setpostmsg").style.display = "none";
	document.getElementById("listpcategory").style.display = "none";
	document.getElementById("pcategory").style.display = "none";
	document.getElementById("listpcomment").style.display = "none";
	document.getElementById("featureimageinputDrl").innerHTML = "";
	document.getElementById("titleDrl").innerHTML = "";
	document.getElementById("messgDrl").innerHTML = "";
}
function onlineoffline() {
	if (navigator.onLine) {
		return 1;
	}else{
		return 0;
	}
}
function logout() {
	var goovrkwuowb = "goovrkwuowb";
	  $.ajax({
	    type: "POST",
	    url: "./app/",
	    data: {olaprium: olaprium, auth_ola: auth_ola, goovrkwuowb: goovrkwuowb},
	    success: function(data){
			document.cookie = "olaprium= 0 ; expires=Thu, 18 Dec 1999 12:00:00 UTC; path=/";
            document.cookie = "auth_ola= 0; expires=Thu, 18 Dec 1999 12:00:00 UTC; path=/";
	      window.location.reload();
	    }
	  });
}