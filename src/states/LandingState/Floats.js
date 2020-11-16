import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import Float from "./Float";
import matrix from "./data/matrix";


class Floats extends Component
{
	state = {
		...this.props
	}
	componentDidUpdate(nextProps)
	{
		// /.log( nextProps.is_edit );
		if(nextProps.is_edit != this.state.is_edit)
		{
			this.setState({is_edit: nextProps.is_edit});
		}
		let state = {  };		
		for(let i in matrix.floats)
		{
			if(nextProps[i] != this.state[i])
			{
				state[i] = nextProps[i]; 
			}
		}
		
		if( Object.keys(state).length > 0 )
		{
			// console.log( Object.keys(state).length, state );
			this.setState({...state});
		}
	}
	render()
	{
		const { floats, class_name, style } = this.state;
		const __floats = floats
			?
			floats.map((e, i) =>
			{
				return <Float
					{...e} 
					key={i} 
					is_edit={ this.state.is_edit }  
					onRemoveFloat={ this.onRemoveFloat }
					onUpdate={ this.onUpdate }
				/>
			})
			: 
			null;
		return floats && floats.length > 0
		?
		<Fragment>
			{__floats}
		</Fragment>
		:
		null
	}
	onRemoveFloat = float_id => this.props.onRemoveFloat(float_id)
	onUpdate = (data, float_id) => this.props.onUpdate(data, float_id)
}
export default Floats;