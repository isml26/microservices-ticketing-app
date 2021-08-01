import { Router } from "express"
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

export const routes = Router();

routes.use("/users", [
    currentUserRouter,
    signinRouter,
    signoutRouter,
    signupRouter,
]);