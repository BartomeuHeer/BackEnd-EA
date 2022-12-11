import bookingController from '../controller/bookingController';
import { Router } from 'express';
import { verifyTokenAdmin } from '../middlewares/authJWT';
import { verifyToken } from '../middlewares/authJWT';
import { verifyID } from '../middlewares/authJWT';


const router = Router();

router.get('/:id',[verifyID], bookingController.getBooking); // No entenc diferencia _id i id
router.delete('/cancel/:id',[verifyID], bookingController.cancelBooking);
router.get('/',[verifyTokenAdmin], bookingController.getAll);


router.put('/:id',[verifyID],bookingController.updateBooking);

router.post('/create',[verifyID],bookingController.createBooking);


router.get('/:userId',[verifyID],bookingController.getBookingsFromUser);


export default router;