// Sample meals data
const meals = [
  { id: 1, name: "Margherita Pizza", price: 8.99, img: "https://via.placeholder.com/200" },
  { id: 2, name: "Cheeseburger", price: 6.99, img: "https://via.placeholder.com/200" },
  { id: 3, name: "Sushi Platter", price: 12.99, img: "https://via.placeholder.com/200" },
  { id: 4, name: "Pasta Alfredo", price: 9.99, img: "https://via.placeholder.com/200" }
];

let cart = [];

const mealList = document.getElementById("meal-list");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const cartEl = document.getElementById("cart");

// Display meals
function displayMeals() {
  meals.forEach(m => {
    const mealEl = document.createElement("div");
    mealEl.classList.add("meal");
    mealEl.innerHTML = `
      <img src="${m.img}" alt="${m.name}">
      <h3>${m.name}</h3>
      <p>$${m.price.toFixed(2)}</p>
      <button onclick="addToCart(${m.id})">Add to Cart</button>
    `;
    mealList.appendChild(mealEl);
  });
}

// Add meal to cart
function addToCart(id) {
  const meal = meals.find(m => m.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) existing.qty++;
  else cart.push({ ...meal, qty: 1 });

  updateCart();
}

// Update cart display
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    const li = document.createElement("li");
    li.innerHTML = `${item.name} x${item.qty} <span>$${(item.price * item.qty).toFixed(2)}</span>`;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
}

// Toggle cart sidebar
function toggleCart() {
  cartEl.classList.toggle("active");
}

// Checkout simulation
function checkout() {
  if (cart.length === 0) return alert("Cart is empty!");
  alert("Order placed successfully! 🍽️");
  cart = [];
  updateCart();
  toggleCart();
}

// Initialize
displayMeals();
// Clear the cart
function clearCart() {
  if (cart.length === 0) return alert("Cart is already empty!");
  cart = [];
  updateCart();
  alert("Cart has been cleared! 🗑️");
}
