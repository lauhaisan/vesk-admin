import { combineReducers } from "redux";
import productReducer from "./productReducer";
import userReducer from "./userReducer";
import listUserReducer from "./listUserReducer";
import advertisingReducer from "./advertisingReducer";

const rootReducer = combineReducers({
  products: productReducer,
  user: userReducer,
  listUser: listUserReducer,
  advertising: advertisingReducer
});

export default rootReducer;
