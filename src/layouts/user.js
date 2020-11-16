import layouts from "./layouts";
import {concatRouting} from "./routing";

export function isLoggedPage(pathname) {
    let states = [];
    states = concatRouting();
    const state = states.filter((e, i) =>
		{
			const route = "/" + e.route;
			return e.islogged && route == pathname
		}
    );
    console.log(state);
    return (state.length > 0);
}

export function userModel() {
    return layouts.app.user_model;
}

export function userModelField() {
    const data_type = layouts.app.user_model;
    const apollo_fields = layouts.schema[data_type].apollo_fields;
    return apollo_fields;
}

export function userModelKeys() {
    const data_type = layouts.app.user_model;
    const apollo_fields = layouts.schema[data_type].apollo_fields;
    const fields = Object.keys(apollo_fields)
        .filter( e => e !== "_id" && !apollo_fields[e].hidden );
    return fields;
}

//TODO to isCap is_admin
export function isCapability(capability, user = {}) {

	if (!(capability && Array.isArray(capability))) {
		return false;
	}
	if (user && user.roles) 
	{
		return !(capability.filter(
			value => user.roles.filter(e => value == e).length > 0 //.includes(value)
		).length > 0);
	} else {
		return true;
	}
}
export function isRole( role, user )
{
	if(!user) return false;
	return user.roles.filter(e => e == role).length > 0;
}