import { AnonymousCredential } from "mongodb-stitch-browser-sdk";
import { Stitch } from "mongodb-stitch-browser-sdk";

export function loginAnonymous() {
  // Allow users to log in anonymously
  let APP_ID = "forumtopic-wuzgl";
  const appDefault = Stitch.hasAppClient(APP_ID)
  ? Stitch.getAppClient(APP_ID)
  : Stitch.initializeAppClient(APP_ID);
  const credential = new AnonymousCredential();
  return appDefault.auth.loginWithCredential(credential);
}

export function hasLoggedInUser() {
  // Check if there is currently a logged in user
  let APP_ID = "forumtopic-wuzgl";
  const appDefault = Stitch.hasAppClient(APP_ID)
  ? Stitch.getAppClient(APP_ID)
  : Stitch.initializeAppClient(APP_ID);
  return appDefault.auth.isLoggedIn;
}

export function getCurrentUser() {
  // Return the user object of the currently logged in user
  let APP_ID = "forumtopic-wuzgl";
  const appDefault = Stitch.hasAppClient(APP_ID)
  ? Stitch.getAppClient(APP_ID)
  : Stitch.initializeAppClient(APP_ID);
  return appDefault.auth.isLoggedIn ? appDefault.auth.user : null;
}

export function logoutCurrentUser() {
  // Logout the currently logged in user
  let APP_ID = "forumtopic-wuzgl";
  const appDefault = Stitch.hasAppClient(APP_ID)
  ? Stitch.getAppClient(APP_ID)
  : Stitch.initializeAppClient(APP_ID);
  const user = getCurrentUser();
  return appDefault.auth.logoutUserWithId(user.id);
}
