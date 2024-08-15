let orders = [];


export function getOrders() {
    return JSON.parse(localStorage.getItem('orders'));
}

export function saveOrder(order) {
    orders = getOrders() == null ? [] : getOrders();
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
}