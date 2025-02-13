import React, { useState, useEffect } from "react";
import * as S from "./styles";

const ReservaModal = ({ courtData, prices, onClose, onConfirm }) => {
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [reservationPriceId, setReservationPriceId] = useState(null); // Estado para armazenar o ID do preço
  const [dayPrices, setDayPrices] = useState([]);
  const [showTotal, setShowTotal] = useState(false);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setReservationDate(selectedDate);

    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay();

    const daysOfWeek = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];
    const dayName = daysOfWeek[dayOfWeek];

    const filteredDayPrices = prices.filter(
      (day) => day.weekDay.dia === dayName
    );

    setDayPrices(filteredDayPrices);
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;

    setReservationTime(selectedTime);
    setShowTotal(true); // Mostrar o valor total quando o horário for selecionado

    // Encontrar o ID do preço baseado no horário selecionado
    const selectedPrice = dayPrices.find(
      (price) => price.period.horario_inicio === selectedTime
    );

    console.log(selectedPrice);
    if (selectedPrice) {
      setReservationPriceId(selectedPrice.id); // Armazenar o ID do preço
    }
  };

  const confirmReservation = async () => {
    if (!reservationTime || !reservationPriceId) return; // Verificar se o preço foi selecionado

    const newReservation = {
      data: reservationDate,
      quadraId: courtData[0].id,
      precoId: reservationPriceId,
    };

    try {
      const response = await fetch("https://sports-manager-backend-production.up.railway.app/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(
            "SportsManager:token"
          )}`,
        },
        body: JSON.stringify(newReservation),
      });

      if (response.ok) {
        alert("Reserva confirmada com sucesso!");
      } else {
        alert("Erro ao confirmar a reserva. Tente novamente.");
      }
    } catch (err) {
      console.log(err);
      alert("Erro ao confirmar a reserva. Tente novamente.");
    }

    onConfirm();
  };

  const totalPrice = dayPrices.reduce((acc, price) => {
    if (price.period.horario_inicio === reservationTime) {
      return price.price;
    }
    return acc;
  }, 0);

  return (
    <S.ModalContainer>
      <S.ModalContent>
        <S.CloseButton onClick={onClose}>×</S.CloseButton>
        <S.Title>Detalhes da Reserva</S.Title>
        <S.Info>
          <strong>Empresa:</strong> {courtData[0].enterprise.nome}
        </S.Info>
        <S.Info>
          <strong>Telefone:</strong> {courtData[0].enterprise.telefone}
        </S.Info>
        <S.Info>
          <strong>E-mail:</strong> {courtData[0].enterprise.email}
        </S.Info>
        <S.Info>
          <strong htmlFor="reservationDate">Data: </strong>
          <input
            type="date"
            id="reservationDate"
            onChange={handleDateChange}
            value={reservationDate}
            disabled={!courtData || courtData.length === 0}
          />
        </S.Info>
        <S.Info>
          <strong>Horário: </strong>
          <select
            onChange={handleTimeChange}
            value={reservationTime}
            disabled={!reservationDate}
          >
            <option></option>
            {dayPrices &&
              dayPrices.map((price) => (
                <option key={price.id} value={price.period.horario_inicio}>
                  {price.period.horario_inicio.slice(0, 5)} às{" "}
                  {price.period.horario_fim.slice(0, 5)}
                </option>
              ))}
          </select>
        </S.Info>

        {showTotal && totalPrice > 0 && (
          <S.TotalPrice>
            <strong>Valor Total:</strong> R$ {totalPrice}
          </S.TotalPrice>
        )}

        <S.ConfirmButton onClick={confirmReservation}>
          Confirmar Reserva
        </S.ConfirmButton>
      </S.ModalContent>
    </S.ModalContainer>
  );
};

export default ReservaModal;
