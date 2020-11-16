import React, {Component} from "react";
import { Link } from 'react-router-dom';
import i18n from "../../i18n";

export function class_link(prop)
{
    return prop ? <Link  to={'/cources/'}  className="btn btn-sm btn-light btn-flus-right ">
        { prop.post_title + " " + i18n.t("class") }
        <i className="fas fa-caret-right"></i>
    </Link> : "";
}
