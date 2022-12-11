import { Request, Response, NextFunction } from 'express'
import jwt from "jsonwebtoken";

import User from "../model/Client";
import Booking from '../model/Booking';
import Route from '../model/Route';
import IJwtPayload from '../model/JWTPayload';
import userController from '../controller/clientController';
import { decode } from 'punycode';


const _SECRET = "password";

export async function verifyToken (req: Request, res: Response, next: NextFunction) {
    console.log("verifyToken");

    const token = req.header("x-access-token");
    if (!token) return res.status(403).json({ message: "No token provided" });

  try {

    const decoded = jwt.verify(token, _SECRET) as IJwtPayload;
    console.log("verifyToken");
    //req.params.id = decoded.id;
    const user = await User.findById(decoded.id, { password: 0 });
    console.log(user);
    if (!user) return res.status(404).json({ message: "No user found" });

    console.log("user exist");

    next();

  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

export async function verifyID (req: Request, res: Response, next: NextFunction) {
  

  const token = req.header("x-access-token");
  if (!token) return res.status(403).json({ message: "No token provided" });

try {

  const decoded = jwt.verify(token, _SECRET) as IJwtPayload;
  console.log("verifyToken");
  
  if (req.body.userid === decoded.id || decoded.isAdmin){
    const user = await User.findById(decoded.id, { password: 0 });
    console.log(user);
    if (!user) return res.status(404).json({ message: "No user found" });

    console.log("user exist");

    next();
  }

} catch (error) {
  return res.status(401).json({ message: "Unauthorized!" });
}
};

export async function verifyTokenAdmin (req: Request, res: Response, next: NextFunction) {
  console.log("verifyTokenAdmin");

  const token = req.header("x-access-token");
  if (!token) return res.status(403).json({ message: "No token provided" });

try {

  const decoded = jwt.verify(token, _SECRET) as IJwtPayload;
  console.log("verifyToken");
  console.log("1");
  console.log(decoded.id);
  // req.params.id = decoded.id;
  const user = await User.findById(decoded.id, { password: 0 });
  console.log(user);
  if (!user) return res.status(404).json({ message: "No user found" });
  if (!decoded.isAdmin) return res.status(404).json({mesage: "User is not admin"})
  console.log("user ok");

  next();

} catch (error) {
  return res.status(401).json({ message: "Unauthorized!" });
}
};