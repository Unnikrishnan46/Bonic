import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { setCheckoutName, setCheckoutMobile, setCheckoutPincode, setCheckoutLocality, setCheckoutAddress, setCheckoutCityDistrictTown, setCheckoutState, setCheckoutLandmark, setCheckoutAlternateMobile ,setEditAddressForm} from "../../Redux/CheckoutRedux"
import { updateDoc, doc, collection, where, getDocs ,query} from 'firebase/firestore';
import { firestore } from "../../Firebase/Firebase";
import "./EditAddress.css";

function EditAddress({ addressData }) {
    const [name, setName] = useState("")
    const dispatch = useDispatch()
    const checkoutData = useSelector((state) => state.CheckoutState)
    const user = useSelector((state) => state.userState)

    useEffect(() => {
        if (addressData) {
            dispatch(setCheckoutName(checkoutData.userCheckoutData.addressOne.checkoutName))
            dispatch(setCheckoutMobile(checkoutData.userCheckoutData.addressOne.checkoutMobile))
            dispatch(setCheckoutPincode(checkoutData.userCheckoutData.addressOne.checkoutPincode))
            dispatch(setCheckoutState(checkoutData.userCheckoutData.addressOne.checkoutState))
            dispatch(setCheckoutLocality(checkoutData.userCheckoutData.addressOne.checkoutLocality))
            dispatch(setCheckoutAlternateMobile(checkoutData.userCheckoutData.addressOne.checkoutAlternateMobile))
            dispatch(setCheckoutCityDistrictTown(checkoutData.userCheckoutData.addressOne.checkoutCityDistrictTown))
            dispatch(setCheckoutAddress(checkoutData.userCheckoutData.addressOne.checkoutAddress))
            dispatch(setCheckoutLandmark(checkoutData.userCheckoutData.addressOne.checkoutLandmark))
        }
    }, [addressData])

    const handleEditAddress = async () => {
        if (!checkoutData.checkoutName || !checkoutData.checkoutMobile || !checkoutData.checkoutPincode || !checkoutData.checkoutLocality || !checkoutData.checkoutAddress || !checkoutData.checkoutCityDistrictTown || !checkoutData.checkoutState) {
            toast.warn("Please fill all fields.");
            return null;
        } else {
            try {
                const addressCollectionRef = collection(firestore, "address");
                const docQuery = query(
                    addressCollectionRef,
                    where("userId", "==", user.userData.uid)
                );
                const querySnapshot = await getDocs(docQuery);
                if (!querySnapshot.empty) {
                    const docRef = querySnapshot.docs[0].ref;
                    const checkoutInformations = {
                        addressOne: {
                            checkoutName: checkoutData.checkoutName,
                            checkoutMobile: checkoutData.checkoutMobile,
                            checkoutPincode: checkoutData.checkoutPincode,
                            checkoutLocality: checkoutData.checkoutLocality,
                            checkoutAddress: checkoutData.checkoutAddress,
                            checkoutCityDistrictTown: checkoutData.checkoutCityDistrictTown,
                            checkoutState: checkoutData.checkoutState,
                            checkoutLandmark: checkoutData.checkoutLandmark,
                            checkoutAlternateMobile: checkoutData.checkoutAlternateMobile,
                            active: true
                        }
                    };

                    await updateDoc(docRef, checkoutInformations).then(()=>{
                        dispatch(setEditAddressForm(false))
                    })

                } else {
                    console.log("Document not found.");
                }
            } catch (error) {
                console.log(error)
                toast.error("Something went wrong. Please try again latter")
            }
        }
    }




    return (
        <div className='address-edit-form-main'>
            <div className="address-edit-form-header">
                <p>EDIT ADDRESS</p>
            </div>
            <div className="address-edit-form">
                <div className="address-edit-form-name-and-mobile">
                    <input type="text" placeholder='Name' value={checkoutData.checkoutName} onChange={(e) => { dispatch(setCheckoutName(e.target.value)) }} />
                    <input type="number" placeholder='10-digit mobie number' value={checkoutData.checkoutMobile} onChange={(e) => { dispatch(setCheckoutMobile(e.target.value)) }} />
                </div>

                <div className="address-edit-form-name-and-mobile">
                    <input type="text" placeholder='Pincode' value={checkoutData.checkoutPincode} onChange={(e) => { dispatch(setCheckoutPincode(e.target.value)) }} />
                    <input type="text" placeholder='Locality' value={checkoutData.checkoutLocality} onChange={(e) => { dispatch(setCheckoutLocality(e.target.value)) }} />
                </div>

                <div className="address-edit-form-address">
                    <input className='address-field' type="text" placeholder='Address(Area & Street)' value={checkoutData.checkoutAddress} onChange={(e) => { dispatch(setCheckoutAddress(e.target.value)) }} />
                </div>

                <div className="address-edit-form-name-and-mobile">
                    <input type="text" placeholder='City/District/Town' value={checkoutData.checkoutCityDistrictTown} onChange={(e) => { dispatch(setCheckoutCityDistrictTown(e.target.value)) }} />
                    <select name="state" id="state" value={checkoutData.CheckoutState} onChange={(e) => { dispatch(setCheckoutState(e.target.value)) }}>
                        <option value="">Select your state</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                    </select>
                </div>
                <div className="address-edit-form-name-and-mobile">
                    <input type="text" placeholder='Landmark (Optional)' value={checkoutData.checkoutLandmark} onChange={(e) => { dispatch(setCheckoutLandmark(e.target.value)) }} />
                    <input type="number" placeholder='Alternate Phone (Optional)' value={checkoutData.checkoutAlternateMobile} onChange={(e) => { dispatch(setCheckoutAlternateMobile(e.target.value)) }} />
                </div>
                <div className="save-and-cancel-btn">
                    <button className='save-and-deliver-btn' onClick={handleEditAddress}>SAVE AND DELIVER HERE</button>
                    <button style={{background:"none",color:"#e94560"}} onClick={()=>dispatch(setEditAddressForm(false))}>CANCEL</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default EditAddress
