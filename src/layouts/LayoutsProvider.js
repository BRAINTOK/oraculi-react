import React, {Component, Fragment, useState, useContext} from "react";
import {BrowserRouter} from "react-router-dom";
import {ApolloProvider} from "react-apollo";
import {client} from "./client";

import LayoutUserProvider from "./LayoutUserProvider";
import LayoutScrollToTop from "./LayoutScrollToTop";

function LayoutsProvider(props) {

	return (
		<BrowserRouter>
			<LayoutScrollToTop/>
			<ApolloProvider client={client()}>
				<LayoutUserProvider>							
					{props.children}
				</LayoutUserProvider>
			</ApolloProvider>
		</BrowserRouter>
	);
}

export default LayoutsProvider;