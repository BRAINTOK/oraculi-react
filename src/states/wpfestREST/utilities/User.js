import {wpfest_server_url} from "../../../config/config.json";
import {setCookie, getCookie, deleteCookie} from "./utils";

export default class User
{
	static is_login = getCookie("wpfest_display_name")  ? 1 : 0;
	static token = getCookie("wpfest_token");
	static display_name = getCookie("wpfest_display_name");
	static roles =  getCookie("wpfest_roles") ? getCookie("wpfest_roles").split(",") : [];
	static setData(data)
	{
		User.display_name	= data.user.display_name;
		User.is_login		= data.is_login;
		User.roles			= data.user.roles;
		User.token 			= data.token;
		setCookie( "wpfest_token", User.token );
		setCookie( "wpfest_display_name", User.display_name );
		setCookie( "wpfest_roles", User.roles.join(",") );
	}
	static deleteData()
	{
		User.display_name	= "";
		User.roles			= [];
		User.token 			= null;
		User.is_login		= 0;
		//deleteCookie( "wpfest_token" );
		deleteCookie( "wpfest_display_name" );
		deleteCookie( "wpfest_roles" );
		setCookie( "wpfest_token", null );
		console.log(getCookie("wpfest_token"));
	}
}