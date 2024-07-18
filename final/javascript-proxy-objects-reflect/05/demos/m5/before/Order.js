export default class Order {
  orderId;
  orderNumber;
  orderDate = new Date();
  dueDate = this.#dueDate(30);
  customerId;
  shipping;
  notes = "";

  constructor(id, customerId, number) {
    this.id = id;
    this.customerId = customerId;
    this.orderNumber = number;
  }

  #dueDate(days) {
    const now = new Date();
    now.setDate(now.getDate() + days);
    return now;
  }

  isValid() {
    return this.id &&
      this.customerId &&
      this.dateDue > this.orderDate;
  }
}