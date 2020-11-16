import React, {Component, Fragment} from "react";
import { ButtonGroup, Button, Position, Popover, PopoverPosition, Intent, Classes, Icon} from "@blueprintjs/core";
import { __ } from "../layouts/utilities/i18n";
import {isRole} from "../layouts/user";
import gql from "graphql-tag"; 
import { graphql, compose, withApollo, Query } from 'react-apollo';
import {withRouter} from "react-router";

class RoomPult extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			isPopover : false
		}
	}
	render()
	{
		console.log(this.props);
		const admin = isRole("administrator", this.props.user)
			?
			<Fragment>
					<ButtonGroup>
				<Popover
                    popoverClassName={ Classes.POPOVER_CONTENT_SIZING }
					isOpen={this.state.isPopover === true ? /* Controlled */ true : /* Uncontrolled */ undefined}
					content={
						<div className="square" >
							<div className="">
								<div className="mb-3">
									{__("Remove room?")}
								</div>
								<Button intent={Intent.DANGER} onClick={this.onDelete} >
									{__("Yes")}
								</Button>
							</div>
						</div>
					}
					position={Position.LEFT}
				>
						<Button minimal={true} >
							<Icon icon="cross" />
						</Button>
				</Popover> 
					</ButtonGroup>
			</Fragment>
			:
			null;
		return <div>
			<ButtonGroup>
				{admin}
			</ButtonGroup>
		</div>
	}
	onDelete = evt =>
	{	
		this.props.onDelete( this.props.room.id );
		return;	
		
		
		
	}
}
export default compose( 
	withApollo,
	withRouter
)(RoomPult);