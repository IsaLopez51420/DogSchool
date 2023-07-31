var express = require("express");
const dogController = require("../controllers/dogController");
const uploadImage = require("../middleware/multer");
var router = express.Router();

// Ruta base :
// localhost:3000

//Endpoint de todos los perros no borrados
// localhost:3000/dog
router.get("/", dogController.viewAllDogs);

// Endpoint del formulario para insertar nuevos perros
// localhost:3000/dog/registerDog/:id
router.get("/registerDog/:id", dogController.viewRegisterDog);

// Endpoint que guarda info del perro nuevo
// localhost:3000/dog/registerDog/:id
router.post("/registerDog/:id", uploadImage("dogs"), dogController.saveDog);

// Endpoint que renderiza el formulario de añadir perros desde navbar
// localhost:3000/dog/addDogNavbar
router.get("/addDogNavbar", dogController.addDogNavbar);

// Endpoint que guarda datos del formulario del navbar
// localhost:3000/dog/addDogNavbar
router.post("/addDogNavbar", uploadImage("dogs"), dogController.saveDogNavbar);

// Endpoint que elimina de manera permanente un perro
// localhost:3000/dog/delete/:dog_id/:trainer_id
router.get("/delete/:dog_id/:trainer_id", dogController.delete);

// Endpoint para editar la vista de un perro
// localhost:3000/dog/editDog/:dog_id
router.get("/editDog/:dog_id", dogController.viewEditForm);

// Endpoint que guarda la info editada del editDog
// localhost:3000/dog/editDog/:dog_id/:trainer_id
router.post(
  "/editDog/:dog_id/:trainer_id",
  uploadImage("dogs"),
  dogController.saveEditDog
);

module.exports = router;
