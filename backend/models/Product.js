const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, trim: true, sparse: true, unique: true },
  category: { type: String, required: true, default: 'General' },
  stock: { type: Number, default: 10 },
  price: { type: Number, required: true },
  status: { type: String, default: 'Active' },
  img: { type: String },
  image: { type: String },
  oldPrice: { type: Number },
  discount: { type: String },
  rating: { type: String, default: 'New' },
  reviews: [{
    name: { type: String, required: true, trim: true, maxlength: 80 },
    text: { type: String, required: true, trim: true, maxlength: 2000 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now }
  }],
  homepageSection: { type: String, enum: ['new-arrival', 'top-selling'], default: 'new-arrival' },
  color: { type: String },
  style: { type: String }
}, { timestamps: true });

productSchema.pre('validate', function syncImageFields() {
  this.img = this.img || this.image;
  this.image = this.image || this.img;
});

productSchema.pre('findOneAndUpdate', function syncImageFields() {
  const update = this.getUpdate();
  if (!update) return;

  const fields = update.$set || update;
  const image = fields.img || fields.image;
  if (image) {
    fields.img = image;
    fields.image = image;
  }
  this.setUpdate(update);
});

module.exports = mongoose.model('Product', productSchema);