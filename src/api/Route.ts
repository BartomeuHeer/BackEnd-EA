import { Router } from 'express';
import Route from '../model/Route';
import routeController from '../controller/routeController';
import { verifyTokenAdmin } from '../middlewares/authJWT';
import { verifyToken } from '../middlewares/authJWT';
import { verifyID } from '../middlewares/authJWT';

const router = Router();
router.post('/create',[verifyToken], routeController.create);
// router.post('/:id/newStopPoint', routeController.newStopPoint);
// router.post('/:id/newParticipant', routeController.newParticipant);
// router.get('/:id/getAllParticipants/',routeController.getAllParticipants);

// router.get('/',[verifyTokenAdmin],routeController.getAllRoutes);
router.get('/',routeController.getAllRoutes);

// router.get('/:id/getAllPoints',routeController.getAllPoints);
router.get('/:id/',routeController.getRoute);
router.put('/:id/updateRoute',[verifyID],routeController.updateRoute);
router.delete('/:id/deleteRoute',[verifyID],routeController.deleteRoute);
// hem de crear user routes

export default router;
