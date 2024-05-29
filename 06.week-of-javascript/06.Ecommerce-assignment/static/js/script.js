console.log('Hello world')

// get all the variables
const cartBtn = document.querySelector('.cart-btn')
const closeCartBtn = document.querySelector('.close-cart')
const clearCart = document.querySelector('.clear-cart')
const cartDom = document.querySelector('.cart')
const cartOverlay = document.querySelector('.cart-overlay')
const cartItems = document.querySelector('.cart-items')
const cartDiv = document.querySelector('.cart-item')
const cartContent = document.querySelector('.cart-content')
const cartTotal = document.querySelector('.cart-total')
const productsDom = document.querySelector('.products-center')


// define empty arrays of both products and cart items
// let products = []
let cart = []
let buttonsDom = []

// get the products
class Products{
    // function to fetch data
    async getProducts(){
        try{
            // fetch data using promises
            let result = await fetch('./database/db.json')
            let data = await result.json()  //get data in json format

            // destructure the response, which is in the form of an object
            let products = data.items
            products = products.map( item =>{

                // //destructure using method 1
                // const {sys:{id}} = item
                // const {fields:{title,price}} = item
                // const {fields:{image:{fields:{file:{url}}}}} = item
                // return {title:title,price:price,id:id,image:url}  //uneccessary in es6

                // destructure with method 2
                const {id} = item.sys
                const {title, price } = item.fields
                const image = item.fields.image.fields.file.url
                return {title,price,id,image}  //uneccessary in es6
            })
            return products
        } catch (error) {
            console.log(error)
        }
    }

}

// display the products
// should contain bulk of the methods, 
class DisplayUi{

    // funtion to display products in main webpage
    displayProducts(products){  //essential to place the products parameter
        let html = ''

        // since we get back an array, use array method to loop through @ product
        products.forEach(product => {
            html += `<article class="product">
                        <div class="img-container">
                            <img src="${product.image}" alt="${product.title}" class="product-img">
                            <button class="bag-btn" data-id="${product.id}">
                                <i class='bx bx-cart-add'></i>
                                add to bag
                            </button>
                        </div>
                        <h3> ${product.title} </h3>
                        <h4> $ ${product.price} </h4>
                    </article> `
        })
        productsDom.innerHTML = html
        
    }

    // get the add to cart button ids
    getAddToCartButton(){
        // use spread operator to get nodelist of all buttons
        const buttons = [...document.querySelectorAll('.bag-btn')]
        buttonsDom = buttons

        // get unque id of @button using forEach
        buttons.forEach(button =>{
            let id = button.dataset.id
            // console.log(id)
            
            //check if item is alreaady existing in cart
            let inCart = cart.find(item => item.id === id)

            if(inCart){
                button.innerText = 'In Cart'
                button.disabled = true
            } else {
                button.addEventListener('click', event=>{
                    event.target.innerText = 'In Cart'
                    event.target.disabled = true

                    // get product from products
                    let cartItem = {...Storage.getProduct(id),amount:1}
                    // console.log(cartItem)

                    // add item to empty cart array
                    cart = [...cart,cartItem]
                    // console.log(cart)

                    // save cart to the local storage
                    Storage.saveToCart(cart)

                    // set cart values number to increase/decrease
                    this.setCartValues(cart)

                    // display cart items
                    this.addCartItem(cartItem)

                })
            }
        })
    }


    setCartValues(cart){
        // function to auto-increment cart items number
        let tempTotal = 0
        let itemsTotal = 0
        cart.map(item => {
            tempTotal += item.price * item.amount
            itemsTotal += item.amount
        })
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2))
        cartItems.innerText = itemsTotal
    }

    addCartItem(item){
        // function to add products to cart
        let html = ''
        html += `
            <img src="${item.image}" alt="product">
            <div>
                <h4> ${item.title} </h4>
                <h5> $${item.price} </h5>
                <!-- instead of remove words.. place the delete icon instead -->
                <span class="remove-item" data-id="${item.id}"> remove </span>
                <i class='bx bx-trash'></i>
            </div>

            <div>
                <i class='bx bx-chevron-up bx-md' data-id="${item.id}"></i>
                    <p class="item-amount"> ${item.amount} </p>
                <i class='bx bx-chevron-down bx-md' data-id="${item.id}"></i>
            </div>`

        cartDiv.innerHTML = html
        console.log(cartDiv)
    }
}

// store data locally to prevent erasal on refresh
class Storage{
    // function to store data in local storage
    static storeData(products){
        // nani amezima stima?
        localStorage.setItem("products",JSON.stringify(products))

    }

    // function to get unique product id
    static getProduct(id){
        let products = JSON.parse(localStorage.getItem('products'))
        return products.find(product => product.id === id)
    }

    static saveToCart(cart){
        localStorage.setItem('cart',JSON.stringify(cart))
    }


}









// add the eventListener to start entire project
document.addEventListener('DOMContentLoaded', ()=>{
    // define instances of the classes
    const displayUi = new DisplayUi()
    const products = new Products


    // get products using now available methods
    // products.getProducts().then(products => console.log(products))

    // allow display of products in home page
    products.getProducts().then(products => {
        displayUi.displayProducts(products)
        Storage.storeData(products)     //static method thus no need to create an instance
    }).then(()=>{
        // allow method to run only after buttons have a value
        displayUi.getAddToCartButton()
    })
})