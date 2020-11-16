import React, { Component, Fragment} from "react";
import {__} from "../../utilities/i18n";
import { 
	Tag, Popover, Classes, Button, ButtonGroup,
	Intent
} from "@blueprintjs/core";

export default class String extends Component
{
	state = {isOpen:false}
	render()
	{
		return <Fragment>
			
			<Popover
				popoverClassName={ Classes.POPOVER_CONTENT_SIZING }
				portalClassName="foo"
				isOpen={ this.state.isOpen }
					content={
						<div className="p-2">
						<div className="font-weight-light text-center">{__("Delete this?")}</div>
						<ButtonGroup>
							<Button fill={true} onClick={this.onRemove} intent={Intent.DANGER} minimal={true}>
								{__("Yes")}
							</Button>
							<Button fill={true} onClick={this.onToggle} intent={Intent.SUCCESS} minimal={true}>
								{__("No")}
							</Button>
						</ButtonGroup>
					</div>
				}
			>  
				<Tag 
					minimal={true} 
					large={false} 
					onRemove={this.onToggle} 
					onClick={this.onClick} 
					className="m-1"
					intent={Intent.PRIMARY}
					
				>
					{this.props.value}
				</Tag>
			</Popover>
		</Fragment>;
	}
	onRemove =() =>
	{
		this.setState({isOpen:!this.state.isOpen});
		this.props.onRemove(this.props._id);
	}
	onClick =() =>
	{
		//
	}
	onToggle = () =>
	{
		this.setState({isOpen:!this.state.isOpen});
	}
}