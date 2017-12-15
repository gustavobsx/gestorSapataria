SAPATARIA = new Object();
		SAPATARIA.cookie = function() {
			var login = document.getElementById("login").value;
			document.cookie = (login);
		/* para ler o cookie	
			var x = document.cookie;
			alert("O valor que guardei no seu cookie é: "+x); */
		};
		
		SAPATARIA.cookie.deleteAllCookies = function() {
			 var c = document.cookie.split("; ");
			 for (i in c) 
			  document.cookie =/^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT";    
			}
					