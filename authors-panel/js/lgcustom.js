$(".se-pre-con").hide();
function submitReg() {

}

function submitIn() {
    var name_email  = document.getElementById("name_email").value;
  	var pass  = document.getElementById("pass").value;
	  var name_emailDlr = passDlr = true;

		// Validate name_email
    if(myTrim(name_email) == "") {
        seetatt("name_emailDlr", "help-block")
        printError("name_emailDlr", "<i class='fa fa-window-close'></i> Please enter your email address");
    } else {
        // Regular expression for basic email validation
        var regex = /^\S+@\S+\.\S+$/;
        if(regex.test(name_email) === false) {
            seetatt("name_emailDlr", "help-block")
            printError("name_emailDlr", "<i class='fa fa-window-close'></i> Please enter a valid email address");
        } else{
            seetatt("name_emailDlr", "")
            printError("name_emailDlr", "");
            name_emailDlr = false;
        }
    }
		// Validate pass
    if(myTrim(pass) == "") {
        seetatt("passDlr", "help-block")
        printError("passDlr", "<i class='fa fa-window-close'></i> Please enter your password");
    } else {
        if(myTrim(pass).length < 6){
      seetatt("passDlr", "help-block")
			printError("passDlr", "<i class='fa fa-window-close'></i> Incorrect Password");
		} else if(myTrim(pass).length > 30){
      seetatt("passDlr", "help-block")
			printError("passDlr", "<i class='fa fa-window-close'></i> Password is too long");
		} else{
            printError("passDlr", "");
            passDlr = false;
        }
    }
		// Prevent the form from being submitted if there are any errors
	if ((name_emailDlr || passDlr) == true) {
	   return false;
    } else {
        WalkingIn()
    }
	}

  function WalkingIn(){

	var name_email  = document.getElementById("name_email").value;
	var pass  = document.getElementById("pass").value;
	$.ajax({
		type: "POST",
		url: "./app/",
		dataType: "json",
		data: {name_email: name_email, pass: pass, },
		success: function(data){
			//$("#rufusLohn").html(data);


  		var slf = data;
  		if(slf.ErrorNote == "none"){
        document.cookie = "olaprium = "+slf.olat+"; expires=Thu, 22 Dec 2022 12:00:00 UTC; path=/";
        document.cookie = "auth_ola = "+slf.muta+"; expires=Thu, 22 Dec 2022 12:00:00 UTC; path=/";
        window.location.reload();
      }else{
        $(".category-headding").html(slf.ErrorMsg);
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
  function seetatt(elemId, cName) {
    document.getElementById(elemId).setAttribute("class", cName);

  }
