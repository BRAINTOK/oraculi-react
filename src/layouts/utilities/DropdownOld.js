import React, {Fragment, Component} from 'react'
import PropTypes from 'prop-types';
import in_array from "in_array";
import i18n from '../i18n';
import Pagi from "./Pagi";

export default class DropdownOld extends Component
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
			is_open:props.is_open,
			title:props.title,
			offset:props.offset,
			numberposts:props.numberposts,
			count:props.count,
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
			current: current,
			offset:nextProps.offset,
			numberposts:nextProps.numberposts,
			count:nextProps.count,
			options:nextProps.options,
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
				dangerouslySetInnerHTML={{ __html: i18n.t(
					this.state.current 
						? (this.props.prefix?this.props.prefix:"" ) + this.getElem(this.state.current).post_title  + (this.props.postfix?this.props.postfix:"")
						: this.state.title 
					) }} 
			/>
		}
		const options = this.state.options.length ? this.state.options.map((elem, i) => {
			//console.log(in_array(elem.id, this.state.current), elem.id, this.state.current);
			const checkBox = !this.props.multiple ? "" :
				<label className="_check_ mr-1 disabled">
					<input 
						type="checkbox" 
						checked={ in_array(elem.id, this.state.current)  }
						onChange={ this.onMulti } 
						gid={ elem.id } 
					/>
				</label>
			const req = elem.req ? <div className='indic' >{elem.req}</div> : "";
			const icon = elem.icon ? 
			<div className="bio_mycro_icon" style={{backgroundImage:"url("+elem.icon+")"}}/>
			: 
			"";
			const cls =  elem.id == this.state.current && !this.props.multiple ? "dropdown-item w-100 active" : "dropdown-item w-100";
			return <a 
				className={cls} 
				href="#" 
				n={elem.id} 
				gid={ elem.id } 
				onClick={ this.props.multiple ? this.onCheck : this.onClick} 
				key={i}
			>
				{checkBox}
				{icon}
				{
					(this.props.prefix ? this.props.prefix : "") + 
					i18n.t(elem.post_title) + 
					(this.props.postfix ? this.props.postfix : "")
				}
				{req}
			</a>			
		})
		:
		null;
		const { count, offset, numberposts } = this.state;
		const shifter = count && numberposts ?
		<div className={ "py-1 bg-light " + (this.state.is_open ? "visible" : "hidden") }>
			<Pagi
				all={Math.ceil( parseInt(count) / parseInt(numberposts) )}
				current={ parseInt(offset) / parseInt(numberposts)  }
				onChoose={ this.onPagi  }
			/>
		</div>
		:
		null;
		let is_open_class = this.state.is_open ? " show " : "";
		return <div className="dropdown show w-100"  ref={this.setWrapperRef} par={this.props.par}>
			<div 
				className={"btn dropdown-toggling w-100 text-left " + this.props.className}
				style={{ whiteSpace: "normal", display:"block", minHeight: 40 }}
				onClick={this.onCloseOpen}
			>
				{toons}
			</div>
				<div className={"dropdown-menu w-100" + is_open_class} >
					{options}
				</div>
			{shifter}
		</div>
	}
	onPagi = n =>
	{
		this.props.onPagi(n);		
	}
	getElem(id)
	{
		const ff = this.state.options.filter( elem => elem.id == id )[0];
		//console.log(this.props.options.filter( elem => elem.id == id )[0]);
		return ff ? ff : { id:-1, post_title: i18n.t(this.state.title) };
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
	onMulti = evt =>
	{
		
	}
	
	onCheck = evt =>
	{
		evt.preventDefault();
		evt.stopPropagation();
		let current = this.state.current.splice(0);
		const c = evt.currentTarget;
		const attr = c.getAttribute( "gid" );
		const gid =  isNaN( parseInt( attr ) ) ? attr : parseInt( attr );
		//console.log( gid, this.props.options.filter( elem => elem.id == gid )[0].id );
		const isCheck = current.filter(e => e == gid).length == 0;//c.checked ;
		current = current.filter(e => typeof e != "undefined" && e >= 0);
		//console.log( isCheck, current,  this.state.current );
		if(!isCheck)
		{
			current.splice( this.props.options.findIndex( elem => elem.id == gid ), 1);
		}
		else
		{
			current.push(gid);
		}
		//console.log(current);
		this.setState({
			current : current,
			is_open : true
		});	
		this.props.onClick( current, this.props.par );
	}
}