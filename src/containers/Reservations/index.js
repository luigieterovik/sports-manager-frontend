import React, { useEffect, useState } from "react";
import {
  Container,
  Title,
  CourtList,
  CourtCard,
  CourtType,
  CourtName,
  CourtInfo,
  CourtPrice,
  ReserveButton,
} from "./styles"; // Ajuste o caminho conforme necessário

const ReservasList = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para buscar as reservas da API
    const fetchReservations = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/reservation/listByUser",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem(
                "SportsManager:token"
              )}`,
            },
          }
        );
        const data = await response.json(); // Aqui converte a resposta para JSON

        console.log(data);

        // Verifique se a resposta possui a estrutura esperada
        if (Array.isArray(data)) {
          setReservas(data);
        } else {
          console.error("Formato inesperado da resposta:", data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <Container>
      <Title>Minhas Reservas</Title>
      {reservas.length === 0 ? (
        <p>Você ainda não tem reservas.</p>
      ) : (
        <CourtList>
          {reservas.map((reserva) => (
            <CourtCard key={reserva.id}>
              <CourtType>{reserva.empresaNome}</CourtType>
              <CourtName>{reserva.courtName}</CourtName>
              <CourtInfo>Data: {reserva.data}</CourtInfo>
              <CourtInfo>Status: {reserva.status}</CourtInfo>
              <CourtPrice>Preço: R${reserva.total}</CourtPrice>
              <ReserveButton onClick={() => alert(`Reserva ID: ${reserva.id}`)}>
                Ver detalhes
              </ReserveButton>
            </CourtCard>
          ))}
        </CourtList>
      )}
    </Container>
  );
};

export default ReservasList;
