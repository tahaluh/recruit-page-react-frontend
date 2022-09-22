import "./companyRegister.scss";
import Header from "../../components/header/header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import companysService from "../../services/companysService";
import viaCepApiService from "../../services/viaCepService";

export default function CompanyRegister() {
  const navigate = useNavigate();

  const [isLoadingToken, setLoadingToken] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [cellphone, setCellphone] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [adrress, setAddress] = useState<string>("");

  const [messageLoading, setMessageLoading] = useState<string | null>(null);
  const [errorName, setErrorName] = useState<string | null>(null);
  const [errorCellphone, setErrorCellphone] = useState<string | null>(null);
  const [errorWebsite, setErrorWebsite] = useState<string | null>(null);
  const [errorCep, setErrorCep] = useState<string | null>(null);

  const handleCellphone = (value: string) => {
    setCellphone(formatPhoneNumber(value));
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

  const handleCep = (value: string) => {
    setCep(formatCep(value));
  };

  const formatCep = (value: string) => {
    if (!value) return value;
    const cepNumber = value.replace(/[^\d]/g, "");

    if (cepNumber.length < 6) return cepNumber;
    return `${cepNumber.slice(0, 5)}-${cepNumber.slice(5, 10)}`;
  };

  const validate = () => {
    let error = false;

    setMessageLoading(null);
    setErrorName(null);
    setErrorCellphone(null);
    setErrorWebsite(null);
    setErrorCep(null);

    if (cellphone.length < 15) {
      setErrorCellphone("Informe um telefone válido");
      error = true;
    }

    let reWebsite =
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    if (website !== "" && !reWebsite.test(website.toLowerCase())) {
      setErrorWebsite("Informe um website válido");
      error = true;
    }

    return !error;
  };

  const validateCep = async () => {
    let error = false;

    if (cep.length < 9) {
      setErrorCep("Informe um cep válido");
      error = true;
    }
    let address = await viaCepApi(cep);
    if (!address) {
      error = true;
      setErrorCep("Cep inválido");
    } else {
      setAddress(address);
    }

    return !error;
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
        setErrorCep("Houve um erro");
        return null;
      });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate() && (await validateCep())) {
      setLoading(true);

      let token = localStorage.getItem("TOKEN");

      let data = {
        name: name,
        cellphone: cellphone,
        website: website,
        address: adrress,        
      };

      companysService
        .create(data)
        .then((response) => {
          setLoading(false);
          setMessageLoading(
            response.data.status ? null : response.data.message
          );
          if (response.data.status === true) {
            navigate("/company");
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("TOKEN");
    if (!token) {
      navigate("/login");
    }
    setLoadingToken(false);
  }, []);

  return (
    <div className="App">
      <Header />
      {!isLoadingToken && (
        <>
          <div className="register-container">
            <form className="register" onSubmit={handleSubmit}>
              <h2>Cadastre uma Empresa</h2>
              <span
                className="register-alert"
                role="alert"
                aria-hidden={messageLoading !== null}
              >
                {messageLoading}
              </span>

              <input
                type="text"
                placeholder="Nome da empresa"
                required
                maxLength={255}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrorName(null);
                }}
              />
              <span
                className="register-alert"
                role="alert"
                aria-hidden={errorName !== null}
              >
                {errorName}
              </span>

              <input
                type="cellphone"
                placeholder="Telefone"
                required
                maxLength={15}
                value={cellphone}
                onChange={(e) => {
                  handleCellphone(e.target.value);
                  setErrorCellphone(null);
                }}
              />
              <span
                className="register-alert"
                role="alert"
                aria-hidden={errorCellphone !== null}
              >
                {errorCellphone}
              </span>

              <input
                type="text"
                placeholder="Website"
                maxLength={100}
                onChange={(e) => {
                  setWebsite(e.target.value);
                  setErrorWebsite(null);
                }}
              />
              <span
                className="register-alert"
                role="alert"
                aria-hidden={errorWebsite !== null}
              >
                {errorWebsite}
              </span>

              <input
                type="text"
                placeholder="Cep"
                required
                maxLength={9}
                value={cep}
                onChange={(e) => {
                  handleCep(e.target.value);
                  setErrorCep(null);
                }}
              />
              <span
                className="register-alert"
                role="alert"
                aria-hidden={errorCep !== null}
              >
                {errorCep}
              </span>

              <button type="submit" className="primary-button">
                Cadastrar
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
