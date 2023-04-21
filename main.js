let productos = []
let total = 0;

// Items para cumplir de la entrega
// 1 - Funciones del carritto
// 2 - Capturar eventos y salida por DOM de se agrego producto por ej.
// 3 - Implementar un loading.
// 4 - STORAGE y JSON.
// 5 - Implementar libreria externa.


// Abre entrega, 25 abril, hasta el 2 de mayo.


//.JSON
async function obtenerObjetos() {
    const direccion = await fetch('./data.json')
    const response = await direccion.json()
    // guardamos en el array la respuesta de los datos
    productos = response;
    boxCreate()
    console.log(response)
}
obtenerObjetos()


function boxCreate() {
    const contenedorProductos = document.getElementById('container-productos');
    productos.forEach((prod) => {
        const div = document.createElement('div');
        div.classList.add('cajaProductos')
        div.innerHTML = `
        <h4 class='title-product'>${prod.nombre}</h4>
        <img src=${prod.img} alt='camiseta'/>
        <p>Cantidad: ${prod.cantidad}</p>
        <p>Precio: $ ${prod.precio}</p>
        `
        contenedorProductos.appendChild(div);
    })
}




function envio() {
    if (total >= 18500) {
        alert('el envio es gratis')
    } else {
        total += 1650
        alert('el costo del envio es de 1650, el total es de:' + total)
    }
}

function metodoDePago() {
    let metodo = prompt('ingrese el metodo de pago, tarjeta o efectivo')
    if (metodo == 'tarjeta' || metodo == 'TARJETA' || metodo == 'Tarjeta') {
        total += 1750
        alert('hay un recargo de 1750, el total es de:' + total)
    } else if (metodo == 'efectivo' || metodo == 'EFECTIVO' || metodo == 'Efectivo') {
        total -= 2500

        alert('hay un descuento de 2500, el total es de:' + total)

    } else {
        alert('Escriba un metodo de pago valido')
        metodoDePago()
    }
}



function getProducts() {
    saludoEntrada()
    // verificacion de su el usuario quiere comprar o quiere cancelar.
    function saludoEntrada() {
        alert('¡Bienvenidos a la River Close! Aca encontraras los mejores precios para La ropa Del Mas Grande')
    }

    const question = prompt('Ingrese "comprar" para ver la lista de productos, o "cancelar" para salir');

    // condicional dependiendo que elija el usuario
    if (question == 'comprar' || question == 'COMPRAR' || question == 'Comprar') {
        let seleccionarProductos = Number(prompt('1-CamisetaTitular $19500 2-CamisetaAlternativa $17750 3-CamperaRompeViento $21500 4-ShortBasket $7500'))

        // ejecutar el while
        while (seleccionarProductos != 0) {
            // el switch se va a fijar en que producto eligio, y va a ir a buscarlo al array de objetos dependiendo
            // el "case" que suceda.
            switch (seleccionarProductos) {
                case 1:
                    productos[0].cantidad += Number(prompt('El producto seleccionado es CamisetaTitular, ingrese la cantidad'))
                    total += productos[0].cantidad * productos[0].precio
                    break;
                case 2:
                    productos[1].cantidad += Number(prompt('El producto seleccionado es CamisetaAlternativa, ingrese la cantidad'))
                    total += productos[1].cantidad * productos[1].precio
                    break;
                case 3:
                    productos[2].cantidad += Number(prompt('El producto seleccionado es CamperaRompeViento, ingrese la cantidad'))
                    total += productos[2].cantidad * productos[2].precio
                    break;
                case 4:
                    productos[3].cantidad += Number(prompt('El producto seleccionado es ShortBasket, ingrese la cantidad'))
                    total += productos[3].cantidad * productos[3].precio
                    break;
                default:
                    break;
            }

            seleccionarProductos = Number(prompt('Seleccione otro producto o ingrese 0 para finlazinar la compra.\n1-CamisetaTitular $19500 2-CamisetaAlternativa $17750 3-CamperaRompeViento $21500 4-ShortBasket $7500'))
        }
    } else if (question == 'cancelar' || question == 'CANCELAR' || question == 'Cancelar') {
        alert('gracias por venir')
        // CORTAR EL FLUJO DEL WHILE.
        return
    } else {
        alert('ingrese una palabra valida para continuar')
        getProducts()
    }
    envio()
    metodoDePago()
    alert('el total de la compra es de: ' + total)

    function saludoSalida() {
        alert('Gracias por tu Compra')
    }
    saludoSalida()

}
getProducts()


