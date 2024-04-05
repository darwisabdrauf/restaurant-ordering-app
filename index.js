import { menuArray } from '/data.js'

const menu = document.getElementById("all-menus")
const orderSummary = document.getElementById("order-summary")
const paymentModal = document.getElementById("payment-modal")
const paymentForm = document.getElementById("payment-form")
let order = []

function renderMenu() {
    menu.innerHTML = menuArray.map((menu) => {
        return `
            <div class="menu-item">
                <p "class="menu-img" style="font-size: 40px; role="img "alt="menu no 1">${menu.emoji}</p>
                <div class="menu-desc">
                    <h2 class="menu-name">${menu.name}</h2>
                    <span class="menu-ingredients">${menu.ingredients.join(', ')}</span>
                    <span class="menu-price">RM ${menu.price}</span>
                </div>
                <div>
                    <button class="btn add-to-cart-btn" data-id=${menu.id}>&plus;</button>
                </div>
            </div>
        `
        
    }).join('')
}

renderMenu()

function handleOrderSummary(menuId) {
    const targetMenu = menuArray.filter((menu) => {
        return menu.id === parseInt(menuId) 
    })[0]

    order.push(targetMenu)
    console.log(order)

    renderOrderSummary()

    if (order.length !== 0) {
        const paymentBtn = document.getElementById("checkout-btn")
    
        paymentBtn.addEventListener('click', () => {
            paymentModal.style.display = 'block'
        })
    } 
}

function renderOrderSummary() {
    let totalPrice = order.reduce((total, currentItem) => {
        return total + currentItem.price
    }, 0)

    orderSummary.innerHTML = `
        <h3 class="order-title">Your Order</h3>
        <div class="summary-list">
            ${order.map((item, index) => {
                return `
                    <div>
                        <p class="menu">${item.name}</p>
                        <span class="remove-item" id="remove-item" data-index=${index} title="remove this item">&minus;</span>
                    </div>
                    <p class="price">RM ${item.price}</p>
                `
            }).join('')}
        <br>
        </div>
        <div>
            <p class="total-price-text">Total Price</p><p class="total-price-value">RM ${totalPrice}</p>
        </div>
        <button class="btn btn-primary" id="checkout-btn">Complete Order</button>
    `

    const removeBtns = document.querySelectorAll('.remove-item')

    removeBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            const indexToRemove = parseInt(e.target.dataset.index)
            order.splice(indexToRemove, 1)
            renderOrderSummary() /
            console.log(order)
        })
    })
}


/* --- EVENT LISTENER --- */
document.addEventListener('click', (e) => {
    if (e.target.dataset.id) {
        handleOrderSummary(e.target.dataset.id)
    }
})


paymentForm.addEventListener('submit', (e) => {
    e.preventDefault()
    paymentModal.style.display = 'none'

    const paymentData = new FormData(paymentForm)
    console.log(paymentData)

    const customerName = paymentData.get('fullName')

    orderSummary.innerHTML = `
        <h4 class="thanks-note">Payment Processing...</h4>
    `
    
    setTimeout(() => {
        orderSummary.innerHTML = `
            <h4 class="thanks-note">Thanks, ${customerName}! Your order is on its way!</h4>
        `
    }, 1500)
    
})

/* 
    HINTS:
        1. When an item is added to an order, you will need to push its object to an array of orders and iterate over that array to generate html string.
        2. To remove an order, you will need to figure out the index of that menu item’s object in the array of orders. 
*/