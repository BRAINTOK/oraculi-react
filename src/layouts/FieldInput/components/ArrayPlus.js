import React, {Component} from "react";
import Array from "../scalars/Array";
import {apolloFields, getQueryExternalFields, getQueryName, getVisibleValue} from "../../schema";
import {Query} from "react-apollo";
import Loading from "../../utilities/Loading";
import MultiSelect from "../scalars/MultiSelect";

export default function ArrayPlus(params){
    const visibled_value =
        params.visibled_value
            ?
            params.visibled_value
            :
            getVisibleValue(params.component);
    const vertical = params.vertical;
    const list = params.list;
    const addList = params.addList;


    const external_fields = params.external_fields;
    const editable = typeof params.editable !== "undefined" ? params.editable : true;
    const field = params.field;

    const title =params.title;
    const value =params.value;
    const onChange =params.onChange;
    const type =params.type;

    switch( params.component )
    {
        case "string":
            return <Array
                field={ field }
                editable={ editable }
                title={ title }
                value={ value }
                vertical={ vertical }
                on={onChange}
            />;
            break;
        case "array":
            break;
        default:
            const query_gql = getQueryExternalFields(params.component, external_fields);
            const aq = getQueryName(params.component);
        
            const f = <Query query={ query_gql }  >
                {
                    ({ loading, error, data, client}) =>
                    {
                        if( loading)
                            return <Loading/>;
                        //console.log(data[aq]);
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
                        //console.log( "array.MultiSelect", value, field, field );
                        if(data || list || value)
                            return <MultiSelect
                                multiple={true}
                                field={ field }
                                editable={ editable }
                                title={ title }
                                value={ value }
                                data ={ listData }
                                visibled_value={ visibled_value }
                                vertical={ vertical }
                                on={onChange}
                            />
                    }
                }
            </Query>;
            return f;
    }
}