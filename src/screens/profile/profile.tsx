import "./profile.scss";
import Header from "../../components/header/header";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import userService from "../../services/usersService";
import companyService from "../../services/companysService";
import viaCepApiService from "../../services/viaCepService";

export default function Profile() {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [hasCompany, setHasCompany] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [messageLoading, setMessageLoading] = useState<string | null>(null);

  const [companyCep, setCompanyCep] = useState<string>("");
  const [companyWebsite, setCompanyWebsite] = useState<string>("");
  const [companyCellphone, setCompanyCellphone] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [companyMessageLoading, setCompanyMessageLoading] = useState<
    string | null
  >(null);

  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);
  const [errorNewPassword, setErrorNewPassword] = useState<string | null>(null);
  const [errorUsername, setErrorUsername] = useState<string | null>(null);

  const [errorCompanyCep, setErrorCompanyCep] = useState<string | null>(null);
  const [errorCompanyWebsite, setErrorCompanyWebsite] = useState<string | null>(
    null
  );
  const [errorCompanyCellphone, setErrorCompanyCellphone] = useState<
    string | null
  >(null);
  const [errorCompanyName, setErrorCompanyName] = useState<string | null>(null);

  const verifyCompany = () => {
    companyService
      .getCompany()
      .then((response) => {
        if (response.id) {
          setHasCompany(true);
        } else {
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    verifyCompany();
    if (
      localStorage.getItem("TOKEN") === undefined ||
      localStorage.getItem("TOKEN") === null
    ) {
      navigate("/login");
    }
  }, []);

  const userPut = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    let data = {
      email: email,
      username: username,
      password: password,
      newPassword: newPassword,
    };

    userService
      .update(data)
      .then((response) => {
        setLoading(false);
        setMessageLoading(response.data.status ? null : response.data.message);
        if (response.data.status === true) {
          setMessageLoading("Seus dados foram atualizados com sucesso");
          navigate("/");
        }
      })
      .catch((error) => {
        setMessageLoading("Houve um erro");
        setLoading(false);
      });
  };

  const companyValidate = () => {
    let error = false;

    setCompanyMessageLoading(null);
    setErrorCompanyName(null);
    setErrorCompanyCellphone(null);
    setErrorCompanyWebsite(null);
    setErrorCompanyCep(null);

    if (companyCellphone.length < 15) {
      setErrorCompanyCellphone("Informe um telefone válido");
      error = true;
    }

    let reWebsite =
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    if (
      companyWebsite !== "" &&
      !reWebsite.test(companyWebsite.toLowerCase())
    ) {
      setErrorCompanyWebsite("Informe um website válido");
      error = true;
    }

    return !error;
  };

  const handleCep = (value: string) => {
    setCompanyCep(formatCep(value));
  };

  const formatCep = (value: string) => {
    if (!value) return value;
    const cepNumber = value.replace(/[^\d]/g, "");

    if (cepNumber.length < 6) return cepNumber;
    return `${cepNumber.slice(0, 5)}-${cepNumber.slice(5, 10)}`;
  };

  const validateCep = async () => {
    let error = false;

    if (companyCep.length < 9) {
      setErrorCompanyCep("Informe um cep válido");
      error = true;
    }
    let address = await viaCepApi(companyCep);
    if (!address) {
      error = true;
      setErrorCompanyCep("Cep inválido");
    } else {
      return address;
    }

    return !error;
  };

  const handleCellphone = (value: string) => {
    setCompanyCellphone(formatPhoneNumber(value));
  };

  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");

    if (phoneNumber.length < 3) return phoneNumber;
    if (phoneNumber.length < 8) {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
    }
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
      2,
      7
    )}-${phoneNumber.slice(7, 11)}`;
  };

  const viaCepApi = async (cep: string) => {
    let data = {
      cep: cep,
    };
    return await viaCepApiService
      .get(data)
      .then((response) => {
        if (!response.data.erro === true) {
          return `${response.data.logradouro} ${response.data.complemento} \n ${response.data.bairro} ${response.data.localidade} - ${response.data.uf}`;
        }
        return null;
      })
      .catch((error) => {
        setErrorCompanyCep("Houve um erro");
        return null;
      });
  };

  const companyPut = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let companyAddress = await validateCep();
    if (companyValidate() && companyAddress) {
      setLoading(true);

      let token = localStorage.getItem("TOKEN");

      let data = {
        name: companyName,
        cellphone: companyCellphone,
        website: companyWebsite,
        address: companyAddress,
      };

      companyService
        .update(data)
        .then((response) => {
          console.log(response);
          setLoading(false);
          setMessageLoading(
            response.data.status ? null : response.data.message
          );
          if (response.data.status === true) {
            setCompanyMessageLoading(
              "Seus dados foram atualizados com sucesso"
            );
            navigate("/company");
          } else {
            setCompanyMessageLoading("Houve um erro");
          }
        })
        .catch((error) => {
          setCompanyMessageLoading("Houve um erro");
          setLoading(false);
        });
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="form-container user-put">
        <form className="form" onSubmit={userPut}>
          <h2>Usuário</h2>
          <span
            className="form-alert"
            role="alert"
            aria-hidden={messageLoading !== null}
          >
            {messageLoading}
          </span>
          <div className="inputs-div">
            <FormInput
              label="Nome de usuário"
              type="text"
              set={setUsername}
              setError={setErrorUsername}
              error={errorUsername}
            ></FormInput>
            <FormInput
              label="Endereço de Email"
              type="email"
              set={setEmail}
              setError={setErrorEmail}
              error={errorEmail}
            ></FormInput>
            <FormInput
              label="Nova senha"
              type="password"
              set={setNewPassword}
              setError={setErrorNewPassword}
              error={errorPassword}
              minLength={8}
            ></FormInput>
            <FormInput
              label="Senha atual"
              type="password"
              set={setPassword}
              setError={setErrorPassword}
              error={errorNewPassword}
              minLength={8}
              required={true}
            ></FormInput>
          </div>

          <button type="submit" className="primary-button" disabled={isLoading}>
            Atualizar Perfil
          </button>
        </form>
      </div>

      {hasCompany && (
        <div className="form-container company-put">
          <form className="form" onSubmit={companyPut}>
            <h2>Empresa</h2>
            <span
              className="form-alert"
              role="alert"
              aria-hidden={companyMessageLoading !== null}
            >
              {companyMessageLoading}
            </span>
            <div className="inputs-div">
              <FormInput
                label="Nome da empresa"
                type="text"
                set={setCompanyName}
                setError={setErrorCompanyName}
                error={errorCompanyName}
              ></FormInput>
              <FormInput
                label="Número de telefone"
                type="text"
                set={handleCellphone}
                setError={setErrorCompanyCellphone}
                error={errorCompanyCellphone}
                value={companyCellphone}
                maxLength={15}
              ></FormInput>
              <FormInput
                label="Website"
                type="text"
                set={setCompanyWebsite}
                setError={setErrorCompanyWebsite}
                error={errorCompanyWebsite}
                minLength={8}
              ></FormInput>
              <FormInput
                label="Cep"
                type="text"
                set={handleCep}
                setError={setErrorCompanyCep}
                error={errorCompanyCep}
                value={companyCep}
                maxLength={9}
              ></FormInput>
            </div>

            <button
              type="submit"
              className="primary-button"
              disabled={isLoading}
            >
              Atualizar Perfil da empresa
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

const FormInput = (props: any) => {
  return (
    <div className="input-div">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        id={props.name}
        type={props.type}
        placeholder={props.label}
        required={props.required}
        minLength={props.minLength}
        maxLength={props.maxLength}
        value={props.value}
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
