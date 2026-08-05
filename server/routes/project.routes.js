import express from "express"
import projCtrl from "../controllers/project.controller.js"
import authCtrl from "../controllers/auth.controller.js"
const router = express.Router();

router.route('/api/projects')
  .get(projCtrl.list)
  .post(projCtrl.create);

router.route('/api/projects/:projectId')
  .get(authCtrl.requireSignin, projCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, projCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, projCtrl.remove);

router.param('projectId', projCtrl.projectByID);

export default router;
