import userController from '../controller/clientController';
import { Router } from 'express';
import { verifyTokenAdmin } from '../middlewares/authJWT';
import { verifyToken } from '../middlewares/authJWT';
import { verifyID } from '../middlewares/authJWT';

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/getUserData', userController.getUserData);

// router.post('/:id/rating/new',userController.newRating);
// router.get('/',[verifyTokenAdmin], userController.getall);
router.get('/', userController.getall);
router.get('/:id',[verifyToken], userController.getone);
router.put('/:id',[verifyID],userController.updateUser);
router.get('/:id/rating/',userController.getRatings);
router.put('/forgotpass/:id',[verifyID], userController.changePass);
router.delete('/:id',[verifyID], userController.deleteOne);
router.get('/:id/profile',[verifyID], userController.getProfile);
router.get('/:id/routeuser',[verifyID], userController.getUserRoutes);

export default router;