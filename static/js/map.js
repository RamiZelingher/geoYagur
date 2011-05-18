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
                        alert(ll.lon.toFixed(4) + ", " +
                              ll.lat.toFixed(4) + ", " +
                              ur.lon.toFixed(4) + ", " +
                              ur.lat.toFixed(4));
                    }
                });
  map.addControl(control);
       });