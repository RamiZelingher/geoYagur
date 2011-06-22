$(document).ready(function() {
       var lon = 35.075;
        var lat = 32.749;
        var zoom =16;
    map = new OpenLayers.Map("mapDiv");
        var mapnik = new OpenLayers.Layer.OSM();
        map.addLayer(mapnik);
        map.setCenter(new OpenLayers.LonLat(lon,lat) // Center of the map
          .transform(
            new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
            new OpenLayers.Projection("EPSG:900913") // to Spherical Mercator Projection
          ),zoom // Zoom level
        );

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
                var vector_layer = new OpenLayers.Layer.Vector('Basic VectorLayer');
                 var point = new OpenLayers.Geometry.Point(3904353.1840742,3862025.5510041);
                 var feature_point = new OpenLayers.Feature.Vector(point);
                  vector_layer.addFeatures([feature_point]);
map.addLayers([mapnik, vector_layer]);
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
       });