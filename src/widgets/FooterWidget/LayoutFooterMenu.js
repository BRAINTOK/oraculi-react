import React from 'react';
import PropTypes from 'prop-types';
import {compose, graphql} from "react-apollo";
import { Link, NavLink } from 'react-router-dom'
import {footer} from "../../layouts/routing";
import {withRouter} from "react-router";
import {__} from "../../layouts/utilities/i18n";

class LayoutFooterMenu extends React.Component
{
    constructor(props) 
	{
        super(props);
        this.state = {};
    }
	render()
	 {
	 	const footer_menu = footer();
		const menus = footer_menu.map((e, i) => {
			return <div className="col-12 py-2 d-flex justify-content-center" key={i}>
					<NavLink
						to={ "/" + e.route }
					>
						{__(e.title)}
					</NavLink>
				</div>
		});

        return (
			<React.Fragment>
				{menus}
			</React.Fragment>
		)
    }
}

export default compose(
	withRouter
)(LayoutFooterMenu);
