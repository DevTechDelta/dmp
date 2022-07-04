var catcocom = "";
var pemcocom = "";
emscitco();
function emscitco() {
    let winsin = "viljkJlJSlweinvsNslei";
    $.ajax({
		type: "POST",
		url: "https://leaptvnews.com/nk/vine/", 
		dataType: "json",
		data: {winsin: winsin},
		success: function(respond){
			catcocom = respond;
            emspstfo();
		},error : function(jqXHR, textStatus, errorThrown) {
            let useronline = seeonline();
            if (useronline == 0) {
                alert("Ooops! It seems your network is slow or disconnected")
            }else{
                alert("Ooops! This is not your fault. Try Again...");
            }
        }	 
	});
}
function emspstfo() {
    let vimpin = "sj493jbJHGY3jMNeow3";
    $.ajax({
		type: "POST",
		url: "https://leaptvnews.com/nk/vine/", 
		dataType: "json",
		data: {vimpin: vimpin},
		success: function(respond){
			pemcocom = respond;
            wordpmaker();
		},error : function(jqXHR, textStatus, errorThrown) {
            let useronline = seeonline();
            if (useronline == 0) {
                alert("Ooops! It seems your network is slow or disconnected")
            }else{
                alert("Ooops! This is not your fault. Try Again...");
            }
        }	 
	});
}
function wordpmaker() {
    var pemLenght = pemcocom.length;
    var pemLease = pemLenght - 2;
    
    var pemLeft = pemcocom.slice(0, pemLease);
    var pemRight = pemcocom.slice(pemLease, pemLenght);
    
    var TEXT = "";
    var ccinm = "";
    pemLeft.forEach(function(item, index) {
        var cco = item.cci
		cco = JSON.stringify(cco);
		
		if(cco.length > 5){
			var cci = JSON.parse(item.cci);
		}else{
			var cci = '';
		}
        catcocom.forEach(function (ztem, index, array) {	
            for (var i = 0; i < cci.length; i++) {
                if(ztem.csi == cci[i]){
                    ccinm = ztem.cs
                }
            }
        })
        TEXT += `<div class="media">
        <div class="d-flex">
        <img class="img-fluid" src="${item.imgf}" width="400px" alt="">
        </div>
        <div class="media-body">
        <div class="choice_text">
        <div class="date">
        <a class="gad_btn" href="javascript:;">${ccinm}</a>
        
        </div>
        <a href="./post/#${item.blogul}"><h4>${item.blogsub} </h4></a>
        <p>${item.blogmin}... </p>
        <a href="./post/#${item.blogul}" class="btn btn-primary btn-sm rnm">Read More</a>
        </div>
        </div>
        </div>`;
    });
    document.getElementById("inhole").innerHTML = TEXT;

    var IMV = '';
    pemRight.forEach(function(item, index) {
        IMV += `<div class="item" style="margin-right:10px;">
        <div class="choice_item">
        <img src="${item.imgf}" width="150px" alt="">
        <div class="choice_text">
        <a href="./post/#${item.blogul}"><h4>${item.blogsub}</h4></a>
        </div>
        </div>
        </div>`;
    });
    document.getElementById("budhole").innerHTML = IMV;
    
}
function seeonline() {
	if (navigator.onLine) {
		return 1;
	}else{
		return 0;
	}
}
