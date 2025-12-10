const orderBeingPrepared = (orderNo) => new Promise((resolve, reject) => {
  setTimeout(() => {
    document.getElementById(`order-status-img-${orderNo}`).src = 'assets/order-being-prepared.gif'
    document.getElementById(`order-status-txt-${orderNo}`).innerText = 'Order is being prepared'
    resolve(orderNo)
  }, 2000)
})

const orderPrepared = (orderNo) => new Promise((resolve, reject) => {
  setTimeout(() => {
    document.getElementById(`order-status-img-${orderNo}`).src = 'assets/order-prepared.gif'
    document.getElementById(`order-status-txt-${orderNo}`).innerText = 'Order prepared'
    resolve(orderNo)
  }, 10*1000)
})

const orderHandedOver = (orderNo) => new Promise((resolve, reject) => {
  setTimeout(() => {
    document.getElementById(`order-status-img-${orderNo}`).src = 'assets/order-handed-over.gif'
    document.getElementById(`order-status-txt-${orderNo}`).innerText = 'Order handed over to delivery person'
    resolve(orderNo)
  }, 5*1000)
})

const orderOnTheWay = (orderNo) => new Promise((resolve, reject) => {
  setTimeout(() => {
    document.getElementById(`order-status-img-${orderNo}`).src = 'assets/order-on-the-way.gif'
    document.getElementById(`order-status-txt-${orderNo}`).innerText = 'Order is on the way '
    resolve(orderNo)
  }, 3*1000)
})

const orderReachedDestination = (orderNo) => new Promise((resolve, reject) => {
  setTimeout(() => {
    document.getElementById(`order-status-img-${orderNo}`).src = 'assets/order-reached-destination.gif'
    document.getElementById(`order-status-txt-${orderNo}`).innerText = `Order reached it's destination`
    resolve(orderNo)
  }, 8*1000)
})

const orderDelivered = (orderNo) => new Promise((resolve, reject) => {
  setTimeout(() => {
    document.getElementById(`order-status-img-${orderNo}`).src = 'assets/order-delivered.gif'
    document.getElementById(`order-status-txt-${orderNo}`).innerText = 'Order has been delivered'
    resolve(orderNo)
  }, 4*1000)
})

let orderNo = 0

const placeOrder = () => {
  orderNo++
  createOrderCard()

  document.getElementById(`order-status-img-${orderNo}`).src = 'assets/order-confirmed.gif'
  document.getElementById(`order-status-txt-${orderNo}`).innerText = 'Order confirmed'
  
  orderBeingPrepared(orderNo)
    .then((orderNo) => orderPrepared(orderNo))
    .then((orderNo) => orderHandedOver(orderNo))
    .then((orderNo) => orderOnTheWay(orderNo))
    .then((orderNo) => orderReachedDestination(orderNo))
    .then((orderNo) => orderDelivered(orderNo))
    .then((orderNo) => console.log(`Order ${orderNo} completed processing`))
    .catch(() => console.log('Something went wrong'))
}

function createOrderCard() {
  const orderList = document.getElementById('order-list')

  const colDiv = document.createElement('div')
  colDiv.classList.add('col-xl-4', 'col-md-6')
  colDiv.id = `order-${orderNo}`

  const cardDiv = document.createElement('div')
  cardDiv.classList.add('card', 'text-center', 'mt-2')

  const cardHeaderDiv = document.createElement('div')
  cardHeaderDiv.classList.add('card-header')
  cardHeaderDiv.innerText = `Order No. ${orderNo}`

  const cardBodyDiv = document.createElement('div')
  cardBodyDiv.classList.add('card-body')

  const item1 = document.getElementById('item-1').value || 'Mushroom Pizza'
  const item2 = document.getElementById('item-2').value || 'French Fries'
  const quantity1 = document.getElementById('quantity-1').value || '1'
  const quantity2 = document.getElementById('quantity-2').value || '2'
  const price1 = document.getElementById('price-1').value || '25'
  const price2 = document.getElementById('price-2').value || '36'
  const total = Number(price1) + Number(price2)

  const orderForm = document.getElementById('order-form')
  orderForm.reset()

  cardBodyDiv.innerHTML = `
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Item</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>${item1}</td>
          <td>${quantity1}</td>
          <td>$${Number(price1).toFixed(2)}</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>${item2}</td>
          <td>${quantity2}</td>
          <td>$${Number(price2).toFixed(2)}</td>
        </tr>
        <tr>
          <th scope="row">Total</th>
          <td></td>
          <td></td>
          <td>$${Number(total).toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  `

  const cardStatusImg = document.createElement('img')
  cardStatusImg.src = ''
  cardStatusImg.id = `order-status-img-${orderNo}`
  cardStatusImg.width = '75'

  const cardStatusTxt = document.createElement('p')
  cardStatusTxt.classList.add('card-text')
  cardStatusTxt.id = `order-status-txt-${orderNo}`

  const cancelBtn = document.createElement('button')
  cancelBtn.classList.add('btn', 'btn-sm', 'btn-danger')
  cancelBtn.innerText = `Cancel`
  cancelBtn.addEventListener('click', () => {
    const orderCol = document.getElementById(`order-${orderNo}`)
    orderList.remove(orderCol)
  })

  cardBodyDiv.append(cardStatusImg, cardStatusTxt, cancelBtn)

  const cardFooterDiv = document.createElement('div')
  cardFooterDiv.classList.add('card-footer', 'text-body-secondary')
  const currentTime = new Date()
  cardFooterDiv.innerText = currentTime.toLocaleString()

  cardDiv.append(cardHeaderDiv, cardBodyDiv, cardFooterDiv)
  colDiv.append(cardDiv)
  orderList.append(colDiv)
}