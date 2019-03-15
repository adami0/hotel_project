'use strict';
const mysql = require('./../db/mysql');

const getClients = (clbk) => {
  const q = `SELECT * FROM client`;

  mysql.query(q, (error, result, fields) => {
    if (error) throw error;
    clbk(result);
  });
}

const getClientById = (clbk, id) => {
  const q = `SELECT * FROM client WHERE id_client=${mysql.escape(id)}`;

  mysql.query(q, (error, result, fields) => {
    if (error) throw error;
    clbk(result);
  });
}

const addClient = (clbk, data) => {
  const q = `INSERT INTO client
  (id_client, last_name, first_name, adress, phone_nb, email)
  VALUES (
    ${mysql.escape(data.id_client)},
    ${mysql.escape(data.last_name)},
    ${mysql.escape(data.first_name)},
    ${mysql.escape(data.adress)},
    ${mysql.escape(data.phone_nb)},
    ${mysql.escape(data.email)}
  )`;

  mysql.query(q, (error, result, fields) => {
    if (error) throw error;
    result.message = 'Nouveau client ajouté avec succès';
    clbk(result);
  });
}

const updateClient = (clbk, data, id) => {
  const q = `UPDATE client SET
    last_name=${mysql.escape(data.last_name)},
    first_name=${mysql.escape(data.first_name)},
    adress=${mysql.escape(data.adress)},
    phone_nb=${mysql.escape(data.phone_nb)},
    email=${mysql.escape(data.email)}`;

  mysql.query(q, (error, result, fields) => {
    if (error) throw error;
    result.message = 'Les informations de votre client ont été modifiées avec succès';
    clbk(result);
  });
}

const removeClient = (clbk, id) => {
  const q = `DELETE FROM client WHERE id_client=${mysql.escape(id)}`;

  mysql.query(q, (error, result, fields) => {
      if (error) throw error;
      result.message = 'Votre client a été supprimé. RIP';
      clbk(result);
  });
}

module.exports = {
  getClients,
  getClientById,
  addClient,
  updateClient,
  removeClient
}
