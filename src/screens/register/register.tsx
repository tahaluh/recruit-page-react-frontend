import "./register.scss";
import Header from "../../components/header/header";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import userService from "../../services/usersService";

export default function Register() {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [messageLoading, setMessageLoading] = useState<string | null>(null);
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorUsername, setErrorUsername] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);

  const validate = () => {
    let error = false;

    setMessageLoading(null);
    setErrorEmail(null);
    setErrorUsername(null);
    setErrorPassword(null);

    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      setErrorEmail("Preencha com um e-mail válido");
      error = true;
    }
    if (typeof password == "string" && password.length < 8) {
      setErrorPassword("A senha precisa ter ao menos 8 caracteres");
      error = true;
    }

    return !error;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);

      console.log('ue')

      let data = {
        email: email,
        username: username,
        password: password,
      };

      userService
        .create(data)
        .then((response) => {
          setLoading(false);
          setMessageLoading(
            response.data.status ? null : response.data.message
          );
          if (response.data.status === true) {
            navigate("/login");
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="register-container">
        <form className="register" onSubmit={handleSubmit}>
          <h2>Cadastre-se</h2>
          <span
            className="register-alert"
            role="alert"
            aria-hidden={messageLoading !== null}
          >
            {messageLoading}
          </span>
          <input
            type="text"
            placeholder="Nome de usuário"
            required
            maxLength={30}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrorUsername(null);
            }}
          />
          <span
            className="register-alert"
            role="alert"
            aria-hidden={errorUsername !== null}
          >
            {errorUsername}
          </span>

          <input
            type="email"
            placeholder="Email"
            required
            maxLength={255}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorEmail(null);
            }}
          />
          <span
            className="register-alert"
            role="alert"
            aria-hidden={errorEmail !== null}
          >
            {errorEmail}
          </span>

          <input
            type="password"
            placeholder="Senha"
            required
            maxLength={30}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorPassword(null);
            }}
          />
          <span
            className="register-alert"
            role="alert"
            aria-hidden={errorPassword !== null}
          >
            {errorPassword}
          </span>

          <button type="submit" className="primary-button" disabled={!isLoading}>
            Cadastrar
          </button>

          <p>
            <Link to={"/login"}>Eu tenho uma conta</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
