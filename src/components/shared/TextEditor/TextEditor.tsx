import React from 'react'
import { Editor } from '@tinymce/tinymce-react'; 

type TextEditorProps = {
    onEditor?: (value: HTMLElement) => void;
    defaultVal?: any;
}

const TextEditor: React.FC<TextEditorProps> = (props) => {
    const handleEditorChange = (content: any) => {
        props.onEditor && props.onEditor(content)
      };

  return (
    <div>
        <Editor
        apiKey={"ctpalc7l9xwdxha7oc4umjpde8mvfet66n5lq1vtczmgkj7x"}
        // initialValue="<p>This is the initial content of the editor</p>"
        init={{
        statusbar: false,
          icons: "thin",
          placeholder: "Input your content...",
          height: 600,
          menubar: true,
          plugins: [
            
          ],
          textcolor_rows: "4",
          toolbar:
            "undo redo | styleselect | fontsizeselect| code | bold italic | alignleft aligncenter alignright alignjustify | outdent indent "
        }}
        onEditorChange={handleEditorChange}
        value={props.defaultVal}
        // toolbar="code"
      />
    </div>
  )
}

export default TextEditor
