import { menuArray } from '/data.js'

const menu = document.getElementById("all-menus")
const orderSummary = document.getElementById("order-summary")
const paymentModal = document.getElementById("payment-modal")
const overlayEl = document.getElementById("overlay-el")
const paymentForm = document.getElementById("payment-form")
let order = []

function renderMenu() {
    menu.innerHTML = menuArray.map((menu) => {
        return `
            <div class="menu-item">
                <p "class="menu-img" role="img" alt="menu no ${menu.id}" style="font-size: 40px;">${menu.emoji}</p>
                <div class="menu-desc">
                    <h2 class="menu-name">${menu.name}</h2>
                    <span class="menu-ingredients">${menu.ingredients.join(', ')}</span>
                    <span class="menu-price">RM ${menu.price}</span>
                </div>
                <div>
                    <button class="btn add-to-cart-btn" data-id="${menu.id}">&plus;</button>
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
    const paymentBtn = document.getElementById("checkout-btn")

    removeBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            const indexToRemove = parseInt(e.target.dataset.index)
            order.splice(indexToRemove, 1)
            renderOrderSummary() 
            console.log(order)
        })
    })

    if (order.length !== 0) {
        paymentBtn.addEventListener('click', () => {
            paymentModal.style.display = 'block'
            overlayEl.style.display = 'block'
        })
    } 
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
        <h4 class="status-msg">Payment Processing...</h4>
    `
    
    setTimeout(() => {
        orderSummary.innerHTML = `
            <h4 class="status-msg">Thanks, ${customerName}! Your order is on its way!</h4>
        `
    }, 1500)
    
})