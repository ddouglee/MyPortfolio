import express from "express";
import qualCtrl from "../controllers/education.controller.js";
import authCtrl from "../controllers/auth.controller.js";
const router = express.Router();

router.route("/api/qualifications")
  .post(authCtrl.requireSignin, qualCtrl.create)
  .get(qualCtrl.list); 

router.route("/api/qualifications/:qualificationId").get(qualCtrl.read);

router.route("/api/qualifications/:qualificationId")
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, qualCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, qualCtrl.remove);

router.param("qualificationId", qualCtrl.qualificationByID);

export default router;