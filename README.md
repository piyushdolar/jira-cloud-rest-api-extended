### Features

- Support Standard JavaScript format.
- Library built in Core JavaScript no need use JQuery.
- Easy function formating to get requested REST API data.

###Requirements
- Your jira app with configured with your server.
- Setup refresh token API in your server.
- token of logged in user.
- refresh token of logged in user.

####Initialize function

`var jira = new jiraExtend(token, refreshToken, refreshTokenLink);`

####Usage

Below is list of function help to usage of your Jira Cloud Rest API

####Javascript　

```javascript
// To get new refresh tokne from library
jira.getNewToken().then(function(result) {		  
	console.log(result);
}).catch(function(e) {
	console.log(e);
});
		
// To get logged in user Jira App detail name and link
jira.init().then(function(result) {
	console.log(result);
}).catch(function(e) { 
	console.log(e); 
});

// To get detail of current logged in user 
jira.getCurrentUser(result[0].url).then(function(result) {		  
	console.log(result);
}).catch(function(e) { console.log(e); })
```
