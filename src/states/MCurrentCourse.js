import React, { Component, Fragment } from "react";
import { __ } from "../layouts/utilities/i18n";
import BasicState from "../layouts/BasicState";
import $ from "jquery";

import { withRouter } from "react-router";
import layouts from "../layouts/layouts";
import { compose } from "recompose";
import { Query, withApollo } from "react-apollo";
import { getQueryArgs, getQueryName, querySingle } from "../layouts/schema";
import Loading from "../layouts/utilities/Loading";
import gql from "graphql-tag";
import MComments from "./MLanding/MComments";
import QuaereForm from "./MLanding/QuaereForm";
import courses from "../config/data/courses";
import currentUser from "../config/data/currentUser";
import getWidget, { initArea } from "../layouts/utilities/getWidget";

class MCurrentCourse extends BasicState {
  basic_state_data() {
    return { height: 500 };
  }
  stateDidMount() {
    //this.updateWindowDimensions();
    //this.scrollWindow();
    window.addEventListener("resize", this.updateWindowDimensions);
    window.addEventListener("scroll", this.scrollWindow);
    $(".layout-header-icon").addClass("top");
    $(".layout-header-title").addClass("top");
    $(".layout-menu-right").addClass("top");
    $(".header__btn").addClass("top");
    $(".header__basket").addClass("top");
    $(".reg_icon").addClass("top");
    $(".enter_icon").addClass("top");
    $(".logined-menu").addClass("top");
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
    window.removeEventListener("scroll", this.scrollWindow);
    $(".layout-header-icon").removeClass("top");
    $(".layout-header-title").removeClass("top");
    $(".layout-menu-right").removeClass("top");
    $(".header__btn").removeClass("top");
    $(".header__basket").removeClass("top");
    $(".reg_icon").removeClass("top");
    $(".enter_icon").removeClass("top");
    $(".logined-menu").removeClass("top");
  }
  updateWindowDimensions = () => {
    this.setState({
      width: document.body.clientWidth,
      height: document.getElementById("lesson-header").clientHeight
    });
  };
  scrollWindow = () => {
    const scroll = window.scrollY;
    //console.log(this.state.height - scroll);
    if (scroll < this.state.height - 400) {
      $(".layout-header-title").addClass("top");
    } else {
      $(".layout-header-title").removeClass("top");
    }
    if (scroll < this.state.height) {
      $(".layout-header-icon").addClass("top");
    } else {
      $(".layout-header-icon").removeClass("top");
    }
    if (scroll < this.state.height - 182) {
      $(".header__basket").addClass("top");
      $(".reg_icon").addClass("top");
      $(".logined-menu").addClass("top");
    } else {
      $(".header__basket").removeClass("top");
      $(".reg_icon").removeClass("top");
      $(".logined-menu").removeClass("top");
    }
    if (scroll < this.state.height - 82) {
      $(".header__btn").addClass("top");
      $(".enter_icon").addClass("top");
    } else {
      $(".header__btn").removeClass("top");
      $(".enter_icon").removeClass("top");
    }
  };

  render() {
    console.log(this.props);
    const query = gql`
      query getBio_Course($id: String) {
        getBio_Course(id: $id) {
          post_title
          post_content
          order
          thumbnail
          articles {
            id
            post_title
            post_content
            order
          }
		  comments
		  {
			  id
			  content
			  date
			  author
			  {
				display_name
				id
				avatar
			  }
			  parent
			  {
				id
			  }
		  }		  
        }
      }
    `;
    return (
      <div className='layout-state  bg-white text-dark'>
        <Query
          query={query}
          variables={{ id: this.props.user.current_course.id }}
        >
          {({ loading, error, data, client }) => {
            if (loading) {
              return <Loading />;
            }
            if (data) {
              console.log(data.getBio_Course);
              let course = data.getBio_Course;
              course.articles.sort((e1, e2) => {
                return e1.order > e2.order ? 1 : -1;
              });
              const articles = course.articles.map((e, i) => {
                const id = "collapse" + i;
                return (
                  <Fragment key={i}>
                    <div className='my-3'>
                      <div
                        className='btn-collapse w-100 text-left pl-5 collapsed'
                        data-toggle='collapse'
                        data-target={"#" + id}
                        aria-expanded='false'
                        aria-controls={id}
                      >
                        {/* <div className='collapse__arrow'>
                          <i className='fas fa-angle-right' />
                        </div> */}
                        <span className='task-title-btn sub-title btn'>
                          {__("Задание") + " " + e.order}
                        </span>
                        <span className='task-title'>{e.post_title}</span>
                      </div>
                    </div>
                    <div
                      className='task-content collapse'
                      id={id}
                      dangerouslySetInnerHTML={{ __html: e.post_content }}
                    />
                  </Fragment>
                );
              });
              const pic =
                course.thumbnail != "false"
                  ? course.thumbnail
                  : "";
			const translation = {
				id:"",
				post_title 		: course.post_title,
				post_content	: "",
				external_id		: "current_course76543123457",
				rooms			: [
					{
						post_title	: "current course",
						external_id	: "current_course76543123457",
						post_content:"",
						members		: [],
						ID			: "-1"
					}
				]
			};				
			  return (
                <div className='position-relative '>
					<div
						className='lesson__header'
						id='lesson-header'
						style={{
							backgroundImage: "url(" + pic + ")"
						}}
					>
						<div className='z-index-10 container'>
							
							{
								initArea(
									"current-course-aside",
									{ 
										...this.props, 
										translation	: translation,
										//onToggle	: this.onToggle,
										//onNew		: this.onNew,
										//onDelete	: this.onDelete,
										//route		: this.props.location.pathname
									}
								)
							}
							<div className='title card-title text-light'>
								{course.post_title}
							</div>
							<div className='lead mt-5 mb-3'>Задания к Карте:</div>
						</div>
					</div>
					<div className='container mt-5'>
						<div className='row '>
							<div className='col-md-12 '>{articles}</div>
						</div>
					</div>
					<div className='container mt-5'>
						<div className='row '>
							<div className='col-md-12 title'>
								{__("Message for Tutor")}
							</div>
						</div>
						<div className='col-md-12 '>
							<QuaereForm user={this.props.user}/>
						</div>
					</div>
					<div className='container mt-5'>
						<div className='row '>
							<div className='col-md-12 title'>
								{__("Commentaries")}
							</div>
							<div className='col-md-12 '>
								<MComments {...course} user={this.props.user}/>
							</div>
						</div>
					</div>
                </div>
              );
            }
            if (error) {
              return error.toString();
            }
          }}
        </Query>
      </div>
    );
  }
}
export default MCurrentCourse;
