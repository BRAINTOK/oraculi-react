import React, {Fragment, Component} from 'react'
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import i18n from "../i18n";
import Editor from "./Editor";

export default class PostEditor extends Component
{
	constructor(props)
	{
		super(props);
		this.state=
		{
			post_title: props.post_data.post_title,
			post_content: props.post_data.post_content
		}		
	}
	componentWillReceiveProps(nextProps)
	{
		this.setState({
			post_title: nextProps.post_data.post_title,
			post_content: nextProps.post_data.post_content
		})
	}
	render()
	{		
		/*
		 * Quill modules to attach to editor
		 * See https://quilljs.com/docs/modules/ for complete options
		 */
		Editor.modules = {}
		Editor.modules.toolbar = [
		  ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
		  ['blockquote', 'code-block'],                    // blocks
		  [{ 'header': 1 }, { 'header': 2 }],              // custom button values
		  [{ 'list': 'ordered'}, { 'list': 'bullet' }],    // lists
		  [{ 'script': 'sub'}, { 'script': 'super' }],     // superscript/subscript
		  [{ 'indent': '-1'}, { 'indent': '+1' }],         // outdent/indent
		  [{ 'direction': 'rtl' }],                        // text direction
		  [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
		  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
		  [{ 'color': [] }, { 'background': [] }],         // dropdown with defaults
		  [{ 'font': [] }],                                // font family
		  [{ 'align': [] }],                               // text align
		  ['link', 'image', 'video'],
		  ['clean'],                                       // remove formatting
		]

		/* 
		 * Quill editor formats
		 * See https://quilljs.com/docs/formats/
		 */
		Editor.formats = [
		  'header', 'font', 'background', 'color', 'code', 'size',
		  'bold', 'italic', 'underline', 'strike', 'blockquote',
		  'list', 'bullet', 'indent', 'script', 'align', 'direction',
		  'link', 'image', 'code-block', 'formula', 'video'
		];
		return <Fragment>
			<div className="subtitle">{i18n.t("Title")}</div>
			<input 
				type="text" 
				className="form-control mb-3" 
				placeholder={i18n.t("Title")}
				value={this.state.post_title}
				onChange={this.onTitle}
			/>
			<div className="subtitle">{i18n.t("Content")}</div>
			<Editor 
				placeholder={i18n.t('Start whrite content')}
				text={ this.props.post_data.post_content }
				onChange={this.onEditor}
			/>
			
		</Fragment>
	}
	onTitle = evt =>
	{
		this.setState({ post_title : evt.currentTarget.value });
	}
	onEditor = html =>
	{
		this.setState({ post_content : html });
	}
}