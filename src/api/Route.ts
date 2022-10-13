import { Router } from 'express';
import Route from '../model/Route';
import routeController from '../controller/routeController';

const router = Router();
router.post('/create', routeController.create);
router.post('/:id/newStopPoint', routeController.newStopPoint);
router.post('/:id/newParticipant', routeController.newParticipant);
router.get('/:id/getAllParticipants/',routeController.getAllParticipants);
router.post('/',routeController.getAllRoutes);
router.get('/:id/getAllPoints',routeController.getAllPoints);
router.put('/:id/gupdateRoute',routeController.updateRoute);
router.delete('/:id/deleteRoute',routeController.deleteRoute);

export default router;
