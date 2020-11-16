import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {compose, graphql} from "react-apollo";
import {withRouter} from "react-router";
import { Link, NavLink } from 'react-router-dom';
import CabinetMenu from "./CabinetMenu";
import SearchMenu from "./SearchMenu";
import menu from "../graphql/menu.graphql";
import Loading from "../main/utilities/Loading";

class Menu extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            сurrent:0,
            isShown: props.isShown,
            width:0,
            height: this.getmheight() + 40,
            submenuShown: props.submenuShown,
            currentHover:"",
            submenuX:0,
            submenuY:0,
            sClasses: " search_field visibled ",
            isSearch: false

        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    componentWillReceiveProps(nextProps)
    {
        this.setState({isShown:nextProps.isShown});
    }
    componentDidMount()
    {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        document.body.addEventListener('click', this.onMouseLeaveHandler);
    }
    componentWillUnmount()
    {
        window.removeEventListener('resize', this.updateWindowDimensions);
        document.body.removeEventListener('click', this.onMouseLeaveHandler);
    }
    getmheight()
    {
        const m = document.getElementById("bmenu-cont");
        //console.log(m);
        if(!m) return 440;
        const mh = m.clientHeight;
        //console.log(mh);
        return mh;
    }
    updateWindowDimensions()
    {

        this.setState({
            width : document.body.clientWidth,
            height: this.getmheight() + 40
        });
    }
    onChange = (e, elem) =>
    {
        this.props.onChoose();
    }
    onMouseEnterHandler = e =>
    {
        this.setState({menuEntered:true});
        setTimeout((elem, e) =>
        {
            if(!elem.state.menuEntered) return;
            const NN = ReactDOM.findDOMNode(elem).getBoundingClientRect();
            const EE = e.getBoundingClientRect();
            elem.setState({
                submenuShown:true,
                submenuX:EE.x - NN.x,
                submenuY:EE.y + EE.height - NN.y - 2,
                currentHover:e.getAttribute("uniq")
            });
        }, 700, this, e.currentTarget);

    }
    onMouseLeaveHandler = e =>
    {
        /*console.log( e.currentTarget.parentElement.nodeName );
        this.props.onMouseLeaveHandler();*/
        this.setState({
            submenuShown:false,
            menuEntered:false
        });
    }
    onSearch = bool =>
    {
        this.setState({
            isSearch: !bool,
            submenuShown:false
        });
        if(bool)
        {
            setTimeout(() =>
            {
                this.setState({
                    sClasses: "search_field visibled "
                })
            }, 400);
        }
        else
        {
            this.setState({
                sClasses: "search_field unvisibled "
            })
        }
    }
    refetch = () => {


    }
    render(){
        //console.log(this.props.user);
        //console.log( this.state.isShown );
        //console.log( this.props.location.state );
        const stateUniq = this.props.location.state ? this.props.location.state.uniq : "____";
        const statePrnt = this.props.location.state ? this.props.location.state.parent_id : "____";

        const onsearch = this.state.sClasses;
        const menu = this.props.menu.menu || [];
        const submenuData = menu.filter(elem => elem.parent_id == this.state.currentHover);
        const submenuss = this.state.submenuShown ?
            <ul
                className="submenu"
                style={{
                    top:this.state.submenuY,
                    left:this.state.submenuX
                }}
            >
                {
                    submenuData.map((elem, i) =>
                    {
                        const uniq = '/' + elem.uniq;
                        return <li  key={i}>
                            <NavLink
                                to={ uniq}
                                className={ stateUniq == elem.uniq ? "active" : ""}
                            >
                                <small>{elem.label}</small>
                            </NavLink>
                        </li>
                    })
                }
            </ul> :
            "";

        const menus = menu.map((elem, i) => {
            const uniq = '/' + elem.uniq;
            const cls = stateUniq == elem.uniq || statePrnt == elem.uniq
                ? "navbar-brand aoic align-items-center main_menu_element active"
                : "navbar-brand aoic align-items-center main_menu_element";
            return Number.parseInt(elem.is_check) && typeof elem.parent_id != "string" ?
                <NavLink
                    to={ uniq }
                    key={i}
                    className={cls}
                    onClick={(e) => this.onChange(e, elem)}
                    onMouseEnter={this.onMouseEnterHandler}
                    uniq={ elem.uniq }
                >
                    <div
                        className="bio_menu_icon rounded-circle"
                        style={{ backgroundImage:"url(" + elem.icon + ")" }}

                    >
                    </div>
                    <small>{elem.label}</small>
                </NavLink> : "";
        });
        let style;
        switch(true)
        {
            case this.state.width > 719:
                style = { height:"auto" };
                break;
            case this.state.isShown == true:
                style = { height:this.state.height, overflow:"hidden", padding:0 };
                break;
            case this.state.isShown == false:
            default:
                style = { height:0,   overflow:"hidden", padding:0 };
        }
        return <Fragment>
            <div className="navbar navbar-light bg-lg easy-400" style={style} onMouseLeave={this.onMouseLeaveHandler}>
                <div className="container d-flex" id="bmenu-cont">
                    <div
                        className={ this.state.sClasses }
                        //style={{ width: this.state.isSearch ? 0 : "auto"}}
                    >
                        {menus}
                    </div>
                    <SearchMenu
                        isSearch={this.state.isSearch}
                        onSearch={this.onSearch}
                        onMouseEnter={this.onMouseLeaveHandler}
                    />
                    <CabinetMenu
                        user={this.props.user}
                        onClick={this.onChange}
                        refetch={this.refetch}
                    />
                </div>
                {submenuss}
            </div>
        </Fragment>
    }
}


Menu.propTypes = {
    id: PropTypes.string,
    user: PropTypes.object,
}

Menu.defaultProps = {
    id: "",
    user:  {}
};

//(props.match.params.id ? props.match.params.id : "")

export default compose(
    withRouter
)(Menu);

//https://github.com/apollographql/react-apollo/issues/660