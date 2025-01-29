import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: left;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
`;

export const Title = styled.h2`
  margin-bottom: 15px;
  text-align: center;
`;

export const Info = styled.p`
  margin: 10px 0;
`;

export const TotalPrice = styled.p`
  margin: 10px 0;
  color: green;
  font-size: 18px;
  font-weight: bold;
`;

export const ConfirmButton = styled.button`
  background: #00bfff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
  &:hover {
    background: #0099cc;
  }
`;
