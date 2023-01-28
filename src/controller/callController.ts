import { Request, Response } from 'express';
import agora from "agora-access-token";

import pkg from 'agora-access-token'; const { RtcTokenBuilder, RtcRole } = pkg;
import * as dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "dev"}` });
const appID = process.env.APP_ID || "";
const appCertificate = process.env.APP_CERTIFICATE || "";
const role = RtcRole.PUBLISHER;
const expirationTimeInSeconds = 3600

const currentTimestamp = Math.floor(Date.now() / 1000)

const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

async function getToken(req: Request, res: Response) {
    const { channelName } = req.params;
    console.log(req.params);
    const tokenA = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, 0, role, privilegeExpiredTs);
    res.status(200).send({ rtcToken: tokenA });
}
export default{
    getToken
}
