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
        document.getElementById("newOrder").addEventListener("click", function () {
            window.location.href = "index.html";
        });

        //localStorage
        const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
        const newOrder = {
            fullName: fullName,
            yourCity: yourCity,
            addressOfPost: addressOfPost,
            payment: payment,
            comments: comments
        };
        existingOrders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(existingOrders));
    });
}

function showMyOrders(event) {
    event.preventDefault();
    document.querySelector(".shop").style.display = "none";
    document.querySelector(".ordersList").style.display = "block";
    document.querySelector("#myOrders").style.display = "none";
    document.querySelector("#backBtn").style.display = "block";
}

function showMyShop(event) {
    event.preventDefault();
    document.querySelector(".shop").style.display = "block";
    document.querySelector(".ordersList").style.display = "none";
    document.querySelector("#myOrders").style.display = "block";
}

function showOrderDetails(index) {
    const localOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = localOrders[index];

    const detailsContainer = document.getElementById('orderDetails');
    detailsContainer.innerHTML = '';

    if (order) {
        const orderContainer = document.createElement('div');

        const fullNameParagraph = document.createElement('p');
        fullNameParagraph.textContent = `Full Name: ${order.fullName}`;

        const yourCityParagraph = document.createElement('p');
        yourCityParagraph.textContent = `Your city: ${order.yourCity} `;

        const addressParagraph = document.createElement('p');
        addressParagraph.textContent = `Address: ${order.addressOfPost}`;

        const paymentParagraph = document.createElement('p');
        paymentParagraph.textContent = `Payment: ${order.payment}`;

        const commentsParagraph = document.createElement('p');
        commentsParagraph.textContent = `Comments: ${order.comments}`;



        orderContainer.appendChild(fullNameParagraph);
        orderContainer.appendChild(yourCityParagraph);
        orderContainer.appendChild(addressParagraph);
        orderContainer.appendChild(paymentParagraph);
        orderContainer.appendChild(commentsParagraph);


        detailsContainer.appendChild(orderContainer);
    } else {
        detailsContainer.textContent = 'Order details not found.';
    }
}

function deleteOrder(index) {
    const localOrders = JSON.parse(localStorage.getItem('orders')) || [];
    localOrders.splice(index, 1);
    localStorage.setItem('orders', JSON.stringify(localOrders));
    displayOrdersFromLocalStorage();
    const detailsContainer = document.getElementById('orderDetails');
    detailsContainer.innerHTML = '';
}

function displayOrdersFromLocalStorage() {
    const localOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersList = document.getElementById('orders');
    ordersList.innerHTML = '';
    if (localOrders.length === 0) {
        const emptyListMessage = document.createElement('p');
        emptyListMessage.textContent = 'Список заказов пуст';
        ordersList.appendChild(emptyListMessage);
    } else {
        localOrders.forEach((order, index) => {
            const orderItem = document.createElement('li');
            const cityNames = {
                '0': 'select city',
                '1': 'Kharkiv',
                '2': 'Kyiv',
                '3': 'Dnipro',
                '4': 'Odesa',
                '5': 'Zaporizhia'
            };
            const cityName = cityNames[order.yourCity];
            orderItem.textContent = `Order № ${index + 1}: ${order.fullName}, ${cityName} `;
            const infoButton = document.createElement('button');
            infoButton.setAttribute("type", "button");
            infoButton.textContent = 'Order details';
            infoButton.setAttribute('data-id', order.id);
            infoButton.addEventListener('click', () => {
                showOrderDetails(index);
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                deleteOrder(index);
            });
            orderItem.appendChild(infoButton);
            orderItem.appendChild(deleteButton);
            ordersList.appendChild(orderItem);
        });
    }
}
