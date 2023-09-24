import React from 'react'
import { Editor } from '@tinymce/tinymce-react'; 

type TextEditorProps = {
    onEditor?: (value: HTMLElement) => void
}

const TextEditor: React.FC<TextEditorProps> = (props) => {
    const handleEditorChange = (content: any, editor: any) => {
        props.onEditor && props.onEditor(content)
      };

  return (
    <div>
        <Editor
        apiKey="ihbhcuidj187qkson39p3ytjm5x2qo2g8eekk853omaleqmf"
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
  
        // toolbar="code"
      />
    </div>
  )
}

export default TextEditor