import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class TextEditor extends Component 
{
	state = {
		text : this.props.text || ""
	}
    render() 
	{
		const {text} = this.state;
        return (
            <div className="App">
                <CKEditor
                    editor={ ClassicEditor }
					config={{
						height:100,
						// plugins: [ Essentials, Paragraph, Bold, Italic, Heading ],
						toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'link', '|', 'numberedList', 'bulletedList']
					}}
					data={text}
                    onInit={ this.onInit }
                    onChange={ this.onChange }
                    onBlur={ this.onBlur }
                    onFocus={ this.onFocus }
					rows={10}
                />
            </div>
        );
    }
	
	onInit = editor => 
	{
		return;
		editor.resize();
		editor.ui
			.getEditableElement()
				.parentElement
					.insertBefore(
						editor.ui.view.toolbar.element,
						editor.ui.getEditableElement()
					);
	}
	onChange = ( event, editor ) => 
	{
		const data = editor.getData();
		this.props.onChange(data)
		console.log( { event, editor, data } );
	}
	onBlur = ( event, editor ) => 
	{
		console.log( 'Blur.', editor );
	}
	onFocus = ( event, editor ) => 
	{
		console.log( 'Focus.', editor );
	}
}

export default TextEditor;
/* https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html */