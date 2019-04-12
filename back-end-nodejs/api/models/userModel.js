'use strict';
const bcrypt = require('bcrypt');
const moment = require('moment');
const mysql = require('./../db/mysql');

const getUser = (clbk, id) => {
  var q;

  if (id) {
    q = `SELECT
            id, username, email, avatar, created_at, about, is_admin
        FROM
            user
        WHERE
            id = ${mysql.escape(id)}`;
  } else {
    q = `SELECT id, username, email, avatar, created_at, about, is_admin FROM user`;
  }

  mysql.query(q, (error, results, fields) => {
    if (error) throw error; // en cas d'erreur, une exception est levée
    if (results[0].created_at) {
      for (var i = 0; i < results.length; i++) {
        results[i].created_at = moment(results[i].created_at).format('L');
      }
    }
    clbk(results); // on passe les résultats de la requête en argument de la fonction callback
  });
};

const checkMail = (clbk, email) => {
  const q = `SELECT COUNT(*) as count FROM user WHERE email = ${mysql.escape(
    email
  )}`;

  mysql.query(q, (error, results, fields) => {
    if (error) throw error; // en cas d'erreur, une exception est levée
    clbk(results); // passe les résultats de requête en arg du callback
  });
};

const register = (clbk, data) => {
  checkMail(res => {
    if (res[0].count > 0) {
      // cette adresse mail est déjà en base
      return clbk({
        error: true,
        message:
          'un compte avec le même email existe déjà. veuillez saisir un email différent',
      });
    };
    // la base ne contient pas encore cette adresse mail, poursuivons l'insertion
    const hash = bcrypt.hashSync(data.password, 10);
    const q = `INSERT INTO
                  user (username, email, password, is_admin)
              VALUES
                  (
                  ${mysql.escape(data.userName)},
                  ${mysql.escape(data.email)},
                  ${mysql.escape(hash)},
                  ${mysql.escape(data.admin)}
                  )`;

    mysql.query(q, (error, results, fields) => {
      if (error) throw error;
      results.error = false;
      results.message = 'vous êtes bien enregistré, veuillez vous connecter.';
      clbk(results);
    });
  }, data.email);
};

const remove = (clbk, id) => {
  const q = `DELETE FROM user WHERE id = ${mysql.escape(id)}`;

  mysql.query(q, (error, results, fields) => {
    if (error) throw error; // en cas d'erreur, une exception est levée
    results.error = false;
    results.message = "L'utilisateur à été supprimé avec succès";
    clbk(results); // on passe les résultats de la requête en argument de la fonction callback
  });
};

// Helper method for validating user's password
const comparePassword = (email, clbk) => {
  const q = `SELECT * FROM user WHERE email = ${mysql.escape(email)}`;
  mysql.query(q, (error, results, fields) => {
    if (error) throw error;

    const tmp = results[0] || results;
    const resp = {};

    if (Array.isArray(tmp) && !tmp.length) {
      resp.error = true;
      resp.message = 'Email ou mot de passe invalid';
    } else {
      resp.password = tmp.password;
      resp.error = true;
    }
    clbk(resp);
  });
};

const authenticate = (clbk, data) => {
  comparePassword(data.email, res => {
    if (res.password) {
      bcrypt.compare(data.password, res.password, (error, result) => {
        if (result) {
          const q = `SELECT
                        id, username, email, avatar, about, is_admin
                    FROM
                        user
                    WHERE
                        email = ${mysql.escape(data.email)}
                    AND
                        password = ${mysql.escape(res.password)} GROUP BY id`;

          mysql.query(q, (error, results, fields) => {
            if (error) throw error;

            const tmp = results[0] || results;

            res.user = tmp;
            res.error = false;
            delete res.password;
            res.message = 'Vous êtes maintenant connecté';
            clbk(res);
          })
        } else {
          res.error = true;
          delete res.password;
          res.message = 'Email ou mot de passe invalid';
          clbk(res);
        }
      });
    } else {
      clbk(res);
    }
  });
};

const putUser = (clbk, data) => {
  const q = `UPDATE
                user
            SET
                username = ${mysql.escape(data.username)},
                email = ${mysql.escape(data.email)},
                is_admin = ${mysql.escape(data.is_admin)}
            WHERE
                id = ${mysql.escape(data.id)}`;

  mysql.query(q, (error, results, fields) => {
    if (error) throw error;
    results.message = "Modification effectuée avec succès !";
    clbk(results);
  });
};

const patchAbout = (clbk, about, id) => {
  const q = `UPDATE
                user
            SET
                about = ${mysql.escape(about)}
            WHERE
                id = ${mysql.escape(id)}`;

  mysql.query(q, (error, results, fields) => {
    if (error) throw error;
    clbk(results);
  });
};

const patchUserPassword = (clbk, data) => {
  const hash = bcrypt.hashSync(data.password, 10);
  const q = `UPDATE
                user
            SET
                password = ${mysql.escape(hash)}
            WHERE
                id = ${mysql.escape(data.id)}`;

  mysql.query(q, (error, results, fields) => {
  if (error) throw error;
  results.message = 'Votre mot de passe a été modifié avec succès';
  clbk(results);
  });
};

const patchAvatar = (clbk, avatar, id) => {
  const q = `UPDATE
                user
            SET
                avatar = ${mysql.escape(avatar)}
            WHERE
                id = ${mysql.escape(id)}`;

  mysql.query(q, (error, results, fields) => {
    if (error) throw error;
    results.message = 'Profil mise a jour';
    clbk(results);
  });
};

module.exports = {
  getUser,
  register,
  authenticate,
  putUser,
  patch: {
    about: patchAbout,
    avatar: patchAvatar,
    password: patchUserPassword,
  },
  remove,
};
