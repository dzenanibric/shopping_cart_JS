import { products } from "./products.js";

const shoppingCart = {
    getProducts: function(){
        const product_list = document.querySelector('.product__list');
        const products_array = Object.values(products);

        for(const product of products_array){
            const article = document.createElement('article');
            const product_name = document.createElement('h4');
            const price = document.createElement('small');
            const image = document.createElement('img');
            const quantity_input = document.createElement('input');
            const add_btn = document.createElement('button');
    
            image.src = product.imagePath;
            article.appendChild(image);
    
            product_name.setAttribute('id', 'name');
            product_name.innerText = 'Product: ' + product.productName;
            article.appendChild(product_name);
    
            price.innerText = 'Price: ' + product.productPrice;
            article.appendChild(price);
    
            quantity_input.setAttribute('type', 'number');
            quantity_input.setAttribute('id', 'quantity-input');
            article.appendChild(quantity_input);
    
            add_btn.innerText = 'Add to cart';
            add_btn.setAttribute('id', 'add-btn');
            article.appendChild(add_btn);
    
            article.style.border = '1px solid black';
    
            product_list.appendChild(article);
        }
        return products_array;
    },
    addToCart: function(products_array){
        const btn = document.querySelectorAll('#add-btn');
        const input = document.querySelectorAll('#quantity-input');
        const adedd_products = document.querySelector('.added__products');

        for(let i = 0; i<btn.length; i++){
            btn[i].addEventListener('click', ()=>{
                const product = document.createElement('div');
                const price = document.createElement('h4');
                const delete_btn = document.createElement('button');
                const quantity = document.createElement('h4');

                quantity.setAttribute('id', 'quantity');
                price.setAttribute('id', 'price');

                if(input[i].value > 0){
                    product.innerText = products_array[i].productName;
                    product.setAttribute('id', 'added-product');
                    product.style.fontWeight = 'bold';

                    price.innerText = products_array[i].productPrice;
                    quantity.innerText = input[i].value;

                
                    delete_btn.setAttribute('id', 'delete-btn');
                    delete_btn.innerText = 'Delete';
        
                    product.appendChild(price);
                    product.appendChild(delete_btn);
                    product.appendChild(quantity);
        
                    adedd_products.appendChild(product);
                    shoppingCart.totalPrice();
                    shoppingCart.deleteProducts();
                }
                else{
                    input[i].value = '';
                    alert('min. quantity is 1!');
                    throw new Error('min. quantity is 1!');
                }
                input[i].value = '';
            });
        }
    },
    totalPrice: function(){
        const quantity = document.querySelectorAll('#quantity');
        const price = document.querySelectorAll('#price');
        const total = document.getElementById('total');
        let total_price = 0;

        for(let i = 0; i < quantity.length; i++){
            const one = parseInt(quantity[i].textContent) * parseInt(price[i].textContent.substring(1, 10));
            total_price = total_price + one;
            total.textContent = '$' + total_price;
        }
    },
    deleteProducts: function(){
        const delete_btn = document.querySelectorAll('#delete-btn');
        const added_products = document.querySelectorAll('#added-product');
        const total = document.getElementById('total');
        const price = document.querySelectorAll('#price');
        const quantity = document.querySelectorAll('#quantity');

        let total_price = parseInt(total.textContent.substring(1,10));
        for(let i = 0; i<delete_btn.length; i++){
            delete_btn[i].addEventListener('click', ()=>{
                const one = parseInt(price[i].textContent.substring(1,10)) * quantity[i].textContent;
                total_price = total_price - one;
                total.textContent = '$' + total_price;
                added_products[i].remove();
            });
        }
    },
    init: function(){
        shoppingCart.addToCart(shoppingCart.getProducts());
    }
}

shoppingCart.init();