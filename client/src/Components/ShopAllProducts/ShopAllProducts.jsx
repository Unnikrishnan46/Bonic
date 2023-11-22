import React, { useEffect, useState } from 'react'
import "./ShopAllProducts.css";
import ShopAllProductCard from '../ShopAllProductCard.jsx/ShopAllProductCard';
import { useLocation } from 'react-router-dom';

function ShopAllProducts({ products ,addToWishlist,removeWishlistItem}) {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('search');
  const location = useLocation();
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState(null);
  const [selectedDiscountFilter, setSelectedDiscountFilter] = useState(null);
  const [minimumPrice, setMinimumPrice] = useState(0);
  const [maximumPrice, setMaximumPrice] = useState("");
  const [rangePrice, setRangePrice] = useState(maximumPrice);



  const searchFilter = (products, searchQuery, selectedSubSubCategory, selectedDiscountFilter) => {
    if (products) {
      let filteredProducts = products;

      if (selectedSubSubCategory) {
        filteredProducts = filteredProducts.filter(
          (product) => product.productSubSubCategory === selectedSubSubCategory
        );
      }

      if (selectedDiscountFilter) {
        filteredProducts = filteredProducts.filter(
          (product) => product.productDiscount >= selectedDiscountFilter
        );
      }

      if (searchQuery) {
        const lowercasedSearchTerm = searchQuery.toLowerCase();
        filteredProducts = filteredProducts.filter((product) => {
          const productName = product.productName.toLowerCase();
          const category = product.productMainCategory.toLowerCase();
          const tags = product.productTags.map(tag => tag.toLowerCase());

          return (
            productName.includes(lowercasedSearchTerm) ||
            category.includes(lowercasedSearchTerm) ||
            tags.includes(lowercasedSearchTerm)
          );
        });
      }

      return filteredProducts;
    }
  };

  const filteredProducts = searchFilter(products, searchQuery, selectedSubSubCategory, selectedDiscountFilter);

  const getProductMainCategories = (filteredProducts) => {
    if (filteredProducts) {
      return Array.from(new Set(filteredProducts.map((product) => product.productSubSubCategory)));
    }
  };
  const productMainCategoriesArray = getProductMainCategories(filteredProducts);

  const handleSubSubCategoryClick = (subSubCategory) => {
    setSelectedSubSubCategory(subSubCategory);
  };

  const handleDiscountFilterChange = (discountValue) => {
    if (selectedDiscountFilter === discountValue) {
      setSelectedDiscountFilter(null);
    } else {
      setSelectedDiscountFilter(discountValue);
    }
  };

  useEffect(() => {
    if (products && filteredProducts) {
      const prices = products ? filteredProducts.map((product) => product.productPrice) : "";
      const maxPrice = Math.max(...prices);
      setMaximumPrice(maxPrice)
    }
  }, [filteredProducts])


  useEffect(() => {
    setSelectedSubSubCategory(null);
    setSelectedDiscountFilter(null)
  }, [location.search]);

  return (
    <div className='ShopAllProducts'>
      <div className="ShopAllProducts-heading"></div>
      <div className="ShopAllProducts-left">
        <div className="ShopAllProducts-filters">
          <div className="ShopAllProducts-filters-heading">
            <h4>Filters</h4>
          </div>
          <div className="ShopAllProducts-filters-categories">
            <h6>CATEGORIES</h6>
            <div className="ShopAllProducts-filters-categories-list">
              {productMainCategoriesArray ? productMainCategoriesArray.map((value, index) => {
                return (
                  <p key={index} onClick={() => handleSubSubCategoryClick(value)}>{value}</p>
                )
              }) : ""}
            </div>
          </div>
          <div className="ShopAllProducts-filters-discount">
            <h6>Discount</h6>
            <div className="ShopAllProducts-filters-discount-list">
              <p><input type="checkbox" onChange={() => handleDiscountFilterChange(30)} checked={selectedDiscountFilter === 30} /><span>30% or more</span></p>
              <p><input type="checkbox" onChange={() => handleDiscountFilterChange(40)} checked={selectedDiscountFilter === 40} /><span>40% or more</span></p>
              <p><input type="checkbox" onChange={() => handleDiscountFilterChange(50)} checked={selectedDiscountFilter === 50} /><span>50% or more</span></p>
              <p><input type="checkbox" onChange={() => handleDiscountFilterChange(60)} checked={selectedDiscountFilter === 60} /><span>60% or more</span></p>
              <p><input type="checkbox" onChange={() => handleDiscountFilterChange(70)} checked={selectedDiscountFilter === 70} /><span>70% or more</span></p>
            </div>
          </div>
          <div className="ShopAllProducts-filters-price">
            <div className="ShopAllProducts-filters-price-header">
              <h6>Price</h6>
            </div>
            <div className="ShopAllProducts-filters-price-range">
              <input type="range" min={minimumPrice} max={maximumPrice} value={rangePrice} onChange={(e)=>setRangePrice(e.target.value)} />
            </div>

            <div className="ShopAllProducts-filters-price-display">
              <div className="ShopAllProducts-filters-price-display-min">
                <p>Min</p>
                <input type="tel" onChange={(e) => setMinimumPrice(e.target.value)} min={0} value={minimumPrice}/>
              </div>
              <div className="ShopAllProducts-filters-price-display-max">
                <p>Max</p>
                <input type="tel" onChange={(e)=> setMaximumPrice(e.target.value)} max={maximumPrice} value={rangePrice}/>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="ShopAllProducts-right">
        <ShopAllProductCard filteredProducts={filteredProducts} addToWishlist={addToWishlist} removeWishlistItem={removeWishlistItem}/>
      </div>
    </div>
  )
}

export default ShopAllProducts
