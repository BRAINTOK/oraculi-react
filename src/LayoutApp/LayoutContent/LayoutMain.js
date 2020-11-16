import React, {Component, Fragment} from "react";
import {compose} from "recompose";
import {Router, Route, Switch, Redirect, withRouter} from 'react-router';
import {concatRouting, mainPage, routeData} from "../../layouts/routing"
import {isCapability} from "../../layouts/user";
import VerifyUserState from "../../states/VerifyUserState";
import FinishRestorePasswordState from "../../states/FinishRestorePasswordState";
import ChangeEmaiState from "../../states/ChangeEmaiState";

const components = {};
function importAll (r) 
{
	// console.log(r)
	r.keys().forEach(key => {
		const key1 = key.replace("./", "").split(".").slice(0, -1).join(".");
		components[key1] = r(key)
	});
}
importAll(require.context('../../states/', false, /\.js$/));

//        let routes = leftmenu.map( (route, num) =>
// 			<Route
// 				exact
// 				path={'/cabinet/'+route.id}
// 				component={COMPONENT_MAP[route.component]}
// 				key={num}
// 			/>
//         );
// 		leftmenu.forEach( (route, num) =>
// 		{
// 		   routes.push( <Route
// 				exact
// 				path={'/cabinet/'+route.id + "/page/:offset"}
// 				component={COMPONENT_MAP[route.component]}
// 				key={num}
// 			/>)
//         });


//<Fragment>
// 									<div className="col-md-9 order-sm-2">
// 										{doAside}
// 									</div>
// 									<div className="col-md-3 order-sm-1">
// 										<Aside/>
// 									</div>
// 								</Fragment>
//			<Route exact path='/welcome' component={WelcomePage} />
//<Route path="/search/:s" component={Searching} />
//			<Route path='/restor_password' component={Restore}/>
//			<Route
// 				exact
// 				path="/verify"
// 				component={Verify}
// 			/>
// 			<Route
// 				path="/verify/:id/:key"
// 				component={Verify}
// 			/>


class LayoutMain extends Component 
{
	render() 
	{
		let main = mainPage();
		let routing = [];
		routing = concatRouting();
		let routers = [], overs = [], grands = [], grandgrands = [];
		//console.log(routing);
		routing.forEach((e, i) =>
		{
			if(e.children && e.children.length > 0) {
				e.children.forEach( ( elem, n ) => {
					if(elem.children && elem.children.length > 0) {
						elem.children.forEach((element, nn) => 
						{
							grands.push( this.searchRouteData(nn, e, elem, element ))
						});
					}
					overs.push( this.searchRouteData(n, e, elem ) );
				});
			}
			routers.push( this.searchRouteData(i, e ) );
		});

		const NoMatchState = components["NoMatchState"].default;
		return <Switch>	
			{ this.searchRouteData(0, main, null, null, "") }
			{ grands }
			{ overs }
			{ routers }
			
			<Route 
				component={ routeProps => (
					<NoMatchState  
						onChangeStyle={ style => this.props.onChangeStyle( style ) }
						user={this.props.user} 
					/> 
				)}
			/>
			
			<Route   
				path={'/restore/:id/:code'}
				exact 
				component = { routeProps => (
					<FinishRestorePasswordState
						onChangeStyle={ style => this.props.onChangeStyle( style ) }
						user={this.props.user}
					/>
				)}
				key="restore"
			/>
			<Route   
				path={'/verify/:id/:code'}
				exact 
				component = { routeProps => (
					<VerifyUserState
						onChangeStyle={ style => this.props.onChangeStyle( style ) }
						user={this.props.user}
					/>
				)}
				key="verify"
			/>
			<Route   
				path={'/changeemail/:id/:code'}
				exact 
				component = { routeProps => (
					<ChangeEmaiState
						onChangeStyle={ style => this.props.onChangeStyle( style ) }
						user={this.props.user}
					/>
				)}
				key="verify"
			/>
			
		</Switch>
	}

	/* 
		@i - (string | int) key index
		@e - (object)- layouts.json element (in menu, profile, extended_routes, bells, comments, help)
		@child - (object) child of @e
		@grandchild - (object) child of @child
		@forceRoute - routee's URL forced up the object.route
		return Route 
	*/
	searchRouteData( i,
		e=undefined,
		child=undefined,
		grandchild=undefined,
		forceRoute=undefined
	) {
		const routeData1 = routeData(e, child, grandchild, forceRoute);
		if( isCapability(routeData1.capability, this.props.user) ) 
		{
			return;
		}
		else
		{
			return this.returnedRoute(i, routeData1.currentE, routeData1.preroute, routeData1.route, routeData1.noexact_route);
		}

	}

	returnedRoute(i, currentE, preroute, route, noexact_route)
	{
		const is =   	preroute + '/' +  route 		== this.props.location.pathname
			|| 	preroute + '/' +  route + "/" 	== this.props.location.pathname;

		const DataTableState = components["DataTableState"].default;
		const DataState = components["DataState"].default;
		const NoMatchState = components["NoMatchState"].default;
		const HTMLState = components["HTMLState"].default;
		const HTMLSourceState = components["HTMLSourceState"].default;

		// console.log( currentE )
		if( currentE.component )
		{
			
			const Component = components[currentE.component].default;
			//{ ...currentE }
			return [
				<Route
					strict
					path = { preroute + '/' +  noexact_route }
					component = { routeProps => (
						<Component
							{ ...currentE }
							preroute={preroute}
							onChangeStyle={ style => this.props.onChangeStyle( style ) }
							user={this.props.user}
						/>
					)}
					key={i + "_1"}
				/>,
				<Route
					exact
					path = { preroute + '/' +  route }
					render = { routeProps => (
						<Component
							{ ...currentE }
							preroute={preroute}
							onChangeStyle={ style => this.props.onChangeStyle( style ) }
							user={this.props.user}
						/>
					)}
					key={i + "_2"}
				/>
			]
		}
		else if( currentE.html_source )
		{
			return <Route
				exact
				path = { preroute + '/' +  route }
				render = { routeProps => (
					<HTMLSourceState
						{ ...currentE }
						onChangeStyle={ style => this.props.onChangeStyle( style ) }
					/>
				)}
				key={i}
			/>
		}
		else if( currentE.html )
		{
			return [
				<Route
					exact
					path = { preroute + '/' +  route }
					render = { routeProps => (
						<HTMLState
							{...currentE}
							onChangeStyle={ style => this.props.onChangeStyle( style ) }
						/>
					)}
					key={i + "_2"}
				/>
			]
		}
		else if( currentE.single_data_type)
		{
			//console.log( currentE );
			//console.log( preroute + '/' +  route );
			return <Route
				strict
				path = { preroute + '/' +  route }
				render = { routeProps => (
					<DataState
						{ ...currentE }
						route={ preroute + '/' + route  }
						onChangeStyle={ style => this.props.onChangeStyle( style ) }
					/>
				)}
				key={i + "_2"}
			/>
		}
		else if( currentE.data_type)
		{
			//console.log( currentE.route);

			return [
				<Route
					strict
					path = { preroute + '/' +  noexact_route }
					render = { routeProps => (
						<DataState
							{ ...currentE }
							route={ preroute + '/' + route  }
							onChangeStyle={ style => this.props.onChangeStyle( style ) }
						/>
					)}
					key={i + "_2"}
				/>,
				<Route
					exact
					path = { preroute + '/' +  route }
					render = { routeProps => (
						<DataTableState
							{ ...currentE }
							route={preroute + '/' + route }
							onChangeStyle={ style => this.props.onChangeStyle( style ) }
						/>
					)}
					key={i + "_1"}
				/>
			]
		}
		return;
		return  [
			<Route
				exact
				path = { preroute + '/' +  route }
				render = { routeProps => (
					<NoMatchState
						title={"- 404 -"}
						icon={""}
						style_id={currentE.style_id}
						is_left={currentE.is_left}
						onChangeStyle={ style => this.props.onChangeStyle( style ) }
					/>
				)}
				key={i}
			/>
		];
	}

}

export default compose(
	withRouter
)(LayoutMain);