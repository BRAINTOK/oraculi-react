import React, {Component, Fragment} from "react";
import advantages from "../../config/data/advantages";
import {__} from "../../layouts/utilities/i18n";
import {NavLink} from "react-router-dom";

class CategoryPanels extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
        };
    }
    render()
    {
        return this.props.categories.map((e, i) => {
            const children = e.children || [];

            const courses = children.map((ee, ii) =>
            {
                return ii < 3 ? <div className=" col-6 col-lg-4 main_course  course-11 row-1" key={ii}>
                    <div
                        className="main_course_title img_cover"
                        style={{backgroundImage:"url(" + ee.icon + ")"}}
                    />
                    <div>
                        {ee.post_title}
                    </div>
                </div> : "";
            });
            return <div className="col-6" key={i}>
                <div className="panel panel-course">
                    <div className="panel-heading">
                        <div className="h5 text-center">
                            <NavLink
                                to={"/category/" + e.id}
                            >
                                {e.post_title}
                            </NavLink>
                        </div>
                    </div>
                    <div className="panel-body">
                        {courses}
                    </div>
                    <div className="panel-footer">
                        <div className="h5 text-center">
                            <NavLink
                                to={"/category/" + e.id}
                            >
                                {__("Больше курсов")}
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        })
    }

}
export default CategoryPanels;