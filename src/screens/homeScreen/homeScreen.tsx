import "./homeScreen.scss";
import JobsPost from "../../components/jobPost/jobPost";
import FilterDiv from "../../components/filterDiv/filterDiv";
import Header from "../../components/header/header";
import { useEffect, useState } from "react";
import jobService from "../../services/jobService";
import { useNavigate } from "react-router-dom";
import { jobDataDto } from "../../dto/jobData.dto";
import { json } from "stream/consumers";

const HomeScreen = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<jobDataDto[]>([]);
  const [isLoading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [tempSearchTerm, setTempSearchTerm] = useState("");

  const getJobs = () => {
    let jobs: object[] = [];

    jobService
      .findAll()
      .then((response: jobDataDto[]) => {
        setJobs(response);
        setLoading(false);
      })
      .catch((error) => {
        return;
      });

    return jobs;
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="search-div">
        <i className="search-icon"></i>
        <input
          className="search-input"
          type="text"
          placeholder="Pesquise por tag ou localização"
          onChange={(event) => {
            setTempSearchTerm(event.target.value);
          }}
        ></input>
        <button className="search-submit primary-button" onClick={()=>{setSearchTerm(tempSearchTerm)}}>Buscar</button>
      </div>
      <FilterDiv></FilterDiv>
      <main className="site-main">
        <section className="jobs-section">
          {jobs
            .filter((job) => {
              if (searchTerm == ""){
                return job
              } else if (job.office.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || job.skills.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())){
                return job
              } else {
                return
              }
            })
            .map((job) => {
              return (
                <JobsPost
                  key={job.id}
                  id={job.id}
                  company={JSON.stringify(job.company?.name).replace(
                    /[(\\n)"]/g,
                    ""
                  )}
                  companyAddress={JSON.stringify(job.company?.address).replace(
                    /[(\\n)"]/g,
                    ""
                  )}
                  office={job.office}
                  salary={job.salary}
                  skills={job.skills}
                />
              );
            })}
        </section>
      </main>
    </div>
  );
};

export default HomeScreen;
