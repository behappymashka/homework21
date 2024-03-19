window.addEventListener('DOMContentLoaded', showCategories);
document.getElementById('categories').addEventListener('click', event => {
    const categoryId = event.target.getAttribute('data-category');
    showProductsByCategory(categoryId);
});
document.getElementById('products').addEventListener('click', event => {
    const productId = event.target.getAttribute('data-product');
    const categoryId = event.target.getAttribute('data-category');

    showProductInfo(categoryId, productId);
});

document.querySelector('#buyerDetails').addEventListener('submit', showDeliveryInfo);
document.addEventListener("DOMContentLoaded", function () {
    const myOrdersButton = document.querySelector('#myOrders');
    myOrdersButton.addEventListener('click', showMyOrders);
});
document.addEventListener("DOMContentLoaded", function () {
    const myShopButton = document.querySelector('#backBtn');
    myShopButton.addEventListener('click', showMyShop);
});
document.addEventListener("DOMContentLoaded", function () {
    displayOrdersFromLocalStorage();
});
