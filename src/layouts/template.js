import layouts from "./layouts";

export function cssStyle()
{
    const css = localStorage.getItem("css");
    const style = css && css !== "undefined" ? css : layouts.template.style;
	return style;
}

export function styles() {
	//console.log(layouts);
    return layouts.template.styles;
}

export function currentStyles() {
    return layouts.template.style;
}
export function byId(id)
{
	const st = styles().filter(e => e._id == id)[0]
	return st ? st : {};
}

export function isMenuLeft() {
    //console.log(layouts.template.menu_left)
    if (layouts.template) 
	{
        return layouts.template.menu_left || 0;
    }
}

export function login() {
    return layouts.template.login;
}

export function template() 
{
    if (layouts.template)
        return layouts.template;
}
export function widgets() 
{
    if (layouts.widgets)
        return layouts.widgets;
}
export function areas() 
{
    if (layouts['widget-area'])
        return layouts['widget-area'];
}

export function avatar() {
    if (layouts.template && layouts.template.avatar)
        return layouts.template.avatar;
}

export function loginPage() {
    return layouts.template.login;
}

export function iconUrl() {
    return "url(" + layouts.template.icon + ")";
}

export function iconHeight() {
    return layouts.template.icon_height ? layouts.template.icon_height : 30;
}

export function iconWidth() {
    return layouts.template.icon_width ? layouts.template.icon_width : 30;
}

export function getVisibleValue( object, visile_value_srting )
{
	let arr = visile_value_srting.split("."); 
	let adr = {...object}
	for(let i=0; i<arr.length; i++)
	{
		adr = adr[arr[i]];
	}
	return adr;
}
