import React, {Component} from "react";
import ReactDOM from 'react-dom';
import $ from "jquery";
import "./css/animate.css";

export default class LazyLoading extends Component
{
	 constructor(props) 
	 {
        super(props);
		
        this.state = {
			className:""
        };
    }
	componentDidMount() 
	{
		this.updateWindowDimensions();
		window.addEventListener('scroll', this.updateWindowDimensions);
	}
	componentWillUnmount() 
	{
		window.removeEventListener('scroll', this.updateWindowDimensions);
	}
	
	updateWindowDimensions = () =>
	{
		const rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
		const posY = rect.top - document.body.clientHeight  + 100;//rect.height;
		if(posY < 0)
		{
			const delay = this.props.delay ? this.props.delay: "";			
			const animationType = this.props.animationType ? this.props.animationType: "fadeIn";
			this.setState({ className: " animated" + delay + " " + animationType })
		}
	}
    render()
	{
		const {content, className, style } = this.props;
        return (
            <div 
				className={className + " " + this.state.className  + " animate" } 
				style={style}
				onScroll={this.updateWindowDimensions}
			>
				{content}
            </div>
        )
    }
}