function main() {
    const products = [
        { id: 'p1', name: '상품1', price: 10000 },
        { id: 'p2', name: '상품2', price: 20000 },
        { id: 'p3', name: '상품3', price: 30000 }
    ];

    const app = document.getElementById('app');
    const wrapper = createElement('div', 'bg-gray-100 p-8');
    const container = createElement('div', 'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8');
    const title = createElement('h1', 'text-2xl font-bold mb-4', '장바구니');
    const cartItems = createElement('div', '', '', 'cart-items');
    const totalElement = createElement('div', 'text-xl font-bold my-4', '', 'cart-total');
    const productSelect = createProductSelect(products);
    const addButton = createElement('button', 'bg-blue-500 text-white px-4 py-2 rounded', '추가', 'add-to-cart');

    appendChildren(container, [title, cartItems, totalElement, productSelect, addButton]);
    wrapper.appendChild(container);
    app.appendChild(wrapper);

    addButton.onclick = () => addToCart(products, productSelect, cartItems);
    cartItems.onclick = (event) => handleCartItemClick(event, products);

    function createElement(tag, className, textContent, id) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (textContent) element.textContent = textContent;
        if (id) element.id = id;
        return element;
    }

    function appendChildren(parent, children) {
        children.forEach(child => parent.appendChild(child));
    }

    function createProductSelect(products) {
        const select = createElement('select', 'border rounded p-2 mr-2', '', 'product-select');
        products.forEach(product => {
            const option = createElement('option');
            option.value = product.id;
            option.textContent = `${product.name} - ${product.price}원`;
            select.appendChild(option);
        });
        return select;
    }

    function updateCart(products) {
        let totalQuantity = 0;
        let subtotal = 0;
        let totalAmount = 0;
        const items = document.getElementById('cart-items').children;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const product = products.find(p => p.id === item.id);
            const quantity = parseInt(item.querySelector('span').textContent.split('x ')[1]);
            const itemTotal = product.price * quantity;
            let discount = 0;

            totalQuantity += quantity;
            subtotal += itemTotal;
            if (quantity >= 10) {
                discount = getQuantityDiscount(product.id);
            }
            totalAmount += itemTotal * (1 - discount);
        }

        const bulkDiscount = getBulkDiscount(totalQuantity, totalAmount, subtotal);
        totalAmount = applyBulkDiscount(bulkDiscount, subtotal, totalAmount);

        updateTotalDisplay(totalAmount, bulkDiscount);
    }

    function getQuantityDiscount(productId) {
        const discounts = { p1: 0.1, p2: 0.15, p3: 0.2 };
        return discounts[productId] || 0;
    }

    function getBulkDiscount(totalQuantity, totalAmount, subtotal) {
        if (totalQuantity >= 30) {
            const bulkDiscount = totalAmount * 0.25;
            const individualDiscount = subtotal - totalAmount;
            return bulkDiscount > individualDiscount ? 0.25 : (subtotal - totalAmount) / subtotal;
        }
        return (subtotal - totalAmount) / subtotal;
    }

    function applyBulkDiscount(bulkDiscount, subtotal, totalAmount) {
        return bulkDiscount === 0.25 ? subtotal * 0.75 : totalAmount;
    }

    function updateTotalDisplay(totalAmount, discountRate) {
        const totalElement = document.getElementById('cart-total');
        totalElement.textContent = `총액: ${Math.round(totalAmount)}원`;
        if (discountRate > 0) {
            const discountSpan = createElement('span', 'text-green-500 ml-2', `(${(discountRate * 100).toFixed(1)}% 할인 적용)`);
            totalElement.appendChild(discountSpan);
        }
    }

    function addToCart(products, productSelect, cartItems) {
        const selectedProduct = products.find(p => p.id === productSelect.value);
        if (selectedProduct) {
            const existingItem = document.getElementById(selectedProduct.id);
            if (existingItem) {
                updateItemQuantity(existingItem, 1);
            } else {
                const newItem = createCartItem(selectedProduct);
                cartItems.appendChild(newItem);
            }
            updateCart(products);
        }
    }

    function createCartItem(product) {
        const item = createElement('div', 'flex justify-between items-center mb-2', '', product.id);
        const span = createElement('span', '', `${product.name} - ${product.price}원 x 1`);
        const buttonContainer = createElement('div');
        const decreaseButton = createQuantityButton('-', product.id, -1);
        const increaseButton = createQuantityButton('+', product.id, 1);
        const removeButton = createElement('button', 'remove-item bg-red-500 text-white px-2 py-1 rounded', '삭제');
        removeButton.dataset.productId = product.id;

        appendChildren(buttonContainer, [decreaseButton, increaseButton, removeButton]);
        appendChildren(item, [span, buttonContainer]);
        return item;
    }

    function createQuantityButton(text, productId, change) {
        const button = createElement('button', 'quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1', text);
        button.dataset.productId = productId;
        button.dataset.change = change;
        return button;
    }

    function handleCartItemClick(event, products) {
        const target = event.target;
        if (target.classList.contains('quantity-change') || target.classList.contains('remove-item')) {
            const productId = target.dataset.productId;
            const item = document.getElementById(productId);
            if (target.classList.contains('quantity-change')) {
                updateItemQuantity(item, parseInt(target.dataset.change));
            } else if (target.classList.contains('remove-item')) {
                item.remove();
            }
            updateCart(products);
        }
    }

    function updateItemQuantity(item, change) {
        const span = item.querySelector('span');
        const [text, quantity] = span.textContent.split('x ');
        const newQuantity = parseInt(quantity) + change;
        if (newQuantity > 0) {
            span.textContent = `${text}x ${newQuantity}`;
        } else {
            item.remove();
        }
    }
}

main();