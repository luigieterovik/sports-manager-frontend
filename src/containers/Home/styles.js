import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 40px;
  text-align: center;
`;

export const CourtList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  width: 100%;
`;
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* Garantir que o modal fique acima de outros elementos */
`;

export const CourtCard = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  margin-bottom: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #ddd;
  height: 100%;
  width: 100%;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`;

export const SelectButton = styled.button`
  background-color: ${(props) => (props.selected ? "#00bfff" : "#007bff")};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.selected ? "#008fb3" : "#0056b3")};
  }
`;

export const CourtType = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff; // Blue color for the type
  margin-bottom: 10px;
`;

export const CourtName = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: #0077ff;
  margin-bottom: 10px;
`;

export const CourtInfo = styled.p`
  font-size: 16px;
  color: #555;
  margin: 4px 0;
`;

export const CourtPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-top: 15px;
`;

export const ReserveButton = styled.button`
  margin-top: 20px;
  padding: 12px 25px;
  background-color: #0077ff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #005bb5;
    transform: scale(1.05);
  }
`;

export const MyReservations = styled.button`
  background-color: #007bff;
  color: white;
  font-size: 16px;
  margin-bottom: 20px;
  border: none;
  padding: 20px 40px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
