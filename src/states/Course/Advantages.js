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
        const _advantages = advantages.advantages.map((e, i) =>
        {
            return <div className="col-lg-4" key={i}>
                <div className="media">
                    <div className="media-left">
                        <img src={e.image_url} alt="" height="80px"/>
                    </div>
                    <div className="media-right">
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