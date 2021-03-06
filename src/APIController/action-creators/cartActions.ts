import { CartActions } from '../action-types'
import { Action } from '../actions/cartActions'
import { Dispatch } from 'redux'
import { Product as ProductModel } from '../interfaces'
import store from '../store'

const addToCart = (e:any,product:ProductModel,quantity:number,size:string,color:string) => (dispatch:Dispatch<Action>) =>{
    e.preventDefault()
    let tempCart = store.getState().cart.cart
    let tempNewCart:ProductModel[] = []
    let tempProduct:ProductModel = product
    tempProduct.size = size
    tempProduct.color = color
    tempProduct.quantity = quantity
    tempProduct.total = quantity * product.price
    tempProduct.inCart = true
    if(tempProduct.category == 'electronics'){
        delete tempProduct['color']
        delete tempProduct['size']
    }
    tempNewCart = [...tempCart,tempProduct]
    dispatch({
        type:CartActions.ADD_TO_CART,
        payload:tempNewCart
    })
}

const removeFromCart = (e:any,id:number) => (dispatch:Dispatch<Action>) =>{
    e.preventDefault()
    const tempProducts:ProductModel[] = store.getState().products.products
    const product:(ProductModel|any) = tempProducts.find(item => item.id === id)
    let index = tempProducts.indexOf(product)
    tempProducts[index].inCart = false
    let tempCart:ProductModel[] = store.getState().cart.cart
    tempCart = tempCart.filter(item => item.id !== id)
    dispatch({
        type:CartActions.REMOVE_FROM_CART,
        payload:tempCart,
        products:tempProducts
    })
}
const increaseCartProduct = (e:any,id:number) => (dispatch:Dispatch<Action>) =>{
    e.preventDefault()
    let tempCart:ProductModel[] = store.getState().cart.cart
    let product:any = tempCart.find(item => item.id === id)
    let index = tempCart.indexOf(product)
    tempCart[index].quantity += 1
    dispatch({
        type:CartActions.INCREASE_PRODUCT,
        payload:tempCart
    })
}
const decreaseCartProduct = (e:any,id:number) => (dispatch:Dispatch<Action>) =>{
    e.preventDefault()
    let tempCart:ProductModel[] = store.getState().cart.cart
    let product:any = tempCart.find(item => item.id === id)
    let index = tempCart.indexOf(product)
    if(tempCart[index].quantity > 1){
        tempCart[index].quantity -= 1
        dispatch({
            type:CartActions.DECREASE_PRODUCT,
            payload:tempCart
        })
    }
 
}
const handleColour = (e:any,id:number,color:string) => (dispatch:Dispatch<Action>) =>{
    e.preventDefault()
    let tempCart:ProductModel[] = store.getState().cart.cart
    let product:any = tempCart.find(item => item.id === id)
    let index = tempCart.indexOf(product)
    tempCart[index].color = color
    dispatch({
        type:CartActions.HANDLE_COLOR,
        payload:tempCart
    })
}

const clearCart = (e:any) => (dispatch:Dispatch<Action>) =>{
    e.preventDefault()
    dispatch({
        type:CartActions.CLEAR_CART,
        payload:[]
    })
}

const setTotal = (cart:ProductModel[],shipping:number) => (dispatch:Dispatch<Action>) =>{
    const cart = store.getState().cart.cart
    let total = 0
    if(cart.length === 0){
        total -= shipping
    }else{
        shipping = 20
    }
    cart.forEach(item =>{
        total += item.total * item.quantity
    })
    total+=shipping
    dispatch({
        type:CartActions.SET_TOTAL,
        payload:total
    })
}

export const cartActionsCreators = {
    addToCart,
    removeFromCart,
    increaseCartProduct,
    decreaseCartProduct,
    handleColour,
    clearCart,
    setTotal
}  