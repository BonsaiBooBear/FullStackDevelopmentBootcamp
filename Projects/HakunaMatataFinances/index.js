const accountNumber = '102230379866'

const eyeBtn = document.getElementById("see-account-number")
const accountNoText = document.getElementById("account-no-text")
let accountNoVisible = false
eyeBtn.addEventListener('click', ()=> {
  eyeBtn.classList.toggle('fa-eye')
  eyeBtn.classList.toggle('fa-eye-slash')
  accountNoVisible = !accountNoVisible

  if(accountNoVisible) {
    accountNoText.innerText = accountNumber
    eyeBtn.title = "hide"
  } else {
    accountNoText.innerText = `*********${accountNumber.slice(-3)}`
    eyeBtn.title = "show"
  }
})

const cardNumber = '102230379866'

const cardEyeBtn = document.getElementById("see-card-number")
const cardNoText = document.getElementById("card-no-text")
let cardNoVisible = false
cardEyeBtn.addEventListener('click', ()=> {
  cardEyeBtn.classList.toggle('fa-eye')
  cardEyeBtn.classList.toggle('fa-eye-slash')
  cardNoVisible = !cardNoVisible

  if(cardNoVisible) {
    cardNoText.innerText = cardNumber
    cardEyeBtn.title = "hide"
  } else {
    cardNoText.innerText = `*********${cardNumber.slice(-3)}`
    cardEyeBtn.title = "show"
  }
})

let balance = 120000
document.getElementById('account-balance').innerText = `$${balance.toFixed(2)}`
const transactionList = document.getElementById("transaction-list")

function deposit() {
  // 1. Collect form data and reset
  const amountToDepositNode = document.getElementById('amount-to-deposit')
  const amountToDeposit = Number(amountToDepositNode.value)
  amountToDepositNode.value = ''
  balance += amountToDeposit
  document.getElementById('account-balance').innerText = `$${balance.toFixed(2)}`

  // 2. Create element structure using DOM Methods
  const listGroupItem = document.createElement('a')
  listGroupItem.classList.add('list-group-item', 'list-group-item-action')

  const topPart = document.createElement('div')
  topPart.classList.add('d-flex', 'w-100', 'justify-content-between')

  const h5 = document.createElement('h5')
  h5.classList.add('mb-1')
  h5.innerText = 'Deposit'

  const amount = document.createElement('small')
  amount.classList.add('fs-5', 'text-success')
  amount.innerText = `+$${amountToDeposit.toFixed(2)}`

  topPart.append(h5, amount)

  const middlePart = document.createElement('p')
  middlePart.classList.add('mb-1')
  middlePart.innerText = 'Transfer in (CREDIT)'

  const lastPart = document.createElement('div')
  lastPart.classList.add('d-flex', 'w-100', 'justify-content-between')

  const small1 = document.createElement('small')
  const now = new Date()
  small1.innerText = now.toLocaleString()
  const small2 = document.createElement('small')
  small2.innerText = `Balance: $${balance.toFixed(2)}`

  lastPart.append(small1, small2)

  listGroupItem.append(topPart, middlePart, lastPart)

  // To keep latest transaction on the top
  const existingList = transactionList.innerHTML
  transactionList.innerHTML = ''
  transactionList.append(listGroupItem)
  transactionList.innerHTML += existingList

  // 3. Show Alerts
  document.getElementById('deposit-successful').innerHTML = `
    <div class="alert alert-success alert-dismissible fade show mt-3" role="alert" id="deposit-successful">
      <strong>Success!</strong> Your deposit was completed.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `
}

function sendMoney() {
  // 1. Collect form data and reset
  const amountToTransferNode = document.getElementById('amount-to-transfer')
  const amountToTransfer = Number(amountToTransferNode.value)
  const transferType = document.getElementById('transfer-type').value
  const beneficiaryName = document.getElementById('beneficiary-name').value
  const sendMoneyForm = document.getElementById('send-money-form')
  sendMoneyForm.reset()
  balance -= amountToTransfer
  document.getElementById('account-balance').innerText = `$${balance.toFixed(2)}`

  // 2. Create element structure using DOM Methods
  const listGroupItem = document.createElement('a')
  listGroupItem.classList.add('list-group-item', 'list-group-item-action')

  const topPart = document.createElement('div')
  topPart.classList.add('d-flex', 'w-100', 'justify-content-between')

  const h5 = document.createElement('h5')
  h5.classList.add('mb-1')
  h5.innerText = `${transferType} Transfer: ${beneficiaryName}`

  const amount = document.createElement('small')
  amount.classList.add('fs-5', 'text-danger')
  amount.innerText = `-$${amountToTransfer.toFixed(2)}`

  topPart.append(h5, amount)

  const middlePart = document.createElement('p')
  middlePart.classList.add('mb-1')
  middlePart.innerText = 'Transfer out (DEBIT)'

  const lastPart = document.createElement('div')
  lastPart.classList.add('d-flex', 'w-100', 'justify-content-between')

  const small1 = document.createElement('small')
  const now = new Date()
  small1.innerText = now.toLocaleString()
  const small2 = document.createElement('small')
  small2.innerText = `Balance: $${balance.toFixed(2)}`

  lastPart.append(small1, small2)

  listGroupItem.append(topPart, middlePart, lastPart)

  // To keep latest transaction on the top
  const existingList = transactionList.innerHTML
  transactionList.innerHTML = ''
  transactionList.append(listGroupItem)
  transactionList.innerHTML += existingList

  // 3. Show Alerts
  document.getElementById('transfer-successful').innerHTML = `
    <div class="alert alert-success alert-dismissible fade show mt-3" role="alert" id="transfer-successful">
      <strong>Success!</strong> Your transfer was completed.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `
}

document.querySelectorAll('[data-bs-toggle="tab"]').forEach(toggle => {
  toggle.addEventListener('shown.bs.tab', function (event) {
    // Remove active from Account Summary when switching to another tab
    document.getElementById('account-summary').classList.remove('show', 'active');
  });
});

document.querySelectorAll('.back-to-summary').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const summaryPane = document.getElementById('account-summary');
    // Remove active from other panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.remove('show', 'active');
    });
    // Add active back to Account Summary
    summaryPane.classList.add('show', 'active');
  });
});


/*
  # Requirements:
    - Account balance
    - Account statements (Transactions)
    - Transfer
      - Transfer In (Credit)
      - Transfer Out (Debit)
*/

/*
  <a href="#" class="list-group-item list-group-item-action" aria-current="true">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">ACH Transaction: Jeff</h5>
      <small class="fs-5 text-danger">-$15,850.00</small>
    </div>
    <p class="mb-1">Transfer out (DEBIT)</p>
    <div class="d-flex w-100 justify-content-between">
      <small>22/11/2025 22:50:05</small>
      <small>Balance: $110,987.00</small>
    </div>
  </a>
*/