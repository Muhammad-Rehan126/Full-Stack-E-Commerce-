import React, { useState } from 'react';
import { FiSearch, FiShoppingCart, FiUser, FiX, FiMenu, FiChevronDown, FiSliders, FiChevronDown as FiDown, FiTrash2, FiRotateCcw } from 'react-icons/fi';
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa';
import NewsletterBanner from './Newsletterbanner';

// Import product images
import img2 from '../assets/img-2.png';
import img3 from '../assets/img-3.png';
import img14 from '../assets/img-14.png';
import img15 from '../assets/img-15.png';
import img16 from '../assets/img-16.png';
import img30 from '../assets/img-30.png';

// Import images for related products section (17 to 20)
import img17 from '../assets/img-17.png';
import img18 from '../assets/img-18.png';
import img19 from '../assets/img-19.png';
import img20 from '../assets/img-20.png';

export default function ProductDetails() {
  const [activeImage, setActiveImage] = useState(img16);
  const [selectedColor, setSelectedColor] = useState('olive');
  const [selectedSize, setSelectedSize] = useState('Large');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('reviews'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [displayedReviewsCount, setDisplayedReviewsCount] = useState(4);

  // Permanent initial cart items for automatic full reset/restore
  const initialCartItems = [
    { id: 1, name: "Gradient Graphic T-shirt", size: "Large", color: "White", price: 145, quantity: 1, image: img30 },
    { id: 2, name: "Checkered Shirt", size: "Medium", color: "Red", price: 180, quantity: 1, image: img2 },
    { id: 3, name: "Skinny Fit Jeans", size: "Large", color: "Blue", price: 240, quantity: 1, image: img3 }
  ];

  // Cart Items State
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Initial related products list
  const initialRelatedProducts = [
    { id: 1, name: "Polo with Contrast Trims", price: 212, originalPrice: 242, discount: "-20%", rating: "4.0/5", img: img17 },
    { id: 2, name: "Gradient Graphic T-shirt", price: 145, rating: "3.5/5", img: img18 },
    { id: 3, name: "Polo with Tipping Details", price: 180, rating: "4.5/5", img: img19 },
    { id: 4, name: "Black Striped T-shirt", price: 120, originalPrice: 150, discount: "-20%", rating: "5.0/5", img: img20 },
  ];

  const [relatedProducts, setRelatedProducts] = useState(initialRelatedProducts);

  const [reviewsList, setReviewsList] = useState([
    { name: "Samantha D.", verified: true, text: "I absolutely love this t-shirt. The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail, it's become my favorite go-to shirt.", date: "August 14, 2023" },
    { name: "Alex M.", verified: true, text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.", date: "August 15, 2023" },
    { name: "Ethan R.", verified: true, text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.", date: "August 16, 2023" },
    { name: "Olivia P.", verified: true, text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.", date: "August 17, 2023" },
    { name: "Liam K.", verified: true, text: "No t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.", date: "August 18, 2023" },
    { name: "Ava H.", verified: true, text: "I'm not just wearing a t-shirt. I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.", date: "August 19, 2023" }
  ]);

  const [newReviewerName, setNewReviewerName] = useState('');
  const [newReviewText, setNewReviewText] = useState('');

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReviewerName || !newReviewText) return;
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    setReviewsList([{ name: newReviewerName, verified: true, text: newReviewText, date: currentDate }, ...reviewsList]);
    setNewReviewerName('');
    setNewReviewText('');
    setIsModalOpen(false);
  };

  const handleLoadMoreReviews = () => {
    setDisplayedReviewsCount(prev => prev + 2);
  };

  const handleAddToCart = (product) => {
    const newItem = {
      id: product ? product.id : Date.now(),
      name: product ? product.name : "One Life Graphic T-Shirt",
      size: selectedSize,
      color: selectedColor,
      price: product ? product.price : 260,
      quantity: 1,
      image: product ? product.img : activeImage
    };
    setCartItems(prev => {
      const existing = prev.find(item => item.name === newItem.name);
      if (existing) {
        return prev.map(item => item.name === newItem.name ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, newItem];
    });
    setToastMessage(`${newItem.name} added to cart!`);
    setTimeout(() => setToastMessage(''), 3000);
    setIsCartOpen(true);
  };

  // Reset/Restore cart items
  const handleResetCart = () => {
    setCartItems(initialCartItems);
  };

  // Delete individual related product card
  const handleDeleteRelatedProduct = (id, e) => {
    e.stopPropagation();
    setRelatedProducts(prev => prev.filter(item => item.id !== id));
  };

  // Reset/Restore related products cards
  const handleResetRelatedProducts = () => {
    setRelatedProducts(initialRelatedProducts);
    setToastMessage("Related products restored!");
    setTimeout(() => setToastMessage(''), 3000);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = Math.round(subtotalPrice * 0.20);
  const deliveryFee = cartItems.length > 0 ? 15 : 0;
  const finalTotal = subtotalPrice > 0 ? subtotalPrice - discountAmount + deliveryFee : 0;

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 relative selection:bg-black selection:text-white flex flex-col justify-between">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-black text-white px-6 py-3 rounded-xl shadow-lg text-sm transition-all duration-300">
          {toastMessage}
        </div>
      )}

      <div>
        {/* Announcement Bar */}
        {showAnnouncement && (
          <div className="bg-black text-white text-xs sm:text-sm py-2 px-4 relative flex items-center justify-center">
            <p className="text-center">
              Sign up and get 20% off to your first order. <span className="underline cursor-pointer font-medium">Sign Up Now</span>
            </p>
            <button 
              type="button"
              onClick={() => setShowAnnouncement(false)}
              className="absolute right-4 text-gray-400 hover:text-white text-lg font-bold cursor-pointer"
              title="Close banner"
            >
              <FiX size={16} />
            </button>
          </div>
        )}

        {/* Navbar */}
        <header className="sticky top-0 z-40 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
            <div className="font-extrabold text-2xl tracking-tight cursor-pointer">SHOP.CO</div>
            
            <nav className="hidden md:flex items-center space-x-6 text-sm text-gray-700">
              <span className="cursor-pointer flex items-center gap-1 hover:text-black">Shop <FiChevronDown size={14} /></span>
              <a href="#sale" className="hover:text-black">On Sale</a>
              <a href="#new" className="hover:text-black">New Arrivals</a>
              <a href="#brands" className="hover:text-black">Brands</a>
            </nav>

            <div className="hidden lg:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400"><FiSearch size={18} /></span>
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products..." className="w-full bg-[#F0F0F0] text-sm rounded-full pl-11 pr-4 py-2.5 focus:outline-none" />
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button onClick={() => setIsCartOpen(true)} className="text-black relative p-1 cursor-pointer bg-transparent border-none">
                <FiShoppingCart size={22} />
                {totalCartCount > 0 && <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{totalCartCount}</span>}
              </button>
              <a href="#profile" className="text-black"><FiUser size={22} /></a>
            </div>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-black p-2 cursor-pointer">
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </header>

        {/* Main Product Detail Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
            <a href="#home">Home</a> &gt; <a href="#shop">Shop</a> &gt; <a href="#men">Men</a> &gt; <span className="text-black font-medium">T-shirts</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            <div className="flex flex-col-reverse sm:flex-row gap-4">
              <div className="flex sm:flex-col justify-between gap-4">
                {[img16, img14, img15].map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(img)} className={`w-20 h-20 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 bg-gray-100 cursor-pointer transition hover:opacity-80 ${activeImage === img ? 'border-black' : 'border-transparent'}`}>
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <div className="flex-1 rounded-3xl overflow-hidden bg-gray-100 aspect-square flex items-center justify-center shadow-sm">
                <img src={activeImage} alt="Active" className="w-full h-full object-cover" />
              </div>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase mb-3">ONE LIFE GRAPHIC T-SHIRT</h2>
              <div className="flex items-center gap-2 mb-4 text-yellow-400 text-sm"><span>⭐⭐⭐⭐⭐</span> <span className="text-gray-600 font-medium">4.5/5</span></div>
              <div className="flex items-center gap-4 mb-5 text-2xl font-bold">
                <span>$260</span> <span className="text-gray-400 line-through">$300</span>
                <span className="bg-red-100 text-red-500 text-xs px-3 py-1 rounded-full">-40%</span>
              </div>
              <p className="text-gray-600 text-sm mb-6 pb-6 border-b">This graphic t-shirt is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.</p>

              {/* Select Colors Section */}
              <div className="mb-6 pb-6 border-b">
                <span className="block text-sm text-gray-500 mb-3 font-medium">Select Colors</span>
                <div className="flex gap-3">
                  <button onClick={() => setSelectedColor('olive')} className={`w-8 h-8 rounded-full bg-[#4F4631] flex items-center justify-center cursor-pointer transition hover:scale-105 ${selectedColor === 'olive' ? 'ring-2 ring-offset-2 ring-black' : ''}`}></button>
                  <button onClick={() => setSelectedColor('teal')} className={`w-8 h-8 rounded-full bg-[#314F4A] flex items-center justify-center cursor-pointer transition hover:scale-105 ${selectedColor === 'teal' ? 'ring-2 ring-offset-2 ring-black' : ''}`}></button>
                  <button onClick={() => setSelectedColor('navy')} className={`w-8 h-8 rounded-full bg-[#31384F] flex items-center justify-center cursor-pointer transition hover:scale-105 ${selectedColor === 'navy' ? 'ring-2 ring-offset-2 ring-black' : ''}`}></button>
                </div>
              </div>

              {/* Choose Size Section */}
              <div className="mb-6 pb-6 border-b">
                <p className="text-sm text-gray-500 mb-3 font-medium">Choose Size</p>
                <div className="flex gap-3">
                  {['Small', 'Medium', 'Large', 'X-Large'].map(size => (
                    <button key={size} onClick={() => setSelectedSize(size)} className={`px-5 py-2.5 rounded-full text-sm font-medium cursor-pointer transition hover:bg-gray-200 ${selectedSize === size ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>{size}</button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-100 rounded-full px-5 py-3 gap-6">
                  <button onClick={() => setQuantity(p => Math.max(1, p - 1))} className="font-bold cursor-pointer text-lg">-</button>
                  <span className="font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(p => p + 1)} className="font-bold cursor-pointer text-lg">+</button>
                </div>
                <button onClick={() => handleAddToCart(null)} className="flex-1 bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 transition cursor-pointer shadow-lg">Add to Cart</button>
              </div>
            </div>
          </div>
        </main>

        {/* Tabs & Content Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex border-b border-gray-200 justify-around text-center mb-10">
            <button 
              onClick={() => setActiveTab('details')} 
              className={`pb-4 flex-1 font-medium border-b-2 cursor-pointer transition hover:text-black ${activeTab === 'details' ? 'border-black text-black' : 'border-transparent text-gray-400'}`}
            >
              Product Details
            </button>
            <button 
              onClick={() => setActiveTab('reviews')} 
              className={`pb-4 flex-1 font-medium border-b-2 cursor-pointer transition hover:text-black ${activeTab === 'reviews' ? 'border-black text-black' : 'border-transparent text-gray-400'}`}
            >
              Rating & Reviews
            </button>
            <button 
              onClick={() => setActiveTab('faqs')} 
              className={`pb-4 flex-1 font-medium border-b-2 cursor-pointer transition hover:text-black ${activeTab === 'faqs' ? 'border-black text-black' : 'border-transparent text-gray-400'}`}
            >
              FAQs
            </button>
          </div>

          {activeTab === 'details' && (
            <div className="bg-gray-50 rounded-3xl p-8 transition-all animate-fadeIn">
              <h3 className="text-xl font-bold mb-4">About the Product</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                This graphic t-shirt is tailored from premium quality 100% cotton fabric ensuring maximum breathability and durability. Ideal for casual outings, daily wear, or pairing up with your favorite denim jeans and jackets.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                <li>Soft touch and lightweight jersey material</li>
                <li>Ribbed crew neckline for a snug fit</li>
                <li>Machine washable and fade-resistant print</li>
              </ul>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="animate-fadeIn">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold flex items-center gap-2">All Reviews <span className="text-sm font-normal text-gray-500">({reviewsList.length})</span></h3>
                <div className="flex items-center gap-3">
                  <button className="bg-gray-100 p-2.5 rounded-full text-gray-700 hover:bg-gray-200 transition cursor-pointer"><FiSliders size={18} /></button>
                  <button className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-gray-200 transition cursor-pointer">Latest <FiDown size={14} /></button>
                  <button onClick={() => setIsModalOpen(true)} className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition cursor-pointer">Write a Review</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {reviewsList.slice(0, displayedReviewsCount).map((review, i) => (
                  <div key={i} className="border border-gray-200 rounded-3xl p-6 bg-white shadow-sm flex flex-col justify-between hover:shadow-md transition">
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-yellow-400 text-sm">⭐⭐⭐⭐⭐</span>
                        <span className="text-gray-400 cursor-pointer font-bold">...</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <h4 className="font-bold text-base">{review.name}</h4>
                        {review.verified && <span className="bg-green-500 text-white rounded-full p-0.5 text-[10px]">✓</span>}
                      </div>
                      <p className="text-gray-600 text-sm my-3">"{review.text}"</p>
                    </div>
                    <span className="text-gray-400 text-xs mt-2">Posted on {review.date}</span>
                  </div>
                ))}
              </div>

              {displayedReviewsCount < reviewsList.length && (
                <div className="flex justify-center mb-16">
                  <button 
                    onClick={handleLoadMoreReviews} 
                    className="border border-gray-300 px-8 py-3 rounded-full text-sm font-medium hover:bg-black hover:text-white transition duration-300 cursor-pointer shadow-sm"
                  >
                    Load More Reviews
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="space-y-4 max-w-3xl mx-auto animate-fadeIn">
              <div className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm">
                <h4 className="font-bold text-base mb-1">What is the shipping time?</h4>
                <p className="text-sm text-gray-600">Standard delivery typically takes 3 to 5 business days depending on your location in Karachi or other cities.</p>
              </div>
              <div className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm">
                <h4 className="font-bold text-base mb-1">Can I exchange the size if it doesn't fit?</h4>
                <p className="text-sm text-gray-600">Yes, we offer hassle-free exchanges within 7 days of order delivery.</p>
              </div>
              <div className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm">
                <h4 className="font-bold text-base mb-1">What payment methods are supported?</h4>
                <p className="text-sm text-gray-600">We accept Cash on Delivery (COD), Credit/Debit cards (Visa/Mastercard), and online wallets like Apple Pay and PayPal.</p>
              </div>
            </div>
          )}
        </section>

        {/* Related Products Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase">YOU MIGHT ALSO LIKE</h3>
            {relatedProducts.length === 0 && (
              <button 
                type="button"
                onClick={handleResetRelatedProducts}
                className="bg-black text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-gray-800 transition flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <FiRotateCcw size={14} /> Reset Related Products
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((product) => (
                <div key={product.id} className="flex flex-col group cursor-pointer relative">
                  {/* Delete button on product card */}
                  <button 
                    onClick={(e) => handleDeleteRelatedProduct(product.id, e)}
                    className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-red-600 hover:text-white text-gray-700 p-2 rounded-full transition shadow-md cursor-pointer"
                    title="Remove Card"
                  >
                    <FiTrash2 size={14} />
                  </button>

                  <div className="bg-gray-100 rounded-3xl overflow-hidden aspect-square mb-3 relative">
                    <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                      className="absolute bottom-3 right-3 bg-black text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition shadow cursor-pointer"
                    >
                      + Add to Cart
                    </button>
                  </div>
                  <h4 className="font-bold text-sm group-hover:underline">{product.name}</h4>
                  <div className="text-yellow-400 text-xs my-1">⭐⭐⭐⭐☆ <span className="text-gray-500">{product.rating}</span></div>
                  <div className="flex items-center gap-2 font-bold text-base">
                    <span>${product.price}</span>
                    {product.originalPrice && <span className="text-gray-400 line-through">${product.originalPrice}</span>}
                    {product.discount && <span className="bg-red-100 text-red-500 text-[10px] px-2 py-0.5 rounded-full">{product.discount}</span>}
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 py-6">All related products are deleted. Click "Reset Related Products" above to restore them.</p>
            )}
          </div>
        </section>

        {/* Newsletter Section - Placed right above the footer */}
        <NewsletterBanner onSubscribe={() => alert("Subscribed successfully!")} />
      </div>

      {/* Footer */}
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
          <p>Shop.co © 2000-2025, All Rights Reserved</p>
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

      {/* Professional Full-Height Right-Side Sliding Cart Drawer */}
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
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl bg-gray-100 border border-gray-100" />
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
                  <span>→</span>
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Write Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 relative shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute right-5 top-5 font-bold cursor-pointer text-gray-500 hover:text-black">✕</button>
            <h3 className="text-xl font-bold mb-4">Write a Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-3">
              <input type="text" value={newReviewerName} onChange={(e) => setNewReviewerName(e.target.value)} placeholder="Your Name" className="w-full bg-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none" required />
              <textarea value={newReviewText} onChange={(e) => setNewReviewText(e.target.value)} placeholder="Your Review" rows="3" className="w-full bg-gray-100 rounded-xl p-4 text-sm focus:outline-none" required></textarea>
              <button type="submit" className="w-full bg-black text-white py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition cursor-pointer">Submit Review</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}