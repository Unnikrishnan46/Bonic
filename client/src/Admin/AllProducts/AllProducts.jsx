import React,{useEffect, useState} from 'react'
import { firestore } from "../../Firebase/Firebase";
import { collection, getDocs } from "firebase/firestore"
import ActionButtons from '../ActionButtons/ActionButtons';
import Loader from '../Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import "./AllProducts.css";



function AllProducts() {
    const [allProducts,setAllProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const getAllProducts = async()=>{
        setIsLoading(true)
        await getDocs(collection(firestore,"test_data")).then((querySnapshot)=>{
            const newData = querySnapshot.docs.map((doc)=>({...doc.data(),id:doc.id}));
            setAllProducts(newData);
            setIsLoading(false)
        }).catch((error)=>{
            toast.error("Something went wrong")
            console.log(error)
            setIsLoading(false)
        })
    }

    useEffect(()=>{
        getAllProducts()
    },[])

    if (isLoading) {
        return (
            <div className="main-content">
                <Loader content="Loading"/>
            </div>
        )
    }

    return (
        <div className='main-content' style={{background:"rgba(245, 247, 255, 255)"}}>
            <div className='all-prod-main'>
                <div className="all-prod-header">
                    <h2>All Products</h2>
                    <div class="all-prod-search">
                        <div className="for-search-icon">
                            <span class="material-icons-sharp">search</span>
                            <input placeholder="Search" type="search" class="all-prod-search-input" />
                        </div>
                        <div className="all-prod-search-bar-icons">
                            <span class="material-icons-sharp">notifications</span>
                            <span class="material-icons-sharp">error</span>
                        </div>
                    </div>
                </div>

                <div className="all-prod-display">
                    <div className="all-prod-sub-table">
                        <table className='all-prod-table'>
                            <thead>
                                <th>Sl No.</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Stock</th>
                                <th>Price</th>
                                <th>Main Category</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </thead>
                            {allProducts ? <tbody>
                                {allProducts.map((product,index)=>{
                                    return (
                                    <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className='img-cell'><img className='cell-img' src={product.imageOne} alt="" /></td>
                                    <td>{product.productName}</td>
                                    {product.productSKU<1 ? <td style={{color:"red"}}>Out of stock</td> : <td>In stock({product.productSKU})</td> }
                                    <td>${product.productPrice}.00</td>
                                    <td>{product.productMainCategory}</td>
                                    <td>{product.dateAdded}</td>
                                    <td><ActionButtons productId={product.id} product={product} getAllProducts={getAllProducts}/></td>
                                </tr>
                                    )
                                })}
                                
                    
                            </tbody> : "" }
                        </table>
                    </div>

                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AllProducts
