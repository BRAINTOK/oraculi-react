import React,{Component} from "react";


class TestState extends Component
{
	state={
		title:"Title"
	}
	render()
	{
		return <div className="container">
			<h1 style={{color:"red"}}>
				{this.state.title}
			</h1>
			<p>
				Параграф
			</p>
		</div>
	}
}
export default TestState;