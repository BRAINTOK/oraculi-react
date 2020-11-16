import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import {getQueryArgs, getQueryName, queryCollection, querySingle} from "../../layouts/schema";
import {Query, withApollo} from "react-apollo";
import CourseFilesWidget from "../../widgets/CourseFilesWidget";
import tags from "../../config/data/tags.json"
import Loading from "../../layouts/utilities/Loading";
import {compose} from "recompose";
import {withRouter} from "react-router";

class RightPanel extends Component
{

    render()
    {
       return <CourseFilesWidget />;
    }

}
export default compose(
    withApollo,
    withRouter
)(RightPanel);