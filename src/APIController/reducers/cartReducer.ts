import { Product as ProductModel} from '../interfaces'
import { CartActions } from '../action-types'
import { Action } from '../actions/cartActions'
import { totalmem } from 'os'

type CartData = {
    cart:ProductModel[],
    total:number,
    shipping:number
}

const initData:CartData = {
    cart:[],
    total:0,
    shipping:20
}


export default (state = initData, action:Action) => {
    switch(action.type){
        case CartActions.ADD_TO_CART:
            return{
                ...state,
                cart:action.payload,
            }
        case CartActions.REMOVE_FROM_CART:
            return {
                ...state,
                cart:action.payload,

            }
        case CartActions.INCREASE_PRODUCT:
            return {
                ...state,
                cart:action.payload,

            }
        case CartActions.DECREASE_PRODUCT:
            return {
                ...state,
                cart:action.payload,

            }
        case CartActions.CLEAR_CART:
            return {
                ...state,
                cart:action.payload
            }
        case CartActions.SET_TOTAL:
            return {
                ...state,
                total:action.payload
            }
        default:
            return state
    }
}