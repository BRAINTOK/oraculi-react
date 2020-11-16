import React, {Component} from "react";
import { withRouter } from "react-router-dom";


class LayoutScrollToTop extends Component 
{
	componentDidUpdate(prevProps) 
	{
		if (this.props.location !== prevProps.location) 
		{
			window.scrollTo(0, 0);
		}
	}

	render() 
	{
		return null;
	}
}
export default withRouter(LayoutScrollToTop);