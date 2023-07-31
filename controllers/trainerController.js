const connection = require("../config/db");
const bcrypt = require("bcrypt");

class TrainerController {
  //Vista Contact
  viewContact = (req, res) => {
    res.render("contact");
  };
  // Muestra a todos los trainers no borrados
  getAllTrainer = (req, res) => {
    let sql = `SELECT * FROM trainer WHERE is_deleted = 0`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("allTrainers", { result });
    });
  };
  //Muestra formulario de register
  viewRegisterForm = (req, res) => {
    res.render("register", { message: "" });
  };
  //registra el nuevo trainer
  register = (req, res) => {
    let { name, last_name, phone_number, email, password, description } =
      req.body;
    let img = "";
    if (req.file != undefined) {
      img = req.file.filename;
    } else {
      img = "photo.jpg";
    }
    // Encripta contraseña
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) throw err;

      let sql = `INSERT INTO trainer (name, last_name, phone_number, email, password, photo, description) VALUES ("${name}", "${last_name}", "${phone_number}", "${email}", "${hash}", "${img}", "${description}")`;

      connection.query(sql, (error, result) => {
        // si da error
        if (error) {
          // por email duplicado sale este error
          if (error.code == "ER_DUP_ENTRY") {
            res.render("register", { message: "El email ya existe" });
          } else {
            // si es otro tipo de error
            throw error;
          }
        } else {
          // si no da error
          res.render("register", { message: "Usuario creado correctamente" });
        }
      });
    });
  };
  // Vista perfil trainer con sus perros

  viewMoreInfoTrainer = (req, res) => {
    let trainer_id = req.params.id;
    let sqlTrainer = `SELECT * FROM trainer WHERE is_deleted = 0 AND trainer_id = ${trainer_id}`;
    let sqlDog = `SELECT * FROM dog WHERE deleted = 0 AND trainer_id = ${trainer_id}`;

    connection.query(sqlTrainer, (errorTrainer, resultTrainer) => {
      if (errorTrainer) throw errorTrainer;

      connection.query(sqlDog, (errorDog, resultDog) => {
        if (errorDog) throw errorDog;
        res.render("moreInfoTrainer", { resultTrainer, resultDog });
      });
    });
  };
  //Formulario login
  viewLoginForm = (req, res) => {
    res.render("loginForm", { message: "" });
  };

  // credenciales
  login = (req, res) => {
    let { email, password } = req.body;
    let sql = `SELECT * FROM trainer WHERE email = '${email}' AND is_deleted = 0`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      if (result.length == 1) {
        //mail correcto compruebo password
        let hash = result[0].password;
        bcrypt.compare(password, hash, (err, resCompare) => {
          if (resCompare) {
            // email y password correctos
            res.redirect(`/trainer/moreInfoTrainer/${result[0].trainer_id}`);
          } else {
            //password incorrecta
            res.render("loginForm", {
              message: " Su login es incorrecto, revíselo ",
            });
          }
        });
      } else {
        //mail incorrecto
        res.render("loginForm", {
          message: " Su login es incorrecto, revíselo ",
        });
      }
    });
  };
  // editar trainer
  viewEditForm = (req, res) => {
    let trainer_id = req.params.trainer_id;
    let sql = `SELECT * FROM trainer where trainer_id = ${trainer_id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("editTrainer", { result });
    });
  };
  saveEditTrainer = (req, res) => {
    let trainer_id = req.params.trainer_id;
    let { name, last_name, phone_number, email, password, description } =
      req.body;

    let sql = `UPDATE trainer SET name = '${name}', last_name = '${last_name}', phone_number = '${phone_number}', email = '${email}', description = '${description}'`;

    let final = ` WHERE trainer_id = ${trainer_id}`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql += `, photo = '${img}'`;
    }
    if (password != "") {
      bcrypt.hash(password, 10, (error, hash) => {
        if (error) throw error;

        sql += `, password = '${hash}'`;
        sql += final;

        connection.query(sql, (error, result) => {
          if (error) throw error;
          res.redirect(`/trainer/moreInfoTrainer/${trainer_id}`);
        });
      });
    } else {
      sql += final;
      connection.query(sql, (error2, result) => {
        if (error2) throw error2;
        res.redirect(`/trainer/moreInfoTrainer/${trainer_id}`);
      });
    }
  };
}

module.exports = new TrainerController();
