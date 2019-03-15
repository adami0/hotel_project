'use strict';
const mysql = require('./../db/mysql');

/**
 * function getRooms to all room in database
 * @param {*} clbk
 */
const getRooms = (clbk) => {
  const q = `SELECT * FROM room`;

  mysql.query(q, (error, results, fields) => {
    if (error) throw error;
    clbk(results);
  });
}

const updateRoomStatus = (clbk, data, id) => {
  const q = `UPDATE room
  SET room_status=${mysql.escape(data.room_status)}
  WHERE id_room=${mysql.escape(id)}`;

  mysql.query(q, (error, result, fields) => {
    if (error) throw error;
    result.message = 'L\'état de la chambre a changé';
    clbk(result);
  })
}


module.exports = {
  getRooms,
  updateRoomStatus
}
