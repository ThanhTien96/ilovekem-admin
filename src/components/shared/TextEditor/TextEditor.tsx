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
        apiKey={process.env.REACT_APP_TINY_KEY ?? "wumtctoa4zi0a1l66upxgydpoqz6d9jqqw9d26a862f6gfia"}
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