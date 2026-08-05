import express from "express";
import contactCtrl from "../controllers/contact.controller.js";
import authCtrl from "../controllers/auth.controller.js";
const router = express.Router();

router.route("/api/contacts")
  .post(authCtrl.requireSignin, contactCtrl.create)
  .get(contactCtrl.list); 

router.route("/api/contacts/:contactId").get(contactCtrl.read);

router.route("/api/contacts/:contactId")
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, contactCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, contactCtrl.remove);

router.param("contactId", contactCtrl.contactByID);

export default router;