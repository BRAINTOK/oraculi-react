import layouts from "./layouts";

export function title() 
{
    if(layouts.app && layouts.app.title)
        return layouts.app.title;
}

export function name() 
{
    if(layouts.app && layouts.app.name)
        return layouts.app.name;
}

export function externalSystems() {
    return layouts.app.external_systems;
}
export function roles() {
    return layouts.app.roles;
}