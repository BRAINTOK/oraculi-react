import React, {Component} from "react";

export default class Dummy extends Component
{
	render()
	{
		const text = this.props.text || "<div class='py-5 px-5'>Это заглушка. <p>Работающие сектора,функционал которых можно смотреть ( и пробовать - данные всё равно пока не забивались)<ul><li>Mailings</li><li>Lead User</li><li>Favorites</li><li>Events</li><li>my Courses</li></ul></p></div>";
		return <div className="col-12 alert alert-danger" dangerouslySetInnerHTML={{__html:text}}/>
	}
}