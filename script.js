const seats = document.querySelectorAll(".seat");
let count = 0;
let seatsLeft = parseInt(document.getElementById("seat-number").innerText);
const price = 550;

for (const seat of seats) {
  seat.addEventListener("click", function (e) {
    // seat count
    count++;

    // coupon activate
    if (count == 4) {
      document.getElementById("coupon-apply").removeAttribute("disabled");
    }
    if (count > 4) {
      alert("You can only book 4 seats");
      return;
    }
    // seats left
    seatsLeft--;
    document.getElementById("seat-number").innerText = seatsLeft;

    const seatCount = document.getElementById("seat-count");
    seatCount.innerText = count;
    const seatText = e.target;
    seatText.setAttribute("disabled", true);
    seatText.style.color = "white";
    seatText.style.backgroundColor = "#1DD100";
    const seatName = e.target.innerText;
    const selectedBody = document.getElementById("tbody");
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerText = seatName;
    const td2 = document.createElement("td");
    td2.innerText = "Economy";
    const td3 = document.createElement("td");
    td3.innerText = price;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    selectedBody.appendChild(tr);

    totalPrice("total", price);
  });
}

function totalPrice(id, value) {
  const totalCost = parseInt(document.getElementById(id).innerText);
  let sum = totalCost + value;
  setInnerText("total", sum);
  grandTotal();
}
function grandTotal() {
  const mainTotal = getValue("total");

  setInnerText("grand-total", mainTotal);
}

function setInnerText(id, value) {
  document.getElementById(id).innerText = value;
}
function getValue(id) {
  const budget = parseInt(document.getElementById(id).innerText);

  return budget;
}

const btn = document.getElementById("coupon-apply");
btn.addEventListener("click", function () {
  const couponElement = document.getElementById("coupon").value;
  const couponCode = couponElement.toUpperCase();

  document.getElementById("coupon").classList.add("hidden");
  document.getElementById("coupon-apply").classList.add("hidden");
  if (couponCode === "NEW15") {
    const discountAmount =
      parseFloat(document.getElementById("total").innerText) * 0.15;

    const restTotal = document.getElementById("grand-total");
    restTotal.innerText =
      parseFloat(document.getElementById("total").innerText) - discountAmount;
    document.getElementById("coupon").value = "";
  } else if (couponCode === "COUPLE 20") {
    const discountAmount =
      parseFloat(document.getElementById("total").innerText) * 0.2;

    const restTotal = document.getElementById("grand-total");
    restTotal.innerText =
      parseFloat(document.getElementById("total").innerText) - discountAmount;
    document.getElementById("coupon").value = "";
  } else {
    alert("invalid coupon");
    document.getElementById("coupon").value = "";
    document.getElementById("coupon").classList.remove("hidden");
    document.getElementById("coupon-apply").classList.remove("hidden");
  }
});
