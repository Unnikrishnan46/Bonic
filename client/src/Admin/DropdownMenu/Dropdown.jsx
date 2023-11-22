import React from 'react'
import { useDispatch } from 'react-redux';
import { setProductMainCategory, setProductSize, setProductSubCategory, setProductSubSubCategory } from "../../Redux/AdminRedux";
import { useSelector } from "react-redux";
import "./Dropdown.css";


function Dropdown({ categories ,product}) {
    const dispatch = useDispatch()
    const adminState = useSelector((state) => state.adminStates);
    return (
        <div className='dropdown-selector'>

            <div className="main-cate">
                <label htmlFor="main-categories">Select Main Category</label>
                <span class="material-icons-sharp">category</span>
                <select name="main-category" id="" value={adminState.productMainCategory} defaultValue={product? product.productMainCategory : ""} onChange={(event) => dispatch(setProductMainCategory(event.target.value))} >
                    <option value="">Select an option</option>
                    {categories.map((value, index) => {
                        if (value.mainCate) {
                            return (
                                <option key={index} value={value.mainCate}>{value.mainCate}</option>
                            )
                        }
                        return null;
                    })}


                </select>
            </div>

            <div className="sub-cate">
                <label htmlFor="main-categories">Select Sub Category</label>
                <span class="material-icons-sharp">category</span>
                <select name="main-category" id="" value={adminState.productSubCategory} defaultValue="" onChange={(event) => dispatch(setProductSubCategory(event.target.value))}>
                    <option value="">Select an option</option>
                    {categories.map((value, index) => {
                        if (value.subCate) {
                            return (
                                <option key={index} value={value.subCate}>{value.subCate}</option>
                            )
                        }
                        return null;
                    })}
                </select>
            </div>

            <div className="sub-sub-cate">
                <label htmlFor="main-categories">Select Sub-Subcategory</label>
                <span class="material-icons-sharp">category</span>
                <select name="main-category" id="" value={adminState.productSubSubCategory} defaultValue="" onChange={(event) => dispatch(setProductSubSubCategory(event.target.value))}>
                    <option value="">Select an option</option>
                    {categories.map((value, index) => {
                        if (value.subSubCate) {
                            return (
                                <option key={index} value={value.subSubCate}>{value.subSubCate}</option>
                            )
                        }
                        return null;
                    })}
                </select>
            </div>


            <div className="prod-size">
                <label htmlFor="main-categories">Select Size</label>
                <span class="material-icons-sharp">aspect_ratio</span>
                <select name="main-category" id="" value={adminState.productSize} defaultValue="" onChange={(event) => dispatch(setProductSize(event.target.value))}>
                    <option value="">Select an option</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
            </div>


        </div>
    )
}

export default Dropdown
