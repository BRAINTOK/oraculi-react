import React from "react";

const getWidgets = {};
function importAll (r) 
{
	//console.log( r.keys() )
	r.keys().forEach(key => 
	{
		const key1 = key.replace("./", "").split(".").slice(0, -1).join(".");
		getWidgets[key1] = r(key)
	});
}
importAll(require.context('../../widgets/', false, /\.js$/));
export default getWidgets;
