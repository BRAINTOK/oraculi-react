import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import Gallery from "./Gallery";
import student_works from "../../config/data/student_works";

class StudentWorks extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
        };
    }
    render()
    {
        return <Fragment>
            <div className="container">
                <div className="row my-5">
                    <div className="col-12">
                        <h2 className="text-center">
                            {__("А после этого будете уметь вот так")}
                        </h2>
                        <div className="index_text_1 text-center">
                            <p>
                                {__("Работы учеников которые прошли обучение с нами")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <Gallery {...student_works}/>
            </div>
        </Fragment>
    }

}
export default StudentWorks;