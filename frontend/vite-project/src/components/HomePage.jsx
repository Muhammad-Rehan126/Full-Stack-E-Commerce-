import React, { useState, useRef } from 'react';
import { 
  FiSearch, FiShoppingCart, FiUser, FiX, FiMenu, FiChevronDown, 
  FiArrowRight, FiArrowLeft, FiCheck, FiTrash2, FiMinus, FiPlus, FiRotateCcw 
} from 'react-icons/fi';
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub, FaStar } from 'react-icons/fa';
import heroImage from '../assets/img-33.png';
import NewsletterBanner from './NewsletterBanner';

// Import all product images
import img1 from '../assets/img-1.png';
import img2 from '../assets/img-2.png';
import img3 from '../assets/img-3.png';
import img4 from '../assets/img-4.png';
import img9 from '../assets/img-9.png';
import img10 from '../assets/img-10.png';
import img11 from '../assets/img-11.png';
import img12 from '../assets/img-12.png';

// Import images for Top Selling section (27, 28, 29, 32)
import img27 from '../assets/img-27.png';
import img28 from '../assets/img-28.png';
import img29 from '../assets/img-29.png';
import img32 from '../assets/img-32.png';


export default function HomePage() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Permanent initial cart items for automatic full reset/restore
  const initialCartItems = [
    { id: 1, name: "T-shirt with Tape Details", price: 120, quantity: 1, img: img1, size: "Large", color: "White" },
    { id: 2, name: "Skinny Fit Jeans", price: 240, quantity: 1, img: img2, size: "Medium", color: "Blue" }
  ];

  // Cart State
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Initial New Arrivals List
  const initialNewArrivals = [
    { id: 1, name: "T-shirt with Tape Details", price: 120, rating: "4.5/5", img: img1 },
    { id: 2, name: "Skinny Fit Jeans", price: 240, oldPrice: 260, discount: "-20%", rating: "3.5/5", img: img2 },
    { id: 3, name: "Checkered Shirt", price: 180, rating: "4.5/5", img: img3 },
    { id: 4, name: "Sleeve Striped T-shirt", price: 130, oldPrice: 160, discount: "-30%", rating: "4.5/5", img: img4 },
  ];

  // Initial Top Selling List
  const initialTopSelling = [
    { id: 27, name: "Vertical Striped Shirt", price: 212, oldPrice: 232, discount: "-20%", rating: "5.0/5", img: img27 },
    { id: 28, name: "Courage Graphic T-shirt", price: 145, rating: "4.0/5", img: img28 },
    { id: 29, name: "Loose Fit Bermuda Shorts", price: 80, rating: "3.0/5", img: img29 },
    { id: 32, name: "Faded Skinny Jeans", price: 210, rating: "4.5/5", img: img32 },
  ];

  const [newArrivals, setNewArrivals] = useState(initialNewArrivals);
  const [topSelling, setTopSelling] = useState(initialTopSelling);

  const sliderRef = useRef(null);

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.8;
      sliderRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const reviews = [
    { name: "Sarah M.", text: "I'm blown away by the quality and style of the clothes I received. From casual wear to elegant dresses, every piece has exceeded my expectations." },
    { name: "Alex K.", text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options is both trendy and versatile." },
    { name: "James L.", text: "As someone who's picky about the intricacy of design, convenience, and shipping speed, Shop.co hit every mark. Excellent service and quality!" },
    { name: "Mahnaz D.", text: "The delivery was surprisingly fast, and the packaging was neat. The fabric quality is top-notch, definitely ordering again soon!" },
    { name: "Omer Farooq", text: "Amazing collection! The sizing guide was accurate, and the t-shirts fit perfectly. Highly recommended for online shopping lovers." },
    { name: "Ayesha Khan", text: "I bought a couple of formal shirts and casual dresses. The material is breathable and comfortable for all-day wear. Loving my outfits!" },
    { name: "Zainab Malik", text: "Customer service helped me exchange a size seamlessly. Great experience overall, and the discounts are real value for money." },
    { name: "Bilal Ahmed", text: "Top quality hoodies and jeans! The stitching and colors match exactly what is shown in the product pictures. Super satisfied." },
    { name: "Hassan Ali", text: "One of the best e-commerce experiences I've had in Pakistan. Clean interface, fast browsing, and great clothing variety." }
  ];

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, size: "Large", color: "Default" }];
    });
    setToastMessage(`${product.name} added to cart!`);
    setTimeout(() => setToastMessage(''), 3000);
    setIsCartOpen(true);
  };

  // Reset cart items function
  const handleResetCart = () => {
    setCartItems(initialCartItems);
  };

  // Delete New Arrival card
  const handleDeleteNewArrival = (id, e) => {
    e.stopPropagation();
    setNewArrivals(prev => prev.filter(item => item.id !== id));
  };

  // Reset New Arrivals cards
  const handleResetNewArrivals = () => {
    setNewArrivals(initialNewArrivals);
    setToastMessage("New Arrivals restored!");
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Delete Top Selling card
  const handleDeleteTopSelling = (id, e) => {
    e.stopPropagation();
    setTopSelling(prev => prev.filter(item => item.id !== id));
  };

  // Reset Top Selling cards
  const handleResetTopSelling = () => {
    setTopSelling(initialTopSelling);
    setToastMessage("Top Selling products restored!");
    setTimeout(() => setToastMessage(''), 3000);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = Math.round(subtotalPrice * 0.20);
  const deliveryFee = cartItems.length > 0 ? 15 : 0;
  const finalTotal = subtotalPrice > 0 ? subtotalPrice - discountAmount + deliveryFee : 0;

  const filteredNewArrivals = newArrivals.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTopSelling = topSelling.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white font-sans text-gray-900 antialiased relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-black text-white px-6 py-3 rounded-xl shadow-lg text-sm transition-all duration-300">
          {toastMessage}
        </div>
      )}

      {/* ANNOUNCEMENT BAR & NAVBAR */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        {showAnnouncement && (
          <div className="bg-black text-white text-xs sm:text-sm py-2 px-4 flex justify-between items-center transition-all duration-300">
            <div className="w-full text-center">
              <span>Sign up and get 20% off to your first order. </span>
              <a href="#signup" className="underline font-medium hover:text-gray-300">Sign Up Now</a>
            </div>
            <button 
              onClick={() => setShowAnnouncement(false)} 
              className="text-white hover:text-gray-400 focus:outline-none p-1 cursor-pointer"
            >
              <FiX size={16} />
            </button>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 relative">
          <div className="flex-shrink-0 font-extrabold text-2xl sm:text-3xl tracking-tight text-black cursor-pointer">
            SHOP.CO
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-sm text-gray-700">
            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-black">
              <span>Shop</span>
              <FiChevronDown size={14} />
            </div>
            <a href="#shopCategory" className="hover:text-black">On Sale</a>
            <a href="#shopCategory" className="hover:text-black">New Arrivals</a>
            <a href="#brands" className="hover:text-black">Brands</a>
          </nav>

          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                <FiSearch size={18} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full bg-[#F0F0F0] text-sm text-gray-900 rounded-full pl-11 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => setIsCartOpen(true)} className="text-black relative p-1 cursor-pointer bg-transparent border-none hover:text-gray-600">
              <FiShoppingCart size={22} />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalCartCount}
                </span>
              )}
            </button>
            <a href="#profile" className="text-black hover:text-gray-600"><FiUser size={22} /></a>
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
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for products..." className="w-full bg-gray-100 rounded-full pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
              </div>
              <nav className="flex flex-col gap-3 text-sm text-gray-700">
                <a href="#shopCategory" onClick={() => setIsMenuOpen(false)} className="hover:text-black">Shop</a>
                <a href="#shopCategory" onClick={() => setIsMenuOpen(false)} className="hover:text-black">On Sale</a>
                <a href="#shopCategory" onClick={() => setIsMenuOpen(false)} className="hover:text-black">New Arrivals</a>
                <a href="#brands" onClick={() => setIsMenuOpen(false)} className="hover:text-black">Brands</a>
              </nav>
              <div className="flex items-center gap-5 border-t border-gray-200 pt-4 text-xl">
                <button onClick={() => { setIsCartOpen(true); setIsMenuOpen(false); }} className="relative bg-transparent border-none cursor-pointer p-0 text-black">
                  <FiShoppingCart />
                  {totalCartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {totalCartCount}
                    </span>
                  )}
                </button>
                <a href="#profile" title="View profile" aria-label="View profile"><FiUser /></a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="bg-[#F2F0F1] pt-10 md:pt-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 space-y-6 pb-12 lg:pb-24">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-black">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>
            <p className="text-gray-600 text-sm sm:text-base max-w-lg">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
            </p>
            
            <button 
              onClick={() => {
                const element = document.getElementById('shopCategory');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }} 
              className="inline-block bg-black text-white px-10 py-4 rounded-full font-medium hover:bg-gray-800 transition text-center cursor-pointer"
            >
              Shop Now
            </button>
            
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold">200+</h3>
                <p className="text-xs sm:text-sm text-gray-600">International Brands</p>
              </div>
              <div className="border-x border-gray-300 px-4">
                <h3 className="text-2xl sm:text-3xl font-bold">2,000+</h3>
                <p className="text-xs sm:text-sm text-gray-600">High-Quality Products</p>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold">30,000+</h3>
                <p className="text-xs sm:text-sm text-gray-600">Happy Customers</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full relative flex justify-center self-stretch lg:self-auto">
            <div className="relative w-full max-w-2xl h-80 sm:h-[450px] lg:h-[520px] overflow-hidden">
              <img src={heroImage} alt="Models wearing SHOP.CO fashion" className="absolute bottom-0 left-0 h-full w-full object-contain object-bottom -translate-y-4 sm:-translate-y-8 lg:-translate-y-12" />
              
              <div className="absolute top-6 right-8 sm:top-10 sm:right-16 lg:top-14 lg:right-10 text-black">
                <svg width="45" height="45" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
                </svg>
              </div>

              <div className="absolute top-36 left-4 sm:top-44 sm:left-12 lg:top-48 lg:left-8 text-black">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS STRIP */}
      <div id="brands" className="bg-black py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-around gap-6 text-white font-serif tracking-widest text-xl sm:text-2xl opacity-90">
          <span className="font-bold tracking-wider">VERSACE</span>
          <span className="font-light tracking-widest">ZARA</span>
          <span className="font-bold tracking-normal">GUCCI</span>
          <span className="font-normal tracking-wide">PRADA</span>
          <span className="font-light tracking-tight">Calvin Klein</span>
        </div>
      </div>

      {/* NEW ARRIVALS / SHOP CATEGORY SECTION */}
      <section id="shopCategory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">NEW ARRIVALS</h2>
          {newArrivals.length === 0 && (
            <button 
              type="button"
              onClick={handleResetNewArrivals}
              className="bg-black text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-gray-800 transition flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <FiRotateCcw size={14} /> Reset New Arrivals
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredNewArrivals.length > 0 ? (
            filteredNewArrivals.map((item) => (
              <div key={item.id} className="group cursor-pointer relative" onClick={() => setSelectedProduct(item)}>
                {/* Delete button */}
                <button 
                  onClick={(e) => handleDeleteNewArrival(item.id, e)}
                  className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-red-600 hover:text-white text-gray-700 p-2 rounded-full transition shadow-md cursor-pointer"
                  title="Remove Card"
                >
                  <FiTrash2 size={14} />
                </button>

                <div className="bg-[#F0F0F0] rounded-2xl overflow-hidden h-64 mb-3 flex items-center justify-center relative">
                  <img src={item.img} alt={item.name} className="h-full w-full object-cover group-hover:scale-105 transition duration-300" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}
                    className="absolute bottom-3 right-3 bg-black text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition shadow cursor-pointer"
                  >
                    + Add to Cart
                  </button>
                </div>
                <h4 className="font-bold text-base mb-1 truncate">{item.name}</h4>
                <div className="flex items-center space-x-1 text-yellow-400 text-sm mb-1">
                  {[...Array(4)].map((_, i) => <FaStar key={i} size={14} />)}
                  <span className="text-gray-500 text-xs ml-2">{item.rating}</span>
                </div>
                <div className="flex items-center space-x-2 font-bold text-lg">
                  <span>${item.price}</span>
                  {item.oldPrice && <span className="text-gray-400 line-through text-base">${item.oldPrice}</span>}
                  {item.discount && <span className="text-red-500 bg-red-100 text-xs px-2 py-0.5 rounded-full">{item.discount}</span>}
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-6">All new arrivals deleted. Click "Reset New Arrivals" above to restore them.</p>
          )}
        </div>
      </section>

      <hr className="border-gray-200 max-w-7xl mx-auto" />

      {/* TOP SELLING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">TOP SELLING</h2>
          {topSelling.length === 0 && (
            <button 
              type="button"
              onClick={handleResetTopSelling}
              className="bg-black text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-gray-800 transition flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <FiRotateCcw size={14} /> Reset Top Selling
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTopSelling.length > 0 ? (
            filteredTopSelling.map((item) => (
              <div key={item.id} className="group cursor-pointer relative" onClick={() => setSelectedProduct(item)}>
                {/* Delete button */}
                <button 
                  onClick={(e) => handleDeleteTopSelling(item.id, e)}
                  className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-red-600 hover:text-white text-gray-700 p-2 rounded-full transition shadow-md cursor-pointer"
                  title="Remove Card"
                >
                  <FiTrash2 size={14} />
                </button>

                <div className="bg-[#F0F0F0] rounded-2xl overflow-hidden h-64 mb-3 flex items-center justify-center relative">
                  <img src={item.img} alt={item.name} className="h-full w-full object-cover group-hover:scale-105 transition duration-300" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}
                    className="absolute bottom-3 right-3 bg-black text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition shadow cursor-pointer"
                  >
                    + Add to Cart
                  </button>
                </div>
                <h4 className="font-bold text-base mb-1 truncate">{item.name}</h4>
                <div className="flex items-center space-x-1 text-yellow-400 text-sm mb-1">
                  {[...Array(4)].map((_, i) => <FaStar key={i} size={14} />)}
                  <span className="text-gray-500 text-xs ml-2">{item.rating}</span>
                </div>
                <div className="flex items-center space-x-2 font-bold text-lg">
                  <span>${item.price}</span>
                  {item.oldPrice && <span className="text-gray-400 line-through text-base">${item.oldPrice}</span>}
                  {item.discount && <span className="text-red-500 bg-red-100 text-xs px-2 py-0.5 rounded-full">{item.discount}</span>}
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-6">All top selling items deleted. Click "Reset Top Selling" above to restore them.</p>
          )}
        </div>
      </section>

      {/* BROWSE BY DRESS STYLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-[#F0F0F0] rounded-3xl p-6 sm:p-12">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-8 uppercase tracking-tight">Browse By Dress Style</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl h-48 sm:h-64 relative overflow-hidden p-6 shadow-sm flex flex-col justify-between cursor-pointer hover:opacity-95 transition">
              <img src={img9} alt="Casual" className="absolute inset-0 w-full h-full object-cover" />
              <span className="text-2xl font-bold bg-white/80 backdrop-blur-sm px-4 py-1 rounded-lg w-max relative z-10">Casual</span>
            </div>
            <div className="bg-white rounded-2xl h-48 sm:h-64 relative overflow-hidden p-6 shadow-sm flex flex-col justify-between sm:col-span-2 cursor-pointer hover:opacity-95 transition">
              <img src={img10} alt="Formal" className="absolute inset-0 w-full h-full object-cover" />
              <span className="text-2xl font-bold bg-white/80 backdrop-blur-sm px-4 py-1 rounded-lg w-max relative z-10">Formal</span>
            </div>
            <div className="bg-white rounded-2xl h-48 sm:h-64 relative overflow-hidden p-6 shadow-sm flex flex-col justify-between sm:col-span-2 cursor-pointer hover:opacity-95 transition">
              <img src={img11} alt="Party" className="absolute inset-0 w-full h-full object-cover" />
              <span className="text-2xl font-bold bg-white/80 backdrop-blur-sm px-4 py-1 rounded-lg w-max relative z-10">Party</span>
            </div>
            <div className="bg-white rounded-2xl h-48 sm:h-64 relative overflow-hidden p-6 shadow-sm flex flex-col justify-between cursor-pointer hover:opacity-95 transition">
              <img src={img12} alt="Gym" className="absolute inset-0 w-full h-full object-cover" />
              <span className="text-2xl font-bold bg-white/80 backdrop-blur-sm px-4 py-1 rounded-lg w-max relative z-10">Gym</span>
            </div>
          </div>
        </div>
      </section>

      {/* OUR HAPPY CUSTOMERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 overflow-hidden">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Our Happy Customers</h2>
          <div className="flex space-x-3">
            <button 
              onClick={() => scrollSlider('left')}
              className="p-3 rounded-full border border-gray-300 hover:bg-black hover:text-white transition cursor-pointer"
            >
              <FiArrowLeft size={18} />
            </button>
            <button 
              onClick={() => scrollSlider('right')}
              className="p-3 rounded-full border border-gray-300 hover:bg-black hover:text-white transition cursor-pointer"
            >
              <FiArrowRight size={18} />
            </button>
          </div>
        </div>

        <div 
          ref={sliderRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide snap-x pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reviews.map((rev, index) => (
            <div 
              key={index} 
              className="min-w-[300px] sm:min-w-[360px] max-w-[360px] bg-white border border-gray-200 rounded-2xl p-6 flex-shrink-0 snap-start shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex text-yellow-400 space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => <FaStar key={i} size={16} />)}
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-bold text-lg">{rev.name}</h4>
                  <span className="bg-green-500 text-white rounded-full p-0.5"><FiCheck size={12} /></span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">"{rev.text}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STAY UPTO DATE NEWSLETTER */}
      <NewsletterBanner onSubscribe={() => alert("Subscribed successfully!")} />

      {/* FOOTER */}
      <footer className="bg-gray-100 pt-32 pb-12 text-gray-600 text-sm">
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
            <span className="bg-white px-3 py-1.5 rounded-md border border-gray-200 font-extrabold text-black">VISA</span>
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

      {/* Right-Side Sliding Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={() => setIsCartOpen(false)}></div>
          
          {/* Drawer Panel */}
          <div className="relative w-full max-w-md bg-white h-screen shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
              <h2 className="text-lg font-black text-black tracking-wide uppercase">YOUR CART</h2>
              <button 
                type="button" 
                onClick={() => setIsCartOpen(false)} 
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-200 transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Drawer Body - Scrollable Items List */}
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
                      <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-xl bg-gray-100 border border-gray-100" />
                      <div>
                        <h4 className="font-bold text-sm text-black">{item.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Size: {item.size} | Color: {item.color}</p>
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
                          <FiMinus size={12} />
                        </button>
                        <span className="font-bold text-xs text-black">{item.quantity}</span>
                        <button 
                          type="button"
                          onClick={() => setCartItems(prev => prev.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i))}
                          className="text-gray-600 hover:text-black text-xs font-bold cursor-pointer"
                        >
                          <FiPlus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer / Order Summary */}
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

                {/* Promo Input */}
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

                {/* Checkout Button */}
                <button 
                  type="button"
                  onClick={() => { setIsCartOpen(false); alert("Proceeding to Checkout!"); }}
                  className="w-full bg-black text-white py-3.5 rounded-full font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors cursor-pointer shadow-md mt-2"
                >
                  Go to Checkout 
                  <FiArrowRight size={16} />
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Product Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 relative shadow-2xl">
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-black p-1 cursor-pointer"
            >
              <FiX size={20} />
            </button>
            <div className="flex flex-col sm:flex-row gap-6">
              <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full sm:w-48 h-48 object-cover rounded-xl bg-gray-100" />
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-xl mb-2">{selectedProduct.name}</h3>
                  <div className="flex text-yellow-400 text-sm mb-2">
                    {[...Array(5)].map((_, i) => <FaStar key={i} size={14} />)}
                    <span className="text-gray-500 ml-2">{selectedProduct.rating}</span>
                  </div>
                  <div className="text-2xl font-bold mb-4">${selectedProduct.price}</div>
                </div>
                <button 
                  onClick={() => { handleAddToCart(selectedProduct); setSelectedProduct(null); }}
                  className="bg-black text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}