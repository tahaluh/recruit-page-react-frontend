import "./companyHome.scss";
import JobsPost from "../../components/jobPost/jobPost";
import FilterDiv from "../../components/filterDiv/filterDiv";
import Header from "../../components/header/header";
import { useEffect, useState } from "react";
import companyService from "../../services/companysService";
import { Navigate, useNavigate } from "react-router-dom";
import { jobDataDto } from "../../dto/jobData.dto";
import jobService from "../../services/jobService";
import { resultDto } from "../../dto/result.dto";

export default function CompanyHome() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<jobDataDto[]>([]);
  const [isLoading, setLoading] = useState(true);

  const getJobs = () => {
    let jobs: object[] = [];

    jobService
      .findAllByUser()
      .then((response: jobDataDto[]) => {
        if (typeof response === "object") {
          if (response.hasOwnProperty(0)) {
            setJobs(response);
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        return;
      });

    return jobs;
  };

  const verifyCompany = () => {
    companyService
      .getCompany()
      .then((response) => {
        if (response.id) {
          setLoading(false);
        } else {
          navigate("/company-register");
        }
      })
      .catch((error) => {
        navigate("/company-register");
      });
  };

  useEffect(() => {
    verifyCompany();
    getJobs();
  }, []);

  return (
    <div className="App">
      <Header />
      {!isLoading && (
        <>
          <div className="search-div">
            <i className="search-icon"></i>
            <input
              className="search-input"
              type="text"
              placeholder="Pesquise por tag ou localização"
            ></input>
            <button className="search-submit primary-button">Buscar</button>
          </div>

          <div className="new-job-div">
            <button
              className="primary-button new-job-button"
              onClick={() => {
                navigate("/job-register");
              }}
            >
              Criar Vaga
            </button>
          </div>
          <FilterDiv></FilterDiv>
          <main className="site-main">
            <section className="jobs-section">
              {jobs.map((job) => {
                return (
                  <JobsPost
                    companyLogged={true}
                    key={job.id}
                    id={job.id}
                    company={JSON.stringify(job.company?.name).replace(
                      /[(\\n)"]/g,
                      ""
                    )}
                    companyAddress={JSON.stringify(
                      job.company?.address
                    ).replace(/[(\\n)"]/g, "")}
                    office={job.office}
                    salary={job.salary}
                    skills={job.skills}
                  />
                );
              })}
            </section>
          </main>
        </>
      )}
    </div>
  );
}
