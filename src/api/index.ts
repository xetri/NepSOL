import { Hono } from "hono";
import AuthCallbackRoute from "@api/auth";
import WalletCallbackRoute from "@api/wallet";
import ProfileCallbackRoute from "@api/profile";
import TxCallbackRoute from "@api/tx";

const api = new Hono();

api.route('/auth', AuthCallbackRoute);
api.route('/wallet', WalletCallbackRoute);
api.route('/profile', ProfileCallbackRoute);
api.route('/tx', TxCallbackRoute);

export default api;