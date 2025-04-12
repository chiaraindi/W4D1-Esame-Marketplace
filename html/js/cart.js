// Visualizzare il carrello quando si clicca sull'icona
document.getElementById('view-cart-btn').addEventListener('click', (e) => {
  e.preventDefault();

  // Recupera i prodotti dal localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartOverlay = document.getElementById('cart-overlay');
  const cartItemsContainer = document.getElementById('cart-items');

  // Se il carrello è vuoto, mostra un messaggio
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Il carrello è vuoto.</p>';
  } else {
    // Aggiungi i prodotti al carrello
    cartItemsContainer.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        <strong>${item.name}</strong> - ${item.price} €
        <button class="remove-btn btn btn-danger btn-sm" data-index="${index}">Rimuovi</button>
      </div>
    `).join('');
  }

  cartOverlay.style.display = 'block'; // overlay
});

// Funzione per rimuovere il prodotto dal carrello
document.getElementById('cart-items').addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    const index = e.target.getAttribute('data-index');
    removeFromCart(index);
  }
});

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1); // Rimuovi l'elemento all'indice specificato
  localStorage.setItem('cart', JSON.stringify(cart)); // Salva il nuovo stato del carrello

  // Ricarica la visualizzazione del carrello
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <strong>${item.name}</strong> - ${item.price} €
      <button class="remove-btn btn btn-danger btn-sm" data-index="${index}">Rimuovi</button>
    </div>
  `).join('');
}

// Chiudi il carrello
document.getElementById('close-cart').addEventListener('click', () => {
  const cartOverlay = document.getElementById('cart-overlay');
  cartOverlay.style.display = 'none'; // Nascondi l'overlay
});
