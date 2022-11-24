import userController from '../controller/userController';
import { Router } from 'express';
import { verifyTokenAdmin } from '../middlewares/authJWT';
import { verifyToken } from '../middlewares/authJWT';

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/:id/rating/new',userController.newRating);
router.get('/profile', userController.profile);
router.get('/',[verifyTokenAdmin], userController.getall);
router.get('/:id', userController.getone);
router.put('/:id',userController.updateUser);
router.get('/:id/rating/',userController.getRatings);
router.put('/forgotpass/:id', userController.changePass);
router.delete('/:id', userController.deleteOne);

export default router;