import React from "react";
import layouts from "../layouts";

export function schema()
{
	return layouts.schema;
}

export function adapter() {
    if(layouts.app && layouts.app.adapter){
        const file = require(__dirname + "/" + layouts.app.adapter);
        return file;
    }else{
        return false;
    }
}
export function getQueryData(data_type)
{
	const file = adapter();
    return file.getQueryData ? file.getQueryData( data_type ) :  layouts.schema[data_type];
}
export function getQueryArgs(data_type, thread_only = false) {
    const file = adapter();
    return file.getQueryArgs(data_type, thread_only);
}

export function getQueryName(data_type) {
    const file = adapter();
    return file.getQueryName(data_type);
}

export function getQueryExternalFields(component, external_fields) {
    const file = adapter();
    return file.getQueryExternalFields(component, external_fields);
}

export function queryCollection(data_type, query_name = "", query_args = "", filter = "") {
    const file = adapter();
    return file.queryCollection(data_type, query_name, query_args, filter);
}

export function queryCollectionFilter(data_type, query_name = "", query_args = "", filter = false) {
    const file = adapter();
    return file.queryCollectionFilter(data_type, query_name, query_args, filter);
}

export function queryUserInfo(){
    const file = adapter();
    const fld = file.getQueryArgs("User");
    return file.queryUserInfo(fld);
}

export function getChangeName(data_type) {
    const file = adapter();
    return file.getMutationName(data_type);
}

export function getMutationName(data_type) {
    const file = adapter();
    return file.getMutationName(data_type);
}

export function getInputTypeName(data_type) {
    const file = adapter();
    return file.getInputTypeName(data_type);
}

export function getMutationArgs(data_type) {
    return getQueryArgs(data_type);
    console.log(data_type);
    const apollo_fields = layouts.schema[data_type].apollo_fields;
    if (!apollo_fields) {
        return "error layouts.json";
    }
    const fields = Object.keys(apollo_fields).filter(e => e != "_id");
    return fields;
}

export function mutationEditName(data_type) {
    const file = adapter();
    return file.mutationEditName(data_type);
}

export function mutationAdd(mutation_name, input_type_name, mutation_args) {
    const file = adapter();
    return file.mutationAdd(mutation_name, input_type_name, mutation_args);
}

export function mutationEdit(data_type, mutation_name, input_type_name, mutation_args) {
    const file = adapter();
    //console.log(mutation_args);
    return file.mutationEdit(data_type, mutation_name, input_type_name, mutation_args);
}

export function mutationDelete(data_type) {
    const file = adapter();
    return file.mutationDelete(data_type);
}

export function mutationAvtorize(){
    const file = adapter();
    return file.mutationAvtorize();
}

export function mutationToken(){
    const file = adapter();
    return file.mutationToken();
}

export function getVisibleValue(type) 
{
    
    const file = adapter();
    return file.getVisibleValue(type);
}

export function apolloFields(data_type){
    const file = adapter();
    return file.apolloFields(data_type);
}

export function adminData(data_type){
    const file = adapter();
    return file.adminData(data_type);
}


export function getInput(state, data_type) {
    const file = adapter();
    return file.getInput(state, data_type);
}

export function querySingleName(data_type) {
    const file = adapter();
    return file.querySingleName(data_type);
}

export function querySingle(data_type, query_name, query_args, id) {
    const file = adapter();
    return file.querySingle(data_type, query_name, query_args, id);
}

export function getIdName() {
    const file = adapter();
    return file.getIdName();
}

export function getExternalPostfix() {
    const file = adapter();
    return file.getExternalPostfix();
}

export function getArrayPostfix() {
    const file = adapter();
    return file.getArrayPostfix();
}

export function getAllDataTypes()
{
	const file = adapter();
	return file.getAllDataTypes();
}
export function getTypeSelector( params = {})
{
	const options = Object.entries(getAllDataTypes()).map((e, i) =>
	{
		const selected = params.selected == e[0];
		return <option key={i} value={e[0]} selected={selected}>
			{e[0]}
		</option>
		
	}) 
	return <select onChange={ params.onChange ? params.onChange : null } className={ "form-control " + params.className }>
		<option value="-1"> -- </option>
		{options}
	</select>
}