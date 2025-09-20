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
    if (userData) {
        return c.json(userData);
    } else {
        return c.json({
            status: 404,
            error: "User data not found",
        }, 404);
    }
});

app.get('/:id', async (c) => {
    const { id } = c.req.param();

    var [profile, err] = await Unwrap(store.collection('users').doc(id).get());
    if (err) {
        return c.json({
            status: 500,
            error: err.message,
        }, 500);
    }

    if (!profile || !profile.exists) {
        return c.json({
            status: 404,
            error: "Profile not found",
        }, 404);
    }
    
    const data = profile.data();
    if (!data) {
        return c.json({
            status: 404,
            error: "Profile data not found",
        }, 404);
    }

    //Increment the views
    var [_, err] = await Unwrap(store.collection("users").doc(id).update({
        views: (data.views || 0) + 1
    }));

    return c.json({
        status: 200,
        data ,
    });

});

export default app;
