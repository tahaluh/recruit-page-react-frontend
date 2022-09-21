import "./profile.scss";
import Header from "../../components/header/header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userService from "../../services/usersService";

export default function Profile() {
  const [isLoading, setLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [messageLoading, setMessageLoading] = useState<string | null>(null);

  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);
  const [errorNewPassword, setErrorNewPassword] = useState<string | null>(null);
  const [errorUsername, setErrorUsername] = useState<string | null>(null);

  useEffect(() => {}, []);

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
          setMessageLoading("Seus dados foram atualizados com sucesso")
        }
      })
      .catch((error) => {
        setMessageLoading("Houve um erro")
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <Header />
      <div className="form-container">
        <form className="form" onSubmit={userPut}>
          <h2>form</h2>
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
            ></FormInput>
          </div>

          <button type="submit" className="primary-button" disabled={isLoading}>
            Atualizar Perfil
          </button>
        </form>
      </div>
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
