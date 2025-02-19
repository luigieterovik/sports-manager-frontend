import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

export const LoginBox = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 50%;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: #0056b3;
  }
`;

export const ErrorMessage = styled.p`
  color: #d9534f;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

export const InfoMessage = styled.div`
  color: #333;
  font-size: 16px;
  margin-top: 10px;
  text-align: center;
  font-weight: bold;
  color: green;
`;
