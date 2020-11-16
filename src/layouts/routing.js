import React from "react";
import layouts from "./layouts"; 
import {isCapability} from "./user";
import { NavLink, Link } from 'react-router-dom';

export function concatRouting()
{
    let routing = [];
    for (let key in layouts.routing) 
	{
        routing = routing.concat( get(key) );
    }
    return routing;
}
export function getAllRoutes()
{
	let routes = [];
	concatRouting().forEach(e =>
	{
		if(e.children)
		{
			let e1 = {...e};
			delete e1.children;
			routes.push(e1);
			e.children.forEach(ee =>
			{
				let ee1 = {...ee};
				if(ee1.children)
				{
					delete ee1.children;
					routes.push(ee1);
					ee.children.forEach(eee =>
					{
						ee.children.forEach(eee =>
						{
							let eee1 = {...eee};
							if(eee1.children)
							{
								delete ee1.children;
								routes.push(eee1);
								eee.children.forEach(eeee =>
								{
									
									eeee.children.forEach(eeeee =>
									{
										let eeeee1 = {...eeeee};
										if(eeeee1.children)
										{
											delete eeeee1.children;
											routes.push(eeeee1);
											eeeee.children.forEach(eeeeee =>
											{
												routes.push(eeeeee);
											})
										}
										else
										{
											routes.push(eeeee1);
										}
									})
									
								})
							}
							else
							{
								routes.push(eee1);
							}
						})
						
						
					})
				}
				else
				{
					routes.push(ee1);
				}
			})
		}
		else
		{
			routes.push(e);
		}
	});
	return routes;
}

export function getAdminRouteLink(data_type, content)
{
	//console.log( getAllRoutes( ) );
	const dt = getAllRoutes().filter(e => e.data_type == data_type );
	//console.log( data_type, dt );
	if(dt[0])
	{
		return <Link to={dt[0].route} >
			{content}
		</Link>
	}
	else
	{
		return content;
	}
}
export function getByRoute(route)
{
	let rountArray = route.split("/"); 
	if( rountArray[0] === "")
	{
		rountArray.splice(0,1);
	}
	let components = {};
	function importAll (r) 
	{
		r.keys().forEach(key => {
			const key1 = key.replace("./", "").split(".").slice(0, -1).join(".");
			components[key1] = r(key)
		});
	}
	importAll(require.context('../states/', false, /\.js$/));
	
	function getContent(route)
	{
		//return route.title;
		if( route.component )
		{
			const Component = components[route.component].default;
			return <Component
				{ ...route }
				onChangeStyle={ style => null }
			/>
		}
		else if( route.html_source )
		{
			const HTMLSourceState = components["HTMLSourceState"].default;			
			return <HTMLSourceState
				{ ...route } 
				onChangeStyle={ style => null }
			/>
		}
		else if( route.html )
		{
			const HTMLState = components["HTMLState"].default;		
			return <HTMLState
				{...route} 
				onChangeStyle={ style => null }
			/>
		}
	}
	
	const ret = concatRouting().map(e =>
	{
		if(e.route == rountArray[0])
		{
			if( rountArray.length == 1 )
			{
				console.log( e )
				return getContent( e );
			}
			else
			{
				if( e.route == rountArray[ 1 ] )
				{
					
				}
				else
				{
					
				}
			}
		}
	})
	return ret;
}

export function routeData(e=undefined,
                          child=undefined,
                          grandchild=undefined,
                          forceRoute=undefined)
{
    let preroute, route, routeBasic, noexact_route, currentE, capability;
    if(grandchild)
    {
        // console.log("grandchild");
        // console.log(grandchild);
        capability = grandchild.capability;
        preroute 	  = '/' + e.route +  '/' + child.route;
        route		  = typeof forceRoute !== "undefined" ? forceRoute : grandchild.route + "";
        noexact_route = typeof forceRoute !== "undefined" ? forceRoute : grandchild.route + "/:id";
        currentE = grandchild;
    }
    else if(child)
    {
        // console.log("child");
        // console.log(child);
        capability = child.capability;
        preroute 	= '/' + e.route;
        route		= typeof forceRoute !== "undefined" ? forceRoute : child.route;
        noexact_route = forceRoute ? forceRoute : child.route + "/:id";
        currentE = child;
    }
    else
    {
        // console.log("e");
        // console.log(e);

        capability = e.capability;
        preroute 	= "";
        route		= typeof forceRoute !== "undefined" ? forceRoute : e.route;
        noexact_route = forceRoute ? forceRoute : e.route + "/:id";
        currentE = e;
    }

    return {currentE: currentE, preroute: preroute, route: route, noexact_route: noexact_route, capability: capability};
}

export function existRouting(key = "") {
    const routingArray = layouts.routing[key];

    return routingArray && routingArray.length > 0 ;
}

export function existRoutingChilder(key = "") {
    const routingArray = layouts.routing[key][0];

    return routingArray.children && routingArray.children.length > 0;
}

export function getFirstRoute(key = "") {
    return layouts.routing[key][0];
}

export function mainPage() {
    let main = layouts.routing.extended_routes.filter(e => e.route === "")[0];
    if(!main)
    {
        main = layouts.routing.menu[0];
    }
    return main;
}


export function mainMenu(){
    return exec_route( layouts.routing.main_menu);
}

export function menu(){
    return exec_route( layouts.routing.menu);
}

export function footer()
{
    return exec_route( layouts.routing.footer);
}

export function profile() 
{
    return exec_route( layouts.routing.profile );
}
export function get(key = "") 
{
	const dd = layouts.routing[key];
	//console.log(dd, key);
	return dd;
    return exec_route( dd );
}
export function routing() 
{ 
	return layouts.routing;
}
export function right_routing() 
{
	let r = {};
	for(var route in layouts.routing) 
	{
		console.log(route);
		r[route] =  exec_route(layouts.routing[route]);
	};
	return r;
}

export function link() 
{
    return exec_route( layouts.routing.link);
}

export function exec_route( route_array )
{
	if(!route_array) return;
	const routing = concatRouting();
	let rArray = [];
	route_array.forEach((e, i) =>
	{
		if(typeof e.target_id != "undefined")
		{
			routing.forEach((ee, ii) =>
			{
				if(ee.route == e.target_id)
				{
					rArray.push({...ee, title:e.title, icon:e.icon });
				}
			})
		}
		else
			rArray.push(e);
		
	});
	return rArray;
}

export function default_menu()
{
	return [
		{id:"profile", title:"Current User profile"},
		//{id:"extended_routes", title:""},
		{id:"bells", title:"Bells"},
		{id:"link", title:"Link"},
		{id:"comments", title:"Comments"},
		{id:"help", title:"Help"},
		{id:"main_menu", title:"Header Menu"},
		{id:"menu", title:"Left Menu"},
		{id:"footer", title:"Footer Menu"}
	];
}