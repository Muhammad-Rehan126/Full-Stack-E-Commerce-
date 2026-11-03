import React, { useState } from 'react';
import { FiSearch, FiShoppingCart, FiUser, FiX, FiMenu, FiTrash2, FiMinus, FiPlus, FiArrowRight, FiCheck } from 'react-icons/fi';
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa';
import NewsletterBanner from './Newsletterbanner';

// Importing exact images from assets folder
import img30 from '../assets/img-30.png';
import img31 from '../assets/img-31.png';
import img32 from '../assets/img-32.png';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Gradient Graphic T-shirt",
      size: "Large",
      color: "White",
      price: 145,
      quantity: 1,
      image: img30
    },
    {
      id: 2,
      name: "Checkered Shirt",
      size: "Medium",
      color: "Red",
      price: 180,
      quantity: 1,
      image: img31
    },
    {
      id: 3,
      name: "Skinny Fit Jeans",
      size: "Large",
      color: "Blue",
      price: 240,
      quantity: 1,
      image: img32
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0); 
  const [promoMessage, setPromoMessage] = useState('');
  const [isCheckedOut, setIsCheckedOut] = useState(false); 
  const [showBanner, setShowBanner] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // Cart Drawer State

  // Increase quantity
  const increaseQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  // Remove selected item by its ID
  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Handle Promo Code
  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "SAVE10" || promoCode.trim().toUpperCase() === "SHOP.CO") {
      setPromoDiscount(30); 
      setPromoMessage("Promo code applied successfully! ($30 off)");
    } else if (promoCode.trim() !== "") {
      setPromoDiscount(15); 
      setPromoMessage("Promo code applied successfully!");
    } else {
      setPromoMessage("Please enter a valid promo code.");
    }
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const baseDiscount = Math.round(subtotal * 0.20); 
  const totalDiscount = baseDiscount + promoDiscount;
  const deliveryFee = cartItems.length > 0 ? 15 : 0;
  const total = subtotal > 0 ? Math.max(0, subtotal - totalDiscount + deliveryFee) : 0;

  if (isCheckedOut) {
    return (
      <div className="bg-white min-h-[80vh] flex flex-col items-center justify-center px-4 font-sans text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm">
          <FiCheck aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-extrabold text-black mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-600 max-w-md mb-8">Thank you for shopping with SHOP.CO. Your order total was <span className="font-bold text-black">${total}</span>.</p>
        <button 
          onClick={() => setIsCheckedOut(false)}
          className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors cursor-pointer"
        >
          Back to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans flex flex-col justify-between relative">
      
      {/* Top Announcement Banner */}
      {showBanner && (
        <div className="bg-black text-white text-xs sm:text-sm py-2 px-4 relative flex items-center justify-center">
          <p className="text-center">
            Sign up and get 20% off to your first order. <span className="underline cursor-pointer font-medium">Sign Up Now</span>
          </p>
          <button 
            type="button"
            onClick={() => setShowBanner(false)}
            className="absolute right-4 text-gray-400 hover:text-white text-lg font-bold cursor-pointer"
            title="Close banner"
          >
            <FiX aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <header className="border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 relative">
          <div className="flex items-center gap-8">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tighter text-black uppercase cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>SHOP.CO</h2>
            <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
              <span className="cursor-pointer hover:text-black">Shop</span>
              <span className="cursor-pointer hover:text-black">On Sale</span>
              <span className="cursor-pointer hover:text-black">New Arrivals</span>
              <span className="cursor-pointer hover:text-black">Brands</span>
            </nav>
          </div>
          <div className="flex items-center gap-4 flex-1 max-w-md justify-end">
            <div className="relative w-full hidden sm:block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FiSearch aria-hidden="true" />
              </span>
              <input 
                type="text" 
                placeholder="Search for products..." 
                className="w-full bg-gray-100 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none"
              />
            </div>
            
            {/* Navbar Cart & User Icons */}
            <div className="hidden md:flex items-center gap-4 text-xl text-black">
              <button 
                type="button" 
                onClick={() => setIsCartOpen(true)} 
                className="cursor-pointer hover:text-gray-500 relative" 
                title="View cart" 
                aria-label="View cart"
              >
                <FiShoppingCart aria-hidden="true" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </button>
              <button 
                type="button" 
                onClick={() => alert("User profile settings clicked!")} 
                className="cursor-pointer hover:text-gray-500" 
                title="View profile" 
                aria-label="View profile"
              >
                <FiUser aria-hidden="true" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen(prev => !prev)}
              className="md:hidden text-black p-2"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
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
                <button type="button" onClick={() => { setIsMenuOpen(false); setIsCartOpen(true); }} title="View cart" aria-label="View cart"><FiShoppingCart /></button>
                <button type="button" onClick={() => { setIsMenuOpen(false); alert("User profile settings clicked!"); }} title="View profile" aria-label="View profile"><FiUser /></button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Right-Side Sliding Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={() => setIsCartOpen(false)}></div>
          
          {/* Drawer Panel positioned on the Right Side */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
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
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500 py-12">Your cart is empty.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="bg-gray-50/60 border border-gray-100 rounded-2xl p-4 flex items-center justify-between gap-4 relative">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl bg-white border border-gray-100" />
                      <div>
                        <h4 className="font-bold text-sm text-black">{item.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Size: {item.size} | Color: {item.color.toLowerCase()}</p>
                        <p className="text-sm font-extrabold text-black mt-1">${item.price}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between h-full gap-3">
                      <button 
                        type="button" 
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <FiTrash2 size={15} />
                      </button>

                      <div className="flex items-center bg-white border border-gray-200 rounded-full px-2.5 py-1 gap-2 shadow-xs">
                        <button 
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          className="text-gray-500 hover:text-black text-xs font-bold cursor-pointer"
                        >
                          <FiMinus size={12} />
                        </button>
                        <span className="font-bold text-xs text-black">{item.quantity}</span>
                        <button 
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          className="text-gray-500 hover:text-black text-xs font-bold cursor-pointer"
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
              <div className="border-t border-gray-100 bg-white px-6 py-5 space-y-4 shadow-lg">
                <h3 className="font-bold text-sm text-black uppercase tracking-wider">ORDER SUMMARY</h3>
                
                <div className="space-y-2 text-xs text-gray-500">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-black">${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-red-500">
                    <span>Discount (-20%)</span>
                    <span>-${baseDiscount}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo Discount</span>
                      <span>-${promoDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-semibold text-black">${deliveryFee}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-black pt-1 border-t border-gray-100">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>

                {/* Promo Input inside Drawer */}
                <div className="flex gap-2 pt-1">
                  <input 
                    type="text" 
                    placeholder="Add promo code" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-gray-100 rounded-full px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  <button 
                    type="button"
                    onClick={handleApplyPromo}
                    className="bg-black text-white px-5 py-2.5 rounded-full font-medium text-xs hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p className={`text-[10px] ${promoDiscount > 0 ? 'text-green-600 font-medium' : 'text-red-500'}`}>
                    {promoMessage}
                  </p>
                )}

                {/* Checkout Button */}
                <button 
                  type="button"
                  onClick={() => { setIsCartOpen(false); setIsCheckedOut(true); }}
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

      {/* Main Cart Content */}
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <p className="text-gray-500 text-sm mb-4">Home &gt; <span className="text-black font-medium">Cart</span></p>
        <h1 className="text-3xl font-extrabold text-black uppercase tracking-wide mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
            <p className="text-xl text-gray-600 mb-4">Your cart is empty!</p>
            <button 
              type="button"
              onClick={() => setCartItems([
                { id: 1, name: "Gradient Graphic T-shirt", size: "Large", color: "White", price: 145, quantity: 1, image: img30 },
                { id: 2, name: "Checkered Shirt", size: "Medium", color: "Red", price: 180, quantity: 1, image: img31 },
                { id: 3, name: "Skinny Fit Jeans", size: "Large", color: "Blue", price: 240, quantity: 1, image: img32 }
              ])}
              className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Reset Cart Items
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Side: Cart Items List */}
            <div className="lg:col-span-2 border border-gray-200 rounded-2xl p-4 sm:p-6 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-gray-100 last:border-b-0 last:pb-0 gap-4">
                  
                  {/* Product Image & Info */}
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl bg-gray-100" />
                    <div>
                      <h3 className="font-bold text-lg text-black">{item.name}</h3>
                      <p className="text-sm text-gray-500">Size: <span className="text-gray-700">{item.size}</span></p>
                      <p className="text-sm text-gray-500">Color: <span className="text-gray-700">{item.color}</span></p>
                      <p className="font-bold text-lg text-black mt-1">${item.price * item.quantity}</p>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex sm:flex-col justify-between items-end w-full sm:w-auto h-full">
                    
                    {/* Delete Button */}
                    <button 
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer flex items-center justify-center text-lg"
                      title="Remove item"
                      aria-label={`Remove ${item.name}`}
                    >
                      <FiTrash2 aria-hidden="true" />
                    </button>

                    {/* Quantity Selector */}
                    <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 gap-3 mt-4">
                      <button 
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        className="text-gray-600 hover:text-black font-bold text-lg px-1 cursor-pointer"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <FiMinus aria-hidden="true" />
                      </button>
                      <span className="font-semibold text-sm">{item.quantity}</span>
                      <button 
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                        className="text-gray-600 hover:text-black font-bold text-lg px-1 cursor-pointer"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <FiPlus aria-hidden="true" />
                      </button>
                    </div>

                  </div>

                </div>
              ))}
            </div>

            {/* Right Side: Order Summary */}
            <div className="border border-gray-200 rounded-2xl p-6 h-fit bg-white shadow-sm">
              <h2 className="text-xl font-bold text-black mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-black">${subtotal}</span>
                </div>
                <div className="flex justify-between text-red-500">
                  <span>Discount (-20%)</span>
                  <span>-${baseDiscount}</span>
                </div>
                
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600 text-sm">
                    <span>Promo Discount</span>
                    <span>-${promoDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-black">${deliveryFee}</span>
                </div>
                
                <hr className="border-gray-200 my-2" />

                <div className="flex justify-between text-lg font-bold text-black">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>

              {/* Promo Code Input & Apply */}
              <div className="mt-6">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Add promo code" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-gray-100 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <button 
                    type="button"
                    onClick={handleApplyPromo}
                    className="bg-black text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p className={`text-xs mt-2 ${promoDiscount > 0 ? 'text-green-600 font-medium' : 'text-red-500'}`}>
                    {promoMessage}
                  </p>
                )}
              </div>

              {/* Checkout Button */}
              <button 
                type="button"
                onClick={() => setIsCheckedOut(true)}
                className="w-full mt-6 bg-black text-white py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-lg cursor-pointer"
              >
                Go to Checkout 
                <FiArrowRight aria-hidden="true" />
              </button>

            </div>

          </div>
        )}

      </main>

      {/* Newsletter Banner & Footer Section matching Homepage */}
      <div className="relative mt-20">
        <div className="absolute -top-20 left-0 right-0 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterBanner onSubscribe={() => alert("Subscribed successfully!")} />
        </div>

        {/* Footer */}
        <footer className="bg-gray-100 pt-32 pb-12 text-gray-600 text-sm">
          {/* Footer Links Content */}
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
      </div>

    </div>
  );
}