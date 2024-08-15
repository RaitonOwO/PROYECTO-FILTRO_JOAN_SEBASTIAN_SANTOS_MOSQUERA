// Array para almacenar los productos en el carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Obtener todos los botones de "Comprar"
const botonesComprar = document.querySelectorAll('.btn-comprar');

// Agregar evento de clic a cada botón
botonesComprar.forEach(boton => {
    boton.addEventListener('click', () => {
        // Obtener datos del producto desde los atributos 'datos'
        const nombreProducto = boton.getAttribute('datos-nombre');
        const precioProducto = boton.getAttribute('datos-precio');
        
        // Crear un objeto de producto
        const producto = {
            nombre: nombreProducto,
            precio: parseInt(precioProducto)
        };
        
        // Agregar el producto al carrito
        carrito.push(producto);
        
        // Guardar el carrito en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
        // Mostrar un mensaje o actualizar la interfaz
        alert(`${producto.nombre} ha sido añadido al carrito.`);
        
        // (Opcional) Mostrar el contenido del carrito en la consola
        console.log(carrito);
    });
});
