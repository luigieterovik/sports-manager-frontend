import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";
import ReservaModal from "./Modal";

function AvailableCourts() {
  const [courts, setCourts] = useState([]);
  const [prices, setPrices] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const navigate = useNavigate();

  console.log(courts);
  console.log(prices);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await fetch("https://sports-manager-backend-production.up.railway.app/courts/findAll", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(
              "SportsManager:token"
            )}`,
          },
        });
        const courtsData = await response.json();
        setCourts(courtsData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourts();

    const fetchPrices = async () => {
      try {
        const response = await fetch("https://sports-manager-backend-production.up.railway.app/prices/findAll", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(
              "SportsManager:token"
            )}`,
          },
        });
        const pricesData = await response.json();
        setPrices(pricesData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPrices();
  }, []);

  return (
    <S.Container>
      <S.Title>Quadras Disponíveis</S.Title>
      <S.MyReservations onClick={() => navigate("/reservations")}>
        Minhas reservas
      </S.MyReservations>
      {courts.map((court) => (
        <S.CourtCard
          key={court.id}
          onClick={() => setSelectedCourt(court.id)}
          style={{
            border: selectedCourt === court.id ? "2px solid #00bfff" : "",
            backgroundColor: selectedCourt === court.id ? "#e0f7ff" : "",
          }}
        >
          <S.CourtType>{court.tipo}</S.CourtType>
          <S.CourtInfo>
            <strong>Localização:</strong> {court.logradouro}, {court.numero} -{" "}
            {court.bairro}, {court.cidade} - {court.uf}
          </S.CourtInfo>
          <S.CourtInfo>
            <strong>Empresa:</strong> {court.enterprise.nome}
          </S.CourtInfo>
          <S.CourtInfo>
            <strong>Telefone:</strong> {court.enterprise.telefone}
          </S.CourtInfo>
          <S.CourtInfo>
            <strong>Email:</strong> {court.enterprise.email}
          </S.CourtInfo>

          {selectedCourt === court.id && (
            <S.ReserveButton
              onClick={(e) => {
                e.stopPropagation();
                console.log("Reserva button clicked!");
                setModalOpen(true);
                setSelectedReservation({
                  court,
                  empresa: court.enterprise,
                  periodo: prices.find((price) => price.court_id === court.id),
                });
              }}
            >
              Reservar
            </S.ReserveButton>
          )}
        </S.CourtCard>
      ))}
      {modalOpen && selectedReservation && (
        <ReservaModal
          courtData={courts.filter((court) => court.id === selectedCourt)}
          prices={prices}
          onClose={() => setModalOpen(false)}
          onConfirm={(reservaId) => {
            console.log(`Reserva confirmada: ${reservaId}`);
            setModalOpen(false);
          }}
        />
      )}
    </S.Container>
  );
}

export default AvailableCourts;
