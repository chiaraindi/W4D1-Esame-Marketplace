const endpoint = 'https://striveschool-api.herokuapp.com/api/product/';
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2ZhMjY4ZWNjMjZmODAwMTU1Y2JlMzYiLCJpYXQiOjE3NDQ0NDcxMTgsImV4cCI6MTc0NTY1NjcxOH0.HdmxfRCksO4dE8rPwo7eBcBk6HBy9tqlm1JOs8BtsJQ';

const form = document.getElementById('product-form');
const productList = document.getElementById('product-list');

const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const brandInput = document.getElementById('brand');
const imageUrlInput = document.getElementById('imageUrl');
const priceInput = document.getElementById('price');
const idInput = document.getElementById('product-id');

// Carica prodotti
const loadProducts = () => {
  fetch(endpoint, {
    headers: { Authorization: token }
  })
    .then(res => res.json())
    .then(products => {
      productList.innerHTML = "";
      products.forEach(p => {
        const li = document.createElement('li');
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
          <span><strong>${p.name}</strong> - ${p.price}€</span>
          <div>
            <button class="btn btn-sm btn-warning me-2" onclick="editProduct('${p._id}')">Modifica</button>
            <button class="btn btn-sm btn-danger" onclick="deleteProduct('${p._id}')">Elimina</button>
          </div>
        `;
        productList.appendChild(li);
      });
    });
};

// Salva prodotto (POST o PUT)
form.addEventListener('submit', e => {
  e.preventDefault();
  const product = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: imageUrlInput.value,
    price: parseFloat(priceInput.value),
  };

  const id = idInput.value;
  const method = id ? 'PUT' : 'POST';
  const url = id ? `${endpoint}${id}` : endpoint;

  fetch(url, {
    method,
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  })
    .then(res => res.json())
    .then(() => {
      form.reset();
      idInput.value = '';
      loadProducts();
    });
});

// Modifica
window.editProduct = (id) => {
  fetch(`${endpoint}${id}`, {
    headers: { Authorization: token }
  })
    .then(res => res.json())
    .then(p => {
      nameInput.value = p.name;
      descriptionInput.value = p.description;
      brandInput.value = p.brand;
      imageUrlInput.value = p.imageUrl;
      priceInput.value = p.price;
      idInput.value = p._id;
    });
};

// Elimina
window.deleteProduct = (id) => {
  if (confirm("Vuoi davvero eliminare il prodotto?")) {
    fetch(`${endpoint}${id}`, {
      method: 'DELETE',
      headers: { Authorization: token }
    }).then(() => loadProducts());
  }
};

loadProducts();
