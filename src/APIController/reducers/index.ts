import { combineReducers } from 'redux'
import productsReducer from './productsReducer'
import cartReducer from './cartReducer'

const reducers = combineReducers({
    products: productsReducer,
    cart:cartReducer
})

export default reducers

export type State = ReturnType<typeof reducers>