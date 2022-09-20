import "./login.scss";
import Header from "../../components/header/header";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);

  const validate = () => {
    let error = false;

    setErrorEmail("");
    setErrorPassword("");

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
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="login-container">
        <form className="login" onSubmit={handleSubmit}>
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
            className="login-alert"
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
            className="login-alert"
            role="alert"
            aria-hidden={errorPassword !== null}
          >
            {errorPassword}
          </span>

          <button type="submit" className="primary-button">
            Entrar
          </button>

          <p>
            <Link to={"/register"}>Criar uma conta</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
