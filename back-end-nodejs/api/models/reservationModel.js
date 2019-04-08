'use strict';
const mysql = require('./../db/mysql');

const getReservations = clbk => {
  const q = `SELECT * FROM reservation`;

  mysql.query(q, (error, result, fields) => {
    if (error) throw error;
    clbk(result);
  });
};

const getReservationById = (clbk, id) => {
  const q = `SELECT * FROM reservation WHERE id_reservation=${mysql.escape(id)}`;

  mysql.query(q, (error, result, fields) => {
    if (error) throw error;
    clbk(result);
  });
};

const addReservation = (clbk, data) => {
  const q = `INSERT INTO
                reservation (arrival_date, departure_date, guests, price, nights, fk_id_rooms, fk_id_client)
            VALUES
                (
                ${mysql.escape(data.arrival_date)},
                ${mysql.escape(data.departure_date)},
                ${mysql.escape(data.guests)},
                ${mysql.escape(data.price)},
                ${mysql.escape(data.nights)},
                ${mysql.escape(data.id_room)},
                ${mysql.escape(data.id_client)}
                )`;

  mysql.query(q, (error, result, fields) => {
    if (error) throw error;
    result.message = 'Votre réservation a été ajoutée avec succès';
    clbk(result);
  });
};

const updateReservation = (clbk, data, id) => {
  const q = `UPDATE
                reservation
            SET
                arrival_date=${mysql.escape(data.arrival_date)},
                departure_date=${mysql.escape(data.departure_date)},
                guests=${mysql.escape(data.guests)},
                price=${mysql.escape(data.price)},
                nights=${mysql.escape(data.nights)},
                fk_id_rooms=${mysql.escape(data.id_room)},
                fk_id_client=${mysql.escape(data.id_client)}
            WHERE
                id_reservation=${mysql.escape(id)}`;

  mysql.query(q, (error, result, fields) => {
    if (error) throw error;
    result.message = 'Votre réservation a été modifiée avec succès';
    clbk(result);
  });
};

const removeReservation = (clbk, id) => {
  const q = `DELETE FROM reservation WHERE id_reservation=${mysql.escape(id)}`;

  mysql.query(q, (error, result, fields) => {
    if (error) throw error;
    result.message = 'Votre réservation a été supprimée avec succès';
    clbk(result);
  });
};

module.exports = {
  getReservations,
  getReservationById,
  addReservation,
  updateReservation,
  removeReservation,
};
