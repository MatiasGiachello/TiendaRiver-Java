alert('¡Bienvenidos a la River Close! Aca encontraras los mejores precios para La ropa Del Mas Grande')

alert('Ingrese el producto de la tienda que desee llevar, para salir ingrese 0')
let seleccionarProductos = Number(prompt('1-CamisetaTitular $19500 2-CamisetaAlternativa $17750 3-CamperaRompeViento $21500 4-ShortBasket $7500'))
let seleccionarCantidad;
let total = 0;


const cantidad = (cant, precio) => {
    return cant * precio
}


while (seleccionarProductos != 0) {
    switch (seleccionarProductos) {
        case 1:
            seleccionarCantidad = Number(prompt('el producto seleccionado es CamisetaTitular, indique la cantidad'))
            total += cantidad(seleccionarCantidad, 19500)
            break;
        case 2:
            seleccionarCantidad = Number(prompt('el producto seleccionado es CamisetaAlternativa, indique la cantidad'))
            total += cantidad(seleccionarCantidad, 17750)
            break;
        case 3:
            seleccionarCantidad = Number(prompt('el producto seleccionado es CamperaRompeViento, indique la cantidad'))
            total += cantidad(seleccionarCantidad, 21500)
            break;
        case 4:
            seleccionarCantidad = Number(prompt('el producto seleccionado es , ShortBasket indique la cantidad'))
            total += cantidad(seleccionarCantidad, 7500)
            break;

        default:
            break;
    }
    seleccionarProductos = Number(prompt('1-CamisetaTitular $19500 2-CamisetaAlternativa $17750 CamperaRompeViento $21500 4-ShortBasket $7500'))
}

alert('el total de la compra es de:' + total)

const envio = () => {
    if (total >= 18500) {
        alert('el envio es gratis')
    } else {
        total += 18500
        alert('el costo del envio es de 1650, el total es de:' + total)
    }
}

const metodoDePago = () => {
    let metodo = prompt('ingrese el metodo de pago, tarjeta o efectivo')
    if (metodo == 'tarjeta') {
        total += 1750
        console.log(total);
        alert('hay un recargo de 1750, el total es de:' + total)
    } else if (metodo == 'efectivo') {
        total -= 2500
        alert('hay un descuento de 2500, el total es de:' + total)
    }


}