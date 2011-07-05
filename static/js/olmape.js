/**
 * Created by .
 * User: rami
 * Date: 29/06/11
 * Time: 04:57
 * To change this template use File | Settings | File Templates.
 */
new olwidget.Map("map", [
        new olwidget.InfoLayer([["POINT (0 0)", "the origin"]], {
            name: "Origin"
        }),
        new olwidget.InfoLayer([["POINT (1 0)", "one degree off"]], {
            name: "A little off"
        })
    ], {
        layers: ['osm.mapnik', 'osm.osmarender']
    });