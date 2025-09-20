import { Hono } from "hono";
import { auth, store } from "@services/firebase";
import { Unwrap } from "@/utils";

const app = new Hono();

app.post('/', async (c) => {
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
    if (userData && userData.wallet) {
        return c.json({
            linked: true,
            wallet: userData.wallet,
        });
    } else {
        return c.json({
            linked: false,
        }, 404);
    }
});

app.get('/address/:id', async (c) => {
    const id = c.req.param('id');
    if (!id) {
        return c.json({
            status: 400,
            error: "Missing user ID",
        }, 400);
    }

    const userRef = store.collection('users').doc(id);

    var [userDoc, err] = await Unwrap(userRef.get());
    if(err || (userDoc && !userDoc.exists)) {
        return c.json({
            status: 500,
            error: "Failed to fetch user data or user does not exist",
        }, 500);
    }

    if (!userDoc?.exists) {
        return c.json({
            status: 404,
            error: "User document not found",
        }, 404);
    }

    var userData = userDoc.data();
    if (userData && userData.wallet) {
        return c.json({
            linked: true,
            wallet: userData.wallet,
        });
    }
    else {
        return c.json({
            linked: false,
        }, 404);
    }
});

app.post('/link', async (c) => {
    var [{ token, wallet }, err] = await Unwrap(c.req.json());
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

    var [, err] = await Unwrap(userRef.update({
        linked: true,
        wallet: wallet,
    }));

    if (err) {
        return c.json({
            status: 500,
            error: "Failed to link wallet",
        }, 500);
    }
    
    return c.json({
        status: 200,
        message: "Wallet linked successfully",
    });
});

app.post('/unlink', async (c) => {
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

    var [, err] = await Unwrap(userRef.update({
        linked: false,
        wallet: null,
    }));

    if (err) {
        return c.json({
            status: 500,
            error: "Failed to unlink wallet",
        }, 500);
    }
    
    return c.json({
        status: 200,
        message: "Wallet unlinked successfully",
    });
});

export default app;