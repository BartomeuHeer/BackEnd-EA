import bookingController from '../controller/bookingController';
import { Router } from 'express';

const router = Router();

router.get('/booking/:_id', bookingController.getBooking); // No entenc diferencia _id i id
router.delete('/cancel/:id', bookingController.cancelBooking);
router.get('/', bookingController.getAll);


router.put('/booking/:id',bookingController.updateBooking);

router.post('/create',bookingController.createBooking);


router.get('/booking/:userId',bookingController.getBookingsFromUser);


export default router;