const endpoint = 'https://striveschool-api.herokuapp.com/api/product/';
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2ZhMjY4ZWNjMjZmODAwMTU1Y2JlMzYiLCJpYXQiOjE3NDQ0NDcxMTgsImV4cCI6MTc0NTY1NjcxOH0.HdmxfRCksO4dE8rPwo7eBcBk6HBy9tqlm1JOs8BtsJQ';

fetch(endpoint, {
  headers: { Authorization: token }
})
  .then(res => {
    if (!res.ok) {
      throw new Error(`Errore nella risposta: ${res.status}`);
    }
    return res.json();
  })
  .then(products => {
    const container = document.getElementById("product-list");
    products.forEach(p => {
      // Crea card
      const colDiv = document.createElement('div');
      colDiv.classList.add('col');

      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card', 'h-100');

      const img = document.createElement('img');
      img.src = p.imageUrl;
      img.classList.add('card-img-top');
      img.style.height = '200px';
      img.style.objectFit = 'cover';

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      const title = document.createElement('h5');
      title.classList.add('card-title');
      title.textContent = p.name;

      const description = document.createElement('p');
      description.classList.add('card-text');
      description.textContent = p.description;

      const btn = document.createElement('a');
      btn.classList.add('btn');
      btn.classList.add('custom-btn');
      btn.href = `product.html?id=${p._id}`;
      btn.textContent = 'Guarda il prodotto';

      // Aggiungi tutti gli elementi alla card
      cardBody.appendChild(title);
      cardBody.appendChild(description);
      cardBody.appendChild(btn);

      cardDiv.appendChild(img);
      cardDiv.appendChild(cardBody);

      colDiv.appendChild(cardDiv);

      // Aggiungi la card alla lista dei prodotti
      container.appendChild(colDiv);
    });
  })
  .catch(err => {
    console.error("Errore nel fetch dei prodotti:", err);
    alert("Si è verificato un errore nel caricare i prodotti.");
  });