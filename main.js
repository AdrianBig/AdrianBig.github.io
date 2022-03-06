// Balance Variables
let balanceHTML = document.getElementById("balance");
let standardBalanceValue = 8000;
let balanceValue = standardBalanceValue;

// Cash Variables
let cashHTML = document.getElementById("cash");
let standardCashValue = 1000;
let cashValue = standardCashValue;


//Draw Balance and Cash at start
showBalance();

// Deposit Money OnClick
let deposit_btn = document.getElementById("depositButton") 
deposit_btn.addEventListener("click", deposit)

// Withdraw Money OnClick
let withdraw_btn = document.getElementById("withdrawButton") 
withdraw_btn.addEventListener("click", withdraw)


function deposit() {
    // Add to Balance
    let depositAmount = document.getElementById("depositAmount").value;
    // This prevents that the cash amount drops below 0
    if (cashValue >= depositAmount) {
        balanceValue += Number(depositAmount)
        console.log("Deposited " + depositAmount + "€")

        // Remove from Cash
        cashValue -= depositAmount
        addToStatement();
    }
    else {
        alert("Du hast nicht genug Bargeld")
        console.log("Cash below 0")
    }
    showBalance();

    clearInput();
}

function withdraw() {
    // Remove from Balance
    let withdrawAmount = document.getElementById("withdrawAmount").value;
    // This prevents that the balance goes below -2000€
    if (balanceValue >= (withdrawAmount - 2000)) {
        balanceValue -= withdrawAmount;
        console.log("Withdrew " + withdrawAmount + "€")
    
        // Add to Cash
        cashValue += Number(withdrawAmount);
        addToStatement();
    }
    else {
        alert("Du kannst nicht mehr als 2000€ ins Minus gehen")
        console.log("Balance below -2000")
    }
    // Update Balance
    clearInput();
    showBalance();
}

function showBalance() {
    balanceHTML.innerHTML = balanceValue + "€";
    cashHTML.innerHTML = cashValue + "€";

    if (balanceValue < 0) {
        balanceHTML.style.color = "#fb4b4e";
    }
    else {
        balanceHTML.style.color = "white";
    }
}

// Clear Input Fields
function clearInput() {
    document.getElementById("withdrawAmount").value = '';
    document.getElementById("depositAmount").value = '';
}


// ------------ Show Screens etc. ------------

let atmDepositHTML = document.getElementById("atm-deposit");
let atmWithdrawHTML = document.getElementById("atm-withdraw")
let atmButtons = document.getElementById("atm-buttons");

// Get Deposit Menu Button
let showDepMen = document.getElementById("showDepositMenu");
showDepMen.addEventListener("click", showDeposit)

// Get Withdraw Menu Button
let showWithMen = document.getElementById("showWithdrawMenu")
showWithMen.addEventListener("click", showWithdraw)

// Get Menu Button
let backToMenu = document.getElementById("back-to-menu");
backToMenu.addEventListener("click", showMenu)

// Show Deposit Menu
function showDeposit() {
    atmDepositHTML.style.display = "flex";
    // Hide other Buttons
    atmButtons.style.display = "none";
    // Show Back Button
    backToMenu.style.display = "block";
    closeStatement()
}

// Show Withdraw Menu
function showWithdraw() {
    atmWithdrawHTML.style.display = "flex";
    // Hide other Buttons
    atmButtons.style.display = "none"
    // Show Back Button
    backToMenu.style.display = "block"
    closeStatement()
}

// Go back to Menu
function showMenu() {
    atmButtons.style.display = "block"
    atmWithdrawHTML.style.display = "none";
    atmDepositHTML.style.display = "none";
    backToMenu.style.display = "none"
    clearInput();
}


// ------ Kontoauszug ------

// Eventlisteners for open/close button
let statementBtn = document.getElementById("kontoAuszug");
statementBtn.addEventListener("click", showStatement)

let statementCloseBtn = document.getElementById("closeStatement");
statementCloseBtn.addEventListener("click", closeStatement)


// Open Button for Bank Statement
function showStatement() {
    let statementBox = document.getElementById("kontoauszug-box");
    statementBox.style.display = "block"
}
// Close Button for Bank Statement
function closeStatement() {
    let statementBox = document.getElementById("kontoauszug-box");
    statementBox.style.display = "none"
}

let kontoauszugList = document.getElementById("kontoauszug-list");

// Add a transaction to the Statement list
function addToStatement() {
    // Get Time
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes();
    console.log(time)
    console.log(date)

    let kontoauszugColumn = document.createElement("div");
    kontoauszugColumn.classList.add("kontoauszug-column");
    kontoauszugList.appendChild(kontoauszugColumn)
    
    let kontoauszugTitle = document.createElement("h3");
    kontoauszugColumn.appendChild(kontoauszugTitle)
    kontoauszugTitle.innerHTML = "Einzahlung"
    
    let kontoauszugSubTitle = document.createElement("h4");
    kontoauszugColumn.appendChild(kontoauszugSubTitle)
    let depositAmount = document.getElementById("depositAmount");
    kontoauszugSubTitle.innerHTML = "+" + depositAmount.value + "€";
    kontoauszugSubTitle.style.color = "#35ce8d";
    // Withdraw amount fehlt

    let kontoauszugTime = document.createElement("p");
    kontoauszugTime.classList.add("kontoauszug-time");
    kontoauszugColumn.appendChild(kontoauszugTime)
    kontoauszugTime.innerHTML = "Uhrzeit: " + time;
    
    let kontoauszugDate = document.createElement("p");
    kontoauszugDate.classList.add("kontoauszug-date");
    kontoauszugColumn.appendChild(kontoauszugDate)
    kontoauszugDate.innerHTML = "Datum: " + date;

    let kontoauszugHR = document.createElement("hr");
    kontoauszugHR.classList.add("kontoauszug-hr");
    kontoauszugColumn.appendChild(kontoauszugHR);
}