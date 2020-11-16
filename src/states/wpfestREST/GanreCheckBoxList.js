import React, {Component} from 'react';
import GanreCheckBox from './GanreCheckBox';

export default class GanreCheckBoxList extends Component
{
	constructor(props) 
	{
		super(props);	
		const ganres = [];
		this.props.ganres.forEach((elem, num, arr)=> {
			if(elem.check) ganres.push(elem.id);
		});
		this.state = 
		{
			ganres
		}; 
	} 
	render() 
	{ 
		const articleElements = this.props.ganres.map((article, index) => {
			 
			return <GanreCheckBox 
				ganre={article} 
				onClick={this.onClick} 
				name={this.props.name}
				key={this.props.name + article.id}
			/>
		});
		return (
				<div className='d-flex'>
					<div className='d-flex flex-wrap' style={{ minWidth: this.props.isLine ? this.props.ganres.length * 92 : 0 }}>
						{articleElements}
					</div>	
				</div>	
		);
	}
	onClick = (id, checked) =>
	{ 
		let ganres = this.state.ganres;
		if(checked)
		{
			if( ganres.filter( e => e == id ).length == 0 )	
				ganres.push(id);
		}
		else
		{
			for(var i = 0; i < ganres.length; i++)
			{
				if( ganres[i] === id)
				{					
					ganres.splice(i, 1);
					break;
				}
			}
		}	
		console.log(id, checked, ganres);
		if(this.props.onGanre)
			this.props.onGanre( ganres, id, this );
		this.setState({ganres});
	}
}