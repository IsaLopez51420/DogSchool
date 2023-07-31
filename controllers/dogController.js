const connection = require("../config/db");
class DogController {
  // todos los perros no borrados
  viewAllDogs = (req, res) => {
    let sql = `SELECT * from dog WHERE deleted = 0`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("allDogs", { result });
    });
  };

  // formulario para insertar nuevos perros
  viewRegisterDog = (req, res) => {
    let id = req.params.id;
    res.render("registerDog", { trainer_id: id });
  };

  // guarda info nuevo perro
  saveDog = (req, res) => {
    let trainer_id = req.params.id;
    let { dog_name, dog_info } = req.body;
    let sql = `INSERT INTO dog (trainer_id, dog_name, dog_info) VALUES (${trainer_id}, '${dog_name}', '${dog_info}')`;
    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `INSERT INTO dog (trainer_id, dog_name, dog_info, image) VALUES (${trainer_id}, '${dog_name}', '${dog_info}', '${img}')`;
    }

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/trainer/moreInfoTrainer/${trainer_id}`);
    });
  };

  // Renderiza el formulario de añadir perros desde navbar
  addDogNavbar = (req, res) => {
    let sql = `SELECT name, last_name, trainer_id FROM trainer WHERE is_deleted = 0`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("addDogNavbar", { result });
    });
  };
  // Guarda datos del formulario del navbar
  saveDogNavbar = (req, res) => {
    let { dog_name, dog_info, trainer_id } = req.body;
    let sql = `INSERT INTO dog (trainer_id, dog_name, dog_info) VALUES (${trainer_id}, '${dog_name}', '${dog_info}')`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `INSERT INTO dog (trainer_id, dog_name, dog_info, image) VALUES (${trainer_id}, '${dog_name}', '${dog_info}', '${img}')`;
    }
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/trainer/moreInfoTrainer/${trainer_id}`);
    });
  };

  // Elimina de manera permanente un perro
  delete = (req, res) => {
    let { dog_id, trainer_id } = req.params;

    let sql = `DELETE FROM dog WHERE dog_id = ${dog_id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/trainer/moreInfoTrainer/${trainer_id}`);
    });
  };

  // Editar la vista del perro
  viewEditForm = (req, res) => {
    let dog_id = req.params.dog_id;
    let sql = `SELECT * FROM dog WHERE dog_id = ${dog_id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("editDog", { result });
    });
  };
  // Guarda la info editada del editDog
  saveEditDog = (req, res) => {
    let dog_id = req.params.dog_id;
    let trainer_id = req.params.trainer_id;
    let { dog_name, dog_info } = req.body;

    let sql = `UPDATE dog SET dog_name = '${dog_name}', dog_info = '${dog_info}' WHERE dog_id = ${dog_id}`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `UPDATE dog SET dog_name = '${dog_name}', dog_info = '${dog_info}', image = '${img}' WHERE dog_id = ${dog_id}`;
    }

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/trainer/moreInfoTrainer/${trainer_id}`);
    });
  };
}
module.exports = new DogController();
