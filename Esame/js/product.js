const endpoint = 'https://striveschool-api.herokuapp.com/api/product/';
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2ZhMjY4ZWNjMjZmODAwMTU1Y2JlMzYiLCJpYXQiOjE3NDQ0NDcxMTgsImV4cCI6MTc0NTY1NjcxOH0.HdmxfRCksO4dE8rPwo7eBcBk6HBy9tqlm1JOs8BtsJQ'; // Sostituisci con il tuo token

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const detailContainer = document.getElementById('product-detail');

if (id) {
  fetch(`${endpoint}${id}`, {
    headers: { Authorization: token }
  })
    .then(res => res.json())
    .then(product => {
      // Mostra i dettagli del prodotto
      detailContainer.innerHTML = `
        <div class="row">
          <div class="col-md-5">
            <img src="${product.imageUrl}" class="img-fluid rounded" alt="${product.name}" />
          </div>
          <div class="col-md-7">
            <h2>${product.name}</h2>
            <p class="text-muted">${product.brand}</p>
            <p>${product.description}</p>
            <h4 class="text-primary">${product.price} €</h4>
            <button id="add-to-cart" class="btn btn-success mt-3">Aggiungi al carrello</button>
          </div>
        </div>
      `;

      // Aggiungi al carrello
      document.getElementById('add-to-cart').addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productToAdd = { 
          id: product._id,
          name: product.name,
          price: product.price 
        };

        cart.push(productToAdd);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Prodotto aggiunto al carrello!');
      });
    })
    .catch(err => {
      detailContainer.innerHTML = `
        <div class="alert alert-danger">
          <strong>Errore!</strong> Si è verificato un problema nel caricamento del prodotto.
        </div>
      `;
      console.error(err);
    });
} else {
  detailContainer.innerHTML = `
    <div class="alert alert-danger">
      <strong>Errore!</strong> Si è verificato un problema. L'ID non è presente nell'URL.
    </div>
  `;
}
