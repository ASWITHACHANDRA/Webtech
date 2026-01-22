// Requirement: Array of products 
let cart = [];
let couponDiscount = 0;

// Requirement: Add items dynamically [cite: 22]
function addToCart(name, price, category) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, category, quantity: 1 });
    }
    renderCart();
}

// Requirement: Remove items [cite: 22]
function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

// Requirement: Use string methods to validate coupon codes 
function applyCoupon() {
    const code = document.getElementById('couponInput').value.trim().toUpperCase();
    
    if (code.startsWith("SAVE") && code.length === 6) {
        const value = parseInt(code.substring(4)); // Extracts numbers after 'SAVE'
        if (!isNaN(value)) {
            couponDiscount = value;
            alert(`Coupon Applied: $${value} off!`);
        }
    } else {
        alert("Invalid Coupon Code Format.");
        couponDiscount = 0;
    }
    renderCart();
}

// Requirement: Dynamic price updates and rule-driven discounts [cite: 23, 25, 26]
function renderCart() {
    const cartBody = document.getElementById('cartBody');
    cartBody.innerHTML = '';
    
    let subtotal = 0;
    let savings = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        // Rule: Bulk Discount (10% off if quantity > 5) [cite: 23]
        if (item.quantity > 5) {
            savings += itemTotal * 0.10;
        }

        // Rule: Category Discount (Electronics get $20 off if total > $500) [cite: 23]
        if (item.category === 'Electronics' && itemTotal > 500) {
            savings += 20;
        }

        cartBody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>$${item.price}</td>
                <td>${item.quantity}</td>
                <td><button onclick="removeFromCart(${index})">Remove</button></td>
            </tr>
        `;
    });

    // Requirement: Apply multiple discounts [cite: 25]
    let finalTotal = subtotal - savings - couponDiscount;
    if (finalTotal < 0) finalTotal = 0;

    // Requirement: Display in real time 
    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('discountTotal').innerText = (savings + couponDiscount).toFixed(2);
    document.getElementById('finalTotal').innerText = finalTotal.toFixed(2);
}