var express = require("express");
const trainerController = require("../controllers/trainerController");
const uploadImage = require("../middleware/multer");
var router = express.Router();

//Ruta base : localhost:3000/trainer

// Muestra a los entrenadores
// localhost:3000/trainer
router.get("/", trainerController.getAllTrainer);

// localhost:3000/trainer/contact
router.get("/contact", trainerController.viewContact);

//Muestra formulario de register
// localhost:3000/trainer/register
router.get("/register", trainerController.viewRegisterForm);

// Guarda los datos del formulario de register
// localhost:3000/trainer/register
router.post("/register", uploadImage("trainers"), trainerController.register);

// Vista del entrenador con sus perros
// localhost:3000/trainer/moreInfoTrainer/:id
router.get("/moreInfoTrainer/:id", trainerController.viewMoreInfoTrainer);

// Formulario de login
// localhost:3000/trainer/login
router.get("/login", trainerController.viewLoginForm);

// credenciales
// localhost:3000/trainer/login
router.post("/login", trainerController.login);

// editar artista
// localhost:3000/trainer/editTrainer/:trainer_id
router.get("/editTrainer/:trainer_id", trainerController.viewEditForm);

// editar artista
// localhost:3000/trainer/editTrainer/:trainer_id
router.post(
  "/editTrainer/:trainer_id",
  uploadImage("trainers"),
  trainerController.saveEditTrainer
);

module.exports = router;
