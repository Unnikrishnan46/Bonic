import React, { useState, useEffect } from 'react'
import Dropdown from '../DropdownMenu/Dropdown';
import InputTags from '../InputTags/InputTags';
import ShowCard from '../ShowCard/ShowCard';
import { useDispatch } from 'react-redux';
import { setProductName, setProductPrice, setProductColor, setProductDescription, setProductQuantity, setProductSKU, setProductDiscount ,setProductBrand} from "../../Redux/AdminRedux"
import { useSelector } from "react-redux";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import { firestore } from "../../Firebase/Firebase"
import { storage } from "../../Firebase/Firebase"
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import Lottie from "lottie-react";
import addToShop from "../LottieFiles/add-to-basket.json";
import { v4 as uuidv4 } from 'uuid';
import { formattedDate } from "../Date&Time/Date&Time";
import { formattedTime } from "../Date&Time/Date&Time";
import 'react-toastify/dist/ReactToastify.css';
import "./AddProduct.css";



function AddProduct() {
    const [isLoading, setIsLoading] = useState(false)
    const [lottie, setLottie] = useState(false)
    const [categories, setCategories] = useState([]);
    const [imageOne, setImageOne] = useState(null);
    const [imageTwo, setImageTwo] = useState(null);
    const [imageThree, setImageThree] = useState(null);
    const [imageFour, setImageFour] = useState(null);
    const [please1, setPlease1] = useState(null)
    const [please2, setPlease2] = useState(null)
    const [please3, setPlease3] = useState(null)
    const [please4, setPlease4] = useState(null)



    const dispatch = useDispatch()
    const adminState = useSelector((state) => state.adminStates);


    const handleImageOne = (event) => {
        const file = event.target.files[0];
        setPlease1(file)
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setImageOne(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    };

    const handleImageTwo = (event) => {
        const file = event.target.files[0];
        setPlease2(file)
        // dispatch(setImageFileTwo(file));
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setImageTwo(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    };

    const handleImageThree = (event) => {
        const file = event.target.files[0];
        setPlease3(file)
        // dispatch(setImageFileThree(file));
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setImageThree(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    };

    const handleImageFour = (event) => {
        const file = event.target.files[0];
        setPlease4(file)
        // dispatch(setImageFileFour(file));
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setImageFour(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    };

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




    async function uploadProduct() {
        setIsLoading(true);
        if (!adminState.productName || !adminState.productPrice || !adminState.productDescription || !adminState.productMainCategory || !adminState.productSubCategory || !adminState.productSubSubCategory || !adminState.productSKU || !adminState.productQuantity || !adminState.productDiscount || !adminState.productTags || !adminState.productColor || !adminState.productSize || !adminState.productBrand || !please1 || !please2 || !please3 || !please4) {
            toast.warning("Please fill all fields");
            setIsLoading(false)
            return null;
        } else {
            const newProductUUID = uuidv4();
            const newProduct = {
                productId: newProductUUID,
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
                visibility:true,
                dateAdded: formattedDate,
                timeAdded: formattedTime,

            };
            const imageUUID = newProductUUID;

            const uploadImageOne = async (please1) => {
                return new Promise((resolve, reject) => {
                    if (please1) {
                        const storageRef = ref(storage, `images/${imageUUID}-img-1`);
                        const uploadTask = uploadBytesResumable(storageRef, please1);

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

            const uploadImageTwo = async (please2) => {
                return new Promise((resolve, reject) => {
                    if (please1) {
                        const storageRef = ref(storage, `images/${imageUUID}-img-2`);
                        const uploadTask = uploadBytesResumable(storageRef, please2);

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

            const uploadImageThree = async (please3) => {
                return new Promise((resolve, reject) => {
                    if (please1) {
                        const storageRef = ref(storage, `images/${imageUUID}-img-3`);
                        const uploadTask = uploadBytesResumable(storageRef, please3);

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

            const uploadImageFour = async (please4) => {
                return new Promise((resolve, reject) => {
                    console.log("ghvhhj")
                    if (please1) {
                        const storageRef = ref(storage, `images/${imageUUID}-img-4`);
                        const uploadTask = uploadBytesResumable(storageRef, please4);

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

            const URLone = await uploadImageOne(please1);
            const URLtwo = await uploadImageTwo(please2);
            const URLThree = await uploadImageThree(please3);
            const URLFour = await uploadImageFour(please4);

            newProduct.imageOne = URLone;
            newProduct.imageTwo = URLtwo;
            newProduct.imageThree = URLThree;
            newProduct.imageFour = URLFour;

            const docRef = collection(firestore, "test_data");
            console.log("Product: ", newProduct);

            try {
                await addDoc(docRef, newProduct);
                console.log("Document successfully uploaded");
                setIsLoading(false);
                setLottie(true);
            } catch (error) {
                toast.error("Something went wrong.");
                setIsLoading(false);
                console.error("Error uploading document: ", error);
            }
        }
    }

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
                <h1>Add Product</h1>
            </div>
            <div className="add-prod-content">
                <div className="add-prod-form">

                    <div className="form-controller">
                        <label htmlFor="">Product name</label>
                        <span class="material-icons-sharp">drive_file_rename_outline</span>
                        <input type="text" placeholder="" onChange={(event) => dispatch(setProductName(event.target.value))} />
                    </div>

                    <div className="form-controller">
                        <label htmlFor="">Product price</label>
                        <span class="material-icons-sharp">price_change</span>
                        <input type="text" placeholder="" onChange={(event) => dispatch(setProductPrice(event.target.value))} />
                    </div>

                    <div className="form-controller">
                        <label htmlFor="">Product Description</label>
                        <span class="material-icons-sharp">description</span>
                        <input type="text" placeholder="" onChange={(event) => dispatch(setProductDescription(event.target.value))} />
                    </div>

                    <div className="form-controller">
                        <label htmlFor="">Product Discount</label>
                        <span class="material-icons-sharp">discount</span>
                        <input type="text" placeholder="" onChange={(event) => dispatch(setProductDiscount(event.target.value))} />
                    </div>

                    <Dropdown categories={categories} />

                    <div className="form-controller">
                        <label htmlFor="">SKU (Stock Keeping Unit)</label>
                        <span class="material-icons-sharp">inventory_2</span>
                        <input type="text" placeholder="" onChange={(event) => dispatch(setProductSKU(event.target.value))} />
                    </div>

                    <div className="form-controller">
                        <label htmlFor="">Quantity (The initial quantity of the product in stock)</label>
                        <span class="material-icons-sharp">production_quantity_limits</span>
                        <input type="text" placeholder="" onChange={(event) => dispatch(setProductQuantity(event.target.value))} />
                    </div>

                    <div className="form-controller">
                        <label htmlFor="">Colour(use comma for adding color)</label>
                        <span class="material-icons-sharp">palette</span>
                        <input type="text" id="color" name="color" onChange={(event) => dispatch(setProductColor(event.target.value))} />
                    </div>

                    
                    <div className="form-controller">
                        <label htmlFor="">Brand</label>
                        <span class="material-icons-sharp">branding_watermark</span>
                        <input type="text" id="color" name="color" onChange={(event) => dispatch(setProductBrand(event.target.value))} />
                    </div>

                    <InputTags />

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
                            {/* <h3>{previewUrl ? "Image Uploaded" : "Upload Product Image"}</h3> */}
                            <input id="fileOne" type="file" hidden onChange={handleImageOne}></input>
                        </div>
                        <div className="img-inp-main">
                            <label htmlFor="fileTwo">
                                <div className="img-inp-border">
                                    {imageTwo ? <img src={imageTwo} alt="" /> :
                                        <span class="material-icons-sharp">cloud_upload</span>}
                                </div>
                            </label>
                            {/* <h3>{previewUrl ? "Image Uploaded" : "Upload Product Image"}</h3> */}
                            <input id="fileTwo" type="file" hidden onChange={handleImageTwo}></input>
                        </div>
                        <div className="img-inp-main">
                            <label htmlFor="fileThree">
                                <div className="img-inp-border">
                                    {imageThree ? <img src={imageThree} alt="" /> :
                                        <span class="material-icons-sharp">cloud_upload</span>}
                                </div>
                            </label>
                            {/* <h3>{previewUrl ? "Image Uploaded" : "Upload Product Image"}</h3> */}
                            <input id="fileThree" type="file" hidden onChange={handleImageThree}></input>
                        </div>
                        <div className="img-inp-main">
                            <label htmlFor="fileFour">
                                <div className="img-inp-border">
                                    {imageFour ? <img src={imageFour} alt="" /> :
                                        <span class="material-icons-sharp">cloud_upload</span>}
                                </div>
                            </label>
                            {/* <h3>{previewUrl ? "Image Uploaded" : "Upload Product Image"}</h3> */}
                            <input id="fileFour" type="file" hidden onChange={handleImageFour}></input>
                        </div>
                    </div>
                    <div className="prev-card">
                        <h3>Product Card Preview</h3>
                        <ShowCard imageOne={imageOne} />
                    </div>
                    <button class="cssbuttons-io-button" onClick={uploadProduct}> Add Product
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

export default AddProduct;

