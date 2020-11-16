/*
правая панель на страницах курса, результатов поиска
 */
 import React, {Component, Fragment} from "react";
import {__} from "../layouts/utilities/i18n";
import {getQueryArgs, getQueryName, queryCollection, querySingle} from "../layouts/schema";
import {Query, withApollo} from "react-apollo";
import tags from "../config/data/tags.json"
import Loading from "../layouts/utilities/Loading";
import {compose} from "recompose";
import {withRouter} from "react-router";

class CourseFilesWidget extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            filters: tags.filters
        };
    }

    rightPanel = (single, id) =>{
        const filters = tags.filters
            .map((e,i) =>
            {
                return <div className="filter tag " key={i} filter-id={e.id}>
                    {e.post_title}
                </div>
            });
        return <Fragment>
            <div className="course_category_select" >
                <div className="filter category">
                    {__("Файлы курса:")}
                </div>
                <div className="btn btn-primary">
                    {__("Скачать")}
                </div>
            </div>
            <div className="borded p-3">
                {filters}
            </div>
        </Fragment>
    }

    render()
    {
        const query_name = getQueryName("Bio_course")
        const query_args = getQueryArgs("Bio_course")

        const query = queryCollection( "Bio_course", query_name, query_args );

        const id = this.props.match.params.id;

        return <Query query={query}>
            {
                ({ loading, error, data, client}) =>
                {
                    if( loading)
                    {
                        return <Loading/>;
                    }
                    if(data)
                    {
                        console.log(data);
                        const single = data[query_name][query_name][0] ? data[query_name][query_name][0] : [] ;

                        return this.rightPanel(single, id);
                    }
                    if(error)
                    {
                        return error.toString();
                    }
                }
            }
        </Query>;
    }

}
export default compose(
    withApollo,
    withRouter
)(CourseFilesWidget);