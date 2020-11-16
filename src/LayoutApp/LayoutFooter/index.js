import React from "react";
import getWidget, { initArea, widgetAreas } from "../../layouts/utilities/getWidget";

class LayoutFooter extends React.Component 
{
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() 
  {
    return <footer className='layout-footer'>
	{
		initArea( "layout-footer", { ...this.props } ) 
	}         
    </footer> 
  }
}

export default LayoutFooter; 
