import admin from "firebase-admin";
import path from "path";

const SERVICE_ACCOUNT_FILE = Bun.env.SERVICE_ACCOUNT_FILE || "service-account.key.json";
const CERT = path.join(__dirname, "../.." , SERVICE_ACCOUNT_FILE);

const app = admin.initializeApp({
    credential: admin.credential.cert(CERT),
});

export const store = app.firestore();
export const auth = app.auth();

export default app;