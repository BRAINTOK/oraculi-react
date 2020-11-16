
import {apolloFields} from "../../schema/ecosystem";
//TODO extends ScalarField
export default function addEmpty(data_type, defaults)
{
	if(!defaults)  defaults = {};
	let elem = {};
	const apollo_fields = apolloFields(data_type);
	for(let e  in apollo_fields)
	{
		switch(apollo_fields[e].type)
		{
			case "boolean":				
				elem[ e ] = false;
				break;
			case "date":				
				elem[ e ] = Date.now();
				break;
			case "array":				
			case "select":				
			case "checkbox":				
			case "radio":			
				elem[ e ] =  [ ];
				break;
			case "geo":				
				elem[ e ] =  [0, 0];
				break;
			case "string":
			case "external":
			case "email":
			case "phone":
			case "url":
			case "rgb":
			case "rgb":			
			case "id":		
			default:				
				elem[ e ] =  "";
				break;
			
		}		
		if(Object.keys(defaults).filter(el => el == e ).length > 0)
		{
			elem[ e ] =  defaults[ e ];
		}
	}
	return elem;	
}