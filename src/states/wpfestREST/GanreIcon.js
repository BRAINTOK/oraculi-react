import React, {Component} from 'react'; 


export default class GanreIcon extends Component
{
	render() 
	{ 
		const {ganre} = this.props;
		return  (
			<div 
				className='card-icon' 
				style={{ 
					backgroundImage:"url(" + ganre['icon'] + ")", 
					backgroundColor:ganre['color']
				}} 
				title={ganre['name']} 
			>
			</div>
		);
	}
}