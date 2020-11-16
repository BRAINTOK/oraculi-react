import React, {Component} from "react";
import {apolloFields, getQueryExternalFields} from "../../schema/ecosystem";
import {Query} from "react-apollo";
import Loading from "../../utilities/Loading";
import String from "../scalars/String";

export default function ComponentPlus(params){
    const field = params.field;
    const visibled_value =
        params.visibled_value
            ?
            params.visibled_value
            :
            'title';
    const vertical = params.vertical;
    const list = params.list;
    const addList = params.addList;




    const external_fields = params.external_fields;
    const query_gql =  getQueryExternalFields(params.component, external_fields);
    const aq = apolloFields(params.component);

    const title =params.title;
    const value =params.value;
    const onChange =params.onChange;
    const type =params.type;

    //
    const f = <Query query={ query_gql } >
        {
            ({ loading, error, data, client}) =>
            {
                if( loading)
                    return <Loading/>;

                let listData = [];
                if(addList)
                {
                    listData = data[aq].concat( addList );
                }
                else if(list)
                {
                    listData = list;
                }
                else
                {
                    listData = data[aq];
                }
                //console.log( value );
                if(data)
                    return <String
                        field={ field }
                        title={ title }
                        editable={ false }
                        visibled_value={visibled_value}
                        value={ value ? value[visibled_value] : "" }
                        vertical={ vertical }
                        on={onChange}
                    />
            }
        }
    </Query>;
    return f;
}