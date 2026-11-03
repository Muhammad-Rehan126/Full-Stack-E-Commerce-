import React, { useState } from 'react';
import { FiSearch, FiShoppingCart, FiUser, FiX, FiMenu, FiChevronDown, FiChevronUp, FiCheck, FiArrowLeft, FiArrowRight, FiFilter, FiTrash2, FiRotateCcw } from 'react-icons/fi';
import { FaStar, FaTwitter, FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa';
import NewsletterBanner from './Newsletterbanner';

// Import all product images used in the product list
import img1 from '../assets/img-1.png';
import img2 from '../assets/img-2.png';
import img4 from '../assets/img-4.png';
import img5 from '../assets/img-5.png';
import img7 from '../assets/img-7.png';
import img8 from '../assets/img-8.png';
import img11 from '../assets/img-11.png';
import img12 from '../assets/img-12.png';
import img13 from '../assets/img-13.png';
import img14 from '../assets/img-14.png';
import img15 from '../assets/img-15.png';
import img16 from '../assets/img-16.png';
import img17 from '../assets/img-17.png';
import img18 from '../assets/img-18.png';
import img19 from '../assets/img-19.png';
import img20 from '../assets/img-20.png';
import img24 from '../assets/img-24.png';
import img25 from '../assets/img-25.png';
import img26 from '../assets/img-26.png';
import img27 from '../assets/img-27.png';
import img28 from '../assets/img-28.png';
import img29 from '../assets/img-29.png';
import img30 from '../assets/img-30.png';
import img31 from '../assets/img-31.png';
import img32 from '../assets/img-32.png';
import img34 from '../assets/img-34.png';
import img35 from '../assets/img-35.png';

export default function ShopCategoryPage() {
  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(250);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState('Large');
  const [selectedDressStyle, setSelectedDressStyle] = useState(null);
  const [sortBy, setSortBy] = useState('Most Popular');
  const [currentPage, setCurrentPage] = useState(5);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Permanent initial cart items for automatic full reset/restore
  const initialCartItems = [
    { id: 37, page: 5, size: 'Large', title: "Gradient Graphic T-shirt", price: 145, quantity: 1, image: img18, color: "white" },
    { id: 40, page: 5, size: 'Large', title: "Skinny Fit Jeans", price: 240, quantity: 1, image: img24, color: "blue" }
  ];

  // Cart & Toast States
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [appliedFilters, setAppliedFilters] = useState({
    minPrice: 50,
    maxPrice: 250,
    category: null,
    color: null,
    style: null
  });

  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isColorsOpen, setIsColorsOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(true);
  const [isStyleOpen, setIsStyleOpen] = useState(true);

  const sizePageMapping = {
    'XX-Small': 1,
    'X-Small': 2,
    'Small': 3,
    'Medium': 4,
    'Large': 5,
    'X-Large': 6,
    'XX-Large': 7,
    '3X-Large': 8,
    '4X-Large': 9
  };

  const initialProducts = [
    // --- Page 1: XX-Small (9 Items) ---
    { id: 1, page: 1, size: 'XX-Small', title: "XX-Small Classic Hoodie", price: 175, oldPrice: 200, discount: "-12%", rating: "4.6/5", category: "Hoodie", color: "black", style: "Casual", image: img1 },
    { id: 2, page: 1, size: 'XX-Small', title: "XX-Small Skinny Jeans", price: 210, oldPrice: 250, discount: "-16%", rating: "4.2/5", category: "Jeans", color: "blue", style: "Casual", image: img2 },
    { id: 3, page: 1, size: 'XX-Small', title: "XX-Small Casual Shorts", price: 90, oldPrice: 110, discount: "-18%", rating: "4.5/5", category: "Shorts", color: "blue", style: "Gym", image: img7 },
    { id: 4, page: 1, size: 'XX-Small', title: "XX-Small Graphic Tee", price: 125, oldPrice: null, discount: null, rating: "4.3/5", category: "T-shirts", color: "orange", style: "Casual", image: img4 },
    { id: 5, page: 1, size: 'XX-Small', title: "XX-Small Party Shirt", price: 160, oldPrice: 190, discount: "-15%", rating: "4.7/5", category: "Shirts", color: "green", style: "Party", image: img11 },
    { id: 6, page: 1, size: 'XX-Small', title: "XX-Small Street Hoodie", price: 185, oldPrice: 220, discount: "-15%", rating: "4.8/5", category: "Hoodie", color: "yellow", style: "Casual", image: img5 },
    { id: 7, page: 1, size: 'XX-Small', title: "XX-Small Ripped Jeans", price: 230, oldPrice: 270, discount: "-15%", rating: "4.4/5", category: "Jeans", color: "blue", style: "Casual", image: img8 },
    { id: 8, page: 1, size: 'XX-Small', title: "XX-Small Gym Tank", price: 75, oldPrice: 95, discount: "-21%", rating: "4.1/5", category: "T-shirts", color: "cyan", style: "Gym", image: img12 },
    { id: 9, page: 1, size: 'XX-Small', title: "XX-Small Formal Shirt", price: 140, oldPrice: 170, discount: "-17%", rating: "4.4/5", category: "Shirts", color: "white", style: "Formal", image: img27 },

    // --- Page 2: X-Small (9 Items) ---
    { id: 10, page: 2, size: 'X-Small', title: "X-Small Streetwear Hoodie", price: 195, oldPrice: 230, discount: "-15%", rating: "4.9/5", category: "Hoodie", color: "black", style: "Casual", image: img13 },
    { id: 11, page: 2, size: 'X-Small', title: "X-Small Slim Denim Jeans", price: 220, oldPrice: 260, discount: "-15%", rating: "4.6/5", category: "Jeans", color: "blue", style: "Casual", image: img24 },
    { id: 12, page: 2, size: 'X-Small', title: "X-Small Polo T-Shirt", price: 180, oldPrice: null, discount: null, rating: "4.5/5", category: "Shirts", color: "red", style: "Formal", image: img17 },
    { id: 13, page: 2, size: 'X-Small', title: "X-Small Bermuda Shorts", price: 85, oldPrice: 100, discount: "-15%", rating: "3.9/5", category: "Shorts", color: "blue", style: "Gym", image: img29 },
    { id: 14, page: 2, size: 'X-Small', title: "X-Small Oversized Hoodie", price: 210, oldPrice: 240, discount: "-12%", rating: "4.8/5", category: "Hoodie", color: "green", style: "Casual", image: img15 },
    { id: 15, page: 2, size: 'X-Small', title: "X-Small Dark Wash Jeans", price: 235, oldPrice: 280, discount: "-16%", rating: "4.7/5", category: "Jeans", color: "black", style: "Casual", image: img2 },
    { id: 16, page: 2, size: 'X-Small', title: "X-Small Vertical Striped Shirt", price: 212, oldPrice: 232, discount: "-20%", rating: "5.0/5", category: "Shirts", color: "green", style: "Party", image: img20 },
    { id: 17, page: 2, size: 'X-Small', title: "X-Small Denim Jacket", price: 225, oldPrice: 260, discount: "-13%", rating: "4.7/5", category: "Hoodie", color: "blue", style: "Casual", image: img25 },
    { id: 18, page: 2, size: 'X-Small', title: "X-Small Comfort Fit Tee", price: 150, oldPrice: 180, discount: "-16%", rating: "4.4/5", category: "T-shirts", color: "orange", style: "Casual", image: img28 },

    // --- Page 3: Small (9 Items) ---
    { id: 19, page: 3, size: 'Small', title: "Small Heavyweight Hoodie", price: 190, oldPrice: 220, discount: "-13%", rating: "4.8/5", category: "Hoodie", color: "black", style: "Casual", image: img14 },
    { id: 20, page: 3, size: 'Small', title: "Small Straight Cut Jeans", price: 215, oldPrice: 250, discount: "-14%", rating: "4.5/5", category: "Jeans", color: "blue", style: "Casual", image: img32 },
    { id: 21, page: 3, size: 'Small', title: "Small Striped T-shirt", price: 120, oldPrice: 150, discount: "-20%", rating: "4.8/5", category: "T-shirts", color: "black", style: "Casual", image: img20 },
    { id: 22, page: 3, size: 'Small', title: "Small Casual Shorts", price: 95, oldPrice: 110, discount: "-14%", rating: "4.2/5", category: "Shorts", color: "blue", style: "Gym", image: img29 },
    { id: 23, page: 3, size: 'Small', title: "Small Zip Hoodie", price: 205, oldPrice: 240, discount: "-14%", rating: "4.6/5", category: "Hoodie", color: "cyan", style: "Casual", image: img16 },
    { id: 24, page: 3, size: 'Small', title: "Small Stretch Jeans", price: 225, oldPrice: 260, discount: "-13%", rating: "4.7/5", category: "Jeans", color: "blue", style: "Casual", image: img24 },
    { id: 25, page: 3, size: 'Small', title: "Small Formal Shirt", price: 170, oldPrice: 200, discount: "-15%", rating: "4.6/5", category: "Shirts", color: "red", style: "Formal", image: img27 },
    { id: 26, page: 3, size: 'Small', title: "Small Party Blazer", price: 210, oldPrice: 250, discount: "-16%", rating: "4.9/5", category: "Shirts", color: "green", style: "Party", image: img25 },
    { id: 27, page: 3, size: 'Small', title: "Small Gym Tank", price: 75, oldPrice: 95, discount: "-21%", rating: "4.1/5", category: "T-shirts", color: "cyan", style: "Gym", image: img12 },

    // --- Page 4: Medium (9 Items) ---
    { id: 28, page: 4, size: 'Medium', title: "Medium Classic Hoodie", price: 185, oldPrice: 210, discount: "-12%", rating: "4.7/5", category: "Hoodie", color: "black", style: "Casual", image: img1 },
    { id: 29, page: 4, size: 'Medium', title: "Medium Slim Fit Jeans", price: 230, oldPrice: 270, discount: "-15%", rating: "4.8/5", category: "Jeans", color: "blue", style: "Casual", image: img2 },
    { id: 30, page: 4, size: 'Medium', title: "Medium Polo T-Shirt", price: 180, oldPrice: null, discount: null, rating: "4.5/5", category: "Shirts", color: "red", style: "Formal", image: img19 },
    { id: 31, page: 4, size: 'Medium', title: "Medium Bermuda Shorts", price: 85, oldPrice: 100, discount: "-15%", rating: "3.9/5", category: "Shorts", color: "blue", style: "Gym", image: img7 },
    { id: 32, page: 4, size: 'Medium', title: "Medium Graphic Hoodie", price: 195, oldPrice: 230, discount: "-15%", rating: "4.6/5", category: "Hoodie", color: "orange", style: "Casual", image: img4 },
    { id: 33, page: 4, size: 'Medium', title: "Medium Vintage Jeans", price: 240, oldPrice: 280, discount: "-14%", rating: "4.6/5", category: "Jeans", color: "blue", style: "Casual", image: img8 },
    { id: 34, page: 4, size: 'Medium', title: "Medium Party Wear", price: 205, oldPrice: 240, discount: "-14%", rating: "4.9/5", category: "Shirts", color: "green", style: "Party", image: img34 },
    { id: 35, page: 4, size: 'Medium', title: "Medium Striped Shirt", price: 160, oldPrice: 190, discount: "-15%", rating: "4.2/5", category: "Shirts", color: "red", style: "Formal", image: img35 },
    { id: 36, page: 4, size: 'Medium', title: "Medium Classic Tee", price: 130, oldPrice: 160, discount: "-18%", rating: "4.4/5", category: "T-shirts", color: "white", style: "Casual", image: img30 },

    // --- Page 5: Large (9 Items) ---
    { id: 37, page: 5, size: 'Large', title: "Gradient Graphic T-shirt", price: 145, oldPrice: null, discount: null, rating: "3.5/5", category: "T-shirts", color: "white", style: "Casual", image: img18 },
    { id: 38, page: 5, size: 'Large', title: "Polo with Tipping Details", price: 180, oldPrice: null, discount: null, rating: "4.5/5", category: "Shirts", color: "red", style: "Formal", image: img19 },
    { id: 39, page: 5, size: 'Large', title: "Black Striped T-shirt", price: 120, oldPrice: 160, discount: "-20%", rating: "5.0/5", category: "T-shirts", color: "black", style: "Casual", image: img20 },
    { id: 40, page: 5, size: 'Large', title: "Skinny Fit Jeans", price: 240, oldPrice: 260, discount: "-20%", rating: "3.5/5", category: "Jeans", color: "blue", style: "Casual", image: img24 },
    { id: 41, page: 5, size: 'Large', title: "Checkered Shirt", price: 180, oldPrice: null, discount: null, rating: "4.5/5", category: "Shirts", color: "red", style: "Formal", image: img25 },
    { id: 42, page: 5, size: 'Large', title: "Sleeve Striped T-shirt", price: 130, oldPrice: 160, discount: "-19%", rating: "4.5/5", category: "T-shirts", color: "orange", style: "Casual", image: img26 },
    { id: 43, page: 5, size: 'Large', title: "Vertical Striped Shirt", price: 212, oldPrice: 232, discount: "-20%", rating: "5.0/5", category: "Shirts", color: "green", style: "Party", image: img27 },
    { id: 44, page: 5, size: 'Large', title: "Courage Graphic T-shirt", price: 145, oldPrice: null, discount: null, rating: "4.0/5", category: "T-shirts", color: "orange", style: "Casual", image: img28 },
    { id: 45, page: 5, size: 'Large', title: "Loose Fit Bermuda Shorts", price: 80, oldPrice: null, discount: null, rating: "3.0/5", category: "Shorts", color: "blue", style: "Gym", image: img29 },

    // --- Page 6: X-Large (9 Items) ---
    { id: 46, page: 6, size: 'X-Large', title: "X-Large Streetwear Hoodie", price: 195, oldPrice: 230, discount: "-15%", rating: "4.9/5", category: "Hoodie", color: "black", style: "Casual", image: img13 },
    { id: 47, page: 6, size: 'X-Large', title: "X-Large Denim Jeans", price: 220, oldPrice: 250, discount: "-12%", rating: "4.6/5", category: "Jeans", color: "blue", style: "Casual", image: img32 },
    { id: 48, page: 6, size: 'X-Large', title: "X-Large Checkered Shirt", price: 180, oldPrice: null, discount: null, rating: "4.5/5", category: "Shirts", color: "red", style: "Formal", image: img31 },
    { id: 49, page: 6, size: 'X-Large', title: "X-Large Oversized Hoodie", price: 215, oldPrice: 250, discount: "-14%", rating: "4.8/5", category: "Hoodie", color: "green", style: "Casual", image: img5 },
    { id: 50, page: 6, size: 'X-Large', title: "X-Large Ripped Jeans", price: 240, oldPrice: 280, discount: "-14%", rating: "4.7/5", category: "Jeans", color: "blue", style: "Casual", image: img8 },
    { id: 51, page: 6, size: 'X-Large', title: "X-Large Party Blazer", price: 240, oldPrice: 280, discount: "-14%", rating: "4.8/5", category: "Shirts", color: "green", style: "Party", image: img11 },
    { id: 52, page: 6, size: 'X-Large', title: "X-Large Cargo Shorts", price: 110, oldPrice: 130, discount: "-15%", rating: "4.3/5", category: "Shorts", color: "blue", style: "Gym", image: img7 },
    { id: 53, page: 6, size: 'X-Large', title: "X-Large Graphic Tee", price: 140, oldPrice: 170, discount: "-17%", rating: "4.1/5", category: "T-shirts", color: "orange", style: "Casual", image: img18 },
    { id: 54, page: 6, size: 'X-Large', title: "X-Large Gym Top", price: 85, oldPrice: 100, discount: "-15%", rating: "4.0/5", category: "T-shirts", color: "cyan", style: "Gym", image: img12 },

    // --- Page 7: XX-Large (9 Items) ---
    { id: 55, page: 7, size: 'XX-Large', title: "XX-Large Heavyweight Hoodie", price: 210, oldPrice: 240, discount: "-12%", rating: "4.8/5", category: "Hoodie", color: "black", style: "Casual", image: img1 },
    { id: 56, page: 7, size: 'XX-Large', title: "XX-Large Relaxed Jeans", price: 235, oldPrice: 270, discount: "-13%", rating: "4.6/5", category: "Jeans", color: "blue", style: "Casual", image: img2 },
    { id: 57, page: 7, size: 'XX-Large', title: "XX-Large Vertical Striped Shirt", price: 212, oldPrice: 232, discount: "-20%", rating: "5.0/5", category: "Shirts", color: "green", style: "Party", image: img20 },
    { id: 58, page: 7, size: 'XX-Large', title: "XX-Large Zip Hoodie", price: 220, oldPrice: 250, discount: "-12%", rating: "4.7/5", category: "Hoodie", color: "blue", style: "Casual", image: img16 },
    { id: 59, page: 7, size: 'XX-Large', title: "XX-Large Classic Denim Jacket", price: 225, oldPrice: 260, discount: "-13%", rating: "4.7/5", category: "Hoodie", color: "blue", style: "Casual", image: img25 },
    { id: 60, page: 7, size: 'XX-Large', title: "XX-Large Formal Shirt", price: 190, oldPrice: 220, discount: "-13%", rating: "4.5/5", category: "Shirts", color: "red", style: "Formal", image: img27 },
    { id: 61, page: 7, size: 'XX-Large', title: "XX-Large Graphic Tee", price: 150, oldPrice: 180, discount: "-16%", rating: "4.3/5", category: "T-shirts", color: "white", style: "Casual", image: img30 },
    { id: 62, page: 7, size: 'XX-Large', title: "XX-Large Shorts", price: 95, oldPrice: 115, discount: "-17%", rating: "4.1/5", category: "Shorts", color: "blue", style: "Gym", image: img29 },
    { id: 63, page: 7, size: 'XX-Large', title: "XX-Large Gym Vest", price: 85, oldPrice: 100, discount: "-15%", rating: "4.0/5", category: "T-shirts", color: "cyan", style: "Gym", image: img12 },

    // --- Page 8: 3X-Large (9 Items) ---
    { id: 64, page: 8, size: '3X-Large', title: "3X-Large Heavyweight Hoodie", price: 210, oldPrice: 250, discount: "-16%", rating: "4.8/5", category: "Hoodie", color: "black", style: "Casual", image: img14 },
    { id: 65, page: 8, size: '3X-Large', title: "3X-Large Plus Jeans", price: 230, oldPrice: 270, discount: "-15%", rating: "4.7/5", category: "Jeans", color: "blue", style: "Casual", image: img24 },
    { id: 66, page: 8, size: '3X-Large', title: "3X-Large Comfort Fit Tee", price: 150, oldPrice: 180, discount: "-16%", rating: "4.4/5", category: "T-shirts", color: "orange", style: "Casual", image: img28 },
    { id: 67, page: 8, size: '3X-Large', title: "3X-Large Formal Shirt", price: 190, oldPrice: 220, discount: "-13%", rating: "4.5/5", category: "Shirts", color: "white", style: "Formal", image: img27 },
    { id: 68, page: 8, size: '3X-Large', title: "3X-Large Party Shirt", price: 215, oldPrice: 250, discount: "-14%", rating: "4.9/5", category: "Shirts", color: "green", style: "Party", image: img11 },
    { id: 69, page: 8, size: '3X-Large', title: "3X-Large Casual Shorts", price: 100, oldPrice: 120, discount: "-16%", rating: "4.2/5", category: "Shorts", color: "blue", style: "Gym", image: img29 },
    { id: 70, page: 8, size: '3X-Large', title: "3X-Large White Tee", price: 135, oldPrice: 160, discount: "-15%", rating: "4.3/5", category: "T-shirts", color: "white", style: "Casual", image: img30 },
    { id: 71, page: 8, size: '3X-Large', title: "3X-Large Gym Shirt", price: 90, oldPrice: 110, discount: "-18%", rating: "4.1/5", category: "T-shirts", color: "cyan", style: "Gym", image: img12 },
    { id: 72, page: 8, size: '3X-Large', title: "3X-Large Yellow Shirt", price: 160, oldPrice: 190, discount: "-15%", rating: "4.4/5", category: "Shirts", color: "yellow", style: "Party", image: img5 },

    // --- Page 9: 4X-Large (9 Items) ---
    { id: 73, page: 9, size: '4X-Large', title: "4X-Large Hoodie", price: 225, oldPrice: 260, discount: "-13%", rating: "4.9/5", category: "Hoodie", color: "black", style: "Casual", image: img13 },
    { id: 74, page: 9, size: '4X-Large', title: "4X-Large Action Denim", price: 245, oldPrice: 290, discount: "-15%", rating: "4.8/5", category: "Jeans", color: "blue", style: "Casual", image: img32 },
    { id: 75, page: 9, size: '4X-Large', title: "4X-Large Relaxed Sweatshirt", price: 200, oldPrice: 240, discount: "-16%", rating: "4.7/5", category: "Hoodie", color: "black", style: "Casual", image: img1 },
    { id: 76, page: 9, size: '4X-Large', title: "4X-Large Plus Fit Shirt", price: 220, oldPrice: 260, discount: "-15%", rating: "4.9/5", category: "Shirts", color: "green", style: "Party", image: img11 },
    { id: 77, page: 9, size: '4X-Large', title: "4X-Large Formal Shirt", price: 205, oldPrice: 240, discount: "-14%", rating: "4.6/5", category: "Shirts", color: "white", style: "Formal", image: img27 },
    { id: 78, page: 9, size: '4X-Large', title: "4X-Large Graphic Tee", price: 160, oldPrice: 190, discount: "-15%", rating: "4.4/5", category: "T-shirts", color: "white", style: "Casual", image: img30 },
    { id: 79, page: 9, size: '4X-Large', title: "4X-Large Shorts", price: 110, oldPrice: 130, discount: "-15%", rating: "4.2/5", category: "Shorts", color: "blue", style: "Gym", image: img29 },
    { id: 80, page: 9, size: '4X-Large', title: "4X-Large Gym Shirt", price: 95, oldPrice: 115, discount: "-17%", rating: "4.1/5", category: "T-shirts", color: "cyan", style: "Gym", image: img12 },
    { id: 81, page: 9, size: '4X-Large', title: "4X-Large Jacket", price: 250, oldPrice: 300, discount: "-16%", rating: "5.0/5", category: "Hoodie", color: "blue", style: "Casual", image: img25 }
  ];

  const [allProducts, setAllProducts] = useState(initialProducts);

  const handleSizeClick = (sizeName) => {
    setSelectedSize(sizeName);
    const targetPage = sizePageMapping[sizeName];
    if (targetPage) setCurrentPage(targetPage);
  };

  const handleApplyFilter = () => {
    setAppliedFilters({
      minPrice,
      maxPrice,
      category: selectedCategory,
      color: selectedColor,
      style: selectedDressStyle
    });
    setIsMobileFilterOpen(false);
    setToastMessage("Filters applied successfully!");
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setToastMessage(`${product.title} added to cart!`);
    setTimeout(() => setToastMessage(''), 3000);
    setIsCartOpen(true);
  };

  // Reset/Restore cart items function
  const handleResetCart = () => {
    setCartItems(initialCartItems);
  };

  // Delete individual product card from shop
  const handleDeleteProduct = (id, e) => {
    e.stopPropagation();
    setAllProducts(prev => prev.filter(item => item.id !== id));
  };

  // Reset/Restore all products across all pages
  const handleResetProducts = () => {
    setAllProducts(initialProducts);
    setToastMessage("All products restored!");
    setTimeout(() => setToastMessage(''), 3000);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = Math.round(subtotalPrice * 0.20);
  const deliveryFee = cartItems.length > 0 ? 15 : 0;
  const finalTotal = subtotalPrice > 0 ? subtotalPrice - discountAmount + deliveryFee : 0;

  const filteredProducts = allProducts.filter(product => {
    if (product.page !== currentPage) return false;
    if (product.price < appliedFilters.minPrice || product.price > appliedFilters.maxPrice) return false;
    if (appliedFilters.category && product.category !== appliedFilters.category) return false;
    if (appliedFilters.color && product.color !== appliedFilters.color) return false;
    if (appliedFilters.style && product.style !== appliedFilters.style) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    return 0;
  });

  const getLocalProductImage = (product) => product.image;

  const handleSubscribe = (email) => {
    setToastMessage(`Subscribed successfully with ${email}!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const SidebarContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h3 className="font-bold text-lg">Filters</h3>
        <button 
          onClick={() => { 
            setSelectedCategory(null); 
            setSelectedColor(null); 
            handleSizeClick('Large'); 
            setSelectedDressStyle(null); 
            setMinPrice(50); 
            setMaxPrice(250); 
            setAppliedFilters({ minPrice: 50, maxPrice: 250, category: null, color: null, style: null });
          }}
          className="text-gray-700 hover:text-black cursor-pointer p-1"
          title="Reset Filters"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-3 pb-6 border-b border-gray-200 text-sm text-gray-600">
        <p className="font-bold text-black text-xs uppercase tracking-wider mb-2">Categories</p>
        {['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'].map((cat, idx) => (
          <div 
            key={idx} 
            onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
            className={`flex justify-between items-center cursor-pointer p-2 rounded-lg transition-colors ${selectedCategory === cat ? 'bg-black text-white font-medium' : 'hover:bg-gray-100 hover:text-black'}`}
          >
            <span>{cat}</span>
            <span>&gt;</span>
          </div>
        ))}
      </div>

      {/* Price Dual Range Slider */}
      <div className="pb-6 border-b border-gray-200">
        <div 
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="flex justify-between items-center font-bold mb-3 text-sm cursor-pointer select-none"
        >
          <span>Price</span>
          <span className="text-xs">{isPriceOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
        </div>
        {isPriceOpen && (
          <>
            <div className="relative flex items-center h-8 mb-2">
              <div className="absolute w-full h-1.5 bg-gray-200 rounded-lg"></div>
              <div 
                className="absolute h-1.5 bg-black rounded-lg"
                style={{
                  left: `${((minPrice - 50) / 200) * 100}%`,
                  right: `${100 - ((maxPrice - 50) / 200) * 100}%`
                }}
              ></div>
              <input 
                type="range" min="50" max="250" value={minPrice} 
                onChange={(e) => { const value = Math.min(Number(e.target.value), maxPrice - 10); setMinPrice(value); }}
                className="absolute w-full appearance-none bg-transparent pointer-events-none accent-black [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:cursor-pointer" 
              />
              <input 
                type="range" min="50" max="250" value={maxPrice} 
                onChange={(e) => { const value = Math.max(Number(e.target.value), minPrice + 10); setMaxPrice(value); }}
                className="absolute w-full appearance-none bg-transparent pointer-events-none accent-black [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:cursor-pointer" 
              />
            </div>
            <div className="flex justify-between text-xs text-gray-700 font-bold">
              <span>${minPrice}</span>
              <span>${maxPrice}</span>
            </div>
          </>
        )}
      </div>

      {/* Colors */}
      <div className="pb-6 border-b border-gray-200">
        <div 
          onClick={() => setIsColorsOpen(!isColorsOpen)}
          className="flex justify-between items-center font-bold mb-3 text-sm cursor-pointer select-none"
        >
          <span>Colors</span>
          <span className="text-xs">{isColorsOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
        </div>
        {isColorsOpen && (
          <div className="grid grid-cols-5 gap-3">
            {[
              { name: 'green', bg: 'bg-green-500' },
              { name: 'red', bg: 'bg-red-500' },
              { name: 'yellow', bg: 'bg-yellow-400' },
              { name: 'orange', bg: 'bg-orange-500' },
              { name: 'cyan', bg: 'bg-cyan-400' },
              { name: 'blue', bg: 'bg-blue-600' },
              { name: 'purple', bg: 'bg-purple-600' },
              { name: 'magenta', bg: 'bg-fuchsia-600' },
              { name: 'white', bg: 'bg-white border border-gray-300' },
              { name: 'black', bg: 'bg-black' },
            ].map((c, i) => (
              <button 
                key={i}
                onClick={() => setSelectedColor(selectedColor === c.name ? null : c.name)}
                className={`w-8 h-8 rounded-full ${c.bg} flex items-center justify-center text-white text-xs shadow-sm transition-transform hover:scale-110 cursor-pointer`}
              >
                {selectedColor === c.name && <FiCheck aria-hidden="true" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sizes */}
      <div className="pb-6 border-b border-gray-200">
        <div 
          onClick={() => setIsSizeOpen(!isSizeOpen)}
          className="flex justify-between items-center font-bold mb-3 text-sm cursor-pointer select-none"
        >
          <span>Size</span>
          <span className="text-xs">{isSizeOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
        </div>
        {isSizeOpen && (
          <div className="flex flex-wrap gap-2">
            {['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'].map((sz) => (
              <button
                key={sz}
                onClick={() => handleSizeClick(sz)}
                className={`px-3 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${selectedSize === sz ? 'bg-black text-white font-bold' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {sz}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dress Style */}
      <div className="space-y-2 pb-4 text-sm text-gray-600">
        <div 
          onClick={() => setIsStyleOpen(!isStyleOpen)}
          className="flex justify-between items-center font-bold text-black mb-2 cursor-pointer select-none"
        >
          <span>Dress Style</span>
          <span className="text-xs">{isStyleOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
        </div>
        {isStyleOpen && ['Casual', 'Formal', 'Party', 'Gym'].map((style, idx) => (
          <div 
            key={idx} 
            onClick={() => setSelectedDressStyle(selectedDressStyle === style ? null : style)}
            className={`flex justify-between items-center cursor-pointer p-2 rounded-lg transition-colors ${selectedDressStyle === style ? 'bg-black text-white font-medium' : 'hover:bg-gray-100 hover:text-black'}`}
          >
            <span>{style}</span>
            <span>&gt;</span>
          </div>
        ))}
      </div>

      <button onClick={handleApplyFilter} className="w-full bg-black text-white py-3 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors shadow-md cursor-pointer">
        Apply Filter
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 relative selection:bg-black selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-black text-white px-6 py-3 rounded-xl shadow-lg text-sm transition-all duration-300">
          {toastMessage}
        </div>
      )}

      {/* Top Banner */}
      {showAnnouncement && (
        <div className="bg-black text-white text-xs sm:text-sm py-2 px-4 text-center tracking-wide relative flex items-center justify-center">
          <div className="flex items-center justify-center gap-2 mx-auto">
            <span>Sign up and get 20% off to your first order.</span> 
            <a href="#signup" className="underline font-medium hover:text-gray-300">Sign Up Now</a>
          </div>
          <button 
            onClick={() => setShowAnnouncement(false)} 
            className="absolute right-4 text-gray-400 hover:text-white transition-colors text-lg font-bold cursor-pointer"
            aria-label="Close announcement"
          >
            <FiX aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Navbar */}
      <header className="border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur-md z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tighter uppercase cursor-pointer">SHOP.CO</h1>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
              <a href="#shop" className="hover:text-black flex items-center gap-1">Shop <FiChevronDown size={14} /></a>
              <a href="#onsale" className="hover:text-black">On Sale</a>
              <a href="#newarrivals" className="hover:text-black">New Arrivals</a>
              <a href="#brands" className="hover:text-black">Brands</a>
            </nav>
          </div>
          <div className="hidden lg:flex items-center gap-4 flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400"><FiSearch aria-hidden="true" /></span>
              <input type="text" placeholder="Search for products..." className="w-full bg-gray-100 rounded-full pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 transition-all" />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xl">
            <button onClick={() => setIsCartOpen(true)} className="hover:opacity-70 transition-opacity relative cursor-pointer bg-transparent border-none p-0 text-black" title="View cart" aria-label="View cart">
              <FiShoppingCart aria-hidden="true" size={22} />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalCartCount}
                </span>
              )}
            </button>
            <button className="hover:opacity-70 transition-opacity cursor-pointer bg-transparent border-none p-0 text-black" title="View profile" aria-label="View profile"><FiUser aria-hidden="true" size={22} /></button>
          </div>
          <button
            type="button"
            onClick={() => setIsMenuOpen(prev => !prev)}
            className="md:hidden text-black p-2 cursor-pointer"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-lg p-4 space-y-4">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                <input type="text" placeholder="Search for products..." className="w-full bg-gray-100 rounded-full pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
              </div>
              <nav className="flex flex-col gap-3 text-sm text-gray-700">
                <a href="#shop" onClick={() => setIsMenuOpen(false)} className="hover:text-black">Shop</a>
                <a href="#onsale" onClick={() => setIsMenuOpen(false)} className="hover:text-black">On Sale</a>
                <a href="#newarrivals" onClick={() => setIsMenuOpen(false)} className="hover:text-black">New Arrivals</a>
                <a href="#brands" onClick={() => setIsMenuOpen(false)} className="hover:text-black">Brands</a>
              </nav>
              <div className="flex items-center gap-5 border-t border-gray-200 pt-4 text-xl">
                <button onClick={() => { setIsCartOpen(true); setIsMenuOpen(false); }} className="relative bg-transparent border-none cursor-pointer p-0 text-black" title="View cart" aria-label="View cart">
                  <FiShoppingCart />
                  {totalCartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {totalCartCount}
                    </span>
                  )}
                </button>
                <button type="button" title="View profile" aria-label="View profile"><FiUser /></button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <a href="#home" className="hover:underline">Home</a> &gt; <span className="text-black font-medium">Casual</span>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        
        {/* Mobile Filter Toggle Button */}
        <div className="flex lg:hidden justify-between items-center mb-6 bg-gray-100 p-3 rounded-2xl">
          <h2 className="text-lg font-bold">{selectedSize} Collection</h2>
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl text-sm font-medium cursor-pointer"
          >
            <FiFilter /> Filters
          </button>
        </div>

        {/* Mobile Filter Drawer */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex justify-end lg:hidden">
            <div className="bg-white w-full max-w-xs h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center pb-4 border-b mb-4">
                  <h3 className="font-bold text-lg">Filters</h3>
                  <button onClick={() => setIsMobileFilterOpen(false)} className="text-gray-500 hover:text-black font-bold">
                    <FiX size={20} />
                  </button>
                </div>
                <SidebarContent />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-1 border border-gray-200 rounded-3xl p-6 h-fit bg-white space-y-6 shadow-sm">
            <SidebarContent />
          </aside>

          {/* Right Product Grid Section */}
          <div className="lg:col-span-3">
            <div className="hidden lg:flex justify-between items-center mb-6 flex-wrap gap-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold">{selectedSize} Collection</h2>
              <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                <span>Showing products on this page</span>
                {allProducts.filter(p => p.page === currentPage).length === 0 && (
                  <button 
                    type="button"
                    onClick={handleResetProducts}
                    className="bg-black text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-gray-800 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <FiRotateCcw size={13} /> Reset Products
                  </button>
                )}
                <div className="flex items-center gap-1">
                  <span>Sort by:</span>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="font-semibold text-black bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option>Most Popular</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Cards */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                {sortedProducts.map((product) => (
                  <div key={product.id} className="flex flex-col group cursor-pointer bg-white relative">
                    {/* Delete button on product card */}
                    <button 
                      onClick={(e) => handleDeleteProduct(product.id, e)}
                      className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-red-600 hover:text-white text-gray-700 p-2 rounded-full transition shadow-md cursor-pointer"
                      title="Remove Card"
                    >
                      <FiTrash2 size={14} />
                    </button>

                    <div className="bg-[#F0EEED] rounded-3xl overflow-hidden aspect-square mb-4 shadow-sm relative group">
                      <img src={getLocalProductImage(product)} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                        className="absolute bottom-3 right-3 bg-black text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition shadow cursor-pointer"
                      >
                        + Add to Cart
                      </button>
                    </div>
                    <h4 className="font-bold text-base mb-1 group-hover:underline">{product.title}</h4>
                    <div className="flex items-center gap-1.5 text-yellow-400 text-xs mb-2">
                      <span className="flex gap-1">{[...Array(5)].map((_, index) => <FaStar key={index} size={12} />)}</span>
                      <span className="text-gray-500 font-medium">{product.rating}</span>
                    </div>
                    <div className="flex items-center gap-3 font-bold text-lg">
                      <span>${product.price}</span>
                      {product.oldPrice && <span className="text-gray-400 line-through text-base">${product.oldPrice}</span>}
                      {product.discount && <span className="bg-red-100 text-red-500 text-xs font-semibold px-2 py-0.5 rounded-full">{product.discount}</span>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-200 mb-10 space-y-4">
                <p className="text-lg font-bold text-gray-700">All products on this page are deleted.</p>
                <button 
                  type="button"
                  onClick={handleResetProducts}
                  className="bg-black text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-gray-800 transition shadow cursor-pointer inline-flex items-center gap-2"
                >
                  <FiRotateCcw size={14} /> Reset All Products
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-between items-center border-t border-gray-200 pt-6 flex-wrap gap-4">
              <button 
                onClick={() => {
                  const newPage = Math.max(currentPage - 1, 1);
                  setCurrentPage(newPage);
                  const foundSize = Object.keys(sizePageMapping).find(key => sizePageMapping[key] === newPage);
                  if (foundSize) setSelectedSize(foundSize);
                }} 
                disabled={currentPage === 1}
                className={`flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-black hover:text-white cursor-pointer'}`}
              >
                <FiArrowLeft aria-hidden="true" /> Previous
              </button>

              <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto max-w-xs sm:max-w-none">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button 
                    key={num}
                    onClick={() => {
                      setCurrentPage(num);
                      const foundSize = Object.keys(sizePageMapping).find(key => sizePageMapping[key] === num);
                      if (foundSize) setSelectedSize(foundSize);
                    }}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors cursor-pointer shrink-0 ${currentPage === num ? 'bg-black text-white font-bold' : 'hover:bg-gray-100 text-gray-600'}`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => {
                  const newPage = Math.min(currentPage + 1, 9);
                  setCurrentPage(newPage);
                  const foundSize = Object.keys(sizePageMapping).find(key => sizePageMapping[key] === newPage);
                  if (foundSize) setSelectedSize(foundSize);
                }} 
                disabled={currentPage === 9}
                className={`flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentPage === 9 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-black hover:text-white cursor-pointer'}`}
              >
                Next <FiArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Cart Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
          <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={() => setIsCartOpen(false)}></div>
          
          <div className="relative w-full max-w-md bg-white h-screen shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
              <h2 className="text-lg font-black text-black tracking-wide uppercase">YOUR CART</h2>
              <button 
                type="button" 
                onClick={() => setIsCartOpen(false)} 
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 flex flex-col justify-center">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <p className="text-gray-500 font-medium">Your cart is empty.</p>
                  <button 
                    type="button"
                    onClick={handleResetCart}
                    className="bg-black text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-gray-800 transition shadow cursor-pointer flex items-center gap-2"
                  >
                    <FiRotateCcw size={14} /> Reset Cart Items
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between gap-4 relative shadow-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-xl bg-gray-100 border border-gray-100" />
                      <div>
                        <h4 className="font-bold text-sm text-black">{item.title}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Size: {item.size || selectedSize} | Color: {item.color || 'Default'}</p>
                        <p className="text-sm font-extrabold text-black mt-1">${item.price}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between h-full gap-5">
                      <button 
                        type="button" 
                        onClick={() => setCartItems(prev => prev.filter(i => i.id !== item.id))}
                        className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <FiTrash2 size={15} />
                      </button>

                      <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 gap-3">
                        <button 
                          type="button"
                          onClick={() => setCartItems(prev => prev.map(i => i.id === item.id ? {...i, quantity: Math.max(1, i.quantity - 1)} : i))}
                          className="text-gray-600 hover:text-black text-xs font-bold cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-bold text-xs text-black">{item.quantity}</span>
                        <button 
                          type="button"
                          onClick={() => setCartItems(prev => prev.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i))}
                          className="text-gray-600 hover:text-black text-xs font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-gray-100 bg-white px-6 py-5 space-y-4 shadow-lg shrink-0">
                <h3 className="font-bold text-sm text-black uppercase tracking-wider">ORDER SUMMARY</h3>
                
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-black">${subtotalPrice}</span>
                  </div>
                  <div className="flex justify-between text-red-500">
                    <span>Discount (-20%)</span>
                    <span>-${discountAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-semibold text-black">${deliveryFee}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-black pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span>${finalTotal}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <input 
                    type="text" 
                    placeholder="Add promo code" 
                    className="w-full bg-gray-100 rounded-full px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  <button 
                    type="button"
                    onClick={() => alert("Promo code button clicked!")}
                    className="bg-black text-white px-5 py-2.5 rounded-full font-medium text-xs hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                <button 
                  type="button"
                  onClick={() => { setIsCartOpen(false); alert("Proceeding to Checkout!"); }}
                  className="w-full bg-black text-white py-3.5 rounded-full font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors cursor-pointer shadow-md mt-2"
                >
                  Go to Checkout 
                  <span>→</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Newsletter Section */}
      <div>
        <NewsletterBanner onSubscribe={handleSubscribe} />

        {/* Footer */}
        <footer className="bg-[#F0F0F0] pt-32 pb-12 text-gray-600 text-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 mb-12">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-extrabold text-black uppercase mb-4 tracking-tighter">SHOP.CO</h2>
              <p className="text-xs text-gray-500 mb-6 leading-relaxed">We have clothes that suits your style and which you're proud to wear.</p>
              <div className="flex gap-3">
                <a href="#twitter" className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors"><FaTwitter size={14} /></a>
                <a href="#facebook" className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 transition-opacity"><FaFacebookF size={14} /></a>
                <a href="#instagram" className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors"><FaInstagram size={14} /></a>
                <a href="#github" className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors"><FaGithub size={14} /></a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-black uppercase tracking-wider mb-4 text-xs">COMPANY</h4>
              <ul className="space-y-3 text-xs">
                <li><a href="#about" className="hover:text-black">About</a></li>
                <li><a href="#features" className="hover:text-black">Features</a></li>
                <li><a href="#works" className="hover:text-black">Works</a></li>
                <li><a href="#career" className="hover:text-black">Career</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-black uppercase tracking-wider mb-4 text-xs">HELP</h4>
              <ul className="space-y-3 text-xs">
                <li><a href="#support" className="hover:text-black">Customer Support</a></li>
                <li><a href="#delivery" className="hover:text-black">Delivery Details</a></li>
                <li><a href="#terms" className="hover:text-black">Terms & Conditions</a></li>
                <li><a href="#privacy" className="hover:text-black">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-black uppercase tracking-wider mb-4 text-xs">FAQ</h4>
              <ul className="space-y-3 text-xs">
                <li><a href="#account" className="hover:text-black">Account</a></li>
                <li><a href="#manage" className="hover:text-black">Manage Deliveries</a></li>
                <li><a href="#orders" className="hover:text-black">Orders</a></li>
                <li><a href="#payments" className="hover:text-black">Payments</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-black uppercase tracking-wider mb-4 text-xs">RESOURCES</h4>
              <ul className="space-y-3 text-xs">
                <li><a href="#ebooks" className="hover:text-black">Free eBooks</a></li>
                <li><a href="#tutorial" className="hover:text-black">Development Tutorial</a></li>
                <li><a href="#blog" className="hover:text-black">How to - Blog</a></li>
                <li><a href="#youtube" className="hover:text-black">Youtube Playlist</a></li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-300 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
            <p>Shop.co © 2000-2023, All Rights Reserved</p>
            <div className="flex items-center gap-2 mt-4 sm:mt-0">
              <span className="px-3 py-1.5 rounded-md border border-gray-200 font-extrabold text-black bg-white">VISA</span>
              <span className="bg-white px-2.5 py-1.5 rounded-md border border-gray-200 font-bold text-black flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-orange-400 inline-block -ml-2"></span>
              </span>
              <span className="bg-white px-3 py-1.5 rounded-md border border-gray-200 font-bold text-blue-900 italic">PayPal</span>
              <span className="bg-white px-3 py-1.5 rounded-md border border-gray-200 font-bold text-black">Pay</span>
              <span className="bg-white px-3 py-1.5 rounded-md border border-gray-200 font-bold text-black">G Pay</span>
            </div>
          </div>
        </footer>
      </div>

    </div>
  );
}