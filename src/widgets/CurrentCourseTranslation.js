import React, {Component, Fragment} from "react";
import { __ } from "../layouts/utilities/i18n";
import { NavLink } from 'react-router-dom'; 

class CurrentCourseTranslation extends Component
{
	render()
	{
		return <NavLink className="btn btn-light" to="/translation/3290" >
			{__("Translation")}
		</NavLink>
	}
}
export default CurrentCourseTranslation;