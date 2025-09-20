import { Hono } from "hono";
import { auth, store } from "@services/firebase";
import { Unwrap } from "@/utils";

const app = new Hono();

app.post("/", async (c) => {
    var [{ token }, err] = await Unwrap(c.req.json());
    if (err || !token) {
        return c.json({
            status: 400,
            error: "Invalid request body or missing token",
        }, 400);
    }

    var [decoded, err] = await Unwrap(auth.verifyIdToken(token));
    if(err || !decoded) {
        return c.json({
            status: 401,
            error: "Invalid token",
        }, 401);
    }

    const id = decoded.email?.split('@')[0] || decoded.uid;
    const userRef = store.collection('users').doc(id);

    var [userDoc, err] = await Unwrap(userRef.get());
    if(err || (userDoc && !userDoc.exists)) {
        return c.json({
            status: 500,
            error: "Failed to fetch user data or user does not exist",
        }, 500);
    }

    if (!userDoc) {
        return c.json({
            status: 404,
            error: "User document not found",
        }, 404);
    }

    var userData = userDoc.data();
    if (userData) {
        return c.json({
            txs: userData.txs || [],
        });
    } else {
        return c.json({
            status: 404,
            error: "User data not found",
        }, 404);
    }
})

export default app;