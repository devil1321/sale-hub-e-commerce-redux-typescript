import React,{ useState , useEffect} from 'react'
import { Product as ProductModel }  from '../../APIController/interfaces'
import { useSelector,useDispatch } from 'react-redux'
import { productsActionsCreators } from '../../APIController/action-creators/productsActions'
import {bindActionCreators} from 'redux'
import CarouselClothes from '../../components/CarouselClothes'
import { State } from '../../APIController/reducers'
import Product from '../../components/Product'
import ProductsInnerHero from '../../components/ProductsInnerHero'
const Electronics = () => {
    const dispatch = useDispatch()
    const {getProducts} = bindActionCreators(productsActionsCreators,dispatch)
    let { products }:{ products:ProductModel[] } = useSelector((state:State) => state.products)
    products = products.filter(product => product.category === 'men\'s clothing')
    const [slides,setSlides] = useState<string[]>([
        'mens-1.jpg',
        'mens-2.jpg',
        'mens-3.jpg'
    ])
    useEffect(()=>{
        if(products.length === 0){
            getProducts()        
        }
    },[])
    return (
        <div className="mens">
            <CarouselClothes slides={slides} fix />
            <div className="mens__content">
                <ProductsInnerHero products={products.slice(0,3)}/>
                <h2 className="title-clothes">Explore Men Clothes</h2>
                <div className="container-inner">
                    {products.map((product:ProductModel,index:number) => <Product key={index} product={product} />)}
                </div>
            </div>
        </div>
    )
}

export default Electronics
