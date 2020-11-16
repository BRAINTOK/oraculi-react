import React, {Component, Fragment} from "react";
import {__} from "../../../layouts/utilities/i18n";
import matrix from "../data/matrix";
import FieldInput from "../../../layouts/FieldInput";
import { Button, Intent, Icon, Dialog } from "@blueprintjs/core";

class InputPosition extends Component
{
	state = {
		...this.props
	}
	render()
	{
		const {x, y, w, h} = this.state.position.mc;
		return <div className="landing-position">
			<FieldInput
				field={ "x" }
				key={ "x" }
				{ ...matrix.Position } 				
				visualization="landing_object"
				type="landing_object"
				landing_object="Position"
				on={this.on}
				onChange={this.on}
				editable = { true }
				value={ x }
				vertical={ false }
			/>
		</div>
	}
	on = (field, value) =>
	{
		
	}
}
export default InputPosition