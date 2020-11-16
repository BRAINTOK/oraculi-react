import React, {Component, Fragment} from "react";
import advantages from "../../config/data/advantages";
import {__} from "../../layouts/utilities/i18n";
import {NavLink} from "react-router-dom";
import LessonDescription from "./LessonDescription";
import {Tab} from "@blueprintjs/core";
import Advantages from "./Advantages";
import StudentWorks from "./StudentWorks";
import ContactForm from "../ContactForm";
import $ from "jquery";

class CategoryTab extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
        };
    }

    onCollapseToggle = evt =>
    {
        const i = evt.currentTarget.getAttribute("i");
        let state = {};
        state['collapsed' + i ] = !this.state['collapsed' + i];
        state['height'+i] = this.state['collapsed' + i] ? 0 : $("#p1_" + i).height() + $("#p2_" + i).height() + 160;
        this.setState(state);
    }

    render()
    {
        const category = this.props.category;
        const i = this.props.i;
        const children = category.children || [];
        const author = category.author || {};
        const author_url = author ? author.url : "";
        const author_name = author ? author.display_name : "";
        const category_link = "/course/"+category.id + "";
        const courses = children.map((ee, ii) =>
        {
            return <LessonDescription key={ii} {...ee} />
        })

		//console.log(category);
        return <div className="py-5 " >
                <div className="two-collumns mb-5 container">
                    <div className="index_h1">
                        {category.post_title}
                    </div>
                    <div className="description_block">
                        {category.post_content}
                    </div>
                </div>
                <div className="d-flex justify-content-center container">
                    <NavLink
                        to={category_link}
                        className="btn-faq"
                    >
                        {__("Попробывать")}
                    </NavLink>
                </div>
                <div className=" mt-5">
                    <div
                        className={ "collapsed " + (this.state['collapsed' +i] ? "showed" : "") }
                        style={{ height:this.state['height'+i] }}
                    >
                        <div className="row py-40" id={"p1_" + i} >
                            <div className="col-12">
                                <h2 className="text-center">
                                    {__("Здесь вы научитесь")}
                                </h2>
                                <div className="index_text_1 text-center">
                                    <p>
                                        {__("Основным программам, которые используются в большинстве студий по всему миру&nbsp;Основным программам, которые используются в большинстве студий по всему миру&nbsp;")}
                                    </p>
                                </div>
                            </div>
                            <Advantages/>
                        </div>
                        <div className="row py-40"  id={"p2_" + i} >
                            <div className="col-12">
                                <h2 className="text-center">
                                    {__("О преподавателе")}
                                </h2>
                                <div className="index_text_1 text-center">
                                    <p>
                                        {__("который будет вашим наставником")}
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-3 d-flex align-items-center">
                                <div className="author-ava rounded-circle" style={{backgroundImage:"url("+")"}} />
                            </div>
                            <div className="col-lg-10 col-md-9 d-flex align-items-center text-left">
                                <div className="font-weight-bold ">
                                    {author_name}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div
                            className={ "title-collapsed showed pointer" }
                            i={i}
                            onClick={this.onCollapseToggle}
                        >
                            {__(this.state['collapsed' +i] ? "Cкрыть" : "Читать полностью")}
                        </div>
                    </div>
                </div>
                <div className="container" id="test">
                    <div className="row my-5 ">
                        <div className="col-12">
                            <h2 className="text-center">
                                {__("Выберите с чего начать")}
                            </h2>
                            <div className="index_text_1 text-center">
                                <p>
                                    {__("или просто идите по попрядку")}
                                </p>
                            </div>
                            {courses}
                        </div>
                    </div>
                </div>
                <StudentWorks category={category}></StudentWorks>
                <div className="d-flex justify-content-center container my-5">
                    <NavLink
                        to={category_link}
                        className="btn-faq"
                    >
                        {__("Попробывать")}
                    </NavLink>
                </div>
                <div className="container">
                    <ContactForm
                        formClass="mb-5"
                        title={__("Остались вопросы?")}
                    />
                </div>
            </div>
    }

}
export default CategoryTab;