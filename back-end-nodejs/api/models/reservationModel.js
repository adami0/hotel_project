'use strict';
const moment = require('moment');
const mysql = require('./../db/mysql');

const getReservations = clbk => {
  const q = `SELECT
                r.id_reservation AS Id, r.arrival_date AS StartTime,
                r.departure_date AS EndTime, r.guests AS Guests, r.price AS Description,
                r.nights AS Location, r.fk_id_rooms AS RoomId, r.client_name AS Subject
            FROM
                reservation AS r`;

  mysql.query(q, (error, result, fields) => {
    if (error) throw error;

    for(let i = 0; i < result.length; i++) {
      result[i].IsAllDay = true;
      result[i].Description = result[i].Description + ' €';
      result[i].StartTime = moment(result[i].StartTime).format('YYYY, M, D');
      result[i].EndTime = moment(result[i].EndTime).format('YYYY, M, D');
    }
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
  const nbNights = moment(data.EndTime).diff(moment(data.StartTime), 'days');
  const StartTime = moment(data.StartTime).format();
  const EndTime = moment(data.EndTime).format();

  const q = `INSERT INTO
                reservation (client_name, arrival_date, departure_date, guests, price, nights, fk_id_rooms)
            VALUES
                (
                ${mysql.escape(data.Subject)},
                ${mysql.escape(StartTime)},
                ${mysql.escape(EndTime)},
                ${mysql.escape(data.guests)},
                ${mysql.escape(data.Description)},
                ${mysql.escape(nbNights)},
                ${mysql.escape(data.RoomId)}
                )`;

  mysql.query(q, (error, result, fields) => {
    if (error) throw error;
    result.message = 'Votre réservation a été ajoutée avec succès';
    clbk(result);
  });
};

const updateReservation = (clbk, data, id) => {
  const nbNights = moment(data.EndTime).diff(moment(data.StartTime), 'days');
  const StartTime = moment(data.StartTime).format();
  const EndTime = moment(data.EndTime).format();


  const q = `UPDATE
                reservation
            SET
                client_name=${mysql.escape(data.Subject)},
                arrival_date=${mysql.escape(StartTime)},
                departure_date=${mysql.escape(EndTime)},
                guests=${mysql.escape(data.guests)},
                price=${mysql.escape(data.Description)},
                nights=${mysql.escape(nbNights)},
                fk_id_rooms=${mysql.escape(data.RoomId)}
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
