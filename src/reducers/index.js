import { combineReducers } from "redux";
import productReducer from "./productReducer.js";
import userReducer from "./userReducer.js";

const rootReducer = combineReducers({
  products: productReducer,
  user: userReducer,
});

export default rootReducer;
