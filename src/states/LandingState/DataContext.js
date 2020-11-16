
export default class DataContext
{
	static containerTypes = [ "carousel", "columns" ];
	static data = {};
	static upd(data)
	{
		//console.log( {...data} );
		DataContext.data = {...data};
	}
	static clear()
	{
		DataContext.data.maxSectionID = 0;
		DataContext.data.maxFloatID = 0;
		DataContext.data.sections = [];
		DataContext.data.landing = {};
	}
	static setLanding( data )
	{
		console.log( data );
		DataContext.data.landing = data;
	}
	
	static getMaxSectionID( is_attept )
	{
		if(is_attept)
		{
			DataContext.data.maxSectionID ++;
		}
		return DataContext.data.maxSectionID;
	}
	static getMaxFloatID( is_attept )
	{
		let id = !DataContext.data.maxFloatID ? 0 : DataContext.data.maxFloatID;
		if(is_attept)
		{
			id++;
			console.log(id);
		}
		return id;
	}
	static getSection(id)
	{
		if( Array.isArray(DataContext.data.sections) )
		{
			// const tg = DataContext.data.sections.filter(e => e.id == id);
			// return tg.length > 0 ? tg[0] : {};
			let sec;
			DataContext.data.sections.forEach((e, i) =>
			{
				if(e.id == id)
				{ 
					sec = e;
				}
				const containerType = DataContext.containerTypes.filter(u => u == e.type);
				if(containerType.length > 0) 
				{
					if( Array.isArray( e.data.sections ) )
					{
						e.data.sections.map((ee, ii) =>
						{
							if(ee && ee.id == id)
							{ 
								sec = ee;
							}
						})
					}
					else
					{
						return {};
					}
					
				}
			}); 
			return sec ? sec : {};
		}
		else
		{
			return {};
		}			
	}
	static updateSection( id, data )
	{
		if( Array.isArray(DataContext.data.sections) )
		{ 
			DataContext.data.sections.forEach((e, i) =>
			{
				if(e.id == id)
				{ 
					DataContext.data.sections[i] = data;
					return;
				}
				const containerType = DataContext.containerTypes.filter(u => u == e.type);
				if(containerType.length > 0) 
				{
					if( Array.isArray( e.data.sections ) )
					{
						e.data.sections.map((ee, ii) =>
						{
							if(ee && ee.id == id)
							{ 
								DataContext.data.sections[i].data.sections[ii] = data;	
								return;
							}
						})
					}					
				}
			});  
		} 			
	}
	static hideSection( id, is_hide )
	{
		if( Array.isArray(DataContext.data.sections) )
		{ 
			DataContext.data.sections.forEach((e, i) =>
			{
				if(e.id == id)
				{ 
					DataContext.data.sections[i].is_hidden = is_hide;
				}
				const containerType = DataContext.containerTypes.filter(u => u == e.type);
				if(containerType.length > 0) 
				{
					if( Array.isArray( e.data.sections ) )
					{
						e.data.sections.map((ee, ii) =>
						{
							if(ee && ee.id == id)
							{ 
								DataContext.data.sections[i][ containerType[0] ].sections[ii].is_hidden = is_hide;
							}
						})
					}					
				}
			});  
		} 			
	}
	
	static getFloatId(floatId)
	{
		if( Array.isArray(DataContext.data.sections) )
		{
			let _float;
			DataContext.data.sections.forEach((e, i) =>
			{
				if(Array.isArray(e.floats))
				{
					e.floats.forEach(ee =>
					{
						if(ee && ee.float_id == floatId)
						{
							_float = ee;
						}
						const containerType = DataContext.containerTypes.filter(u => u == e.type);
						if(containerType.length > 0) 
						{
							if( Array.isArray( e.data.sections ) )
							{
								e.data.sections.map((ee, ii) =>
								{
									if(Array.isArray(ee.floats))
									{
										ee.floats.forEach(eee =>
										{
											if(eee.float_id == floatId)
											{
												_float = eee;
											}
										})
									}									
								})
							}
							else
							{
								return {};
							}
						}
					});
				}
				else
				{
					return {};
				}
			});
			return _float ? _float : {};
		}
		else
		{
			return {};
		}	
	}
	
	static updateFloat( floatObj, float_id, section_id )
	{
		if( Array.isArray(DataContext.data.sections) )
		{
			let _float;
			DataContext.data.sections.forEach((e, i) =>
			{
				if(e.menu.id == section_id)
				{
					console.log(section_id);
					if(!Array.isArray(e.floats))
						DataContext.data.sections[i].floats = [];
					DataContext.data.sections[i].floats.push(floatObj);
				}
				else if(Array.isArray(e.floats))
				{
					e.floats.forEach((ee, ii) =>
					{
						if(ee && ee.float_id == float_id)
						{
							// _float = ee;
							DataContext.data.sections[i].floats[ii] = floatObj;
							
						}
						const containerType = DataContext.containerTypes.filter(u => u == e.type);
						if( containerType.length > 0 ) 
						{
							if( Array.isArray( e.data.sections ) )
							{
								e.data.sections.map((ee, ii) =>
								{
									
									if(ee && ee.menu.id == section_id)
									{
										if(!Array.isArray(ee.floats))
											DataContext.data.sections[i][containerType[0].type].sections[ii].floats = [];
										DataContext.data.sections[i][containerType[0].type].sections[ii].floats.push(floatObj);
									}
									else if(Array.isArray(ee.floats))
									{
										ee.floats.forEach((eee, iii) =>
										{
											if(eee.float_id == float_id)
											{
												// _float = eee;
												DataContext.data.sections[i].data.sections[ii].floats[iii] = floatObj;
											}
										})
									}									
								})
							}
						}
					});
				}
			});
		}
		else
		{
			return {};
		}	
	}
	static deleteFloatId(floatId)
	{
		if( Array.isArray(DataContext.data.sections) )
		{
			DataContext.data.sections.forEach((e, i) =>
			{
				if(Array.isArray(e.floats))
				{
					e.floats.forEach((ee, ii) =>
					{
						if(ee && ee.float_id == floatId)
						{
							delete DataContext.data.sections[i].floats[ii];
						}
						const containerType = DataContext.containerTypes.filter(u => u == e.type);
						if(containerType.length > 0) 
						{
							if( Array.isArray( e.data.sections ) )
							{
								e.data.sections.map((ee, ii) =>
								{
									if(Array.isArray(ee.floats))
									{
										ee.floats.forEach((eee, iii ) =>
										{
											if(eee.float_id == floatId)
											{
												delete DataContext.data.sections[i].data.sections[ii].floats[iii];
											}
										})
									}									
								})
							}
						}
					});
				}
			});
		}
	}
}