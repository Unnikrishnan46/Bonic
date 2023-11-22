import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProductName, setProductPrice, setProductColor, setProductDescription, setProductQuantity, setProductSKU, setProductDiscount, setProductMainCategory, setProductSize, setProductSubCategory, setProductSubSubCategory, setProductTags ,setProductBrand } from "../../Redux/AdminRedux"
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { collection, getDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from "../../Firebase/Firebase";
import { storage } from "../../Firebase/Firebase";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import Loader from '../Loader/Loader';
import Lottie from "lottie-react";
import addToShop from "../LottieFiles/add-to-basket.json";
import { formattedDate } from "../Date&Time/Date&Time";
import { formattedTime } from "../Date&Time/Date&Time";
import { ToastContainer, toast } from 'react-toastify';
import Dropdown from '../DropdownMenu/Dropdown';
import InputTags from '../InputTags/InputTags';
import ShowCard from '../ShowCard/ShowCard';
import 'react-toastify/dist/ReactToastify.css';
import "./EditProduct.css";


function EditProduct() {
  const { id } = useParams()
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [imageThree, setImageThree] = useState(null);
  const [imageFour, setImageFour] = useState(null);
  const [imageFileOne, setImageFileOne] = useState(null);
  const [imageFileTwo, setImageFileTwo] = useState(null);
  const [imageFileThree, setImageFileThree] = useState(null);
  const [imageFileFour, setImageFileFour] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [lottie, setLottie] = useState(false);
  const [productId,setProductId] = useState(null);
  const dispatch = useDispatch();
  const adminState = useSelector((state) => state.adminStates);
  const extractedId = id.slice(3);






  const getProduct = async () => {
    const docRef = doc(firestore, "test_data", extractedId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProduct(docSnap.data())
    } else {
      console.log("no data found")
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  const getCategory = async () => {
    await getDocs(collection(firestore, "tasks")).then((querySnapshot) => {
      const newData = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
      setCategories(newData);
    }).catch((error) => {
      toast.error("Something went wrong.");
    })
  }

  useEffect(() => {
    getCategory()
  }, []);

  useEffect(() => {
    if (lottie) {
        setTimeout(() => {
            setLottie(false);
        }, 3000);
    }
}, [lottie]);


  useEffect(() => {
    if (product) {
      setProductId(product.productId)
      dispatch(setProductName(product.productName));
      dispatch(setProductDescription(product.productDescription));
      dispatch(setProductColor(product.productColor));
      dispatch(setProductPrice(product.productPrice));
      dispatch(setProductMainCategory(product.productMainCategory));
      dispatch(setProductSubCategory(product.productSubCategory));
      dispatch(setProductSubSubCategory(product.productSubSubCategory));
      dispatch(setProductSize(product.productSize));
      dispatch(setProductQuantity(product.productQuantity));
      dispatch(setProductDiscount(product.productDiscount));
      dispatch(setProductSKU(product.productSKU));
      dispatch(setProductTags(product.productTags));
      dispatch(setProductBrand(product.productBrand));
      setImageOne(product.imageOne);
      setImageTwo(product.imageTwo);
      setImageThree(product.imageThree);
      setImageFour(product.imageFour);
    }
  }, [product])


  async function updateProduct() {
    setIsLoading(true);
    const docId = extractedId
    const updatedFields = {
      productName: adminState.productName,
      productPrice: adminState.productPrice,
      productDescription: adminState.productDescription,
      productMainCategory: adminState.productMainCategory,
      productSubCategory: adminState.productSubCategory,
      productSubSubCategory: adminState.productSubSubCategory,
      productSize: adminState.productSize,
      productSKU: adminState.productSKU,
      productBrand: adminState.productBrand,
      productQuantity: adminState.productQuantity,
      productColor: adminState.productColor,
      productDiscount: adminState.productDiscount,
      productTags: adminState.productTags,
      dateAdded: formattedDate,
      timeAdded: formattedTime,
    };



    const uploadImageOne = async (imageFileOne) => {
      return new Promise((resolve, reject) => {
        if (imageFileOne) {
          const storageRef = ref(storage, `images/${productId}-img-1`);
          const uploadTask = uploadBytesResumable(storageRef, imageFileOne);

          uploadTask.on(
            "state_changed",
            (snapshot) => { },
            (error) => {
              toast.error("Something went wrong.");
              setIsLoading(false);
              console.error("Error uploading file: ", error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL)
            }
          );
        }
      })
    }

    const uploadImageTwo = async (imageFileTwo) => {
      return new Promise((resolve, reject) => {
        if (imageFileTwo) {
          const storageRef = ref(storage, `images/${productId}-img-2`);
          const uploadTask = uploadBytesResumable(storageRef, imageFileTwo);

          uploadTask.on(
            "state_changed",
            (snapshot) => { },
            (error) => {
              console.error("Error uploading file: ", error);
              toast.error("Something went wrong.");
              setIsLoading(false);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL)
            }
          );
        }
      })
    }

    const uploadImageThree = async (imageFileThree) => {
      return new Promise((resolve, reject) => {
        if (imageFileThree) {
          const storageRef = ref(storage, `images/${productId}-img-3`);
          const uploadTask = uploadBytesResumable(storageRef, imageFileThree);

          uploadTask.on(
            "state_changed",
            (snapshot) => { },
            (error) => {
              toast.error("Something went wrong.");
              setIsLoading(false);
              console.error("Error uploading file: ", error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL)
            }
          );
        }
      })
    }

    const uploadImageFour = async (imageFileFour) => {
      return new Promise((resolve, reject) => {
        console.log("ghvhhj")
        if (imageFileFour) {
          const storageRef = ref(storage, `images/${productId}-img-4`);
          const uploadTask = uploadBytesResumable(storageRef, imageFileFour);

          uploadTask.on(
            "state_changed",
            (snapshot) => { },
            (error) => {
              toast.error("Something went wrong.");
              setIsLoading(false);
              console.error("Error uploading file: ", error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL)
            }
          );
        }
      })
    }


    const URLone = imageFileOne ? await uploadImageOne(imageFileOne) : imageOne;
    const URLtwo = imageFileTwo ? await uploadImageTwo(imageFileTwo) : imageTwo;
    const URLThree = imageFileThree ? await uploadImageThree(imageFileThree) : imageThree;
    const URLFour = imageFileFour ? await uploadImageFour(imageFileFour) : imageFour;


    updatedFields.imageOne = URLone;
    updatedFields.imageTwo = URLtwo;
    updatedFields.imageThree = URLThree;
    updatedFields.imageFour = URLFour;


    const docRef = doc(firestore, "test_data", docId);

    try {
      updateDoc(docRef, updatedFields).then(docRef => {
        setIsLoading(false);
        setLottie(true);
      }).catch((error) => {
        console.log(error)
        setIsLoading(false);
      })
    } catch (error) {
      toast.error("Something went wrong.");
      setIsLoading(false);
      console.error("Error uploading document: ", error);
    }


  }




  const handleImageOne = (event) => {
    const file = event.target.files[0];
    setImageFileOne(file)
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImageOne(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const handleImageTwo = (event) => {
    const file = event.target.files[0];
    setImageFileTwo(file)
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImageTwo(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const handleImageThree = (event) => {
    const file = event.target.files[0];
    setImageFileThree(file)
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImageThree(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const handleImageFour = (event) => {
    const file = event.target.files[0];
    setImageFileFour(file)
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImageFour(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  if (isLoading) {
    return (
      <div className="main-content">
        <Loader content="Uploading"/>
      </div>
    )
  }

  if (lottie) {
    return (
      <div className="main-content" style={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="lottie" style={{ height: "25rem", width: "25rem", display: "flex", justifyContent: "center", alignItems: "center", marginRight: "15rem" }}>
          <Lottie animationData={addToShop} loop={false} />
        </div>
      </div>
    )
  }


  return (
    <div className='main-content'>
      <div className="add-prod-header">
        <span class="material-icons-sharp">add_shopping_cart</span>
        <h1>Edit Product</h1>
      </div>
      <div className="add-prod-content">
        <div className="add-prod-form">

          <div className="form-controller">
            <label htmlFor="">Product name</label>
            <span class="material-icons-sharp">drive_file_rename_outline</span>
            {product ? <input type="text" placeholder="" value={adminState.productName} onChange={(event) => dispatch(setProductName(event.target.value))} /> : ""}
          </div>

          <div className="form-controller">
            <label htmlFor="">Product price</label>
            <span class="material-icons-sharp">price_change</span>
            <input type="text" placeholder="" value={adminState.productPrice} onChange={(event) => dispatch(setProductPrice(event.target.value))} />
          </div>

          <div className="form-controller">
            <label htmlFor="">Product Description</label>
            <span class="material-icons-sharp">description</span>
            <input type="text" placeholder="" value={adminState.productDescription} onChange={(event) => dispatch(setProductDescription(event.target.value))} />
          </div>

          <div className="form-controller">
            <label htmlFor="">Product Discount</label>
            <span class="material-icons-sharp">discount</span>
            <input type="text" placeholder="" value={adminState.productDiscount} onChange={(event) => dispatch(setProductDiscount(event.target.value))} />
          </div>

          <Dropdown categories={categories} product={product} />

          <div className="form-controller">
            <label htmlFor="">SKU (Stock Keeping Unit)</label>
            <span class="material-icons-sharp">inventory_2</span>
            <input type="text" placeholder="" value={adminState.productSKU} onChange={(event) => dispatch(setProductSKU(event.target.value))} />
          </div>

          <div className="form-controller">
            <label htmlFor="">Quantity (The initial quantity of the product in stock)</label>
            <span class="material-icons-sharp">production_quantity_limits</span>
            <input type="text" placeholder="" value={adminState.productQuantity} onChange={(event) => dispatch(setProductQuantity(event.target.value))} />
          </div>

          <div className="form-controller">
            <label htmlFor="">Colour(use comma for adding color)</label>
            <span class="material-icons-sharp">palette</span>
            <input type="text" id="color" name="color" value={adminState.productColor} onChange={(event) => dispatch(setProductColor(event.target.value))} />
          </div>

          
          <div className="form-controller">
            <label htmlFor="">Brand</label>
            <span class="material-icons-sharp">branding_watermark</span>
            <input type="text" id="color" name="color" value={adminState.productBrand} onChange={(event) => dispatch(setProductBrand(event.target.value))} />
          </div>

          <InputTags product={product} />

        </div>

        <div className="add-prod-display">
          <div className="main-div-img-inp">
            <div className="img-inp-main">
              <label htmlFor="fileOne">
                <div className="img-inp-border">
                  {imageOne ? <img src={imageOne} alt="" /> :
                    <span class="material-icons-sharp">cloud_upload</span>}
                </div>
              </label>
              <input id="fileOne" type="file" hidden onChange={handleImageOne}></input>
            </div>
            <div className="img-inp-main">
              <label htmlFor="fileTwo">
                <div className="img-inp-border">
                  {imageTwo ? <img src={imageTwo} alt="" /> :
                    <span class="material-icons-sharp">cloud_upload</span>}
                </div>
              </label>

              <input id="fileTwo" type="file" hidden onChange={handleImageTwo}></input>
            </div>
            <div className="img-inp-main">
              <label htmlFor="fileThree">
                <div className="img-inp-border">
                  {imageThree ? <img src={imageThree} alt="" /> :
                    <span class="material-icons-sharp">cloud_upload</span>}
                </div>
              </label>
              <input id="fileThree" type="file" hidden onChange={handleImageThree}></input>
            </div>
            <div className="img-inp-main">
              <label htmlFor="fileFour">
                <div className="img-inp-border">
                  {imageFour ? <img src={imageFour} alt="" /> :
                    <span class="material-icons-sharp">cloud_upload</span>}
                </div>
              </label>
              <input id="fileFour" type="file" hidden onChange={handleImageFour}></input>
            </div>
          </div>
          <div className="prev-card">
            <h3>Product Card Preview</h3>
            <ShowCard imageOne={imageOne} />
          </div>
          <button class="cssbuttons-io-button" onClick={updateProduct}> Update Product
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
            </div>
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default EditProduct
