import React, { useState } from "react";
import * as S from './styles'

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos.");
    } else if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
    } else {
      setError("");
      alert(`Bem-vindo(a), ${fullName}!`);
    }
  };

  return (
    <S.Container>
      <S.RegisterBox>
        <S.Title>Registrar</S.Title>
        <form onSubmit={handleSubmit}>
          <S.Input
            type="text"
            name="fullName"
            placeholder="Nome Completo"
            value={formData.fullName}
            onChange={handleChange}
          />
          <S.Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <S.Input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
          />
          <S.Input
            type="password"
            name="confirmPassword"
            placeholder="Repetir Senha"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <S.Button type="submit">Registrar</S.Button>
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        </form>
      </S.RegisterBox>
    </S.Container>
  );
};

export default Register;
