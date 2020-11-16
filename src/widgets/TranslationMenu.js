import React, {Component, Fragment} from "react";
import { ButtonGroup, Button, Classes, Dialog, Intent, Tooltip, Callout, Popover, Position } from "@blueprintjs/core";
import {__} from "../layouts/utilities/i18n";
import {isRole} from "../layouts/user";

class TranslationMenu extends Component
{
	state = {
		isPopover : false
	}
	render()
	{
		return isRole("administrator", this.props.user) 
			?
			<Fragment>
				<Popover
                    popoverClassName={ Classes.POPOVER_CONTENT_SIZING }
					isOpen={this.state.isPopover === true ? /* Controlled */ true : /* Uncontrolled */ undefined}
					content={
						<div className="square" >
							<div className="">
								<div className="mb-3">
									{__("Remove translation?")}
								</div>
								<Button intent={Intent.DANGER} onClick={this.onDelete} >
									{__("Yes")}
								</Button>
							</div>
						</div>
					}
					position={Position.RIGHT_TOP}
				>
					<Button rightIcon="cross" minimal={true} title={__("Delete Translation")}>
						
					</Button>				
				</Popover> 
			</Fragment>
			:
			null;
	}
	onDelete = () =>
	{
		this.props.onDelete(this.props.translation.id);
	}
}

export default TranslationMenu;