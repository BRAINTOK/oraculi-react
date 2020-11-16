import React, {Fragment} from "react";
import getWidgets from "./getWidgets";
import { areas } from "../template";
import { __ } from "./i18n";

export default function getWidget( widget, templatePart)
{ 
	const ts = areas()[templatePart];	
	if( ts && Array.isArray(ts) )
	{
		const w = ts.filter(e => e.component == widget);
		if( !w[0] )return null;			
		if( !getWidgets[ w[0].component ] )return null;			
		const _Widget = getWidgets[ w[0].component ].default;
		return <_Widget {...w[0]} />
	}
	else
	{
		return null;
	}
}
export function widgetAreas()
{
	return areas();
}

export function initWidget(widget, data={})
{
	const _Widget = getWidgets[ widget ].default;
	return <_Widget {...data} />
}
export function initArea(areaName, data={}, defArea=null)
{ 
	if(!areas()[ areaName ]) return defArea;
	const ts = areas()[ areaName ].area;
	// console.log(areaName, areas()[ areaName ], areas());
	if( ts && Array.isArray(ts) && ts.length > 0 )
	{
		const rr = ts.map((e, i) => 
		{ 		
			if( !getWidgets[ e.component ] ) 
			{
				console.log("component " + e.component + " not exist.");
				return null;
			}
			const _Widget = getWidgets[ e.component ].default;
			const title = e.title && e.title !== ""  
				?
				<div className="title">
					{__(e.title)}
				</div>
				:
				null;	
			// console.log( data );
			return <Fragment key={i}>
				{ title }
				<_Widget {...e} {...data} defArea={defArea} />
			</Fragment>
		});
		return rr;
	}
	else
	{
		return defArea;
	}
}
