import layouts from "./layouts";
const config = require("../config/config.json");

//longitude, latitude, zoom
const default_coords = [ 55.76, 37.64, 10 ];

export function yandex_map_api_key() {
    if(config.yandex_map_api_key)
        return config.yandex_map_api_key;
    else
        return "NONE";
}

export function geoDefaultPosition() {
    return default_coords;
}

export function geoPosition() {
    console.log(layouts.template.ymap );
    if (layouts.template && layouts.template.ymap) {
        console.log(layouts.template.ymap.default );
        return layouts.template.ymap.default ? [layouts.template.ymap.default.lon, layouts.template.ymap.default.lat, layouts.template.ymap.default.zoom] : default_coords;
    } else {
        return default_coords;
    }
}

export function zoom() {
    if(layouts.template.ymap){
        return layouts.template.ymap.default ? layouts.template.ymap.default.zoom : default_coords[2];
    }else{
        return default_coords[2];
    }
}

