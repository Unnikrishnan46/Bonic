import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { firestore } from '../../Firebase/Firebase';
import { getDoc, doc, collection, query, where, getDocs } from "firebase/firestore";
import MainPageLoader from '../Loader/MainPageLoader';
import { useSelector, useDispatch} from 'react-redux';
import {loginModalTrue} from "../../Redux/switchPages"
import "./SingleProductPage.css";
import SimilarProducts from '../SimilarProducts/SimilarProducts';



function SingleProductPage({addToCart,addToWishlist,removeWishlistItem}) {
    const { id } = useParams()
    const productId = id.slice(3)
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [displayProduct, setDisplayProduct] = useState(null)
    const [similarProducts, setSimilarProducts] = useState(null)
    const [productDocId,setProductDocId] = useState(null)

    const dispatch = useDispatch()
    const userState = useSelector((state) => state.userState);

    const getProduct = async () => {
        try {
            if (productId != null) {
                const docRef = doc(firestore, "test_data", productId);
                const prod = await getDoc(docRef)
                const queryRef = query(collection(firestore, "test_data"), where("productSubCategory", "==", prod.data().productSubCategory));
                const querySnapshot = await getDocs(queryRef);
                const datas = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setSimilarProducts(datas)
                setProduct(prod.data());
                setProductDocId(prod.id)
                setIsLoading(false);
                setDisplayProduct(prod.data().imageOne)
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }


    useEffect(() => {
        getProduct();
    }, [])

    function handleImageClick(image) {
        setDisplayProduct(image)
    }


    const handlePlaceOrder = (prod) => {
        console.log(prod)
        if (userState.userData) {
          var cart = false;
          var productId = prod;
          var url = "/v1/checkout";
    
          url += "?cart=" + cart + "&productId=" + productId;
          window.location.href = url
        } else {
          dispatch(loginModalTrue());
        }
      }

    if (isLoading) {
        return (
            <MainPageLoader />
        )
    }

    return (
        <div className='product-detail-main-container'>
            <div className="product-detail-left">
                <div className="product-detail-image-container">
                    <div className="product-detail-main-image">
                        {product ? <img className='prod-main-image' src={displayProduct} alt="" /> : ""}
                    </div>
                    <div className="product-detail-image-row">
                        <div style={{ border: displayProduct === product.imageOne ? "2px solid salmon" : "" }} className="product-detail-image-one" onClick={() => { handleImageClick(product.imageOne) }}><img src={product.imageOne} alt="" /></div>
                        <div style={{ border: displayProduct === product.imageTwo ? "2px solid salmon" : "" }} className="product-detail-image-one" onClick={() => { handleImageClick(product.imageTwo) }}><img src={product.imageTwo} alt="" /></div>
                        <div style={{ border: displayProduct === product.imageThree ? "2px solid salmon" : "" }} className="product-detail-image-one" onClick={() => { handleImageClick(product.imageThree) }}><img src={product.imageThree} alt="" /></div>
                        <div style={{ border: displayProduct === product.imageFour ? "2px solid salmon" : "" }} className="product-detail-image-one" onClick={() => { handleImageClick(product.imageFour) }}><img src={product.imageFour} alt="" /></div>
                    </div>
                </div>
            </div>
            <div className="product-detail-right">
                <div className="product-detail-name-container">
                    <b>{product.productBrand}</b>
                    <h2 className='product-detail-name'>{product.productName}</h2>
                </div>

                <div className="product-detail-discount-container">
                    <span>%{product.productDiscount} off</span>
                </div>
                <div className="product-details-price-container">
                    <b>₹{product.productPrice - Math.round(product.productDiscount / 100 * product.productPrice)}.00</b>
                    <h6>₹{product.productPrice}.00</h6>
                </div>
                <div className="product-details-btns">
                    <button className='product-details-add-to-cart-btn' onClick={()=>addToCart(product)}>Add to Cart</button>
                    <button className='product-details-buy-now-btn' onClick={() => { handlePlaceOrder(productDocId) }}>Buy Now</button>
                </div>
                <div className="about-product-details-container">
                    <b>About this item</b>
                    <p>{product.productDescription}</p>
                </div>
            </div>
            <SimilarProducts similarProducts={similarProducts} addToCart={addToCart} addToWishlist={addToWishlist} removeWishlistItem={removeWishlistItem}/>
        </div>
    )
}

export default SingleProductPage
