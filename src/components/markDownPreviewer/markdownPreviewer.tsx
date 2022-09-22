import { marked } from "marked";
import { useEffect, useState } from "react";

export default function MarkdownPreviwer(props: any) { 

  const [markdown, setMarkdown] = useState<string>("");

  function handleChange(e: string) {
    setMarkdown(marked.parse(e, { breaks: true }));
  }

  useEffect(()=>{
    handleChange(props.description)
  }, [props.description])

  return (
    <div className="preview-container">
        <div className="preview-description">
          <p className="preview-subtittle">{props.companyName}</p>
          <h2 className="preview-tittle">{props.office}</h2>
          <h3 className="preview-salary">R${props.salary}</h3>
          <h3 className="preview-location">{props.companyAddress}</h3>
          <button className="primary-button job-apply-button">
            Candidatar-se
          </button>
          <div id="preview" dangerouslySetInnerHTML={{ __html: markdown }} />
        </div>
      </div>
  )
}