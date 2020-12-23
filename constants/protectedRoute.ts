import {
  USER_CAUSES_PATH,
  CHANGE_PIN_PATH,
  CREATE_CAUSE_PATH,
} from "./../helpers/paths";
const protectedRoutes: string[] = [
  USER_CAUSES_PATH,
  CHANGE_PIN_PATH,
  CREATE_CAUSE_PATH,
  "/profile",
  "/causes/[slug]/edit",
];

export default protectedRoutes;
