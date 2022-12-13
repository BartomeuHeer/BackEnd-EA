import express from "express";
import bodyParser from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import User from "./api/Client";
import Booking from "./api/Booking";
import Route from "./api/Route";
import  { RequestHandler } from 'express';

const app = express();
const port = process.env.PORT || 5432;

// Middlewares
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json())
app.use(cors());
// app.use(express.json() as RequestHandler);

// Routes
app.use('/api/users', User)
app.use('/api/bookings', Booking)
app.use('/api/routes', Route)

// Idle
app.get('/', ( req: express.Request, res: express.Response ) => {
	res.send('Hello World!')
})

// Database
mongoose.connect('mongodb://mongo/users', { useNewUrlParser : true } as ConnectOptions)
	.then(() => {
		// tslint:disable-next-line:no-console
        app.listen(port, () => console.log("Server corriendo en el puerto " + port));
	})
	.catch((err) => {
		// tslint:disable-next-line:no-console
		console.log(err);
	});
