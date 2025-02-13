import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [redirecting, setRedirecting] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://sports-manager-backend-production.up.railway.app/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log(response);

      if (response.ok) {
        const data = await response.json();
        const userName = data.name;
        const token = data.token;

        localStorage.setItem("SportsManager:userName", userName);
        localStorage.setItem("SportsManager:token", token);

        setTimeout(() => {
          setRedirecting("Login bem-sucedido, redirecionando...");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }, 2000);

        console.log("Login bem-sucedido, token:", token);
      } else {
        console.log("Erro no login:", await response.text());
      }
    } catch (err) {
      setError("Erro ao conectar ao servidor. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <S.LoginBox>
        <S.Title>Login</S.Title>
        <form onSubmit={handleSubmit}>
          <S.Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <S.Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <S.Button type="submit" disabled={loading}>
            {loading ? "Carregando..." : "Entrar"}
          </S.Button>
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
          {redirecting && <S.InfoMessage>{redirecting}</S.InfoMessage>}
        </form>
      </S.LoginBox>
    </S.Container>
  );
};

export default Login;
