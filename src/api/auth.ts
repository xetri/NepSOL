import { Hono } from "hono";
import admin, { auth, store } from "@services/firebase";

import { getIdFromMail, Unwrap } from "@/utils";

const app = new Hono();

app.post('/google', async c => {
    var [{ token }, err] = await Unwrap(c.req.json());
    if (err || !token) {
        c.status(400);
        return c.json({
            message: "Invalid authorization token found or missing token",
            additional: err.message,
        })
    }

    var [decoded, err] = await Unwrap(auth.verifyIdToken(token))
    if (err || !decoded) {
        c.status(400);
        return c.json({
            message: "Token from unknown signature or invalid token",
            additional: err.message,
        });
    }

    const { uid, email, name, picture } = decoded;
    const provider = decoded.firebase.sign_in_provider;
    const id = getIdFromMail(email as string);

    const userDbRef = store.collection("users").doc(id);

    var [_, err] = await Unwrap(userDbRef.get());
    // User exists
    if (err) return c.json({
        message: "User exists"
    })

    var [saved, err] = await Unwrap(userDbRef.set({
        uid,
        id,
        email,
        name,
        picture,
        provider,
        createdAt: new Date().toISOString(),
    }));
    if (err || !saved) {
        c.status(400);
        return c.json({
            message: "Unable to save User",
        })
    }

    return c.json({
        message: "User created"
    })
})

export default app;