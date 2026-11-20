const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

const request = async (path, options = {}) => {
  const method = options.method || 'GET';
  const token = sessionStorage.getItem('adminToken');
  const needsAdminKey = path === '/admin/verify'
    || (path.startsWith('/products') && method !== 'GET');
  const headers = { 'Content-Type': 'application/json', ...options.headers };

  if (needsAdminKey && token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });
  const data = response.status === 204 ? null : await response.json();

  if (!response.ok) {
    throw new Error(data?.error || 'Request failed. Check that the backend and database are running.');
  }

  return data;
};

export const fetchProducts = (filters = {}) => {
  const params = new URLSearchParams(
    Object.entries(filters).filter(([, value]) => value !== undefined && value !== '')
  );
  return request(`/products${params.size ? `?${params}` : ''}`);
};

export const fetchProductById = (id) => request(`/products/${encodeURIComponent(id)}`);

export const submitProductReview = (id, review) => request(`/products/${encodeURIComponent(id)}/reviews`, {
  method: 'POST',
  body: JSON.stringify(review)
});

export const subscribeToNewsletter = (email) => request('/newsletter/subscribe', {
  method: 'POST',
  body: JSON.stringify({ email })
});

export const createProduct = (product) => request('/products', {
  method: 'POST',
  body: JSON.stringify(product)
});

export const updateProduct = (id, product) => request(`/products/${id}`, {
  method: 'PUT',
  body: JSON.stringify(product)
});

export const deleteProduct = (id) => request(`/products/${id}`, { method: 'DELETE' });

export const verifyAdmin = (token) => request('/admin/verify', {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}` }
});

export const placeOrder = (cartItems, totalAmount) => request('/orders/checkout', {
  method: 'POST',
  body: JSON.stringify({ cartItems, totalAmount })
});