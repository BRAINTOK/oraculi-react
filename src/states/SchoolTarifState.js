import React, {Component, Fragment} from "react";
import {__} from "../layouts/utilities/i18n";
import {sprintf} from "../layouts/utilities/sprintf";
import BasicState from "../layouts/BasicState";
import tarif from "../config/data/tarif";
import Tarifs from "./tarif/Tarifs";
import Profile from "./tarif/Profile";
import { 
	Icon, Tag, 
	Intent, Tooltip, 
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, 
	InputGroup, Dialog
 } from "@blueprintjs/core";
import Tabs from "../layouts/utilities/Tabs";

//with login state
class SchoolTarifState extends BasicState
{
	render()
	{
		return <Fragment>
			<div className="layout-state  bg-white">
				<div className="row">
					<div className="col-12 d-flex justify-content-center flex-column">
						<Tabs
							route={"/"}
							current={"tf"}
							tabs={[
								{title:__("Управление подпиской"), id: "tarif", to:"tarif", content : <Tarifs />},
								{title:__("Личный кабинет"), id: "profile", to:"profile", content: <Profile />},
							]}
						/>
						
					</div>
				</div>
			</div>
			
		</Fragment>;
	}
	getRoute = () =>
	{
		return "tarif";
	}
}

export default SchoolTarifState;

