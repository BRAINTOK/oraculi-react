import { MD5, base64_encode, base64_decode, getCookie } from "./utilities/utils";
import User from "./utilities/User";
import {wpfest_server_url} from "../../config/config.json";
import {AppToaster} from "../../layouts/utilities/blueUtils";
import { 
	Icon, Tag, Classes, Collapse,
	PopoverInteractionKind, PopoverPosition,
	Intent, Tooltip, Dialog,
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, Callout,
	InputGroup,  Tab, Tabs
 } from "@blueprintjs/core";
import {__} from "../../layouts/utilities/i18n";

export default function _fetch( code, args, url, token, rest_route="wpfa" )
{
	code = !code ? "page" : code;
	var headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	};
	/*
	if(window.auth)
	{
		headers.Authorization = 'Basic ' + window.auth; 
	}
	else if(log && psw)
	{
		const xxx = base64_encode( log+':'+psw );
		headers.Authorization = 'Basic ' + xxx; 
	}
	*/
	//if(typeof args != 'object')
	//	args = {};
	headers.Token = token;
	//if(window.atoken)
	//	headers.token = window.atoken;
	return fetch( url + '/wp-json/' + rest_route + '/' + code,
	{
		method: 'POST',
		credentials: 'include',
		headers: headers,
		body: JSON.stringify({
			code: code,
			args: args
		})
	}) 
		.then(
			responce => 
			{
				//console.log(responce);
				const res = responce.json();
				//console.log( res );
				return res;
			},
			error =>
			{
				console.log(error);
				return {error: error}
			}
		)
			.then(
				resp => {
					//console.log(resp);
					if(resp.msg)
					{
						AppToaster.show({
							intent: resp.msg_type ? resp.msg_type : Intent.SUCCESS,
							icon: "tick",
							duration:10000,
							message: __( resp.msg )
						});
					}
					return resp;
				}
			);
		
}