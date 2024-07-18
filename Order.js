export default class Order {
    orderId;
    orderNumber;
    orderDate = new Date();
    dueDate = this.#dueDate(30);
    customerId;
    shipping;
    notes = "";
    terms;
    items = [];

    constructor(orderId, customerId, terms) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.terms = terms;
    }

    #dueDate(days) {
        const now = new Date();
        now.setDate(now.getDate() + days);
        return now;
    }

    isValid() {
        return this.id && this.customerId && this.dateDue > this.orderDate;
    }
}