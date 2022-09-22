import "./jobView.scss";
import Header from "../../components/header/header";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import companyService from "../../services/companysService";
import jobService from "../../services/jobService";
import MarkdownPreviwer from "../../components/markDownPreviewer/markdownPreviewer";
import { jobDataDto } from "../../dto/jobData.dto";

export default function JobView(props: any) {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState<boolean>(true);

  const [messageLoading, setMessageLoading] = useState(null);

  const [job, setJobs] = useState<jobDataDto>();

  const { id } = useParams();

  const getJob = () => {
    let jobs: object[] = [];

    jobService
      .findOne(id)
      .then((response: jobDataDto) => {
        console.log(response);
        setJobs(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        return;
      });

    return jobs;
  };

  useEffect(() => {
    if (id) {
      getJob();
    }
  }, []);

  return (
    <div className="Job">
      <Header />

      {!isLoading && (
        <MarkdownPreviwer
        id={job?.id}
          companyName={job?.company?.name}
          office={job?.office}
          salary={job?.salary}
          companyAddress={job?.company?.address}
          description={job?.description}
        />
      )}
    </div>
  );
}
