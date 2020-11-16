import gql from "graphql-tag";
import layouts from "../layouts";

export default {
    "name": "school",
    "link_type": "rest"
}

export function getAllDataTypes()
{
	return layouts.schema;
}
export function getQueryArgs(data_type) 
{
    const apollo_fields = layouts.schema[data_type].apollo_fields;
    if (!apollo_fields) {
        return "error layouts.json";
    }
    let fl = [];
    for (let fld in apollo_fields) {

        const field = apollo_fields[fld];

        switch(field.kind){
            case "type":
                //console.log(field);
                //console.log(field.apollo_fields);
                const fll = Object.keys(field.apollo_fields);
                fl.push(fld + "@type(name: \""+field.type+"\")"+" { " + fll.join(" ") + " } ");
                break;
            case "scalar":
            default:
                fl.push(fld);
                break;
        }
    }
    return fl.join(" ");
}

//TODO отрисовка type to component
//scalar, component



//        if (apollo_fields[fld].type == "array") {
//             switch (apollo_fields[fld].component) {
//                 case "string":
//                 case "integer":
//                 case "float":
//                 case "email":
//                 case "phone":
//                     fl.push(fld + "");
//                     break;
//                 default:
//                     let fll = [];
//                     for (let nnn in apollo_fields[fld].external_fields) {
//                         fll.push(apollo_fields[fld].external_fields[nnn]);
//                     }
//                     fl.push(fld + " { " + fll.join(" ") + " } ");
//                     break;
//             }
//             fl.push();
//         } else if (apollo_fields[fld].type == "external") {
//             const fll = apollo_fields[fld].external_fields;
//             fl.push(fld + " { " + fll.join(" ") + " } ");
//         } else {
//             fl.push(fld);
//         }

// export function getQueryArgs(data_type) {
//     const apollo_fields = layouts.schema[data_type].apollo_fields;
//     if (!apollo_fields) {
//         return "error layouts.json";
//     }
//     //const fl = (Object.keys( apollo_fields )).join(" ");
//     let fl = [];
//     for (let fld in apollo_fields) {
//         if (apollo_fields[fld].type == "array") {
//             switch (apollo_fields[fld].component) {
//                 case "string":
//                 case "integer":
//                 case "float":
//                 case "email":
//                 case "phone":
//                     fl.push(fld + "");
//                     break;
//                 default:
//                     let fll = [];
//                     for (let nnn in apollo_fields[fld].external_fields) {
//                         fll.push(apollo_fields[fld].external_fields[nnn]);
//                     }
//                     fl.push(fld + " { " + fll.join(" ") + " } ");
//                     break;
//             }
//             fl.push();
//         } else if (apollo_fields[fld].type == "external") {
//             const fll = apollo_fields[fld].external_fields;
//             fl.push(fld + " { " + fll.join(" ") + " } ");
//         } else {
//             fl.push(fld);
//         }
//
//
//     }
//     return fl;
// }

export function getQueryName(data_type) {
    return  data_type.toString().toLowerCase();
}

// export function getQueryName(data_type) {
//     return data_type.toString().toLowerCase();
// }

//data_type ? data_query : "get" + data_type + "s";

//https://www.apollographql.com/docs/link/links/rest/

export function queryCollection(data_type, query_name, query_args) {
    const query = "query "+query_name+"(" +
        "$numberposts: Int = 20," +
        "$offset: Int = 0," +
        "$is_errors:Int = 0," +
        "$type:String = \"\"" +
        ")" +
        "{" + query_name +":" +
        "publish(  pars: {" +
        "offset: $offset, " +
        "numberposts:$numberposts," +
        "type:$type" +
        "} )" +
        "@rest(" +
        "type: \""+data_type+"\"" +
        "path: \""+query_name+"/?{args}\"" +
        "method: \"GET\" " +
        ")" +
        // "{ " + query_name + "@type(name: \""+data_type+"\"){"+ + fields + "}" + " }}";
        "{ " + query_name + "@type(name: \"Main\"){" + query_args + "}" + " }}";
    return gql`${query}`;
}

export function querySingle(data_type, query_name, query_args) {
    const query =  "query "+query_name+"(" +
        "$id: Int" +
        ")" +
        "{" + query_name+"(id: $id)" +
        "@rest(" +
        "type: \""+query_name+"\", " +
        "path: \""+query_name+"/{args.id}\"" +
        ")" +
        "{ " + query_name + "@type(name: \"Planet\"){" + query_args + "}" + " }}";
    return gql`${query}`;
}

export function getMutationArgs(data_type) {
    const apollo_fields = layouts.schema[data_type].apollo_fields;
    if (!apollo_fields) {
        return "error layouts.json";
    }
    const fields = Object.keys(apollo_fields).filter(e => e != "_id");
    return fields;
}

export function getMutationName(data_type) {
    return "change" + data_type;
}

export function getChangeName(data_type) {
    return "change" + data_type;
}

export function addName(data_type) {
    return "change" + data_type;
}

export function mutationEditName(data_type) {
    return "change" + data_type;
}

export function getInputTypeName(data_type) {
    return  data_type + "Input";
}

export function mutationAdd(mutation_name, input_type_name, mutation_args) {
    const fields = mutation_args.join(" ");
    const mutation_change = "mutation insert_category\n" +
        "($id: Int,\n" +
        "$post_title: String,\n" +
        "$post_content: String\n" +
        "){\n" +
        "  insert_category: publish( id: $id,  input: {pars: {\n" +
        "    post_title : $post_title,\n" +
        "    post_content: $post_content\n" +
        "  }} )\n" +
        "  @rest(\n" +
        "    type: \"category\",\n" +
        "    path: \"category\"\n" +
        "    method: \"POST\"\n" +
        "  ){\n" + fields +
        "  }\n" +
        "}";
    return gql`${mutation_change}`;
}

export function mutationEdit(data_type, mutation_name, input_type_name, mutation_args) {
    const fields = mutation_args.join(" ");
    const mutation_change = "mutation "+mutation_name+
        "($id: Int,\n" +
        "$post_title: String,\n" +
        "$post_content: String,\n" +
        "$order: String,\n" +
        "$icon_id: Int,\n" +
        "$is_international: Int,\n" +
        "$media_name: String,\n" +
        "$icon: String,\n" +
        "){\n" +mutation_name+
        "    : publish( id: $id,  input: {pars: {\n" +
        "        post_title : $post_title,\n" +
        "        post_content: $post_content,\n" +
        "        icon_id: $icon_id,\n" +
        "        is_international: $is_international,\n" +
        "        order: $order,\n" +
        "        media_name: $media_name,\n" +
        "        icon: $icon,\n" +
        "    }} )\n" +
        "    @rest(\n" +
        "        type: \""+data_type.toString().toLowerCase()+"\",\n" +
        "        path: \""+data_type.toString().toLowerCase()+"/{args.id}\"\n" +
        "        method: \"POST\"\n" +
        "    ){\n" +
        fields +
        "    }\n" +
        "}";
    return gql`${mutation_change}`;
}

export function mutationDelete( data_type )
{
    const mutation_change = "mutation delete_bio_event\n" +
        "($id: Int)\n" +
        "{\n" +
        "    delete_bio_event: publish( id: $id )\n" +
        "    @rest(\n" +
        "        type: \"bio_event\",\n" +
        "        path: \"bio_event/{args.id}\"\n" +
        "        method: \"DELETE\"\n" +
        "    ){\n" +
        "        article\n" +
        "        msg\n" +
        "    }\n" +
        "}";
    return gql`${mutation_change}`;
}

//login

export function queryUserInfo() {
    const query_args = getQueryArgs("User");
    const mutation_change = "query  userInfo{  userInfo " +
        "@rest(" +
        "type: \"user_info\"" +
        "path: \"user_info\"" +
        "method: \"GET\" " +
        ")" +
        "{ user @type(name: \"User\"){"+query_args+" }} }";
    return gql`${mutation_change}`;
}

export function mutationAvtorize() {
    const mutation_change = "mutation authorize($input: AuthorizeInput){ authorize(input: $input){" +
        "auth_req_id" +
        "}}";
    return gql`${mutation_change}`;
}

export function mutationToken() {
    const mutation_change = "mutation token($email: String = \"ffff\", $password:String = \"ffff\"){" +
        "  token: publish(email: $email, password: $password, input: {pars:{" +
        "    email: $email" +
        "    psw: $password" +
        "  }})" +
        "  @rest(" +
        "    type: \"token\"" +
        "    path: \"token\"" +
        "    method: \"POST\"" +
        "  ) " +
        "{" +
        "alert " +
        "access_token" +
        "  }" +
        "}";
    console.log(mutation_change);
    return gql`${mutation_change}`;
}




export function onSaveGql(state, _id){

    if(state._id)
    {
        delete state._id;
        delete state.__typename;
    }
    let fl = [];
    const apollo_fields = layouts.schema[ this.props.data_type ].apollo_fields;

    for(let el in state)
    {
        let dating, tt;
        switch(apollo_fields[el].type)
        {
            case "array":
                switch(apollo_fields[el].component)
                {
                    case "date":
                    case "boolean":
                    case "integer":
                    case "float":
                        tt = [];
                        for( let t in state[el])
                        {
                            tt.push( state[el] );
                        }
                        dating = "[" + tt.join(", ") + "]";
                        break;
                    case "string":
                    default:
                        tt = [];
                        for( let t in state[el])
                        {
                            tt.push("'"+state[el] + "'");
                        }
                        dating = "[" + tt.join(", ") + "]";
                        break;
                }
                break;
            case "checkbox":
                tt = [];
                for( let t in state[el])
                {
                    tt.push("'"+state[el] + "'");
                }
                dating = "[" + tt.join(", ") + "]";
                break;
            case "geo":
                dating = "[" + state[el][0] + ", " +  state[el][1] + "]";
                break;
            case "date":
            case "boolean":
            case "integer":
            case "float":
                dating = state[el];
                break;
            case "email":
            case "phone":
            case "string":
            default:
                dating = "'" + state[el] + "'";
                break;
        }
        fl.push( el + ":" + dating);
    }
    console.log( fl );
}

export function getQueryExternalFields(component, external_fields) {
    const aq = layouts.schema[ component ].apollo_query;
    const fl = external_fields.join(" ")
    const query = "query " + aq + " { " + aq + " { " + fl + " } }";
    return gql`${query}`;
}



export function getInput(state, data_type) {
    delete state.current;
    delete state.height;
    delete state.isOpen;
    delete state.allChecked;
    delete state.checked;
    //Удаляем не-редактируемые поля, которые всё равно запретит сервер
    const apollo_fields = layouts.schema[ data_type ].apollo_fields;
    for (let i in apollo_fields)
    {
        if(!apollo_fields[i].editable)
            delete state[i];
    };
    return state;
}

export function apolloFields(data_type){
    return layouts.schema[ data_type ].apollo_fields;
}

export function getFields (data_type )
{
    let dataType = false;
    for(var i in layouts.schema)
    {
        if(i == data_type)
        {
            dataType = i;
            break;
        }
    }
    const apollo_fields = layouts.schema[ dataType ].apollo_fields;
    if(dataType)
    {
        return apollo_fields;
    }
    else
    {
        return {_id	: "string", title : {"type":"string"}};
    }
}

export function getVisibleValue(type) {

    let schema = layouts.schema;

    const visibled_value = type
        ?
        schema[type] && schema[type].visibled_value
            ?
            schema[type].visibled_value
            :
            'title'
        :
        "title";

    return visibled_value;
}