import React, {Component, Fragment} from "react";
import {__} from "../utilities/i18n";
import Loading from "../utilities/Loading";
import Pagi from "../utilities/Pagi";
import gql from 'graphql-tag';
import {compose} from "recompose";
import {Query, withApollo} from "react-apollo";
import {withRouter} from "react-router";
import {getQueryArgs, getQueryName, querySingle} from "../schema";

class Feed extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			count: parseInt(this.props.count) ?  parseInt(this.props.count) : 5,
			full_count:-1,
			offset : parseInt(this.props.offset)
		}
	}
	componentDidMount()
	{
		const name = "get" + this.props.data_type + "Count";
			const paging = this.props.paging;  
			const query = gql`
				query ${name} 
				{
					${name}( paging:{ ${paging}  }) 
				}
			`;
		this.props.client.query({
			query: query
		}).then(result => {
			// console.log(result.data[name]);
			this.setState({full_count:result.data[name]})
		})
		
	}
	render()
	{
		let html;
		if( this.props.data_type )
		{
			const name = "get" + this.props.data_type + "s";
			const paging = this.props.paging; 
			const fields = getQueryArgs( this.props.data_type );
			const count = this.state.count;
			const offset = this.state.offset;
			const full_count = this.state.full_count;
			const query = gql`
				query ${name} 
				{
					${name}( paging:{ count:${count}, offset:${offset}, ${paging}  })
					{
						${fields}
					}
				}
			`;
			const shifter = count && count < full_count && !this.props.is_hide_pagi
				?
				<div className="py-1 d-flex pe-pagi ">
					<Pagi
						all={ Math.ceil( full_count / parseInt(count) ) - 1 }
						current={ parseInt(offset) / parseInt(count) }
						onChoose={ this.onPagi }
					/>
				</div>
				:
				null
			html = <Fragment>
				{shifter}
				<Query query={ query } >
				{
					({ loading, error, data, client}) =>
					{
						if( loading)
						{
							return <Loading/>;
						}
						if(data)
						{	
							//console.log(data[name]);
							const feed = name 
								&&  data[name] 
								&&  data[name].length > 0 
								?
								data[name].map((e, i) =>
								{
									const _Component = this.props.component;
									return <_Component 
										{...e} 
										elem={e}
										{...this.props.params} 
										key={i} 
									/>
								})
								:
								this.no();
							return <div className={this.props.class_name} style={this.props.stye} >
								{feed}
							</div>
						}
						if(error)
						{
							
						}
					}
				}
				</Query>					
			</Fragment>
		}
		else
		{
			html = this.no();
		}
		return html;
	}
	onPagi = n =>
	{
		this.setState({offset : n * this.state.count});
	}
	no()
	{
		return <div className="alert alert-secondary">
			{__("No elements exist")}
		</div>;
	}
}
export default compose(
	withApollo
)(Feed);