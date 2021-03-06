/// react II only
import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { clientReducer } from "./clientReducer";
import { stripeReducer } from "./stripeReducer";
import { credentialReducer } from "./credentialReducer";
import { homepageReducer } from "./homepageReducer";
import { instructorProfileReducer } from "./instructorProfileReducer";

export const rootReducer = combineReducers({
  userReducer,
  clientReducer,
  stripeReducer,
  credentialReducer,
  homepageReducer,
  instructorProfileReducer,
});
