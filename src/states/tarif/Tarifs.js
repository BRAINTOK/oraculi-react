import React, {Component, Fragment} from "react";
import ContactForm from "../ContactForm";
import tarif from "../../config/data/tarif";
import courses from "../../config/data/courses.json";
import {__} from "../../layouts/utilities/i18n";
import {sprintf} from "../../layouts/utilities/sprintf";
import { 
	Icon, Tag, 
	Intent, Tooltip, 
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, 
	InputGroup, Dialog
 } from "@blueprintjs/core";

class Tarifs extends Component
{
	state = {
		isOpen:false,
		current:0
	}
	render()
	{
		const tarifs = tarif.map((e, i) =>
		{
			const cls = i==this.state.current ? "tariff_student active" : "tariff_student ";
			return <div className="col-md-4 col-12" key={i}>
					<div className={cls} onClick={this.onClick} tid={i}>
						<div className="tarif-title">
							{e.title}
						</div>
						<div className="tarif-price" dangerouslySetInnerHTML={{ __html: e.price + "&#8399;" }} />
						<div className="tarif-period-comment">
							{e.period_comment}
						</div>
						<ul className="tarif-promo">
						{
							e.promo.map((ee, ii) => {
								return <li key={ii}>
									{ee}
								</li>
							})
						}
						</ul>
						<div className="pt-3">
							<div className="btn btn-primary" onClick={this.toggleDialog}>
								{__("Подписаться")}
							</div>
						</div>
					</div>
				</div>
		});
		
		const dost = courses.map((e, i) =>
		{
			return <div className="p-4 text-center" key={i}>
				<div className="moreTags">
					{ e.title }
				</div>
				<div className="">
					{ __("Действует до: ") + e.action_date}
				</div>
			</div>
		});
		
		return <Fragment>
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="page-title text-center mb-3">
								{__("Выберите тариф")}
							</div>
						</div>
						{tarifs}
						<div className="mt-5 col-12">
							<div className="page-title text-center">
								{__("Доступные направления")}
							</div>
						</div>
						<div className="my-2 col-12">
							<div className="d-flex justify-content-center tarif-direction">
								{dost}
							</div>
						</div>
					</div>
					<ContactForm 
						formClass="mb-5" 
						title={__("Остались вопросы?")}
					/>
				</div>
				<Dialog
					icon="inbox"
					isOpen={this.state.isOpen}
					onClose={this.toggleDialog}
				>
				<div className="tarif-dialog text-center">
					<div className="dialog-title">
						{__("Оформление подписки на тариф")}
					</div>
					<div className="dialog-title-black ">
						{__("Расширеный тариф")}
					</div>
					<div className="dialog-content" 
						dangerouslySetInnerHTML={{ 
							__html:sprintf(__("Внимание следующее списание по тарифу %s произойдет автоматически %s. Для отмены списания необходимо за день до окончания периода действия тарифа отменить подписку. При оформлении новой подписки доступ к неистекшим тарифам будет потерян. Если вы уже оформляли подписку рекомендуем вначале её отменить и дождаться полного окончания действия периода подписки прежде чем совершить переход на новый тариф"), "<span class='text-dark font-weight-bold text-dark'>Расширеный тариф</span>", "<span class='text-dark font-weight-bold text-dark'>01/11/2020</span>")
						}}					
					/>
					<div className="p-3">
						<input 
							type="checkbox" 
							value={this.state.i_accept ? 1 : 0}
							onChange={this.onAccept}
						/> 
						<span 
							className="pl-3"
							dangerouslySetInnerHTML={{ 
								__html: sprintf(
									__("Я согласен с %s"), 
									"<a href='/usl'>"+ __("Условиями Пользовательского соглашения") +"</a>"
								)
							}}
						/>
					</div>
					<div className="pt-3">
						<div className="btn btn-primary">
							{__("Перейти к оплате")}
						</div>
					</div>
					<div className="pb-3">
						<div className="btn btn-link  btn-sm p-3" onClick={this.toggleDialog}>
							{__("Отменить")}
						</div>
					</div>
				</div>
			</Dialog>
		</Fragment>
	}
	
	toggleDialog = () => this.setState({ isOpen: !this.state.isOpen });
	onAccept = () => this.setState({ i_accept: !this.state.i_accept });
	onClick = evt => {
		const tid = evt.currentTarget.getAttribute("tid");
		this.setState({current: tid});
	}
}

export default Tarifs;