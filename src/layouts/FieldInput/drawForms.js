import {getFields, getVisibleValue} from "../schema/ecosystem";
import {isCapability} from "../user";
import FieldInput from "./index";
import React from "react";

//https://jsdoc.app/tags-deprecated.html

/**
 * @deprecated since version 1.0
 */
export default function drawForms (props )
{
    if(props.isMain)
    {
        //console.log( this.props.addList )
        //console.log( this.state.activate_sources )
        //console.log( this.props.data.themes )
    }
    let fields = [];
    const _fields = getFields(props.data_type );
    for( let field in _fields )
    {
        //if(this.props.isMain)
        //	console.log( this.state[field] );

        if(
            field == "id"
            || field == "admin_data"
            || (
                isCapability(_fields[field].caps, "")
            )
        ) continue;
        const editable = typeof props.editable != "undefined" ? this.props.editable : _fields[field].editable;
        // добавляем данные для формирования "умной" ссылки, если в схеме указано, что она есть
        let external_link_data = { orig: {id: props.id}};
        if(_fields[field].external_state)
        {
            //добавляем в ссылку данные дочерних элементов объекта, указанные в схеме
            for(let es in  _fields[field].external_state)
            {
                external_link_data[es] = {
                    component: _fields[es].component,
                    ...props[es]
                };
            }
        }
        const compp = _fields[field].component;
    }

    return fields;
}