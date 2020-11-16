import React, {Fragment, Component} from 'react'
import PropTypes from 'prop-types';
import in_array from "in_array";
import {__} from './i18n';

export default class Dropdown extends Component
{
	constructor( props )
	{
		super(props);
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
		let current;
		if(props.multiple)
			current = Array.isArray(props.current) ? props.current : [props.current];
		else
			current = props.current;
		//console.log( current );
		let options = props.options;
		/*
		if (
			options.length > 0
			&& options[0].id != -1 
			&& !props.multiple
		) 
			options.unshift({ id:-1, post_title:"---" });
		*/
		this.state = {			
			//is_open:props.is_open,
			title:props.title,
			options:options,
			current:current
		};
		
	}
	componentDidMount() 
	{
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() 
	{
		document.removeEventListener('mousedown', this.handleClickOutside);
	}
	componentWillReceiveProps (nextProps )
	{
		let current;
		if(nextProps.multiple)
			current = Array.isArray(nextProps.current) ? nextProps.current : [nextProps.current];
		else
			current = nextProps.current;
		//console.log( current );
		this.setState({
			is_open:nextProps.is_open,
			title:nextProps.title,
			current: current
		});
	}
	handleClickOutside(event) 
	{
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) 
		{
			this.setState({is_open:false});
		}
	}
	setWrapperRef(node)
	{
		this.wrapperRef = node;
	}
	
	render()
	{
		//console.log(this.state.current);
		const title = this.props.multiple ? "" :
			this.state.current ? this.state.current : this.state.title;
		let toons;
		if(this.props.multiple)
		{
			toons = this.state.current.map((elem, i) => {
				return <span 
					className="toons" 
					key={i} 
					style={{ whiteSpace: "nowrap" }}
				>
					{ this.getElem(elem).post_title }
				</span>
			})
		}
		else
		{
			toons = <div 
				dangerouslySetInnerHTML={{ __html: __(
					this.state.current 
						? (this.props.prefix?this.props.prefix:"" ) + this.getElem(this.state.current).post_title  + (this.props.postfix?this.props.postfix:"")
						: this.state.title 
					) }} 
			/>
		}
		const options = this.state.options.length ? this.state.options.map((elem, i) => {
			const checkBox = !this.props.multiple ? "" :
			<Fragment>
				<input 
					type="checkbox" 
					className="checkbox" 
					checked={ in_array(elem.id, this.state.current)  }
					onChange={ this.onCheck } 
					gid={ elem.id } 
					id={ "ch" + elem.id }
				/>				
				<label htmlFor={ "ch" + elem.id }></label>
			</Fragment>
			const req = elem.req ? <div className='indic' >{elem.req}</div> : "";
			const icon = elem.icon ? 
			<div className="mycro_icon" style={{backgroundImage:"url("+elem.icon+")"}}/>
			: 
			"";
			const cls =  elem.id == this.state.current && !this.props.multiple ? "dropdown-item w-100 active" : "dropdown-item w-100";
			return <div n={elem.id} onClick={ this.props.multiple ? null : this.onClick} key={i} className={cls}>
				<div className="w-100">
					{checkBox}
					{icon}
					{(this.props.prefix?this.props.prefix:"")+__(elem.post_title)+(this.props.postfix?this.props.postfix:"")}
					{req}
				</div>
				<small className="w-100 text-secondary">{elem.descr}</small>
			</div>			
		})
		:
		null;
		let is_open_class = this.state.is_open ? " show " : "";
		return <div className="dropdown show w-100"  ref={this.setWrapperRef} par={this.props.par}>
			<div 
				className={"btn dropdown-toggling w-100 text-left " + this.props.className}
				style={{ whiteSpace: "normal", display:"block", minHeight: 40 }}
				onClick={this.onCloseOpen}
				//dangerouslySetInnerHTML={{ __html: __( title ) }}
			>
				{toons}
			</div>
			<div className={"dropdown-menu w-100" + is_open_class} >
				{options}
			</div>
		</div>
	}
	getElem(id)
	{
		const ff = this.state.options.filter( elem => elem.id == id )[0];
		//console.log(this.props.options.filter( elem => elem.id == id )[0]);
		return ff ? ff : { id:-1, post_title: __(this.state.title) };
	}
	onCloseOpen = evt =>
	{
		evt.preventDefault();
		this.setState({is_open:!this.state.is_open});
	}
	onClick = evt =>
	{
		evt.preventDefault();		
		this.setState({
			is_open : false, 
			title : evt.currentTarget.innerHTML
		});
		const n = evt.currentTarget.getAttribute("n");
		this.props.onClick(n, this.props.par);
	}
	onCheck = evt =>
	{
		let c = evt.currentTarget;
		const gid =  parseInt(c.getAttribute("gid"));
		const isCheck = c.checked ;
		if(!isCheck)
		{
			this.state.current.splice( this.state.current.findIndex(elem => elem==gid), 1);
		}
		else
		{
			this.state.current.push(gid);
		}
		//console.log(gid, isCheck, this.state.current);
		this.setState({
			current: this.state.current,
			is_open:true
		});
		//return;
		this.props.onClick(this.state.current);
	}
}