import React from "react";
import "./jobPost.scss";
import JobSkill from "../jobSkill/jobSkill";

export default function JobsPost(props: any) {
  return (
    <div className="jobPost">
        <div className="job-content">
      <div className="job-header">
        <h3 className="job-tittle">Consultor de vendas</h3>
        <h4 className="job-company">Cirne Motos</h4>
        <div className="job-localization">
          <p className="job-localization-text">Natal / RN</p>
        </div>
      </div>

      <div className="job-salary">
        <span>
          <i>icone</i>
        </span>
        <p className="job-salary-text">
            até R$ 1.500,00
        </p>
      </div>
      <div className="job-skills">
        <JobSkill></JobSkill>
        <JobSkill></JobSkill>
        <JobSkill></JobSkill>
        <JobSkill></JobSkill>
        <JobSkill></JobSkill>
        <JobSkill></JobSkill>
        <JobSkill></JobSkill>
      </div>
      <div className="job-apply-button-div">
        <button className="job-apply-butto primary-button">Candidate-se</button>
      </div>
    </div>
    </div>
  );
}
