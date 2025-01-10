import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [redirecting, setRedirecting] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos.");
      setSuccess("");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("");
    setRedirecting("");

    try {
      const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: fullName, email, password }),
      });

      const contentType = response.headers.get("Content-Type");

      if (!response.ok) {
        const errorMessage = await response.text();
        setError(`${errorMessage}`);
        return;
      }

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setSuccess("Usuário registrado com sucesso!");
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setTimeout(() => {
          setSuccess("");
          setRedirecting("Redirecionando para o login...");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }, 2000);
      } else {
        const errorMessage = await response.text();
        setError(`Erro ao registrar usuário: ${errorMessage}`);
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao conectar com o servidor.");
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
          {success && <S.SuccessMessage>{success}</S.SuccessMessage>}
          {redirecting && <S.InfoMessage>{redirecting}</S.InfoMessage>}
        </form>
      </S.RegisterBox>
    </S.Container>
  );
};

export default Register;
