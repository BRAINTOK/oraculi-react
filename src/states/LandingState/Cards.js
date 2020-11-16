import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import LayoutIcon from "../../layouts/LayoutIcon";
import EditLabel from "./EditLabel";
import SectionContent from "./SectionContent";
import Section, {components, getDefault} from "./Section"; 
import Card from "./Card"; 

class Cards extends SectionContent
{
	is()
	{
		const { cards } = this.state.data;
		return Array.isArray(cards) && cards.length > 0  
	}
	
	renderContent(style)
	{
		const { composition } = this.props;
		const { class_name, cards, height, padding, fields } = this.props.data;
		const cards_elems = cards.map((e, i) =>
		{
			// console.log(this.props);
			return <Card
				key={i}
				i={i}
				cardFields={ fields }
				height={ height }
				padding={ padding }
				{...e}
				columns={ composition.columns }
			/>
		});
		return <div 
			className={ 
				"landing-cards " + 
				( class_name ? class_name : "" ) 
			} 
			style={{ ...style }}
		>
			{ cards_elems }
		</div>
	}
	onEdit = (data, id) => 
	{
		console.log("onEdit", id, data, this.state );
		let cards = [ ...this.state.data.cards ];
		let secs = [];
		cards.forEach(e =>
		{
			if(e.id == data.id)
			{
				secs.push(data);
			}
			else
			{
				secs.push(e);
			}
		});
		this.setState({ data:{ ...this.state.data, cards:secs } });
		this.props.onEdit( 
			{...this.state, data:{ ...this.state.data, cards:secs }}, 
			this.props.id
		);
	}
	onUp = data =>
	{
		console.log("onUp", data, this.state );
		let cards = [ ...this.state.data.cards ];
		const sec = { ...cards[ data ] };
		cards.splice( data, 1 );
		cards.splice( data - 1, 0, sec );
		console.log(cards);
		this.setState({ data:{ ...this.state.data, cards } });
		this.props.onEdit( 
			{...this.state, data:{ ...this.state.data, cards }}, 
			this.props.id
		);
		
	}
	onDn = data =>
	{
		console.log("onDn", data, this.state );
		let cards = [ ...this.state.data.cards ];
		const sec = { ...cards[ data ] };
		cards.splice( data, 1 );
		cards.splice( data + 1, 0, sec );
		console.log(cards);
		this.setState({ data:{ ...this.state.data, cards } });
		this.props.onEdit( 
			{...this.state, data:{ ...this.state.data, cards }}, 
			this.props.id
		);
		
	}
	onAdd = data =>
	{
		console.log("onAdd", data, this.state );
		let cards = [ ...this.state.data.cards ];
		const sec = getDefault();
		cards.splice( data + 1, 0, sec );
		console.log(cards);
		this.setState({ data:{ ...this.state.data, cards } });
		this.props.onEdit( 
			{...this.state, data:{ ...this.state.data, cards }}, 
			this.props.id
		);
		
	}
	onRnv = data =>
	{
		console.log("onRnv", data, this.state.data.cards );
		let cards = [ ...this.state.data.cards ];
		cards.splice(data, 1);
		console.log(cards);
		this.setState({ data:{ ...this.state.data, cards } });
		this.props.onEdit( 
			{...this.state, data:{ ...this.state.data, cards }}, 
			this.props.id
		); 
	} 
}
export default Cards;