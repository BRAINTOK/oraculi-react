import React from "react";

class WPFestSettings
{
	static url
	static token;
	static is_comment;
	static is_diaries;
	
	static set(data)
	{
		WPFestSettings.festival_title = data.festival_title;
		WPFestSettings.fmru_evlbl_roles = data.fmru_evlbl_roles;
		WPFestSettings.url 			= data.url;
		WPFestSettings.token 		= data.token;
		WPFestSettings.is_comment 	= data.is_comment;
		WPFestSettings.is_register 	= data.is_register;
		WPFestSettings.is_diaries 	= data.is_diaries;
		WPFestSettings.is_expert 	= data.is_expert;
		WPFestSettings.is_experts_criteries 	= data.is_experts_criteries;
		WPFestSettings.is_ganres 	= data.is_ganres;
		WPFestSettings.is_roles 	= data.is_roles;
		WPFestSettings.logo 		= data.logo;
		WPFestSettings.lurl 		= data.lurl;
		WPFestSettings.max_raiting	= data.max_raiting;
		WPFestSettings.mtype		= data.mtype;
		WPFestSettings.status		= data.status;
		WPFestSettings.base_prefix	= data.base_prefix;
		WPFestSettings.count_juri	= data.count_juri;
		WPFestSettings.enabled_rules = data.enabled_rules; 
	}
	static set_is_comment(bool)
	{
		WPFestSettings.is_comment = bool;
		
	}
}
export default WPFestSettings;