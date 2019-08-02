"user strict";
var Class = function(methods) {   
    var klass = function() {
        this.initialize.apply(this, arguments);          
    };
    for (var property in methods) { 
       klass.prototype[property] = methods[property];
    }
    if (!klass.prototype.initialize) klass.prototype.initialize = function(){};
    return klass;
};
var jiraExtend = Class({
    initialize: function(token, refreshToken, tokenLink) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.tokenLink = tokenLink;
		window.token = this.token;	
		window.refreshToken = this.refreshToken;	
		window.tokenLink = this.tokenLink;
    },
    getNewToken: function() {
    	try{
			return new Promise(function(resolve, reject) {
				var xhttp = new XMLHttpRequest();
				xhttp.open("GET", window.tokenLink+"?refresh_token="+window.refreshToken, true);
				xhttp.send();
				xhttp.onload = function() {										
					if (this.readyState === 4 && this.status == 200) {
						window.token = this.responseText.access_token;
			      		resolve(JSON.parse(this.responseText))			      		
				  	} else {
			      		reject(JSON.parse(this.responseText))
				  	}
				};			
			});
		}catch(e){ return e; }
    },
    init: function() {
    	try{
			return new Promise(function(resolve, reject) {				
				var xhttp = new XMLHttpRequest();
				xhttp.open("GET", "https://api.atlassian.com/oauth/token/accessible-resources", true);
				xhttp.setRequestHeader("Accept", "application/json");
				xhttp.setRequestHeader("Authorization", "Bearer "+window.token);
				xhttp.send();
				xhttp.onload = function() {										
					if (this.readyState === 4 && this.status == 200) {					    
			      		resolve(JSON.parse(this.responseText))
				  	} else {
			      		reject(JSON.parse(this.responseText))
				  	}
				};			
			});
		}catch(e){ return e; }
    },
    getCurrentUser: function(url){
    	try{
    		return new Promise(function(resolve, reject) {
				var xhttp = new XMLHttpRequest();
				xhttp.open("GET", url+"/rest/api/3/myself", true);
				xhttp.setRequestHeader("Accept", "application/json");
				xhttp.setRequestHeader("Authorization", "Bearer "+window.token);
				xhttp.send();
				xhttp.onload = function() {										
					if (this.readyState === 4 && this.status == 200) {					    
			      		resolve(JSON.parse(this.responseText))
				  	} else {
			      		reject(JSON.parse(this.responseText))
				  	}
				};			
			});
    	}catch(e){ return e; }
    }
}); 