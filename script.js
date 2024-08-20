document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById('search');
    const productosContainer = document.getElementById('productos');
    const carritoContenido = document.getElementById('carrito-contenido');

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


    const productosJSON = {
        "productos": [
            {"marca":"Moyu", "peso":"78 gramos", "tamaño":"4,8cm", "Referencia":"RS2M", "color":"stickerless", "precio": 37000, "imagen": "RS2M 2X2.avif"},
            {"marca":"Qiyi", "peso":"78 gramos", "tamaño":"5,6cm", "Referencia":"MS 2x2 M", "color":"stickerless", "precio": 72000, "imagen": "qiyi MS magnetic 2x2.webp"},
            {"marca":"Gan", "peso":"78 gramos", "tamaño":"5,6cm", "Referencia":"251 M Leap", "color":"stickerless", "precio": 123000, "imagen": "GAN-251-2x2.webp"},
            {"marca":"Moyu", "peso":"86 gramos", "tamaño":"5,6cm", "Referencia":"RS3 M 2020", "color":"stickerless", "precio": 60000, "imagen": "Cubo3x3.jpg"},
            {"marca":"Qiyi", "peso":"78 gramos", "tamaño":"5,6cm", "Referencia":"Valk 3 Elite M", "color":"stickerless", "precio": 200000, "imagen": "valk 3 elite m.jpg"},
            {"marca":"Gan", "peso":"86 gramos", "tamaño":"56mm", "Referencia":"356 M + GES", "color":"stickerless", "precio": 157000, "imagen": "Gan356m.jpg"},
            {"marca":"Moyu", "peso":"86 gramos", "tamaño":"60 mm", "Referencia":"Moyu YJM 4x4", "color":"stickerless", "precio": 74000, "imagen": "cubo4x4.avif"},
            {"marca":"Qiyi", "peso":"123 g", "tamaño":"60 mm", "Referencia":"MP 4X4", "color":"stickerless", "precio": 81000, "imagen": "QiYi-M-Pro-4x4.webp"},
            {"marca":"Gan", "peso":"86 gramos", "tamaño":"60 mm", "Referencia":"GAN 460 M", "color":"stickerless", "precio": 380000, "imagen": "gan 460m.jpg"},
            {"marca":"Moyu", "peso":"123 gramos", "tamaño":"62 mm", "Referencia":"MGC 5", "color":"stickerless", "precio": 70000, "imagen": "cubo5x5.jpg"},
            {"marca":"Gan", "peso":"123 gramos", "tamaño":"62 mm", "Referencia":"562 M", "color":"stickerless", "precio": 290000, "imagen": "gan 562M.webp"},
            {"marca":"Qiyi", "peso":"153 gramos", "tamaño":"62 mm", "Referencia":"MP 5x5 M", "color":"stickerless", "precio": 161000, "imagen": "QiYi-MP-5X5.webp"},
            {"marca":"Moyu", "peso":"150 gramos", "tamaño":"61 mm", "Referencia":"Aoshi WRM 6x6", "color":"stickerless", "precio": 214000, "imagen": "aoshi-wrm-6x6-.webp"},
            {"marca":"Gan", "peso":"167 gramos", "tamaño":"65 mm", "Referencia":"YuXin Little Magic 6x6", "color":"stickerless", "precio": 62000, "imagen": "YuXin-Little-Magic-6x6-Stickerless.webp"},
            {"marca":"Qiyi", "peso":"167 gramos", "tamaño":"67 mm", "Referencia":"Qifan S 6x6", "color":"stickerless", "precio": 103000, "imagen": "qiyi qigan s 6x6.avif"},
            {"marca":"Qiyi", "peso":"200 gramos", "tamaño":"69 mm", "Referencia":"Qiman S 7x7", "color":"stickerless", "precio": 195000, "imagen": "Qiyi-7x7.webp"},
            {"marca":"Gan", "peso":"220 gramos", "tamaño":"72 mm", "Referencia":"Gan 354M 7x7", "color":"stickerless", "precio": 170000, "imagen": "gan megaminx.jpg"},
            {"marca":"YuXin", "peso":"250 gramos", "tamaño":"75 mm", "Referencia":"Little Magic 7x7", "color":"stickerless", "precio": 71000, "imagen": "YuXin-Little-Magic-7x7-Stickerless.webp"}
        ]
    };

   
    function renderProductos(productos) {
        productosContainer.innerHTML = '';
        productos.forEach(producto => {
            const productoElement = document.createElement('figure');
            productoElement.classList.add('product');
            productoElement.innerHTML = `
                <img src="./imagenes/${producto.imagen}" alt="${producto.Referencia}">
                <h2>${producto.marca} ${producto.Referencia}</h2>
                <p>Precio: ${producto.precio.toLocaleString()} COP</p>
                <button class="btn-comprar" data-nombre="${producto.marca} ${producto.Referencia}" data-precio="${producto.precio}" data-imagen="${producto.imagen}">Comprar</button>
            `;
            productosContainer.appendChild(productoElement);
        });
        asignarEventosBotones();
    }

    
    function asignarEventosBotones() {
        const botonesComprar = document.querySelectorAll('.btn-comprar');
        botonesComprar.forEach(boton => {
            boton.addEventListener('click', () => {
                const nombreProducto = boton.getAttribute('data-nombre');
                const precioProducto = boton.getAttribute('data-precio');
                const imagenProducto = boton.getAttribute('data-imagen');

                const producto = {
                    nombre: nombreProducto,
                    precio: parseInt(precioProducto),
                    imagen: imagenProducto
                };

                carrito.push(producto);
                localStorage.setItem('carrito', JSON.stringify(carrito));

                alert(`${producto.nombre} ha sido añadido al carrito.`);
                console.log(carrito);

                actualizarCarrito();
            });
        });
    }

   
    function actualizarCarrito() {
        carritoContenido.innerHTML = '';
        carrito.forEach(producto => {
            const productoElemento = document.createElement('div');
            productoElemento.classList.add('carrito-producto');
            productoElemento.innerHTML = `
                <img src="./imagenes/${producto.imagen}" alt="${producto.nombre}" class="carrito-imagen">
                <p>${producto.nombre}</p>
                <p>Precio: ${producto.precio.toLocaleString()} COP</p>
            `;
            carritoContenido.appendChild(productoElemento);
        });
    }


    renderProductos(productosJSON.productos);

    // Función para filtrar productos
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProductos = productosJSON.productos.filter(producto =>
            producto.marca.toLowerCase().includes(searchTerm) ||
            producto.Referencia.toLowerCase().includes(searchTerm) ||
            producto.peso.toLowerCase().includes(searchTerm) ||
            producto.tamaño.toLowerCase().includes(searchTerm) ||
            producto.color.toLowerCase().includes(searchTerm)
        );
        renderProductos(filteredProductos);
    });
});
