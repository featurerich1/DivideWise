import { combineReducers } from "redux";
import users from "./users_reducer";
import bills from "./bills_reducer";
import friends from "./friends_reducer";
import payments from "./payments_reducer";
import comments from "./comments_reducer";

export default combineReducers({
  users,
  bills,
  friends,
  payments,
  comments,
});
