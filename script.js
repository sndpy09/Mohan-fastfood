const menu = [
  ["Egg Roll", "🌯", "स्वादिष्ट एग रोल", 45],
  ["Manchurian", "🥣", "Half ₹20 • Full ₹40", 20],
  ["Chowmein", "🍜", "Half ₹15 • Full ₹30", 15],
  ["Chola", "🍛", "Half ₹15 • Full ₹30", 15],
  ["Burger", "🍔", "Fresh & tasty", 25],
  ["Cold Drink", "🥤", "Available", 20]
];

let cart = [];

const grid = document.getElementById("grid");

menu.forEach((item, index) => {
  grid.innerHTML += `
    <div class="card">
      <div class="icon">${item[1]}</div>
      <h3>${item[0]}</h3>
      <p>${item[2]}</p>
      <div class="price">₹${item[3]}</div>
      <button class="add" onclick="add(${index})">+ Add</button>
    </div>
  `;
});

function add(index) {
  cart.push(menu[index]);
  showCart();
}

function showCart() {
  const cartBox = document.getElementById("cart");
  const totalBox = document.getElementById("total");

  if (cart.length === 0) {
    cartBox.innerHTML = "Cart खाली है।";
  } else {
    cartBox.innerHTML = cart.map((item, index) => `
      <p>
        ${item[1]} ${item[0]} — ₹${item[3]}
        <button onclick="removeItem(${index})">×</button>
      </p>
    `).join("");
  }

  const total = cart.reduce((sum, item) => sum + item[3], 0);
  totalBox.textContent = "₹" + total;
}

function removeItem(index) {
  cart.splice(index, 1);
  showCart();
}

function send() {
  if (cart.length === 0) {
    alert("पहले कोई item Add करें।");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item[3], 0);
  const name = document.getElementById("name").value || "Customer";
  const address =
    document.getElementById("address").value || "Address बाद में बताऊँगा";

  const items = cart
    .map(item => `${item[0]} - ₹${item[3]}`)
    .join("\n");

  const message =
    `Mohan Fastfood Order\n` +
    `Name: ${name}\n` +
    `Address: ${address}\n\n` +
    `${items}\n\n` +
    `Total: ₹${total}`;

  window.open(
    "https://wa.me/919721580699?text=" +
      encodeURIComponent(message),
    "_blank"
  );
}

showCart();
