import React, { useState, useEffect } from "react";
import * as S from "./styles"; // Certifique-se de que os estilos estão corretos

function AvailableCourts() {
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null); // Quadra atualmente selecionada para reserva
  const [reservationDate, setReservationDate] = useState(""); // Data da reserva

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await fetch("http://localhost:8080/courts/findAll", {
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
  }, []);

  const handleReserve = async (courtId) => {
    if (!reservationDate) {
      alert("Por favor, selecione uma data para a reserva.");
      return;
    }

    const newReservation = {
      disponibilidadeId: 1,
      data: reservationDate,

      quadraId: courtId,
      precoId: 1
    };

    try {
      const response = await fetch(
        "http://localhost:8080/reservation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(
              "SportsManager:token"
            )}`,
          },
          body: JSON.stringify(newReservation),
        }
      );

      if (response.ok) {
        alert("Reserva realizada com sucesso!");
      } else {
        alert("Erro ao realizar a reserva. Tente novamente.");
      }
    } catch (err) {
      console.log(err);
      alert("Erro ao realizar a reserva. Tente novamente.");
    }
  };

  const handleCourtSelection = (courtId) => {
    setSelectedCourt(courtId); // Marca a quadra como selecionada
  };

  return (
    <S.Container>
      <S.Title>Quadras Disponíveis</S.Title>
      {courts.map((court) => (
        <S.CourtCard
          key={court.id}
          onClick={() => handleCourtSelection(court.id)} // Marca a quadra selecionada ao clicar
          style={{
            border: selectedCourt === court.id ? "2px solid #00bfff" : "", // Destaca a quadra selecionada
            backgroundColor: selectedCourt === court.id ? "#e0f7ff" : "", // Muda a cor de fundo da quadra selecionada
          }}
        >
          <S.CourtType>{court.tipo}</S.CourtType>
          <S.CourtInfo>
            <strong>Localização:</strong> {court.logradouro}, {court.numero} -{" "}
            {court.bairro}, {court.cidade} - {court.uf}
          </S.CourtInfo>
          <S.CourtInfo>
            <strong>Empresa:</strong> {court.enterprise.nome} (
            {court.enterprise.telefone})
          </S.CourtInfo>

          {/* Campo de Data */}
          <S.CourtInfo>
            <label htmlFor="reservationDate">Data:</label>
            <input
              type="date"
              id="reservationDate"
              onChange={(e) => setReservationDate(e.target.value)}
            />
          </S.CourtInfo>

          {/* Preço por hora */}
          <S.CourtInfo>
            <strong>Preço:</strong> R$ {court.price},00 / hora
          </S.CourtInfo>

          {/* Exibindo o valor total */}
          <S.CourtInfo>
            <strong>Valor Total:</strong> R$ {court.price},00
          </S.CourtInfo>

          {/* Botão de Reservar (só aparece para a quadra selecionada) */}
          {selectedCourt === court.id && (
            <S.ReserveButton
              onClick={(e) => {
                e.stopPropagation(); // Impede que o clique no botão acione o evento de seleção da quadra
                handleReserve(court.id); // Realiza a reserva
              }}
            >
              Reservar
            </S.ReserveButton>
          )}
        </S.CourtCard>
      ))}
    </S.Container>
  );
}

export default AvailableCourts;
