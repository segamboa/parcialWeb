
//import { render as renderBurguer } from "./components/burger.js";

//c onst navbarList = document.getElementById("navbar-list");

const url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"
let datos = "";

fetch(url)
  .then((response) => response.json())
  .then((response) => {
    datos = response;
    console.log(datos);
    generarBurger();
    //orden();
  });

  function generarBurger(){
    document.getElementById("burger-navbar").addEventListener("click", () => {

        const item = document.createElement("h1");
        //const anchor = document.createElement("a");
        item.appendChild(document.createTextNode("Burgers"));

    
      }); 
      let c = document.getElementById("burger-navbar")  ;
      console.log(c);  
  }


  const body = document.getElementById("body");


  const html = `<div id="div-tabla">
  <h1 class="display-4 text-center">Datos</h1>
  
  <table class="table-striped table" id="tabla">
    <tr>
      <th>Last Lane</th>
      <th>First Name</th>
      <th>Email</th>
      <th>Photo</th>
    </tr>
    <tr></tr>
  </table>
  </div>`;
