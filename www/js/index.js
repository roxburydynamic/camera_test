/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    takePicture: function() {
      navigator.camera.getPicture( function( imageURI ) {
        alert( imageURI );
        window.plugins.socialsharing.share(null, null, imageURI);
      },
      function( message ) {
        alert( message );
      },
      {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
      });
    }
};


document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    $('#getIt').click(function() {
        alert("getting location");
        $("#getIt").css("border-color","red");
        navigator.geolocation.getCurrentPosition(geo_ok, geo_fail, {timeout: 10000, enableHighAccuracy: true} );
    });
}

function geo_ok(pos) {
  alert("got location");
  $('.lat-view').html(pos.coords.latitude);
  $('.long-view').html(pos.coords.longitude);
}
function geo_fail(error) {
  $(".lat-view, .long-view").html("fail");
  alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
}

function scanbarcode() {
  cordova.plugins.barcodeScanner.scan( function (result) {
    $("#lastbarcode").html(result.text);
    //alert("We got a barcode\n" + "Result: " + result.text + "\n" +  "Format: " + result.format + "\n" + "Cancelled: " + result.cancelled);
  }, function (error) {
    alert("Scanning failed: " + error);
  } );
}

function storedata() {
  $("#uploadbutton").html("Uploading...");
  var bc=$("#lastbarcode").html();
  var lat=$(".lat-view").html();
  var lng=$(".long-view").html();
  var url="http://81.109.211.195/appdev/ajaxtesting/?task=store&bc="+bc+"&lat="+lat+"&lng="+lng;
  $.ajax({
    url: url,
    async: false, 
    success: function(data) { 
      $("#uploadbutton").html("Upload Data"); 
      alert("stored "+data+" record(s)");
    }
  });
}