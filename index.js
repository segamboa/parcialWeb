//import { render as renderBurguer } from "./components/burger.js";

//c onst navbarList = document.getElementById("navbar-list");

const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
let datos = "";
let carNumber = 0;
let itemsCarro = [];

fetch(url)
  .then((response) => response.json())
  .then((response) => {
    datos = response;
    //console.log(datos);
    document.getElementById("carrito").innerText = carNumber + " items";
    generarBurger(0);
    //orden();
  });

document.getElementById("burg").addEventListener("click", () => {
  generarBurger(0);
});
document.getElementById("con1").addEventListener("click", () => {
  eliminar();
});
document.getElementById("tac").addEventListener("click", () => {
  generarBurger(1);
});
document.getElementById("sal").addEventListener("click", () => {
  generarBurger(2);
});
document.getElementById("des").addEventListener("click", () => {
  generarBurger(3);
});
document.getElementById("drink").addEventListener("click", () => {
  generarBurger(4);
});
document.getElementById("im").addEventListener("click", () => {
  generarTabla(0);
});
function listeners() {
  for (let i = 0; i < document.getElementsByClassName("agregar").length; i++) {
    document
      .getElementsByClassName("agregar")
      [i].addEventListener("click", () => {
        agregar(i);
      });
  }
}

function eliminar() {
  itemsCarro = [];
  carNumber = 0;
  generarTabla();
  document.getElementById("carrito").innerText = carNumber + " items";
}

function generarBurger(i) {
  let nombre = datos[i].name;
  //console.log(nombre);
  let contenido = document.getElementById("contenido");
  let titulo = document.getElementById("titulos");
  titulo.innerText = nombre;
  if (titulo.innerText === "Burguers") {
    titulo.innerText = "Burgers";
  }
  let cards = "";
  for (let item of datos[i].products) {
    cards += `<div class="col-3" style="margin-top:20px"><div class="card" style="height:100%">
            <img class="card-img-top" src="${item.image}" alt="Card image cap" style="height: 45%;">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">${item.description}</p>
              <p class="card-text"><strong>$${item.price}</strong></p>
              <a class="btn-dark btn agregar">Add to cart</a>
            </div>
            </div>
          </div>`;
  }
  contenido.innerHTML = cards;
  listeners();
}

const createRowC = (item) => `
      <tr>
      <td>${item.Item}</td>
      <td>${item.Qty}</td>
      <td>${item.Description}</td>
      <td>${item.UnitPrice}</td>
      <td>${item.Amount}</td>
      </tr>
      `;

function generarTabla() {
  let nombres = ["Item", "Qty", "Description", "Unit Price", "Amount"];
  let contenido = document.getElementById("contenido");
  let suma = 0;

  var tbl = document.createElement("table");
  //tbl.setAttribute("class", "table-striped");
  var tblBody = document.createElement("tbody");

  let titulo = document.getElementById("titulos");
  titulo.innerText = "Order detail";

  //let thead = tbl.createTHead();
  let row = document.createElement("tr");
  for (let n of nombres) {
    let th1 = document.createElement("th");
    let text1 = document.createTextNode(n);
    th1.appendChild(text1);
    row.appendChild(th1);
  }
  tblBody.appendChild(row);
  for (let i = 0; i < itemsCarro.length; i++) {
    let row1 = document.createElement("tr");
    let cell = document.createElement("td");
    let cellText = document.createTextNode(itemsCarro[i].Item);
    let cell1 = document.createElement("td");
    let cellText1 = document.createTextNode(itemsCarro[i].Qty);
    let cell2 = document.createElement("td");
    let cellText2 = document.createTextNode(itemsCarro[i].Description);
    let cell3 = document.createElement("td");
    let cellText3 = document.createTextNode(itemsCarro[i].UnitPrice);
    let cell4 = document.createElement("td");
    let cellText4 = document.createTextNode(itemsCarro[i].Amount);
    suma += itemsCarro[i].Amount;
    cell.appendChild(cellText);
    cell1.appendChild(cellText1);
    cell2.appendChild(cellText2);
    cell3.appendChild(cellText3);
    cell4.appendChild(cellText4);
    row1.appendChild(cell);
    row1.appendChild(cell1);
    row1.appendChild(cell2);
    row1.appendChild(cell3);
    row1.appendChild(cell4);
    tblBody.appendChild(row1);
  }
  tbl.appendChild(tblBody);
  contenido.innerHTML =
    `<table class="table-striped table">` +
    tbl.innerHTML +
    `</table><h4 style="font-size:15px"><strong>Total: $${suma}</strong></h4>
        <div id="botones"><button id="r" type="button" class="btn can" data-toggle="modal" data-target="#exampleModal">Cancel</button><button id="con" type="button" class="btn can">Confirm order</button></div>`;
  document.getElementById("con").addEventListener("click", () => {
    console.log(itemsCarro);
  });
}

function agregar(i) {
  carNumber++;
  let bool = false;
  let num = 0;
  let titu = document.getElementById("titulos").textContent;
  //console.log(titu);
  if (titu === "Burgers") {
    titu = "Burguers";
  }
  if (titu === "Burguers") {
    num = 0;
  } else if (titu === "Tacos") {
    num = 1;
  } else if (titu === "Salads") {
    num = 2;
  } else if (titu === "Deserts") {
    num = 3;
  } else if (titu === "Drinks and Sides") {
    num = 4;
  }
  //console.log(datos[0].products[0]);
  document.getElementById("carrito").innerText = carNumber + " items";
  let cantidad = 0;
  for (let f of itemsCarro) {
    if (datos[num].products[i].name === f.Description) {
      f.Qty++;
      f.Amount = f.Qty * datos[num].products[i].price;
      bool = true;
      break;
    }
  }
  if (bool === false) {
    cantidad++;
    let item = {
      Item: itemsCarro.length + 1,
      Qty: cantidad,
      Description: datos[num].products[i].name,
      UnitPrice: datos[num].products[i].price,
      Amount: datos[num].products[i].price * cantidad,
    };
    itemsCarro.push(item);
  }
  //console.log(itemsCarro);
}
