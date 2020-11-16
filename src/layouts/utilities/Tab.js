import React, {Component, Fragment} from "react";

export default class Tab extends Component
{
	constructor(props)
	{
		super(props);
		this.state = 
		{
			current:0
		}
	}

	onTab = evt =>
	{
		evt.preventDefault();
		const n = evt.currentTarget.getAttribute("n");
		this.setState({ current: n });
	}

	render()
	{
		const {tabs} = this.props;
		const _tabs = tabs.map((elem, i) => {
			const clas = i == this.state.current ? "nav-link active" : "nav-link";
			return <li className="nav-item" key={i}>
				<a className={clas} href="#"onClick={this.onTab} tab-id={elem.id} n={i}>
					{elem.post_title}
				</a>
			</li>});
		const cont  = tabs.map((elem, i) => {
			const cls = i == this.state.current ? "w-100" : "hidden";
			return <div className={cls} key={i} >
				{elem.content}
			</div>
		});
		return <Fragment>
			<div className="col-12 justify-content-center pt-4 pb-3">
				<ul className=" nav nav-tabs d-flex justify-content-center">
					{_tabs}
				</ul>
				<div className="w-100 border-top-0 border border-white slow-dark">
					<div className="w-100 px-4 py-5">
						{cont}
					</div>
				</div>
			</div>
		</Fragment>
	}
}