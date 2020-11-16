import gql from "graphql-tag";
import layouts from "../layouts";

export default {
    "name": "ecosystem",
    "link_type": "http"
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
                let subfields = {};
                for (let k in layouts.schema[field.component].apollo_fields)
                {
                    let e = layouts.schema[field.component].apollo_fields[k];
                    if (e.kind != "type") {subfields[k] = e;}
                }
                let fll = Object.keys(subfields);
                fl.push(fld + " { " + fll.join(" ") + " } ");
                break;
            case "scalar":
            default:
                fl.push(fld);
                break;
        }
    }
    return fl.join(" ");
}

export function getQueryName(data_type) {
    if (data_type.slice(-1) == "y") {
        return "get" + data_type.slice(0, data_type.length - 1) + "ies";
    }
    return "get" + data_type + "s";
}

export function querySingleName(data_type) {
    return "get" + data_type;
}

//data_type ? data_query : "get" + data_type + "s";

export function queryCollection(data_type, query_name, query_args, filter_data_types) 
{
    const fields = query_args;
    const query = "query " + query_name + " { " + query_name + " { " + fields + " } }";
    return gql`${query}`;
}

export function queryCollectionFilter(data_type, query_name, query_args, filter = false) 
{
    const fields = query_args;
    const paging1 = filter ? "($paging: Paging)" : "";
    const paging2 = filter ? "(paging: $paging)" : "";
    const query = "query " + query_name + paging1  + " { " + query_name + paging2 + " { " + fields + " } }";
    return gql`${query}`;
}


export function querySingle(data_type, query_name, query_args, id) {
    const fields = query_args;
    const query = "query " + query_name + " { " + query_name + "(id: \"" + id + "\") { " + fields + " } }";
	return gql`${query}`;
}




export function getMutationName(data_type) {
    return "change" + data_type;
}

export function getInputTypeName(data_type) {
    return  data_type + "Input";
}

export function mutationAdd(data_type, mutation_name, input_type_name, mutation_args) {
    const fields = mutation_args;
    const mutation_change = "mutation "+mutation_name+"($id:ID $input:" + input_type_name +"){" + mutation_name +"(_id: $id, input: $input){ " + fields + " }}";
    return gql`${mutation_change}`;
}

export function mutationEdit(data_type, mutation_name, input_type_name, mutation_args) {
    const fields = mutation_args;
    const mutation_change = "mutation "+mutation_name+"($id:ID $input:" + input_type_name +"){" + mutation_name +"(_id: $id, input: $input){ " + fields + " }}";
    return gql`${mutation_change}`;
}

export function mutationDelete(data_type )
{
    const mutation_change = "mutation delete" + data_type +"($id:ID!){ delete" + data_type +"(id: $id)}";
    return gql`${mutation_change}`;
}

//login

export function mutationAvtorize() {
    const mutation_change = "mutation authorize($input: AuthorizeInput){ authorize(input: $input){" +
        "auth_req_id" +
        "}}";
    return gql`${mutation_change}`;
}

export function mutationToken() {
    return token();
}

export function token() {
    const mutation_change = "mutation token($input: TokenInput){ token(input: $input){" +
        "        access_token\n" +
        "        token_type\n" +
        "        expires_in\n" +
        "        refresh_token" +
        "}}";
    return gql`${mutation_change}`;
}

export function queryUserInfo() {
    const query_args = getQueryArgs("User");
    const fields = query_args;
    const mutation_change = "query  userInfo{  userInfo{ "+fields+" } }";
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
    const aq = getQueryName(component);
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

export function mutationEditName(data_type) {
    return "change" + data_type;
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

export function getIdName() {
    return "_id";
}

export function getExternalPostfix() {
    return "_id";
}

export function getArrayPostfix() {
    return "_ids";
}