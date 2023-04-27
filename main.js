let products = [];
let total = 0;
let arrayCard = [];
const cardContainer = document.getElementById("carrito-de-compras");
const buttomdelate= document.getElementById('eliminar-carrito');
const Totalprice = document.getElementById('precio-total');
let modalCounter = document.getElementById('btn-menu');
let buttonCompra = document.getElementById("comprar-btn")


buttonCompra.addEventListener('click', () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Gracias por tu compra!',
        showConfirmButton: false,
        timer: 1500
    })
    arrayCard.length = 0;
    Totalprice.innerText = 0;
    renderizarCard()
})




// DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    boxCreate();
    aJson();
    obtenerObjetos();
});


function aJson() {
    if (localStorage.getItem('cart')) {
        arrayCard = JSON.parse(localStorage.getItem('cart'))
        renderizarCard()
    }
}


//.JSON
async function obtenerObjetos() {
    const direccion = await fetch("./data.json");
    const response = await direccion.json();
    // guarda en el array la respuesta de los datos
    products = response;
    boxCreate();
}



function boxCreate() {
    const containerProducts = document.getElementById("container-productos");
    products.forEach((prod) => {
        const div = document.createElement("div");
        div.classList.add("cajaProductos");
        div.innerHTML = `
        <h4 class='title-product'>${prod.nombre}</h4>
        <img src=${prod.img} alt='camiseta'/>
        <p>Cantidad: ${prod.cantidad}</p>
        <p>Precio: $ ${prod.precio}</p>
        <a class="agregar__carrito" id="button${prod.id}">Agregar al carrito</a>
        `;
        containerProducts.appendChild(div);
        // agregamos funcionalidad al boton
        const agregar = document.getElementById(`button${prod.id}`);
        agregar.addEventListener("click", () => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Tu producto fue agregado correctamente',
                showConfirmButton: false,
                timer: 1500
            })
            pushearCard(`${prod.id}`);
        });
    });
}


// agregar producto al carrito
function pushearCard(id) {
    const producto = products.find((p) => p.id == id);
    if (!producto) {
        return;
    }
    const existe = arrayCard.some((prod) => prod.id == id);
    if (existe) {
        arrayCard.map((prod) => {
            if (prod.id == id) {
                prod.cantidad++;
            }
        });
    } else {
        arrayCard.push({ ...producto, cantidad: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(arrayCard))
    renderizarCard();
}
// renderizamos el carrito
function renderizarCard() {
    cardContainer.innerHTML = "";
    if (arrayCard.length < 1) {
        return;
    }
    arrayCard.forEach(function renderizarProducto(producto) {
        let productoContainer = document.createElement("div");
        productoContainer.id = producto.id;
        productoContainer.classList.add("cajaProductos");
        productoContainer.innerHTML = `
   
         <h5 class="titulo">${producto.nombre}:</h5>
         <img src=${producto.img} alt=""/>
         <h4 class="price">$${producto.precio}</h4>
         <a class="cantidad">Cantidad:${producto.cantidad}</a>
         <a class="agregar__carrito agregar__carrito--2" id="eliminar${producto.id}">Retirar</a>
         `;
        cardContainer.appendChild(productoContainer);
        const eliminar = document.getElementById(`eliminar${producto.id}`);
        eliminar.addEventListener("click", (id) => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Tu producto fue eliminado correctamente',
                showConfirmButton: false,
                timer: 1500
            })
            eliminarDelCard(producto.id);
        });


        Totalprice.innerText = arrayCard.reduce((acc, producto) => acc + producto.cantidad * producto.precio, 0);

    });
}




function eliminarDelCard(id) {
    const existe = arrayCard.some((prod) => prod.id == id);
    if (existe) {
        arrayCard.map((prod) => {
            if (prod.id == id) {
                prod.cantidad--;
                if (prod.cantidad < 1) {
                    arrayCard = arrayCard.filter((prod) => prod.id != id);
                }
            }
        });
    }

    Totalprice.textContent = arrayCard.reduce((acc, producto) => acc - producto.precio, 0);
    localStorage.setItem('cart', JSON.stringify(arrayCard));
    

    renderizarCard();
}



buttomdelate.addEventListener('click', () => {
    alert('se vacio del carrito')
    arrayCard.length = 0;
    Totalprice.innerText = arrayCard.reduce((acc, producto) => acc - producto.precio, 0);
    localStorage.setItem('cart', JSON.stringify(arrayCard))
    renderizarCard();
})

 