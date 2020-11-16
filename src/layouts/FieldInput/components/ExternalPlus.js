import React, {Component} from "react";
import {apolloFields, getQueryExternalFields, getVisibleValue, getQueryName} from "../../schema";
import ExtendedLink from "../scalars/ExtendedLink";
import Link from "../scalars/Link";
import {Query} from "react-apollo";
import Loading from "../../utilities/Loading";
import Selector from "../scalars/Selector";
import String from "../scalars/String";

export default function ExternalPlus(params){
    const editable = typeof params.editable !== "undefined" ? params.editable : true;
    const field = params.field;
    const visibled_value = getVisibleValue(params.component);
    const external_state = params.external_state;
    const external_link_data = params.external_link_data;
    const vertical = params.vertical;
    const list = params.list;
    const addList = params.addList;


    const extended_link = params.extended_link;
    const inner_link = params.inner_link;

    const title =params.title;
    let value =params.value;
    const onChange =params.onChange;
    const type =params.type;
//console.log(params)
    const query_gql = getQueryExternalFields(params.component, params.external_fields);
    const aq = getQueryName(params.component);

    if( extended_link )
    {
        //добавляем дополнительные поля в роутинг (сейчас только :id)
        let route = extended_link.route;
        if( extended_link.add)
        {
            switch( extended_link.add)
            {
                case ":id":
                    route += value ? value._id : " ";
                    break;
                default:
                    route = route;
            }
        }
        const visibled_value = getVisibleValue(params.component);
        return <ExtendedLink
            field={ field }
            extended_link={ route }
            title={ title }
            _id={ 1 }
            value={ value ? value[ visibled_value ] :  " -- " }
            vertical={ vertical }
            external_state={external_state}
            external_link_data={external_link_data}
        />
    }
    else if( inner_link == 1 )
    {
        return <Link
            field={ field }
            title={ title }
            _id={ 1 }
            value={ value ? value[ visibled_value ] :  " -- " }
            external_state={external_state}
            vertical={ vertical }
            external_link_data={external_link_data}
        />
    }
    else if( params.component )
    {

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
						//console.log(data , aq);
                        listData = data[aq];
                    }
                    //console.log(params);
                    if (listData && params.show_first) {
                        value = listData[0];
                    }
                    //console.log( value );
                    if(data)
                        return <Selector
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
    else
    {
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