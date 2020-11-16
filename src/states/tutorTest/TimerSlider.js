import React, {Component, Fragment} from "react";

class TimerSlider extends Component
{
	constructor(props)
	{
		super(props)
		this.state= {
			is_timed : this.props.is_timed || false,
			full: this.props.full,
			count:0
		}
	}
	componentWillUpdate(nextProps)
	{
		if(nextProps.progress == 0 && this.state.count > 0)
		{
			this.setState({is_timed :false, count:0 });
		}
		else if(nextProps.is_timed !==  this.state.is_timed)
		{ 
			this.setState({ is_timed:nextProps.is_timed });
		}
	}
	componentWillMount()
	{
		this.timer = setInterval(() =>
		{
			if(this.state.is_timed)
			{
				//console.log(this.state.count);
				if(this.state.count < this.props.full)
				{ 
					this.setState({count : this.state.count + 1 });
				}
				else
				{ 
					this.props.onFinish("fail", this.state.count);
					this.setState({is_timed : false });
				}
			}
		}, 1000);
	}
	componentWillUnmount()
	{
		clearTimeout(this.timer);
	}
	render()
	{
		const width = (this.state.count < this.props.full ?  this.state.count / this.props.full * 100 : 100) + "%";
		return <div className="timer-container">
			<div className="timer-slider" style={{width:width}} >
				{this.state.count}
			</div>
		</div>
	}
}
export default TimerSlider;