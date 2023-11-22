import { useState, useEffect } from 'react';
import Header from './Components/Header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pages from './Pages/Pages';
import Cart from './Components/Cart/Cart';
import { auth } from "../src/Firebase/Firebase"
import Dashboard from './Admin/Dashboard/Dashboard';
import AdminMain from './Admin/AdminMain/AdminMain';
import AddProduct from './Admin/AddProduct/AddProduct';
import AllProducts from './Admin/AllProducts/AllProducts';
import AddCategory from './Admin/AddCategory/AddCategory';
import EditProduct from './Admin/EditProduct/EditProduct';
import { collection, getDocs, where, query, updateDoc, doc, addDoc } from "firebase/firestore"
import { firestore } from '../src/Firebase/Firebase';
import SingleProductPage from './Components/SingleProductPage/SingleProductPage';
import { ToastContainer, toast } from 'react-toastify';
import { setCartItems, setCartCount, setIncrement } from './Redux/Cart';
import {setWishlistItem,setWishlistCount} from "./Redux/Wishlist"
import { useDispatch ,useSelector} from 'react-redux';
import { setUsersData } from './Redux/UserData';
import './App.css';
import Checkout from './Components/CheckOut/Checkout';
import OrderSuccessPage from './Components/OrderSuccessPage/OrderSuccessPage';
import Orders from './Components/Orders/Orders';
import OrderDetailPage from './Components/OrderDetailPage/OrderDetailPage';
import Wishlist from './Components/Wishlist/Wishlist';
import {ToastOptions} from "./Components/ToastOptions/ToastOptions"
import ShopAllProducts from './Components/ShopAllProducts/ShopAllProducts';

function App() {
  const [userData, setUserData] = useState(undefined);
  const [adminRoute, setAdminRoute] = useState(false)
  const [products, setProducts] = useState(null);

  const dispatch = useDispatch()
  // const cartState = useSelector((state)=>state.cartStates);
  const WishlistState = useSelector((state) => state.wishlistState);

  useEffect(() => {
    if (window.location.pathname.startsWith('/admin')) {
      setAdminRoute(true)
    } else {
      setAdminRoute(false)
    }
  }, []);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.emailVerified) {

        dispatch(setUsersData(user));
        setUserData(user);
      }
    });
    return () => unsubscribe();
  }, []);


  const getUserCart = async () => {
    if (userData) {
      const q = query(collection(firestore, "cart"), where("cartId", "==", userData.uid));
      await getDocs(q).then((querySnapshot) => {
        if (querySnapshot.docs[0].data() !== undefined) {
          const cartData = querySnapshot.docs[0].data();
          const cartId = querySnapshot.docs[0].id;
          dispatch(setCartItems({ ...cartData, id: cartId }));
          const cart = [...querySnapshot.docs[0].data().product]
          dispatch(setCartCount(cart.length))
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }



  const getUserWishlist = async () => {
    if (userData) {
      const q = query(collection(firestore, "wishlist"), where("wishlistId", "==", userData.uid));
      await getDocs(q).then((querySnapshot) => {
        if (querySnapshot.docs[0].data() !== undefined) {
          const wishlistData = querySnapshot.docs[0].data();
          const wishlistId = querySnapshot.docs[0].id;
          dispatch(setWishlistItem({ ...wishlistData, id: wishlistId }));
          const wishlist = [...querySnapshot.docs[0].data().product]
          dispatch(setWishlistCount(wishlist.length))
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }


  useEffect(() => {
    getUserCart()
    getUserWishlist()
  }, [userData])


  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        setUserData(undefined);
        dispatch(setCartItems(""));
        dispatch(setCartCount(""))
      })
      .catch((error) => {
        console.log('Sign out error:', error);
      });
  };

  const getAllProducts = async () => {
    const q = query(collection(firestore, "test_data"), where("visibility", "==", true));
    await getDocs(q).then((querySnapshot) => {
      const datas = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProducts(datas);
    }).catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  const addToCart = async (product) => {
    if (userData) {
      const newCartData = {
        cartId: userData.uid,
        userId: userData.uid,
        product: [product]
      }
      const q = query(collection(firestore, "cart"), where("cartId", "==", userData.uid));
      await getDocs(q).then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          const docRef = doc(firestore, "cart", querySnapshot.docs[0].id);
          const existingProductArray = querySnapshot.docs[0].data().product;
          const updatedProductArray = [...existingProductArray, product];
          updateDoc(docRef, { product: updatedProductArray })
            .then(() => {
              toast.success("Product added to the cart");
              dispatch(setIncrement())
            })
            .catch((error) => {
              console.log(error);
              toast.error("Something went wrong");
            });
        } else {
          addDoc(collection(firestore, "cart"), newCartData).then(() => {
            toast.success("Product added to the cart");
            dispatch(setIncrement())
          }).catch((error) => {
            console.log(error);
            toast.error("Something went wrong")
          })
        }
      })
    }
  };

  const addToWishlist = async (product) => {
    try {
      if (userData) {
      const newWishlistData = {
        wishlistId: userData.uid,
        userId: userData.uid,
        product: [product]
      }
      const q = query(collection(firestore, "wishlist"), where("wishlistId", "==", userData.uid));
      await getDocs(q).then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          const docRef = doc(firestore, "wishlist", querySnapshot.docs[0].id);
          const existingProductArray = querySnapshot.docs[0].data().product;
          const productExists = existingProductArray.find((p) => p.productId === product.productId);
          if (!productExists) {
            const updatedProductArray = [...existingProductArray, product];
            updateDoc(docRef, { product: updatedProductArray })
              .then(() => {
                toast.success("Product added to the wishlist",ToastOptions);
              })
              .catch((error) => {
                console.log(error);
                toast.error("Something went wrong",ToastOptions);
              });
          } else {
            toast.info("Product is already in wishlist",ToastOptions);
          }
        } else {
          addDoc(collection(firestore, "wishlist"), newWishlistData).then(() => {
            toast.success("Product added to the Wishlist",ToastOptions);
          }).catch((error) => {
            console.log(error);
            toast.error("Something went wrong",ToastOptions)
          })
        }
      })
    }
    } catch (error) {
      console.log(error)
    }
    finally{
      getUserWishlist()
    }
  }


  const removeWishlistItem = async (product) => {
    const wishlistRef = doc(firestore, "wishlist", WishlistState.wishlistItems.id);
    var filtered = WishlistState.wishlistItems.product.filter(function (value, index, arr) {
      return value.productId !== product.productId;
    });
    await updateDoc(wishlistRef, { product: filtered }).then(() => {
      getUserWishlist()
    }).catch((error) => {
      console.log(error)
    })
  }


  return (
    <>
      <Router>
        {adminRoute ? <Dashboard /> : <Header userData={userData} handleSignOut={handleSignOut} />}
        <Routes>
          <Route path='/' element={<Pages products={products} addToCart={addToCart} userData={userData} addToWishlist={addToWishlist} removeWishlistItem={removeWishlistItem}/>} />
          <Route path='/cart' element={<Cart getUserCart={getUserCart} />} />
          <Route path='/admin/dashboard' element={<AdminMain />} />
          <Route path='/admin/add-product' element={<AddProduct />} />
          <Route path='/admin/all-products' element={<AllProducts />} />
          <Route path='/admin/add-category' element={<AddCategory />} />
          <Route path='/admin/edit-product/:id' element={<EditProduct />} />
          <Route path='/v1/productPage/:id' element={<SingleProductPage addToCart={addToCart} addToWishlist={addToWishlist} removeWishlistItem={removeWishlistItem}/>} />
          <Route path='/v1/checkout' element={<Checkout />} />
          <Route path='/v1/orderSuccess' element={<OrderSuccessPage />} />
          <Route path='/v1/orders' element={<Orders />} />
          <Route path='/v1/order/:id' element={<OrderDetailPage />} />
          <Route path='/v1/wishlist' element={<Wishlist getUserWishlist={getUserWishlist}/>} />
          <Route path='/v1/all-products' element={<ShopAllProducts products={products} addToWishlist={addToWishlist} removeWishlistItem={removeWishlistItem}/>}/>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
