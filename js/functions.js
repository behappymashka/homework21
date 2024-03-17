function showCategories() {
    const parent = document.getElementById('categories');

    data.forEach(category => {
        const myCategoryElement = document.createElement('div');
        myCategoryElement.textContent = category.name;
        myCategoryElement.setAttribute('data-category', category.key);

        parent.appendChild(myCategoryElement);
    });
}

function showProductsByCategory(categoryId) {
    const selectedCategory = data.find(category => category.key === categoryId);

    const parent = document.getElementById('products');
    parent.innerHTML = '';

    selectedCategory.products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.textContent = product.name;
        productElement.setAttribute('data-product', product.id);
        productElement.setAttribute('data-category', categoryId);

        parent.appendChild(productElement);
    });
}

function showProductInfo(categoryId, productId) {
    const selectedCategory = data.find(category => category.key === categoryId);
    const selectedProduct = selectedCategory.products.find(product => product.id == productId);

    const parent = document.getElementById('product');
    parent.innerHTML = `
    <h2>${selectedProduct.name}</h2>
    <p>Price: $${selectedProduct.price}</p>
    <p>${selectedProduct.description}</p>
  `;

    const buyButton = document.createElement('input');
    buyButton.setAttribute('type', 'button');
    buyButton.setAttribute('value', 'Buy');
    buyButton.addEventListener('click', () => {

        document.getElementById('products').innerHTML = '';
        document.getElementById('product').innerHTML = '';

        const congratulations = document.createElement('p');
        congratulations.textContent = 'Fill in the delivery information in the form that has opened';

        const form = document.forms['buyerDetails'];
        form.style.display = 'block';

        parent.appendChild(congratulations);
    });

    parent.appendChild(buyButton);
}

function showDeliveryInfo(event) {
    event.preventDefault();
    const sendButton = document.querySelector("#SendBtn");
    sendButton.addEventListener('click', function (event) {
        const fullName = document.querySelector('#fullName').value;
        const yourCity = document.querySelector('#yourCity').value;
        const addressOfPost = document.querySelector('#addressOfPost').value;
        const payment = document.querySelector('input[name="payment"]:checked').value;
        const comments = document.querySelector('#comments').value;

        if (fullName === '' || yourCity === '0' || addressOfPost === '' || !payment) {
            alert('Please fill in all required fields');
            event.preventDefault();
            return;
        }
        document.getElementById("buyerDetails").style.display = "none";
        document.getElementById("orderInfo").style.display = "block";

        document.getElementById("fullNameInfo").textContent = "Full Name: " + fullName;
        document.getElementById("yourCityInfo").textContent = "Your city: " + yourCity;
        document.getElementById("addressOfPostInfo").textContent = "Address: " + addressOfPost + " post office";
        document.getElementById("paymentInfo").textContent = "Payment: " + payment;
        document.getElementById("commentsInfo").textContent = "Comments: " + comments;

    });


}







