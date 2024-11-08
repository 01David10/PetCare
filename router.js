const {Router} = require('express');
const router = Router();

const pagesController = require('./src/controllers/pagesController');
const appointmentController = require('./src/controllers/appointmentController');
const administratorController = require('./src/controllers/administratorController');
const medicalHistoryController = require('./src/controllers/medicalHistoryController');
const medicalHistoryVaccineController = require('./src/controllers/medicalHistoryVaccineController');
const petController = require('./src/controllers/petController');
const scheduleController = require('./src/controllers/scheduleController');
const treatmentController = require('./src/controllers/treatmentController');
const vaccineController = require('./src/controllers/vaccineController');
const petOwnerController = require('./src/controllers/petOwnerController');
const veterinarianController = require('./src/controllers/veterinarianController');
const medicineController = require('./src/controllers/medicineController');
const loginController = require('./src/controllers/loginController.js');
const userController = require('./src/controllers/userController');
const registermedicineController = require('./src/controllers/registermedicineController');


// hmtl
router.get('/home', pagesController.getHome);

router.get('/manageUsers', pagesController.getManageUsers);
router.get('/manageMedicines', pagesController.getManageMedicines);
router.get('/manageMedicinesVeterinarian', pagesController.getManageMedicines);


router.get('/login', pagesController.getLogin);

router.get('/petOwner', pagesController.getPetOwner);
router.get('/managePet', pagesController.getManagePet);

router.get('/veterinarian', pagesController.getVeterinarians);

// funcionalidades
router.get('/getAllappointments', appointmentController.getAppointments);

router.get('/getAlladministrators', administratorController.getAdministrators);

router.get('/getAllmedicalHistories', medicalHistoryController.getMedicalHistories);

router.get('/getAllmedicalHistoryVaccines', medicalHistoryVaccineController.getMedicalHistoryVaccines);

router.get('/getAllpets', petController.getPets);

router.get('/getAllschedules', scheduleController.getSchedules);

router.get('/getAlltreatments', treatmentController.getTreatments);

router.get('/getAllvaccines', vaccineController.getVaccines);

router.post('/postPetOwner', petOwnerController.postPetOwner);
router.get('/getPetOwners', petOwnerController.getPetOwners);
router.put('/putPetOwner', petOwnerController.putPetOwner);
router.delete('/deletePetOwner', petOwnerController.deletePetOwner);

router.post('/postVeterinarian', veterinarianController.postVeterinarian);
router.get('/getVeterinarians', veterinarianController.getVeterinarians);
router.put('/putVeterinarian', veterinarianController.putVeterinarian);
router.delete('/deleteVeterinarian', veterinarianController.deleteVeterinarian);

router.post('/postMedicine', registermedicineController.medicine);
router.get('/getMedicines', medicineController.getMedicines);

router.post('/postLogin', loginController.login);



module.exports = router;

