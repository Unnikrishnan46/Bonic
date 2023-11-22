import React, { useState } from 'react'
import { TagsInput } from "react-tag-input-component";
import { setProductTags } from "../../Redux/AdminRedux";
import { useDispatch } from 'react-redux';
import "./InputTag.css";

function InputTags({ product }) {
    const [selected, setSelected] = useState([]);
    const dispatch = useDispatch()

    const handleChange = (tags) => {
        setSelected(tags)
        dispatch(setProductTags(tags))
    }




    return (
        <div className='input-tag'>
            <TagsInput
                value={product ? product.productTags : selected}
                onChange={handleChange}
                name="fruits"
                placeHolder="Enter tags"
            />
        </div>
    )
}

export default InputTags
