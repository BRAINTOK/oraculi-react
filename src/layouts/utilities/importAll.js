export default function importAll (r, components = {}) 
{
	console.log(r);
	r.keys().forEach(key => 
	{
		const key1 = key.replace("./", "").split(".").slice(0, -1).join(".");		
		components[key1] = r(key);		
	});	
	return components;
}