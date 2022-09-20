import "./login.scss";
import Header from "../../components/header/header";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import userService from "../../services/usersService";

export default function Login() {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLoadingToken, setLoadingToken] = useState<boolean>(true);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [messageLoading, setMessageLoading] = useState<string | null>(null);
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);

  const validate = () => {
    let error = false;

    setMessageLoading(null);
    setErrorEmail(null);
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

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);

      let data = {
        username: email,
        password: password,
      };

      userService
        .login(data)
        .then((response) => {
          setLoading(false);
          navigate("/");
        })
        .catch((error) => {
          setLoading(false);
          setMessageLoading("Usuário não existe");
        });
    }
  };

  const tokenLogin = (token: string) => {
    setLoadingToken(true);
    let data = {
      token: String(token),
    };
    userService
      .tokenLogin(data)
      .then((resposne) => {
        setLoadingToken(false);
        navigate("/");
      })
      .catch((error) => {
        setLoadingToken(false);
      });
  };

  useEffect(() => {
    let token = localStorage.getItem("TOKEN");
    if (token) {
      tokenLogin(token);
    } else {
      setLoadingToken(false);
    }
  }, []);

  return (
    <div className="App">
      <Header />

      {!isLoadingToken && (
        <>
          <div className="login-container">
            <form className="login" onSubmit={login}>
              <h2>Login</h2>
              <span
                className="login-alert"
                role="alert"
                aria-hidden={messageLoading !== null}
              >
                {messageLoading}
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
        </>
      )}
    </div>
  );
}
