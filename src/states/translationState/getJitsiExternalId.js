
import translitterate from "../../layouts/utilities/translitterate";


export default function getJitsiExternalId(name)
{
	return translitterate("ru")
			.transform( name )
				.split(" ")
					.join("")
						.toLowerCase() +
		Date.now().toString().substring( 4 );
}