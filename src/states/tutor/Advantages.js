import React, {Component, Fragment} from "react";
import advantages from "../../config/data/advantages";
import {__} from "../../layouts/utilities/i18n";

class Advantages extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
        };
    }
    render()
    {
		let className = "4";
		switch(this.props.columns)
		{
			case 1:
				className = "12";
				break;
			case 2:
				className = "6";
				break;
			case 3:
				className = "4";
				break;
			case 4:
				className = "3";
				break;
			case 6:
				className = "2";
				break;
			case 12:
				className = "1";
				break;
			default:				
				className = "4";
				break;
		}
        const _advantages = this.props.advantages.map((e, i) =>
        {
            return <div className={"col-lg-" + className} key={i}>
                <div className="media">
                    <div className="media-top m-2">
                        <img src={e.thumbnail} alt="" height="80px"/>
                    </div>
                    <div className="media-bottom">
                        <div className="media-title">
                            {__(e.post_title)}
                        </div>
                        <div>
                            {__(e.post_content)}
                        </div>
                    </div>
                </div>
            </div>
        });
        return <Fragment>
            {_advantages}
        </Fragment>
    }

}
export default Advantages;