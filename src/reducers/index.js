import { combineReducers } from "redux";
import productReducer from "./productReducer.js";
import userReducer from "./userReducer.js";
import listUserReducer from "./listUserReducer.js";

const rootReducer = combineReducers({
  products: productReducer,
  user: userReducer,
  listUser: listUserReducer
});

export default rootReducer;
