const config = require("../config/config.json");


export function google_analytics() {
    return config.google_analytics ? config.google_analytics : "UA-000000-01";
}


export function app_url() {
    if(config.app_url)
        return config.app_url;

}

export function link_type() {
    if(config.link_type)
        return config.link_type;
}

export function server_url() {
    if(config.server_url)
        return config.server_url;

}

export function sourse_url() 
{
    if(config.server_url)
	{
        let ser = [ ...config.server_url.split("/") ];
		ser.pop();
		return ser.join("/");
	}

}
export function upload_url() {
    if(config.upload_url)
        return config.upload_url;

}

export function assertion_token() {
    if(config.assertion_token)
        return config.assertion_token;

}

export function yandex_map_api_key() {
    if(config.yandex_map_api_key)
        return config.yandex_map_api_key;
	else
		return "NONE";
}

export function app_layouts() {
    if(config.app_layouts)
        return config.app_layouts;

}

