import express  from "express";
import homecontroller from "../controllers/homecontroller";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController"

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homecontroller.getHomePage);
    router.get('/crud', homecontroller.getCRUD); 

    router.post('/post-crud', homecontroller.postCRUD);
    router.get('/get-crud', homecontroller.displayGetCRUD);
    router.get('/edit-crud', homecontroller.getEditCRUD);
    router.post('/put-crud', homecontroller.putCRUD);
    router.get('/delete-crud', homecontroller.deleteCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllusers);
    router.post('/api/create-new-users', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/allcode', userController.getAllCode); 
    
    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctors', doctorController.getAllDoctors);
    router.post('/api/save-infor-doctors', doctorController.postInforDoctor);
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate);
    router.get('/api/get-extra-infor-doctor-by-id', doctorController.getExtraInforDoctorById);
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById);

    router.post('/api/patient-book-appointment', patientController.postBookAppointment);
    router.post('/api/verify-book-appointment', patientController.postVerifyBookAppointment);

    return app.use("/", router);
}

module.exports = initWebRoutes;