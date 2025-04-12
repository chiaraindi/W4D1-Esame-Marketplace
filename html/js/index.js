const endpoint = 'https://striveschool-api.herokuapp.com/api/product/';
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2ZhMjY4ZWNjMjZmODAwMTU1Y2JlMzYiLCJpYXQiOjE3NDQ0NDcxMTgsImV4cCI6MTc0NTY1NjcxOH0.HdmxfRCksO4dE8rPwo7eBcBk6HBy9tqlm1JOs8BtsJQ';

fetch(endpoint, {
  headers: { Authorization: token }
})
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById("product-list");
    products.forEach(p => {
      container.innerHTML += `
        <div class="col">
          <div class="card h-100">
            <img src="${p.imageUrl}" class="card-img-top" style="height: 200px; object-fit: cover;" />
            <div class="card-body">
              <h5 class="card-title">${p.name}</h5>
              <p class="card-text">${p.description}</p>
              <a href="product.html?id=${p._id}" class="btn btn-primary">Scopri di più</a>
            </div>
          </div>
        </div>
      `;
    });
  })
  .catch(err => console.error("Errore nel fetch dei prodotti:", err));
