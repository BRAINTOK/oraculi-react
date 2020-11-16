import React, {Component, Fragment} from "react";
import EventCalendar from "./EventCalendar"; 
import { __ } from "../layouts/utilities/i18n";
import { mainMenu, concatRouting } from "../layouts/routing";
import widgets from "../layouts/utilities/getWidgets";

class Aside extends Component
{ 
	render()
	{  
		const aside = concatRouting().filter( e => this.props.route.split("/")[1] == e.route)[0].aside || []; 
		//console.log( aside );
		const __widgets = aside.map((e, i) =>
		{
			if(widgets[e.component])
			{
				const _Widget = widgets[e.component].default;
				return <div className="aside-widget col-12" key={i}>
					<div className="aside-widget-title">
						{__(e.title)} 
					</div>
					<_Widget {...this.props} {... e.args}/> 
				</div>
			}
			else
			{
				return <small className="m-5 text-secondary text-center">
					{__("No widget exists: ") + e.component} 
				</small>
			}
		});
		return <div className="row">
			{__widgets} 
		</div>
	}
}
export default Aside;