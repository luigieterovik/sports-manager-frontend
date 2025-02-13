import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  CancelReservationButton,
  CourtList,
  CourtCard,
  CourtType,
  CourtName,
  CourtInfo,
  ReserveButton,
  MyReservations,
} from "./styles"; // Ajuste o caminho conforme necessário

const ReservasList = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(
          "https://sports-manager-backend-production.up.railway.app/reservation/listByUser",
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
        const data = await response.json();

        console.log(data);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses começam do 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  const cancelReservation = async (reservationId) => {
    const confirmCancel = window.confirm(
      "Tem certeza que deseja cancelar a reserva?"
    );
    if (!confirmCancel) return;

    try {
      const response = await fetch(
        `https://sports-manager-backend-production.up.railway.app/reservation/${reservationId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(
              "SportsManager:token"
            )}`,
          },
        }
      );

      console.log(response);

      if (response.ok) {
        setReservas(reservas.filter((reserva) => reserva.id !== reservationId));
        alert("Reserva cancelada com sucesso!");
      } else {
        alert("Erro ao cancelar a reserva. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao cancelar reserva:", error);
      alert("Ocorreu um erro ao cancelar a reserva.");
    }
  };

  return (
    <Container>
      <Title>Minhas Reservas</Title>{" "}
      <MyReservations onClick={() => navigate("/")}>
        Todas as quadras
      </MyReservations>
      {reservas.length === 0 ? (
        <p>Você ainda não tem reservas.</p>
      ) : (
        <CourtList>
          {reservas.map((reserva) => (
            <CourtCard key={reserva.id}>
              <CourtType>{reserva.courtType}</CourtType>
              <CourtInfo>Empresa: {reserva.empresaNome}</CourtInfo>
              <CourtInfo>Data: {formatDate(reserva.data)}</CourtInfo>
              <CourtInfo>Status: {reserva.status}</CourtInfo>
              <CourtInfo>
                Rua: {reserva.street}, {reserva.number}
              </CourtInfo>
              <CourtInfo>Bairro: {reserva.neighborhood}</CourtInfo>
              <CourtInfo>
                Cidade: {reserva.city} - {reserva.uf}
              </CourtInfo>
              {reserva.complement && (
                <CourtInfo>Complement: {reserva.complement}</CourtInfo>
              )}
              <ReserveButton onClick={() => alert(`Reserva ID: ${reserva.id}`)}>
                Ver detalhes
              </ReserveButton>
              <CancelReservationButton
                onClick={() => cancelReservation(reserva.id)}
              >
                Cancelar reserva
              </CancelReservationButton>
            </CourtCard>
          ))}
        </CourtList>
      )}
    </Container>
  );
};

export default ReservasList;
