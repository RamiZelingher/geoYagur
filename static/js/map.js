
    var lon = 35.075;
    var lat = 32.749;
    var zoom =14;
    var yagurMap;
    var mapnik;
    var vector_layer;
    var markers;
    var iconSize;
     var iconOffset;
     var icon;
    var style_green =
    {
        strokeColor: "#000000",
        strokeOpacity: 1,
        strokeWidth: 2,
        fillColor: "#00FF00",
        fillOpacity: 0.6
          };
    $(document).ready(function() {

    yagurMap = new OpenLayers.Map("map");
    mapnik = new OpenLayers.Layer.OSM("מפת רחובות");
    vector_layer = new OpenLayers.Layer.Vector('מבני מגורים')
    markers = new OpenLayers.Layer.Markers( "דגלים" );
    iconSize = new OpenLayers.Size(21, 25);
    iconOffset = new OpenLayers.Pixel(-(iconSize.w / 2), -iconSize.h);
    icon = new OpenLayers.Icon("./static/img/marker.png", iconSize, iconOffset);
    yagurMap.addLayers([mapnik, vector_layer]);
    yagurMap.addLayer(markers);
    yagurMap.setCenter(new OpenLayers.LonLat(lon,lat) // Center of the map
          .transform(
                            new OpenLayers.Projection("EPSG:4326"),
                            yagurMap.getProjectionObject()
                             ),zoom
        );
         var gphy = new OpenLayers.Layer.Google( "מפת קווי גובה", {type: google.maps.MapTypeId.TERRAIN} );
        var gsat = new OpenLayers.Layer.Google("Google Satellite", {type:google.maps.MapTypeId.SATELLITE} );
     yagurMap.addLayers([gphy, gsat]);
     yagurMap.addControl(new OpenLayers.Control.LayerSwitcher());
    // drawBox( yagurMap, mapnik,vector_layer,style_green,35.075,32.749,35.0745,32.749,35.0745,32.7485,35.075,32.7485);
       });
function drawPoint( mape,server,vector,x,y){
            point = new OpenLayers.Geometry.Point(x,y).transform
                    (
                    new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
                    new OpenLayers.Projection("EPSG:900913") // to Spherical Mercator Projection
                     );
            feature_point = new OpenLayers.Feature.Vector(point);
            vector.addFeatures([feature_point]);
}
function drawMarker(mape,server,vector,x,y){
     lonLat = new OpenLayers.LonLat( x,y )
          .transform(
                 new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
                 new OpenLayers.Projection("EPSG:900913") // to Spherical Mercator Projection
                         )
    markers.addMarker(new OpenLayers.Marker(lonLat,icon));
}
function drawBox(map,mapnik, vector,style,x1,y1,x2,y2,x3,y3,x4,y4){
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
    vector.addFeatures([polygonFeature]);
}
function drawKmlOnMap(map,filename){
    url = "../static/kml/"+filename
    alert(url)
    kmllLayer=new OpenLayers.Layer.Vector("KML", {
                strategies: [new OpenLayers.Strategy.Fixed()],
                protocol: new OpenLayers.Protocol.HTTP({
                url: url,
                format: new OpenLayers.Format.KML({
                    extractStyles: true,
                    extractAttributes: true,
                    maxDepth: 2
                })
            })
        })
    map.addLayers([kmllLayer]);
}
