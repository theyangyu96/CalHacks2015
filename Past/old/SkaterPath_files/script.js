
$(document).ready(function(){
   $("#feedbackPanel").hide();
});

document.getElementById("searchButton").addEventListener("click", function(){
	console.log("searchButton");
	$("#searchButton").addClass("active");
	$("#feedbackButton").removeClass();
    $("#feedbackPanel").hide();
    $("#pathInput").show();
});

document.getElementById("feedbackButton").addEventListener("click", function(){
	console.log("feeedbackButton");
	$("#feedbackButton").addClass("active");
	$("#searchButton").removeClass();
    $("#feedbackPanel").show();
    $("#pathInput").hide();
});

//reverse Geo
var addressAsString;

function reverseGeo(point){
  // Create the parameters for the reverse geocoding request:
  var reverseGeocodingParameters = {
        prox: point,
        mode: 'retrieveAddresses',
        maxresults: 1
      };

  // Define a callback function to process the response:
  function onReverseSuccess(result) {
    var location = result.Response.View[0].Result[0];
    addressAsString = location.Location.Address.Label;
  };

  // Get an instance of the geocoding service:
  var geocoder = platform.getGeocodingService();

  // Call the geocode method with the geocoding parameters,
  // the callback and an error callback function (called if a
  // communication error occurs):
  geocoder.reverseGeocode(
      reverseGeocodingParameters,
      onReverseSuccess,
      onError);
}

//map part js code
 
 function setMapViewBounds(map){
  var bbox = new H.geo.Rect(37.8750,-122.2600 ,37.8675, -122.2585);
  map.setViewBounds(bbox);
}


function addMarkersToMap(map, lat, lng) {
  var Marker = new H.map.Marker({lat:lat, lng:lng});
  map.addObject(Marker);
}

/*
 * Boilerplate map initialization code starts below:*/
 

//Step 1: initialize communication with the platform
var platform = new H.service.Platform({
  app_id: 'JJi3EJfcCSqAXMniWrE7',
    app_code: 'LWcyk9S8poGNtF1Kgrdh0g',
    useCIT: true,
    useHTTPS: true
});
var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map  - not specificing a location will give a whole world view.
var map = new H.Map(document.getElementById('map'),
  defaultLayers.normal.map);

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
var coords = [];
var x;
var y;
var num_marker = 0;

map.addEventListener('dbltap', function(evt) {
      // Log 'tap' and 'mouse' events:
      console.log(evt.type, evt.currentPointer);
      x = evt.currentPointer.viewportX;
      y = evt.currentPointer.viewportY;
      var pt = map.screenToGeo(x, y);
      console.log(pt);
      coords.push(pt);
      addMarkersToMap(map, pt.lat, pt.lng);
      num_marker +=1;
      if(num_marker==1){
        reverseGeo(pt);
        console.log(addressAsString,"addresss output");
      }
      if (num_marker == 2) {
        calculateRouteFromAtoB(platform);
      }

  });

document.getElementById('submit').addEventListener('click',function(){
	if(document.getElementById("start_add").value!="" && document.getElementById("end_add").value!=""){
		var start_add = document.getElementById("start_add").value;
		var end_add = document.getElementById("end_add").value;
		DrawMarkOnMap(start_add,platform);
		DrawMarkOnMap(end_add,platform);
	}else{
		alert("Please input valid information");
		$("#start_add").val(' ');
		$("#end_add").val(' ');
	}
});


function addLocationsToMap(locations){
  var group = new  H.map.Group(),
    position,
    i;

  // Add a marker for each location found
  for (i = 0;  i < locations.length; i += 1) {
    position = {
      lat: locations[i].location.displayPosition.latitude,
      lng: locations[i].location.displayPosition.longitude
    };
    marker = new H.map.Marker(position);
    marker.label = locations[i].location.address.label;
    group.addObject(marker);
  }

  group.addEventListener('tap', function (evt) {
    map.setCenter(evt.target.getPosition());
    openBubble(
       evt.target.getPosition(), evt.target.label);
  }, false);

  // Add the locations group to the map
  map.addObject(group);
  map.setCenter(group.getBounds().getCenter());
}

function DrawMarkOnMap(address,platform){
	var geocodingParameters = {
  	//Initialize with address from text field
	searchText:address,
 	jsonattributes : 1
	};
	geocode(platform,geocodingParameters);
}




function geocode(platform, geoparameter) {
  var geocoder = platform.getGeocodingService();
  geocoder.geocode(
    geoparameter,
    onAddressResult,
    onError
  );
}

function onAddressResult(result) {
  //TODO: Check if view is empty before accessing; display error message/empty return if empty
  if(result.response.view.length > 0){
    var locations = result.response.view[0].result;
    addLocationsToMap(locations);
  }
}
  
// Create the parameters for the routing request:
var routingParameters = {
  // The routing mode:
  'mode': 'fastest;pedestrian',
  // The start point of the route:
  'waypoint0': 'geo!50.1120423728813,8.68340740740811',
  // The end point of the route:
  'waypoint1': 'geo!52.5309916298853,13.3846220493377',
  // To retrieve the shape of the route we choose the route
  // representation mode 'display'
  'representation': 'display'
};

//Step 4: color the strips within a specific route depends on difficulty
// Define a callback function to process the routing response:
// Create the parameters for the routing request:
var routingParameters = {
  // The routing mode:
  'mode': 'shortest;pedestrian',
  // The start point of the route:
  'waypoint0': 'geo!37.87064505118588,-122.26333737373352',
  // The end point of the route:
  'waypoint1': 'geo!37.876788087579605,-122.24207315593961',
  // To retrieve the shape of the route we choose the route
  // representation mode 'display'
  'representation': 'display'
};




var onResult = function(result) {
  var route,
      routeShape,
      startPoint,
      endPoint,
      strip;
  if(result.response.route) {
    // Pick the first route from the response:
    route = result.response.route[0];
    // Pick the route's shape:
    routeShape = route.shape;

    // Create a strip to use as a point source for the route line
    strip = new H.geo.Strip();
    var routeLine;
    var colorSet = ['blue','red','green','yellow','black'];

    // Push all the points in the shape into the strip:
    routeShape.forEach(function(point) {
      var parts = point.split(',');
      strip.pushLatLngAlt(parts[0], parts[1]);
    });

    var size = strip.Oa.length;
    console.log(size,"size");
   
    var i = 0;
    while(i!=size-3){
      var segment = new H.geo.Strip();
      // console.log(strip.Oa[i],"strip");
      segment.pushLatLngAlt(strip.Oa[i],strip.Oa[i+1]);
      segment.pushLatLngAlt(strip.Oa[i+3],strip.Oa[i+4]);

      //color depends on the difficulty level
      //current set up as random generation
      var color = colorSet[getRandomIntInclusive(0, 4)];

      routeLine = new H.map.Polyline(segment, {
      style: { strokeColor: color, lineWidth: 5 }
      });

      map.addObjects([routeLine]);
      map.setViewBounds(routeLine.getBounds());
      i += 3;
    }

    // Retrieve the mapped positions of the requested waypoints:
    startPoint = route.waypoint[0].mappedPosition;
    endPoint = route.waypoint[1].mappedPosition;

    // Create a marker for the start point:
    var startMarker = new H.map.Marker({
      lat: startPoint.latitude,
      lng: startPoint.longitude
    });

    // Create a marker for the end point:
    var endMarker = new H.map.Marker({
      lat: endPoint.latitude,
      lng: endPoint.longitude
    });

    // Add the route polyline and the two markers to the map:
    //map.addObjects([routeLine, startMarker, endMarker]);
    //map.addObjects([startMarker, endMarker]);

    // Set the map's viewport to make the whole route visible:
    // map.setViewBounds(routeLine.getBounds());
  }
};

// Get an instance of the routing service:
var router = platform.getRoutingService();

// Call calculateRoute() with the routing parameters,
// the callback and an error callback function (called if a
// communication error occurs):
router.calculateRoute(routingParameters, onResult,
    function(error) {
        alert(error.message);
    });


function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Routing algorithm
function calculateRouteFromAtoB (platform) {
  var router = platform.getRoutingService(),
    routeRequestParams = {
      mode: 'shortest;pedestrian',
      representation: 'display',
      waypoint0: coords[0].lat+","+coords[0].lng, // St Paul's Cathedral
      waypoint1: coords[1].lat+","+coords[1].lng,  // Tate Modern
      routeattributes: 'waypoints,summary,shape,legs',
      maneuverattributes: 'direction,action'
    };

  router.calculateRoute(
    routeRequestParams,
    onSuccess,
    onError
  );
}

function onSuccess(result) {
  var route = result.response.route[0];
  console.log(route);
 /*
  * The styling of the route response on the map is entirely under the developer's control.
  * A representitive styling can be found the full JS + HTML code of this example
  * in the functions below:
  */
  addRouteShapeToMap(route);
  
}

function onError(error) {
  alert('Ooops!');
}

function addRouteShapeToMap(route){
  var strip = new H.geo.Strip(),
    routeShape = route.shape,
    polyline;

  routeShape.forEach(function(point) {
    var parts = point.split(',');
    strip.pushLatLngAlt(parts[0], parts[1]);
  });

  polyline = new H.map.Polyline(strip, {
    style: {
      lineWidth: 4,
      strokeColor: 'rgba(0, 128, 255, 0.7)'
    }
  });
  // Add the polyline to the map
  map.addObject(polyline);
  // And zoom to its bounding rectangle
  map.setViewBounds(polyline.getBounds(), true);
}

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Now use the map as required...

// Now use the map as required...
setMapViewBounds(map);