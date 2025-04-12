const endpoint = 'https://striveschool-api.herokuapp.com/api/product/';
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2ZhMjY4ZWNjMjZmODAwMTU1Y2JlMzYiLCJpYXQiOjE3NDQ0NDcxMTgsImV4cCI6MTc0NTY1NjcxOH0.HdmxfRCksO4dE8rPwo7eBcBk6HBy9tqlm1JOs8BtsJQ';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const detailContainer = document.getElementById('product-detail');

if (id) {
  fetch(`${endpoint}${id}`, {
    headers: { Authorization: token }
  })
    .then(res => res.json())
    .then(p => {
      detailContainer.innerHTML = `
        <div class="row">
          <div class="col-md-5">
            <img src="${p.imageUrl}" class="img-fluid rounded" alt="${p.name}" />
          </div>
          <div class="col-md-7">
            <h2>${p.name}</h2>
            <p class="text-muted">${p.brand}</p>
            <p>${p.description}</p>
            <h4 class="text-primary">${p.price} €</h4>
            <a href="#" class="btn btn-success mt-3">Aggiungi al carrello</a>
          </div>
        </div>
      `;
    })
    .catch(err => {
      detailContainer.innerHTML = `
        <div class="alert alert-danger">
          <strong>Errore!</strong> Si è verificato un problema nel caricamento del prodotto. Riprova più tardi.
        </div>
      `;
      console.error(err);
    });
} else {
  detailContainer.innerHTML = "<p>ID non trovato nell'URL.</p>";
}