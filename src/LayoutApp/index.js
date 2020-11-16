import React, {Fragment} from 'react';
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom';

import LayoutBody from "./LayoutBody";

import {client} from "../layouts/client";

class LayoutApp extends React.Component
{
    render() {
        return (
            <BrowserRouter forceRefresh={false} >
                <ApolloProvider client={client()}>
                    <LayoutBody/>
                </ApolloProvider>
            </BrowserRouter>
        );
    }
}

export default LayoutApp;