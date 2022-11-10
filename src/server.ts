import express from "express";
import bodyParser from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import User from "./api/User";
import Booking from "./api/Booking";
import Route from "./api/Route";


const app = express();
const port = process.env.PORT || 5432;

// Middlewares
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json())
app.use(cors());

// Routes
app.use('/api/users', User)
app.use('/api/bookings', Booking)
app.use('/api/routes', Route)

// Idle
app.get('/', ( req: express.Request, res: express.Response ) => {
	res.send('Hello World!')
})

// Database
mongoose.connect('mongodb://0.0.0.0/users', { useNewUrlParser : true } as ConnectOptions)
	.then(() => {
		// tslint:disable-next-line:no-console
        app.listen(port, () => console.log("Server corriendo en el puerto " + port));
	})
	.catch((err) => {
		// tslint:disable-next-line:no-console
		console.log(err);
	});
