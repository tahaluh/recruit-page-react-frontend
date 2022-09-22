import React from "react";
import "./jobSkill.scss";

export default function JobSkill(props: any) {
  return (
    <div className="job-skill">
    <span>{props.skill}</span>
    </div>
  );
}
