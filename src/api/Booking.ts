import bookingController from '../controller/bookingController';
import { Router } from 'express';

const router = Router();

router.get('/:id', bookingController.getBooking); // No entenc diferencia _id i id
router.delete('/cancel/:id', bookingController.cancelBooking);
router.get('/', bookingController.getAll);


router.put('/:id',bookingController.updateBooking);

router.post('/create',bookingController.createBooking);


router.get('/:userId',bookingController.getBookingsFromUser);


export default router;