const express = require('express');
const app = express();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// const request = require('request');

// app.get('/', (request, response) => {
//   response.send('hello brian');
// });

// const options = {
//   method: 'GET',
//   url: 'http://fasttrack.herokuapp.com/',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// }

// request(options, function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });


//compare old and current url path
let ajaxUrl = 'http://fasttrack.herokuapp.com';
let oldUrlPath = '';

function apiCall(url){
  var responseHandler = function() {
    console.log("response text", JSON.parse(this.responseText));

    //update variables for comparison in the next loop
    oldUrlPath = ajaxUrl;

    console.log(ajaxUrl.split('/'));
    let ajaxUrlArray = ajaxUrl.split('/')
    
    if (ajaxUrlArray.length <= 3){
      ajaxUrl += JSON.parse(this.responseText).next
      console.log('3 member', oldUrlPath)
    } else {
      console.log('4 member')
      ajaxUrlArray[3] = JSON.parse(this.responseText).next
      ajaxUrl = ajaxUrlArray[0] + '//' + ajaxUrlArray[2] + ajaxUrlArray[3]
      console.log('new', ajaxUrlArray)
    }
    
    // repeatedly calling itself if the url is different
    if(ajaxUrl !== oldUrlPath){
      apiCall(ajaxUrl)
    }

  };
  
  var request = new XMLHttpRequest();
  request.addEventListener("load", responseHandler);
  request.open("GET", url);
  request.setRequestHeader("Accept", "application/json");
  request.send();
};

console.log('calling api' , apiCall('http://fasttrack.herokuapp.com'))



// const repeatApiCall = function(){
//   console.log('running repeat API')
//   if(ajaxUrl !== oldUrlPath){
//     apiCall('http://fasttrack.herokuapp.com')
//   }
// }

// repeatApiCall();

app.listen(3000);