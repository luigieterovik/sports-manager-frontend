import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [redirecting, setRedirecting] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

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
      const response = await fetch("https://sports-manager-backend-production.up.railway.app/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: fullName, email, password }),
      });

      if (response.ok) {
        setSuccess("Usuário registrado com sucesso!");
        form.reset();

        setTimeout(() => {
          setSuccess("");
          setRedirecting("Redirecionando para o login...");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }, 2000);
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "Erro ao registrar usuário.");
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
          <S.Input type="text" name="fullName" placeholder="Nome Completo" />
          <S.Input type="email" name="email" placeholder="Email" />
          <S.Input type="password" name="password" placeholder="Senha" />
          <S.Input
            type="password"
            name="confirmPassword"
            placeholder="Repetir Senha"
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
