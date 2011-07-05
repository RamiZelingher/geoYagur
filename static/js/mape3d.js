/**
 * Created by .
 * User: rami
 * Date: 29/06/11
 * Time: 08:01
 * To change this template use File | Settings | File Templates.
 */
google.load("earth", "1");
var ge = null;
var lookAt = null;
var placemark = null;
 var point = null;
var balloon = null;
var lineString = null;

$(document).ready(function() {
google.earth.createInstance("map", initCallback, failureCallback);

			});

function initCallback(object) {
  ge = object;
  ge.getWindow().setVisibility(true);
  ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);
  ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
  view (32.741433,35.078658,3000);
 
 // createPlacemark("kibutz yagur",  32.741433,35.078658);
 //showBallon(placemark,"line 39" );
 // alert(String(arrayOfPoints[1].x));
 // showPoligon (arrayOfPoints);
  //showkml(kmlstring);
}

function failureCallback(object) {
}

function createPlacemark(Markname,x,y) {
  placemark = ge.createPlacemark('');
  placemark.setName(Markname);
  ge.getFeatures().appendChild(placemark);

  // Create style map for placemark
  var icon = ge.createIcon('');
  icon.setHref('http://localhost/geoyagur/static/img/red-circle.png');
  var style = ge.createStyle('');
  style.getIconStyle().setIcon(icon);
  placemark.setStyleSelector(style);

  // Create point
  var la = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
  point = ge.createPoint('');
  point.setLatitude(x);
  point.setLongitude(y);
  placemark.setGeometry(point);

}

function view(x,y,z) {
// Create a new LookAt
 lookAt = ge.createLookAt('');

// Set the position values
lookAt.setLatitude(x);
lookAt.setLongitude(y);
lookAt.setRange(z);

// Update the view in Google Earth
ge.getView().setAbstractView(lookAt);
}

function showBallon(placemark,msg) {
		balloon = ge.createHtmlStringBalloon('');
		balloon.setFeature(placemark);
		balloon.setMinWidth(200);
		balloon.setMaxHeight(100);
		balloon.setCloseButtonEnabled(true);
		balloon.setContentString(msg);
		ge.setBalloon(balloon);
				}
function showkml(kmlString){
		var kmlObject = ge.parseKml(kmlString);
         ge.getFeatures().appendChild(kmlObject);
		 ge.getView().setAbstractView(kmlObject.getAbstractView());
}

function showPoligon (vertex) {
// Create the placemark

var lineStringPlacemark = ge.createPlacemark('');

// Create the LineString
var lineString = ge.createLineString('');
lineStringPlacemark.setGeometry(lineString);

// Add LineString points
var len = vertex.length;
for(var i = 0; i < len; i++) {
        lineString.getCoordinates().pushLatLngAlt(vertex[i].x,vertex[i].y, 0);
}
// Create a style and set width and color of line
lineStringPlacemark.setStyleSelector(ge.createStyle(''));
var lineStyle = lineStringPlacemark.getStyleSelector().getLineStyle();
lineStyle.setWidth(5);
lineStyle.getColor().set('9900ffff');  // aabbggrr format


// Add the feature to Earth
ge.getFeatures().appendChild(lineStringPlacemark);
}

