import React, { useEffect, useState } from "react";
import "./jobPost.scss";
import JobSkill from "../jobSkill/jobSkill";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import jobService from "../../services/jobService";

export default function JobsPost(props: any) {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false)
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (props.skills) {
      let tempSkills = props.skills.split(",");
      setSkills(tempSkills);
    }
  }, []);

  const handleDelete = () => {
    console.log(props.id);

    jobService
      .remove(props.id)
      .then((response) => {
        if (response.status) {
          console.log(response)
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="jobPost">
      <div className="job-content">
        <div className="job-header">
          <h3 className="job-tittle">{props.office}</h3>
          <h4 className="job-company">{props.company}</h4>
          <div className="job-localization">
            <p className="job-localization-text">{props.companyAddress}</p>
          </div>
        </div>

        <div className="job-salary">
          <span>
            <i></i>
          </span>
          <p className="job-salary-text">até R$ {props.salary}</p>
        </div>
        <div className="job-skills">
          {skills.map((skill) => {
            return <JobSkill key={skill} skill={skill} />;
          })}
        </div>
        <div className="job-apply-button-div">
          <Link
            to={`/job/${props.id}`}
            className="job-apply-button primary-button"
          >
            Visualizar
          </Link>
          {props.companyLogged && (
            <button
              className="job-delete-button primary-button"
              disabled={isLoading}
              onClick={handleDelete}
            >
              Deletar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
