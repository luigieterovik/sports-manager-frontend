import React, { useState, useEffect, useContext } from 'react'

import * as S from './styles'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Por favor, preencha todos os campos.");
    } else {
      setError("");
      alert(`Bem-vindo, ${email}!`);
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
          />
          <S.Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <S.Button type="submit">Entrar</S.Button>
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        </form>
      </S.LoginBox>
    </S.Container>
  );
};

export default Login;
