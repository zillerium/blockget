function getBalance() {
    account  = document.getElementById("walletaddress").value;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://blockget.store:3000/getfullaccounts", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("account=" + account );
    xhttp.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.response);
        if (data.message != "Correct") {
	    console.log("error ");	
        } else {
           balance = data.balance;
           document.getElementById("walletaddressbalance").innerHTML=balance;
        }
      }
    };
}
