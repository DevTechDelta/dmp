var inkvrem = "";
dosofink();
function dosofink() {
    let gothashURL = window.location.hash;
    if(gothashURL == ""){
        furror();
    }else{
        bowmaus("0", "page");
    }
}
function bowmaus(iviv, whos) {
     //ACTIVATE ONCE SPAMING IS NOTICED IN THE COMMENT SECTION
    // mesori = Math.floor(Math.random() * 100);
    // pevori = Math.floor(Math.random() * 10);
    // document.querySelector("#iex9l3").innerHTML = "("+mesori+" + "+pevori+")";
    var gotnewURL = window.location.hash;
    var newURL = gotnewURL.replace("#", "");
    let cusonvrl = newURL;
    $.ajax({
        type: "POST",
        url: "../vine/", 
        dataType: "json",
        data: {cusonvrl: cusonvrl},
        success: function(responds){
            inkvrem = responds;
            var vralx = inkvrem.map(mzkp => mzkp.imbf); 
            if(vralx.length > 5){
                raleciu();
            }else{
                furror();
            }
            
            //newrannew();
        }, error : function(jqXHR, textStatus, errorThrown) {
            let useronline = seeonline();
            if (useronline == 0) {
                alert("Ooops! It seems your network is slow or disconnected")
            }else{
                alert("Ooops! This is not your fault. Try Again...");
            }
    }	 
    }); 
}
function raleciu() { 
    var aozp = inkvrem
    var blogt = aozp.map(mzkp => mzkp.blogt); 
    var blogtx = aozp.map(mzkp => mzkp.blogtx); 
    var imbf = aozp.map(mzkp => mzkp.imbf); 

    var TEXT = `<img class="img-fluid" src="${imbf}" alt="">
    <a href="#"><h4>${blogt}</h4></a>
    
    ${blogtx}

    <div class="news_d_footer">
    
    </div>`;
    document.getElementById("inring").innerHTML = TEXT;
}
function furror(){
    document.getElementById("inring").innerHTML = `<h2 style="color: indianred;">Sorry! Seems the page you are looking for does not exist or has been moved.</h2>`;
}
function seeonline() {
	if (navigator.onLine) {
		return 1;
	}else{
		return 0;
	}
}