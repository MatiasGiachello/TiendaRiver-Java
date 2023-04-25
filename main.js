let productos = [];
let total = 0;
let arrayCarrito = [];
const carritoContainer = document.getElementById("carrito-de-compras");
const botonVaciar = document.getElementById('eliminar-carrito');
const precioTotal = document.getElementById('precio-total');
// Items para cumplir de la entrega
// 1 - Funciones del carritto
// 2 - Capturar eventos y salida por DOM de se agrego producto por ej.
// 3 - Implementar un loading.
// 4 - STORAGE y JSON.
// 5 - Implementar libreria externa.

// Abre entrega, 25 abril, hasta el 2 de mayo.


document.addEventListener("DOMContentLoaded", () => {
    boxCreate();
});

//.JSON
async function obtenerObjetos() {
    const direccion = await fetch("./data.json");
    const response = await direccion.json();
    // guardamos en el array la respuesta de los datos
    productos = response;
    boxCreate();
}

obtenerObjetos();

function boxCreate() {
    const contenedorProductos = document.getElementById("container-productos");
    productos.forEach((prod) => {
        const div = document.createElement("div");
        div.classList.add("cajaProductos");
        div.innerHTML = `
        <h4 class='title-product'>${prod.nombre}</h4>
        <img src=${prod.img} alt='camiseta'/>
        <p>Cantidad: ${prod.cantidad}</p>
        <p>Precio: $ ${prod.precio}</p>
        <a class="agregar__carrito" id="button${prod.id}">Agregar al carrito</a>
        `;
        contenedorProductos.appendChild(div);
        // agregamos funcionalidad al boton
        const agregar = document.getElementById(`button${prod.id}`);
        agregar.addEventListener("click", () => {
            alert(`se agrego producto al carrito ${prod.nombre}`);
            pushearCarrito(`${prod.id}`);
        });
    });
}


// agregar producto al carrito
function pushearCarrito(id) {
    const producto = productos.find((p) => p.id == id);
    if (!producto) {
        return;
    }
    const existe = arrayCarrito.some((prod) => prod.id == id);
    if (existe) {
        arrayCarrito.map((prod) => {
            if (prod.id == id) {
                prod.cantidad++;
            }
        });
    } else {
        arrayCarrito.push({ ...producto, cantidad: 1 });
    }
    renderizarCarrito();
}
// renderizamos el carrito
function renderizarCarrito() {
    carritoContainer.innerHTML = "";
    if (arrayCarrito.length < 1) {
        return;
    }
    arrayCarrito.forEach(function renderizarProducto(producto) {
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
        carritoContainer.appendChild(productoContainer);
        const eliminar = document.getElementById(`eliminar${producto.id}`);
        eliminar.addEventListener("click", (id) => {
            eliminarDelCarrito(producto.id);
        });


        precioTotal.innerText = arrayCarrito.reduce((acc, producto) => acc + producto.cantidad * producto.precio, 0);
        console.log(precioTotal.innerText);
    });
}




function eliminarDelCarrito(id) {
    const existe = arrayCarrito.some((prod) => prod.id == id);
    if (existe) {
        arrayCarrito.map((prod) => {
            if (prod.id == id) {
                prod.cantidad--;
                if (prod.cantidad < 1) {
                    arrayCarrito = arrayCarrito.filter((prod) => prod.id != id);
                }
            }
        });
    }

    precioTotal.textContent = arrayCarrito.reduce((acc, producto) => acc - producto.precio, 0);

    renderizarCarrito();
}



botonVaciar.addEventListener('click', () => {
    alert('se vacio del carrito')
    arrayCarrito.length = 0;
    precioTotal.innerText = arrayCarrito.reduce((acc, producto) => acc - producto.precio, 0);
    renderizarCarrito();
})

