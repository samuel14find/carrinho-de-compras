/*Nota importante. Para conseguirmos usar a extensão Redux no chrome, dever adicionar um código extra dentro do método
* createStore. Esse código não está relacionada com a Store em si, é somente para questão de funcionar a extensão
*
* */
import {createStore} from "redux";
import {Reducers} from "../reducers";

export const Store = createStore (
    Reducers /* preLoadeState */,
    window.__REDUX_DEVTOOLS__EXTENSION__ && window.__REDUX_DEVTOOLS__EXTENSION__()

);