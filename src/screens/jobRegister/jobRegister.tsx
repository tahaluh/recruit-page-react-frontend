import "./jobRegister.scss";
import Header from "../../components/header/header";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import companyService from "../../services/companysService";
import jobService from "../../services/jobService";
import MarkdownPreviwer from "../../components/markDownPreviewer/markdownPreviewer";

export default function JobRegister() {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState<boolean>(true);
  const [office, setOffice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  const [salary, setSalary] = useState<number>(0);
  const [endData, setEndData] = useState<Date>(new Date());

  const [companyName, setCompanyName] = useState<string>("");
  const [companyAddress, setCompanyAddress] = useState<string>("");

  const [errorEndData, setErrorEndData] = useState(null);
  const [errorOffice, setErrorOffice] = useState(null);
  const [errorDescription, setErrorDescription] = useState(null);
  const [errorSkills, setErrorSkills] = useState(null);
  const [errorSalary, setErrorSalary] = useState(null);
  const [messageLoading, setMessageLoading] = useState(null);

  const validate = () => {
    let error = false;
    return !error;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      //setLoading(true);

      let data = {
        office: office,
        description: description,
        skills: skills,
        salary: salary,
        end_date: endData,
      };

      jobService
        .create(data)
        .then((response) => {
          setLoading(false);
          navigate("/company");
        })
        .catch((error) => {
        });

      setLoading(false);
    }
  };

  const verifyCompany = () => {
    companyService
      .getCompany()
      .then((response) => {
        if (response.id) {
          setLoading(false);
          setCompanyName(response.name);
          setCompanyAddress(response.address);
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
  }, []);

  return (
    <div className="AppRegister">
      <Header />
      <div className="jobRegister-container">
        <form className="jobRegister" onSubmit={handleSubmit}>
          <h2>Crie uma vaga</h2>
          <span
            className="jobRegister-alert"
            role="alert"
            aria-hidden={messageLoading !== null}
          >
            {messageLoading}
          </span>
          <div className="job-inputs-div">
            <FormInput
              setError={setErrorOffice}
              set={setOffice}
              name={"Cargo"}
              type={"text"}
            ></FormInput>

            <div className="job-input-div">
              <label className="job-input-label" htmlFor="Descricao">
                Descrição
              </label>
              <textarea
                id="Descricao"
                className="job-input"
                placeholder="Descrição... Escreva em markdown e desça para visualizar o preview "
                required
                onChange={(e) => {
                  setDescription(e.target.value);
                  setErrorDescription(null);
                }}
              ></textarea>
            </div>

            <FormInput
              setError={setErrorSkills}
              set={setSkills}
              name={"Tecnologias (Separadas por vírgulas)"}
              type={"text"}
            ></FormInput>

            <FormInput
              setError={setErrorSalary}
              set={setSalary}
              name={"Salário"}
              type={"number"}
            ></FormInput>

            <FormInput
              setError={setErrorEndData}
              set={setEndData}
              name={"Data Limite"}
              type={"Date"}
            ></FormInput>
          </div>

          <button
            type="submit"
            className="primary-button job-button"
            disabled={isLoading}
          >
            Enviar
          </button>
        </form>
      </div>

      <MarkdownPreviwer companyName={companyName} office={office} salary={salary} companyAddress={companyAddress} description={description}/>
      
    </div>
  );
}

const FormInput = (props: any) => {
  return (
    <div className="job-input-div">
      <label className="job-input-label" htmlFor={props.name}>
        {props.name}:
      </label>
      <input
        className="job-input"
        id={props.name}
        type={props.type}
        placeholder={props.name}
        required
        minLength={props.minLength}
        onChange={(e) => {
          props.set(e.target.value);
          props.setError(null);
        }}
      />
      <span
        className="form-alert"
        role="alert"
        aria-hidden={props.error !== null}
      >
        {props.error}
      </span>
    </div>
  );
};
