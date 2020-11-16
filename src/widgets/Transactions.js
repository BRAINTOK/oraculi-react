import React from 'react';

export default function(props) {
    console.log(props);
    return props.value ? 
        <div className="row dat" >
            <div className="col-md-3  layout-label">
                {props.title}
            </div>
            <div className="col-md-9 layout-data" style={{ position : "relative" }}>
                <div className="w-100 p-3">
					<div className="row">
						<div className="col-md-5 py-2 text-light bg-secondary">Покупка</div>
						<div className="col-md-4 py-2 text-light bg-secondary">Комментарий к платежу</div>
						<div className="col-md-2 py-2 text-light bg-secondary">Суммы</div>
						<div className="col-md-1 py-2 text-light bg-secondary">Да?</div>
					</div>
            
                {
                    props.value.map((e,k)=>
					{
						return <div key={k} className="row dat2">
                            <div className="col-md-5 py-1">{e.post_title}</div>
                            <div className="col-md-4 py-1">{e.post_content}</div>
                            <div className="col-md-2 py-1">{e.summae}</div>
                            <div className="col-md-1 py-1">
							{
								e.is_success ? <i className="fas fa-check text-success"/> : <i className="fas fa-times text-danger"/>
							}
							</div>
                        </div>
                    })
                }
                </div>
            </div>
        </div>
        
    : null;
}