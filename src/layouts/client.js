import {ApolloClient} from "apollo-client";
import {ApolloLink} from "apollo-link";
import {RestLink} from "apollo-link-rest";
import {HttpLink} from "apollo-link-http";
import {setContext} from "apollo-link-context";
import {onError} from "apollo-link-error";
import {InMemoryCache} from "apollo-cache-inmemory";
import { createUploadLink } from 'apollo-upload-client';

import {Intent} from "@blueprintjs/core";

import {AppToaster} from "./utilities/blueUtils";
import {__} from "./utilities/i18n";
import {link_type, server_url} from "./config";

//TODO доработать

function get_msg_types()
{
    return {
        info:{intent:Intent.PRIMARY, icon:"tick"},
        login:{intent:Intent.SUCCESS, icon:"person"},
        error_login:{intent:Intent.DANGER, icon:"blocked-person"},
        error:{intent:Intent.DANGER, icon:"disable"},
        trash:{intent:Intent.SUCCESS, icon:"trash"},
    }
}

export function client() 
{
    const restLink = new RestLink({
        uri: server_url()
    });
    const httpLink = new HttpLink({
        uri: server_url(),
    });
    const uploadLink = createUploadLink({
        uri: server_url(),
    });
    const queryLink = uploadLink;
   // const queryLink = (link_type() === "http") ? httpLink: restLink;
    const cache = new InMemoryCache();
    const authLink = setContext((_, { headers }) => 
	{

        let new_headers;
        if(localStorage.getItem('token'))
		{
            const token = localStorage.getItem('token')? localStorage.getItem('token') : "";
            new_headers = {
                ...headers,
                "Authorization": 'Bearer ' + token,
            }
        }
        else if(localStorage.getItem('client_token') )
		{
            const token = localStorage.getItem('client_token')? localStorage.getItem('client_token') : "";
            new_headers = {
                ...headers,
                "Authorization": 'Bearer ' + token
            }
        }
        else
		{
            new_headers = {
                ...headers
            }
        }

        //"authorization": 'Bearer ' + token,

        // return the headers to the context so httpLink can read them
        // const xxx = base64_encode( login +':'+ password );
        // console.log(new_headers);
        return {
            headers: new_headers
        }
    });

    //                    AppToaster.show({
    //                         intent: get_msg_types()[msg_type].intent,
    //                         icon: get_msg_types()[msg_type].icon,
    //                         timeout:10000,
    //                         className: "px-2 py-2",
    //                         message: __.t(data.msg),
    //                     });

    const errorlink = onError(({ graphQLErrors, networkError, operation, forward }) => {

        if (graphQLErrors) {
            for (let err of graphQLErrors) {

                if(err.extensions){
                    switch (err.extensions.code) {
                        case "INTERNAL_SERVER_ERROR":
                            console.log(err);
                            break;
                        case "FORBIDDEN":
                            console.log(err);
                            break;
                        default:
                            AppToaster.show({
                                intent: Intent.DANGER,
                                icon: "error",
                                message: __( err.message )
                            });
                            break;
                    }
                }else{
                    AppToaster.show({
                        intent: Intent.WARNING,
                        icon: "warning",
                        message: __( err.message )
                    });
                }

            }
        }
    });

    const defaultOptions = {
        watchQuery: {
            fetchPolicy: 'network-only',
            // errorPolicy: 'ignore',
        },
        query: {
            fetchPolicy: 'network-only',
            // errorPolicy: 'all',
        },
    }

    return new ApolloClient({
        link: ApolloLink.from([
            errorlink,
            authLink,
            queryLink,

        ]),
        cache: cache,
        defaultHttpLink: false,
        defaultOptions: defaultOptions,
        fetchOptions: {
            credentials: 'include',
            mode: 'no-cors',
        }

    })
}