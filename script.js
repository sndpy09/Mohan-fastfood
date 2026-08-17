// ================================
// MOHAN FASTFOOD - ORDER SCRIPT
// WhatsApp: +91 97215 80699
// ================================

const WHATSAPP_NUMBER = "919721580699";
const MINIMUM_ORDER = 100;

let cart = [];

// Add item to cart
function addToCart(name, price, quantity = 1) {
    price = Number(price);
    quantity = Number(quantity);

    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: quantity
        });
    }

    updateCart();
}

// Remove item completely
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCart();
}

// Change quantity
function changeQuantity(name, amount) {
    const item = cart.find(item => item.name === name);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeFromCart(name);
        return;
    }

    updateCart();
}

// Calculate total
function getCartTotal() {
    return cart.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
    );
}

// Update cart display
function updateCart() {
    const cartContainer = document.getElementById("cart-items");
    const totalElement = document.getElementById("cart-total");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Cart खाली है</p>";
    } else {
        cart.forEach(item => {
            const div = document.createElement("div");

            div.className = "cart-item";

            div.innerHTML = `
                <div>
                    <strong>${item.name}</strong><br>
                    ₹${item.price} × ${item.quantity}
                </div>

                <div>
                    <button onclick="changeQuantity('${item.name}', -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity('${item.name}', 1)">+</button>
                    <button onclick="removeFromCart('${item.name}')">❌</button>
                </div>
            `;

            cartContainer.appendChild(div);
        });
    }

    const total = getCartTotal();

    if (totalElement) {
        totalElement.textContent = `₹${total}`;
    }
}

// WhatsApp order
function orderOnWhatsApp() {

    if (cart.length === 0) {
        alert("पहले कोई item cart में add करें।");
        return;
    }

    const total = getCartTotal();

    if (total < MINIMUM_ORDER) {
        alert(
            `Home delivery के लिए minimum order ₹${MINIMUM_ORDER} होना चाहिए।\n\n` +
            `Current total: ₹${total}`
        );
        return;
    }

    const nameInput = document.getElementById("customer-name");
    const addressInput = document.getElementById("customer-address");
    const phoneInput = document.getElementById("customer-phone");

    const name = nameInput ? nameInput.value.trim() : "";
    const address = addressInput ? addressInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";

    if (!name) {
        alert("अपना नाम डालें।");
        return;
    }

    if (!phone) {
        alert("अपना मोबाइल नंबर डालें।");
        return;
    }

    if (!address) {
        alert("अपना delivery address डालें।");
        return;
    }

    let message = "🍔 *MOHAN FASTFOOD - NEW ORDER* 🍔\n\n";

    message += `👤 Name: ${name}\n`;
    message += `📱 Mobile: ${phone}\n`;
    message += `📍 Address: ${address}\n\n`;

    message += "🛒 *ORDER DETAILS*\n";
    message += "--------------------------\n";

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;

        message += `${index + 1}. ${item.name}\n`;
        message += `   ${item.quantity} × ₹${item.price} = ₹${itemTotal}\n`;
    });

    message += "----------------const menu = [
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
