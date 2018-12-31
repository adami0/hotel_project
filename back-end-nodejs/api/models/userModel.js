'use strict';
const bcrypt = require('bcrypt');
const mysql = require('./../db/mysql');


const getUser = (clbk, id) => {
  var q;

  if (id) q = `SELECT id, email, avatar, about, is_admin FROM user WHERE id = ${mysql.escape(id)}`;
  else q = 'SELECT id, email, avatar, about, is_admin FROM user';

  mysql.query(q, (error, results, fields) => {
    if (error) throw error; // en cas d'erreur, une exception est levée
    clbk(results); // on passe les résultats de la requête en argument de la fonction callback
  });
};

const checkMail = (clbk, email) => {
  const q = `SELECT COUNT(*) as count FROM user WHERE email = ${mysql.escape(email)}`;

  mysql.query(q, (error, results, fields) => {
    if (error) throw error; // en cas d'erreur, une exception est levée
    clbk(results); // passe les résultats de requête en arg du callback
  });
};

const register = (clbk, data) => {
  checkMail(res => {
    if (res[0].count > 0) { // cette adresse mail est déjà en base
      return clbk({error: true, message: "un compte avec le même email existe déjà. veuillez saisir un email différent"});
    }
    // la base ne contient pas encore cette adresse mail, poursuivons l'insertion
    const hash = bcrypt.hashSync(data.password, 10);
    const q = `INSERT INTO user (username, email, password) VALUES
      (${mysql.escape(data.username)}, ${mysql.escape(data.email)}, ${mysql.escape(hash)})`;

      mysql.query(q, (error, results, fields) => {
        if (error) throw error;
        results.error = false;
        results.message = "vous êtes bien enregistré, veuillez vous connecter.";
        clbk(results);
      });
  }, data.email);
};

const remove = (clbk, id) => {
  const q = `DELETE FROM user WHERE id = ${mysql.escape(id)}`;

  mysql.query(q, (error, results, fields) => {
    if (error) throw error; // en cas d'erreur, une exception est levée
    results.error = false;
    results.message = "L'utilisateur à été supprimé succès";
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
      resp.message = "Email ou mot de passe invalid";
    } else {
      resp.password = tmp.password;
      resp.error = true;
    }
    clbk(resp)
  })
};

const authenticate = (clbk, data) => {
  comparePassword(data.email, res => {
    if (res.password) {
      bcrypt.compare(data.password, res.password, (error, result) => {
        if (result) {
          const q = `SELECT id, username, email, avatar, about, is_admin FROM user WHERE email = ${mysql.escape(data.email)} AND password = ${mysql.escape(res.password)} GROUP BY id`;

            mysql.query(q, (error, results, fields) => {

              if (error) throw error;

              const tmp = results[0] || results;

              res.user = tmp;
              res.error = false;
              res.password = null;
              res.message = "Vous êtes maintenant connecté";
              clbk(res)
           });
        } else {
          res.error = true;
          res.password = null;
          res.message = "Email ou mot de passe invalid";
          clbk(res)
        }
      });
    } else {
      clbk(res)
    }
  })
};

const patchAbout = (clbk, about, id) => {
  const q = `UPDATE user SET about = ${mysql.escape(about)} WHERE id = ${mysql.escape(id)}`;
  mysql.query(q, (error, results, fields) => {
    if (error) throw error;
    clbk(results);
  });
};

const patchAvatar = (clbk, avatar, id) => {
  const q = `UPDATE user SET avatar = ${mysql.escape(avatar)} WHERE id = ${mysql.escape(id)}`;
  mysql.query(q, (error, results, fields) => {
    if (error) throw error;
    clbk(results);
  });
};

module.exports = {
  getUser,
  register,
  authenticate,
  patch: {
    about: patchAbout,
    avatar: patchAvatar,
  },
  remove
}
