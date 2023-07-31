const connection = require("../config/db");
const bcrypt = require("bcrypt");

class IndexController {
  // module.exports = new IndexController();
  viewHome = (req, res) => {
    let sql = `SELECT * FROM trainer WHERE is_deleted = 0`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("index", { result });
    });
  };
  // //Vista Contact
  // viewContact = (req, res) => {
  //   res.send("contact");
  // };
}
module.exports = new IndexController();
