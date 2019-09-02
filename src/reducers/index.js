/*Caso tenhamos mais de um Reducer é importante a gente usar um método do reducer que chama combine-reducer
* mas nesse exemplo vamos ter apenas 1 reducer
* */
import {combineReducers} from 'redux'
import {cart} from "./cart";
export const Reducers = combineReducers({
  cart
});

