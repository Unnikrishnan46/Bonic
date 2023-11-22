import React, { useState, useEffect } from 'react';
import { firestore } from "../../Firebase/Firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore"
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import { formattedDate, formattedTime } from "../Date&Time/Date&Time"
import "./AddCategory.css";



function AddCategory() {
    const [categories, setCategories] = useState([]);
    const [mainCate, setMainCate] = useState('');
    const [subCate, setSubCate] = useState('');
    const [subSubCate, setSubSubCate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCheckboxIndex, setSelectedCheckboxIndex] = useState(null);

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


    const handleCheckboxChange = (index) => {
        setSelectedCheckboxIndex(index);
    };


    const addMainCategory = async () => {
        setIsLoading(true)
        try {
            const mainCategory = { id: uuidv4(), mainCate: mainCate, date: formattedDate, time: formattedTime }
            await addDoc(collection(firestore, "tasks"), mainCategory).then(() => {
                setIsLoading(false)
                toast.success("Main Category added successfully.");
                getCategory();
                setMainCate('');
            }).catch(error => {
                setIsLoading(false)
                toast.error("Something went wrong.");
            })
        } catch (error) {
            setIsLoading(false)
            toast.error("Something went wrong.");
        }
    }

    const addSubCategory = async () => {
        setIsLoading(true);
        try {
            const subCategory = { id: uuidv4(), subCate: subCate, date: formattedDate, time: formattedTime }
            await addDoc(collection(firestore, "tasks"), subCategory).then(() => {
                setIsLoading(false)
                toast.success("Sub Category added successfully.");
                getCategory();
                setSubCate('');
            }).catch((error) => {
                setIsLoading(false)
                toast.error("Something went wrong.");
            })
        } catch (error) {
            setIsLoading(false)
            toast.error("Something went wrong.")
        }
    }
 

    const addSubSubCategory = async () => {
        setIsLoading(true);
        try {
            const subSubCategory = { id: uuidv4(), subSubCate: subSubCate, date: formattedDate, time: formattedTime }
            await addDoc(collection(firestore, "tasks"), subSubCategory).then(() => {
                setIsLoading(false)
                toast.success("Sub sub Category added successfully.");
                getCategory();
                setSubSubCate('');
            }).catch((error) => {
                setIsLoading(false)
                toast.error("Something went wrong.");
            })
        } catch (error) {
            setIsLoading(false)
            toast.error("Something went wrong.")
        }
    }


    const deleteCategory = async (id) => {
        setIsLoading(true);
        await deleteDoc(doc(firestore, "tasks", id)).then(() => {
            setSelectedCheckboxIndex(null)
            getCategory();
            setIsLoading(false);
        }).catch((error)=>{
            toast.error("Something went wrong.");
        })
    }


    if (isLoading) {
        return (
            <div className="main-content">
                <Loader />
            </div>
        )
    }


    return (
        <div className='main-content' style={{ background: "rgba(245, 247, 255, 255)" }}>
            <div className="cate-header-main">  
                    <h1>Manage Categories</h1>
                </div>
            <div className="cate-container">
                <div className="main-cate-container">
                    <h2>Main Category</h2>
                    {categories ? <ul className='main-cate-ul'>
                        {categories.map((value, index) => {
                            if (value.mainCate) {
                                return (
                                    <li key={index}><input type="checkbox" checked={selectedCheckboxIndex === index} onChange={() => handleCheckboxChange(index)} /> <div className="cate-trash"><label for="electronics">{value.mainCate}</label> {selectedCheckboxIndex === index && (<button className='cate-trash-btn' onClick={() => { deleteCategory(value.id) }}><i class="fas fa-trash"></i></button>)} </div> </li>
                                )
                            }
                            return null;
                        })}

                    </ul> : ""}

                </div>

                <div className="sub-cate-container">
                    <h2>Sub Category</h2>
                    {categories ? <ul className='sub-cate-ul'>
                        {categories.map((value, index) => {
                            if (value.subCate) {
                                return (
                                    <li key={index}><input type="checkbox" checked={selectedCheckboxIndex === index} onChange={() => handleCheckboxChange(index)} /> <div className="cate-trash"><label for="electronics">{value.subCate}</label> {selectedCheckboxIndex === index && (<button className='cate-trash-btn' onClick={() => { deleteCategory(value.id) }}><i class="fas fa-trash"></i></button>)} </div> </li>
                                )
                            }
                            return null;
                        })}


                    </ul> : ""}

                </div>

                <div className="sub-sub-cate-container">
                    <h2>Sub Sub Category</h2>
                    {categories ? <ul className='sub-cate-ul'>
                        {categories.map((value, index) => {
                            if (value.subSubCate) {
                                return (
                                    <li key={index}><input type="checkbox" checked={selectedCheckboxIndex === index} onChange={() => handleCheckboxChange(index)} /> <div className="cate-trash"><label for="electronics">{value.subSubCate}</label> {selectedCheckboxIndex === index && (<button className='cate-trash-btn' onClick={() => { deleteCategory(value.id) }}><i class="fas fa-trash"></i></button>)} </div> </li>
                                )
                            }
                            return null;
                        })}
                    </ul> : ""}

                </div>

                <div className="add-cate-input-div">

                    <label htmlFor="" className='sub-cate-label'>Add a new Category <em></em></label>
                    <div className="add-cate-super">
                        <input type="text" className='sub-cate-input' value={mainCate} placeholder='Main category' onChange={(e) => setMainCate(e.target.value)} />
                        <button className='add-sub-cate' onClick={addMainCategory}>Add Main Category</button>
                    </div>
                    <div className="add-cate-super">
                        <input type="text" className='sub-cate-input' value={subCate} placeholder='Sub category' onChange={(e) => setSubCate(e.target.value)} />
                        <button className='add-sub-cate' onClick={addSubCategory}>Add Sub Category</button>
                    </div>
                    <div className="add-cate-super">
                        <input type="text" className='sub-cate-input' value={subSubCate} placeholder='Sub-sub category' onChange={(e) => setSubSubCate(e.target.value)} />
                        <button className='add-sub-cate' onClick={addSubSubCategory}>Add Sub Sub Category</button>
                    </div>

                </div>

            </div>

            <ToastContainer />
        </div>
    )
}

export default AddCategory
