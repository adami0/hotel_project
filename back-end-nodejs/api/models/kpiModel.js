'use strict';
const moment = require('moment');
const mysql = require('./../db/mysql');
require('moment/locale/fr');

const getReservationByMonth = clbk => {
  const q = `SELECT
                DATE_FORMAT(arrival_date, "%Y/%m/%d") month,
                COUNT(*) Réservations
            FROM
                reservation
            WHERE
                arrival_date >= NOW() - INTERVAL 1 YEAR
            GROUP BY
                MONTH(arrival_date)`;

  mysql.query(q, (error, results, fields) => {
    if (error) throw error;
    if (results[0]) {
      moment.locale('fr');
      for (var i = 0; i < results.length; i++) {
        results[i].month = moment(results[i].month, 'YYYY-M').format('LL');
        results[i].month = results[i].month.substr(1);
      }
    }
    clbk(results);
  });
};

const getReservationsAmountPerMonth = clbk => {
  const q = `SELECT
                DATE_FORMAT(arrival_date, "%Y/%m/%d") month,
                SUM(price) AS Montant
            FROM
                reservation
            WHERE
                arrival_date >= NOW() - INTERVAL 1 YEAR
            GROUP BY
                MONTH(arrival_date)`;
  mysql.query(q, (error, results, fields) => {
    if (error) throw error;
    if (results[0]) {
      moment.locale('fr');
      for (var i = 0; i < results.length; i++) {
        results[i].month = moment(results[i].month, 'YYYY-M').format('LL');
        results[i].month = results[i].month.substr(1);
      }
    }
    clbk(results);
  });
};

const getRoomStatus = clbk => {
  const q = `SELECT * FROM
                ( SELECT
                      COUNT(*) AS total_room
                  FROM
                      room
                ) A,
                ( SELECT
                      COUNT(*) AS check_room
                  FROM
                      room
                  WHERE
                      room_status = 0
                ) B,
                ( SELECT
                      COUNT(*) AS today_bookings
                  FROM
                      reservation
                  WHERE
                      CURDATE() BETWEEN arrival_date AND departure_date
                ) C`;

  mysql.query(q, (error, results, fields) => {
    if (error) throw error;
    clbk(results);
  });
};

module.exports = {
  getReservationsAmountPerMonth,
  getReservationByMonth,
  getRoomStatus,
};
