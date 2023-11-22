import React from 'react';
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "../../Firebase/Firebase";
import { confirmAlert } from 'react-confirm-alert';
import { ToastContainer, toast } from 'react-toastify';
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import 'react-confirm-alert/src/react-confirm-alert.css';
import "./ActionButtons.css";


function ActionButtons({ productId, product, getAllProducts }) {
  const redirectToEditPage = () => {
    window.location.href = `/admin/edit-product/id:${productId}`
  }

  const handleVisibilityFalse = async () => {
    const updateField = {
      visibility: false,
    }
    const docRef = doc(firestore, "test_data", productId);

    await updateDoc(docRef, updateField).then(() => {
      getAllProducts()
      console.log("doc updated")
    }).catch((error) => {
      toast.error("Something went wrong")
      console.log(error)
    })
  }

  const handleVisibilityTrue = async () => {
    const updateField = {
      visibility: true,
    }
    const docRef = doc(firestore, "test_data", productId);

    await updateDoc(docRef, updateField).then(() => {
      getAllProducts()
      console.log("doc updated")
    }).catch((error) => {
      toast.error("Something went wrong")
      console.error(error)
    })
  }

  const handleDelete = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to delete this product ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const docRef = doc(firestore, "test_data", productId);
            deleteDoc(docRef).then(() => {
              getAllProducts()
              console.log("doc deleted")
            }).catch((error) => {
              toast.error("Something went wrong")
              console.log(error)
            })
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  }

  return (
    <div className='action-btn-container'>
      {product.visibility ? <button onClick={handleVisibilityFalse} id='hide-btn'><i class="fas fa-eye"></i></button> :
        <button onClick={handleVisibilityTrue} id='show-btn'><i class="fas fa-low-vision"></i></button>}
      <button onClick={redirectToEditPage} id='edit-btn'><i class="fas fa-pencil-alt"></i></button>
      <button onClick={handleDelete} id='delete-btn'><i class="fas fa-trash"></i></button>

      <ReactTooltip
        anchorId="hide-btn"
        place="top"
        content="Hide Product"
      />
      <ReactTooltip
        anchorId="show-btn"
        place="top"
        content="Show Product"
      />

      <ReactTooltip
        anchorId="edit-btn"
        place="top"
        content="Edit Product"
      />

      <ReactTooltip
        anchorId="delete-btn"
        place="top"
        content="Delete Product"
      />

      <ToastContainer />
    </div>
  )
}

export default ActionButtons
