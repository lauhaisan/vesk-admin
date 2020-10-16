import { combineReducers } from "redux";
import productReducer from "./productReducer";
import userReducer from "./userReducer";
import listUserReducer from "./listUserReducer";
import advertisingReducer from "./advertisingReducer";
import socialMediaReducer from "./socialMediaReducer";
import exchangeReducer from "./exchangeReducer";
import uploadReducer from "./uploadReducer";
import createWebReducer from "./createWebReducer";

const rootReducer = combineReducers({
  products: productReducer,
  user: userReducer,
  listUser: listUserReducer,
  advertising: advertisingReducer,
  socialMedia: socialMediaReducer,
  exchange: exchangeReducer,
  upload: uploadReducer,
  createWeb: createWebReducer,
});

export default rootReducer;
