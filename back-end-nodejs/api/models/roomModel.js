'use strict';
const mysql = require('./../db/mysql');

/**
 * function getRooms to all room in database
 * @function getRooms
 * @callback clbk
 * @param { requestCallback } clbk
 */
const getRooms = clbk => {
  const q = `SELECT * FROM room`

  mysql.query(q, (error, results, fields) => {
    if (error) throw error;
    clbk(results);
  });
};

/**
 * function updateRoomStatus
 * @function updateRoomStatus
 * @callback clbk
 * @param {Object} data
 * @param {Number} id
 */
const updateRoomStatus = (clbk, data, id) => {
  const q = `UPDATE
                room
            SET
                room_status=${mysql.escape(data.room_status)}
            WHERE
                id_room=${mysql.escape(id)}`;

  mysql.query(q, (error, result, fields) => {
    if (error) throw error;
    result.message = "L'état de la chambre a changé";
    clbk(result);
  });
};

const postRoom = (clbk, data) => {
  const q = `INSERT
              room
            SET
              room_nb = ${mysql.escape(data.room_nb)},
              room_status = ${mysql.escape(data.room_status)},
              room_type = ${mysql.escape(data.room_type)},
              color = ${mysql.escape(data.color)}`;

  mysql.query(q, (error, results, fields) => {
    if (error) throw error;
    results.message = "Création de la chambre avec succès !";
    clbk(results);
  });
};


module.exports = {
  getRooms,
  updateRoomStatus,
  postRoom,
};
