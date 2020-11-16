import React, {Fragment, Component} from 'react'
import ReactQuill, { Quill } from 'react-quill';
import i18n from "../i18n";
import {server_url} from "../../config/config.json";

export default class Editor extends Component 
{
	constructor (props) 
	{
		super(props)
		this.state = 
		{ 
			editorHtml: props.text, 
			mountedEditor: false ,
			isHTML:false
		}
		this.quillRef = null;
		this.reactQuillRef = null;
	}
  
	componentDidMount () 
	{
		//this.attachQuillRefs()
	}
  
	componentDidUpdate (nextProps) 
	{
		//this.attachQuillRefs()
	}
  
	componentWillReceiveProps(nextProps)
	{
		this.setState({
			editorHtml: nextProps.text
		});
	}
	attachQuillRefs = () =>
	{
		//return;
		if(this.state.isHTML) return;
		// Ensure React-Quill reference is available:
		if (typeof this.reactQuillRef.getEditor !== 'function') return;
		// Skip if Quill reference is defined:
		if (this.quillRef != null) return;
		
		const quillRef = this.reactQuillRef.getEditor();
		if (quillRef != null) this.quillRef = quillRef;
	}
  
	handleChange = html =>
	{
		
		this.setState({ editorHtml: html });
		this.props.onChange( html );
	}
	onTextarea = evt =>
	{
		this.setState({ editorHtml: evt.currentTarget.value });
		this.props.onChange( evt.currentTarget.value );
	}
	onSwitched = evt =>
	{
		const role = evt.currentTarget.getAttribute("role");
		this.setState({isHTML : role=="html"});
	}
	render () 
	{
		//console.log(this.state.editorHtml);
		const editor = this.state.isHTML ?
		<div className="col-12">
			<textarea
				value={this.state.editorHtml}
				onChange={this.onTextarea}
				placeholder={this.props.placeholder} 
				className="form-control"
				style={{height:"auto", padding:20}}
				rows={20}
			/>
		</div>
		:
		this.editor1();
		
		const cl2 = this.state.isHTML  ? "btn btn-secondary btn-sm active": "btn btn-secondary btn-sm";
		const cl1 = !this.state.isHTML ? "btn btn-secondary btn-sm active": "btn btn-secondary btn-sm";
		const switcher = this.props.isHideSwitch ? "" : <div className="col-12 text-right mb-2">
				<div className="btn-group">
					<div className={cl1} role="editor" onClick={this.onSwitched}>
						{i18n.t("Visual editor")}
					</div>
					<a 
						className={cl2} 
						role="html" 
						href={server_url + "/wp-admin/post.php?post=" + this.props.id + "&action=edit"}
						target="_blank"
					>
						{i18n.t("WP-admin edit")}
					</a>
				</div>
			</div>;
			
		return <div className="row">
			{switcher}
			{editor}
		</div>
	}
	editor1()
	{
		/*
		* Quill modules to attach to editor
		* See https://quilljs.com/docs/modules/ for complete options
		*/
		const Size = Quill.import("formats/size");
		Size.whitelist = [ "small", "medium", "large", "huge"];
		Quill.register(Size, true);
		
		Editor.modules = {
			toolbar: {
			  container: "#toolbar"
			}
		};
		/*
		Editor.modules.toolbar = [
			['bold', 'italic', 'underline', 'strike'],       // toggled buttons
			['blockquote', 'code-block'],                    // blocks
			[{ 'header': 1 }, { 'header': 2 }],              // custom button values
			[{ 'list': 'ordered'}, { 'list': 'bullet' }],    // lists
			[{ 'script': 'sub'}, { 'script': 'super' }],     // superscript/subscript
			[{ 'indent': '-1'}, { 'indent': '+1' }],         // outdent/indent
			[{ 'direction': 'rtl' }],                        // text direction
			//[{ 'size': ['14px', '16px', '18px'] }], // custom dropdown
			[{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
			[{ 'color': [] }, { 'background': [] }],         // dropdown with defaults
			[{ 'font': [] }],                                // font family
			[{ 'align': [] }],                               // text align
			['link', 'image', 'video'],
			['clean'],                                       // remove formatting
		]
		*/
		
		/*
		* Quill editor formats
		* See https://quilljs.com/docs/formats/
		*/
		Editor.formats = [
			'header', 'font', 'size', 'background', 'color', 'code',
			'bold', 'italic', 'underline', 'strike', 'blockquote',
			'list', 'bullet', 'indent', 'script', 'align', 
			'link', 'image', 'formula', 'video'
		];
		
		return <div className="w-100">
			<CustomToolbar />
			<ReactQuill 
			  ref={(el) => { this.reactQuillRef = el }}
			  theme={'snow'}
			  onChange={this.handleChange}
			  modules={Editor.modules}
			  formats={Editor.formats}
			  value={this.state.editorHtml}
			  placeholder={this.props.placeholder} />
		</div>
	}
}

const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-font" defaultValue="Arial" >
      <option defaultValue="arial" selected>
        Arial
      </option>
      <option value="comic-sans">Comic Sans</option>
      <option value="courier-new">Courier New</option>
      <option value="georgia">Georgia</option>
      <option value="helvetica">Helvetica</option>
      <option value="lucida">Lucida</option>
    </select>
	
    <select className="ql-size" defaultValue={14}  >
      <option value="small">10</option>
      <option value="medium" selected>14</option>
      <option value="large">20</option>
      <option value="huge">25</option>
    </select>
	
    <select className="ql-header"  defaultValue="Arial" />
    <select className="ql-color"  defaultValue="Arial" />
    <select className="ql-background"  defaultValue="Arial" />
    <button className="ql-clean" />
    
	<span className='ql-formats'>
		<button className='ql-list' value='ordered'></button>
		<button className='ql-list' value='bullet'></button>
	</span>
		<span className='ql-formats'>
		<button className="ql-script" value="sub"></button>
		<button className="ql-script" value="super"></button>
	</span>
	<span className='ql-formats'>
		<select className="ql-align" defaultValue={14}></select>
	</span>
	<span className='ql-formats'>
		<button className="ql-link"></button>
		<button className="ql-image"></button>
		<button className="ql-video"></button>
	</span>
  </div>
);

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida"
];
Quill.register(Font, true);
