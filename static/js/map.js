$(document).ready(function() {
    var lon = 35.075;
    var lat = 32.749;
    var zoom =16;
    var yagurMap = new OpenLayers.Map("mapDiv");
    var mapnik = new OpenLayers.Layer.OSM();
        yagurMap.addLayer(mapnik);
        yagurMap.setCenter(new OpenLayers.LonLat(lon,lat) // Center of the map
          .transform(
            new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
            new OpenLayers.Projection("EPSG:900913") // to Spherical Mercator Projection
          ),zoom // Zoom level
        );
     var vector_layer = new OpenLayers.Layer.Vector('Basic VectorLayer')
    var style_green =
    {
        strokeColor: "#000000",
        strokeOpacity: 1,
        strokeWidth: 2,
        fillColor: "#00FF00",
        fillOpacity: 0.6
    };
     drawPoint( yagurMap,mapnik,vector_layer,35.075,32.749);
    drawBox(yagurMap,mapnik,vector_layer,style_green,35.075,32.760,35.1,33.1,35.075,33.160,35.075,32.760);

       });
/*
var control = new OpenLayers.Control();
                OpenLayers.Util.extend(control, {
                    draw: function () {
                        // this Handler.Box will intercept the shift-mousedown
                        // before Control.MouseDefault gets to see it
                        this.box = new OpenLayers.Handler.Box( control,
                            {"done": this.notice},
                            {keyMask: OpenLayers.Handler.MOD_SHIFT});
                        this.box.activate();
                    },

                    notice: function (bounds) {
                        var ll = map.getLonLatFromPixel(new OpenLayers.Pixel(bounds.left, bounds.bottom));
                        var ur = map.getLonLatFromPixel(new OpenLayers.Pixel(bounds.right, bounds.top));
                        alert(ll.lon.toFixed(4) + "/n " +
                              ll.lat.toFixed(4) + ", " +
                              ur.lon.toFixed(4) + ", " +
                              ur.lat.toFixed(4));
                    }
                });
map.addControl(control);

map.addControl(new OpenLayers.Control.EditingToolbar(vector_layer));
map.layers[1].preFeatureInsert = function(feature){
                                                            alert('preFeatureInsert – ID: ' + feature.id+""+feature.geometryTypes)
                                                            };
map.layers[1].onFeatureInsert = function(feature){
                                                            alert('onFeatureInsert - Geometry:' + feature.geometry)
                                                                };
                var markers = new OpenLayers.Layer.Markers("Cities");
                var location = new OpenLayers.LonLat(3904353.1840742,3862025.5510041);
                 var size = new OpenLayers.Size(21,25);
                 var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
                 var icon = new OpenLayers.Icon('http://www.openlayers.org/dev/img/marker.png',size,offset);
                 markers.addMarker(new OpenLayers.Marker(location,icon.clone()));
map.addLayer(markers);
map.addControl(new OpenLayers.Control.MousePosition());
map.events.register("mousemove", map, function(e) {
                var position = this.events.getMousePosition(e);
                OpenLayers.Util.getElement("coordsDiv").innerHTML = position;
                                 });
    map.addControl(new OpenLayers.Control.LayerSwitcher());
 */
function drawPoint(map,mapnik, vector_layer,x,y){
            point = new OpenLayers.Geometry.Point(x,y).transform
                    (
                    new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
                    new OpenLayers.Projection("EPSG:900913") // to Spherical Mercator Projection
                     );
            feature_point = new OpenLayers.Feature.Vector(point);
            vector_layer.addFeatures([feature_point]);
            map.addLayers([mapnik, vector_layer]);

}

function drawBox(map,mapnik, vector_layer,style,x1,y1,x2,y2,x3,y3,x4,y4){
            p1 = new OpenLayers.Geometry.Point(x1,y1).transform
                    (
                    new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
                    new OpenLayers.Projection("EPSG:900913") // to Spherical Mercator Projection
                     );
             p2 = new OpenLayers.Geometry.Point(x2,y2).transform
                    (
                    new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
                    new OpenLayers.Projection("EPSG:900913") // to Spherical Mercator Projection
                     );
             p3 = new OpenLayers.Geometry.Point(x3,y3).transform
                    (
                    new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
                    new OpenLayers.Projection("EPSG:900913") // to Spherical Mercator Projection
                     );
             p4 = new OpenLayers.Geometry.Point(x4,y4).transform
                    (
                    new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
                    new OpenLayers.Projection("EPSG:900913") // to Spherical Mercator Projection
                     );
    var points = [];
    points.push(p1);
    points.push(p2);
    points.push(p3);
    points.push(p4);

    // create a polygon feature from a list of points
    var linearRing = new OpenLayers.Geometry.LinearRing(points);
    var polygonFeature = new OpenLayers.Feature.Vector(linearRing,null, style);
    vector_layer.addFeatures([polygonFeature]);
    map.addLayers([mapnik, vector_layer]);

}