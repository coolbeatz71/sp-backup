import { PIN_RESET_PATH, PIN_RESET_UPDATE_PATH } from "./../helpers/paths";
const nonApplicableRoutes: string[] = [
  "/signup",
  "login",
  "signup/verify-phone",
  "/profile",
  PIN_RESET_PATH,
  PIN_RESET_UPDATE_PATH,
];

export default nonApplicableRoutes;
