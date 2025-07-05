const fromSelect = document.getElementById("from-currency");
const toSelect = document.getElementById("to-currency");
const fromFlag = document.getElementById("from-flag");
const toFlag = document.getElementById("to-flag");

const currencies = {
  USD: "us",
  INR: "in",
  EUR: "eu",
  GBP: "gb",
  JPY: "jp",
  AUD: "au",
  CAD: "ca"
};

for (let currency in currencies) {
  let opt1 = document.createElement("option");
  opt1.value = currency;
  opt1.text = currency;
  fromSelect.appendChild(opt1);

  let opt2 = document.createElement("option");
  opt2.value = currency;
  opt2.text = currency;
  toSelect.appendChild(opt2);
}

fromSelect.value = "USD";
toSelect.value = "INR";

function updateFlags() {
  fromFlag.src = `https://flagcdn.com/48x36/${currencies[fromSelect.value]}.png`;
  toFlag.src = `https://flagcdn.com/48x36/${currencies[toSelect.value]}.png`;
}

fromSelect.addEventListener("change", updateFlags);
toSelect.addEventListener("change", updateFlags);
updateFlags();

async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = fromSelect.value;
  const to = toSelect.value;

  if (amount === "" || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  try {
    const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
    const data = await res.json();
    document.getElementById("result").innerText = `${amount} ${from} = ${data.rates[to]} ${to}`;
  } catch (error) {
    document.getElementById("result").innerText = "Error fetching conversion rate.";
  }
}

function switchCurrencies() {
  let temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;
  updateFlags();
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}
