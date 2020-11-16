import React, { Component, Fragment } from "react";
import BasicState from "../layouts/BasicState";
import gql from "graphql-tag";
import { Query, withApollo } from "react-apollo";
import Loading from "../layouts/utilities/Loading";
import Moment from "react-moment";
import MomentLocaleUtils, {
  formatDate,
  parseDate
} from "react-day-picker/moment";
import moment from "moment";
import "moment/locale/ru";

class MMyPayments extends BasicState {
  getRoute = () => {
    return "payments";
  };
  myState = () => {
    const query = gql`
      query getUser($id: String) {
        getUser(id: $id) {
          user_email
          display_name
          current_course {
            post_title
            id
          }
          payments {
            id
            summae
            post_date
            is_success
            post_content
            post_title
          }
        }
      }
    `;
    const variables = { id: this.props.user.id };
    console.log(query);
    console.log(variables);
    const retData = ({ loading, error, data, client }) => {
      if (loading) {
        return <Loading />;
      }
      if (data) {
        console.log(data.getUser.payments);

        const cardsTitle = () => {
          return (
            <div className='row py-2'>
              <span className='font-weight-bold col-md-2'>Сумма</span>
              <span className='font-weight-bold col-md-3'>Статус платежа</span>
              <span className='font-weight-bold col-md-2'>Дата</span>
              <span className='font-weight-bold col-md-5'>Курс</span>
            </div>
          );
        };

        const cards = data.getUser.payments.map((e, i) => {
          const summaeClass = e.is_success
            ? "text-success col-md-2"
            : "text-danger col-md-2";
          return (
            <div className='row py-2'>
              <span className={summaeClass} key={i}>
                {e.summae}
              </span>
              <span className='col-md-3' key={i}>
                {e.post_content}
              </span>
              <span className='col-md-2' key={i}>
                <Moment locale='ru' format='D MMMM YYYY HH:mm'>
                  {new Date(e.post_date) * 1000}
                </Moment>
              </span>
              <span className='col-md-5' key={i}>
                {e.post_title}
              </span>
            </div>
          );
        });

        return (
          <div>
            {cardsTitle()}
            {cards}
          </div>
        );
      }
      if (error) {
        return error.toString();
      }
    };

    return (
      <div className='layout-state  bg-white text-dark'>
        <Query query={query} variables={variables}>
          {retData}
        </Query>
      </div>
    );
  };
}
export default MMyPayments;
