
/*
	method: diff - difference in arr1 , comp - compaire between arr1 and arr2
*/
export default function compaireArrays(arr1, arr2, arg="_id", method="diff")
{
	if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];
	switch(method)
	{
		case "comp":
			return comp(arr1, arr2);
		case "diff":
		default:
			return diff(arr1, arr2);
	}
}
export function diff(arr1, arr2, arg="_id")
{
	if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];
	let compArr = [];
	arr1.forEach(el =>
	{
		let bool = false;
		arr2.forEach(el2 =>
		{
			bool = bool || ( el[arg] === el2[arg] );
		})
		if(!bool)
			compArr.push(el);
	})
	return compArr;
}
export function comp(arr1, arr2, arg="_id")
{
	if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];
	let compArr = [];
	arr1.forEach(el =>
	{
		arr2.forEach(el2 =>
		{
			if(el[arg] === el2[arg])
				compArr.push(el)
		})		
	});
	return compArr;
}
export function removeArrayFromArray(remove, from, arg="_id")
{
	if (!Array.isArray(remove) || !Array.isArray(from)) return [];
	let compArr = [];
	let flt = from.forEach(el2 =>
	{
		let bool = false;
		remove.forEach(el =>
		{
			bool = bool || (el[arg] == el2[arg])
		})
		if(!bool)
			compArr.push(el2)
	});
	return compArr;
}