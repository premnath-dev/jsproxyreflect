import { out } from "./out.js";

class Order {
  orderId;
  orderNumber;
  orderDate = new Date();
  dueDate = this.#dueDate(30);
  customerId;
  shipping;
  notes = "";
  items = new Proxy([], {
    set(target, key, value) {
      if (key > target.length - 1) {
        out("Increasing the size of the items");
      }
      return Reflect.set(target, key, value);
    }
  });

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

const handler = {
  get(target, key, receiver) {
    const result = Reflect.get(target, key, receiver);
    if (typeof result === "function") {
      return new Proxy(result, {
        apply() {
          out(`Calling ${key} Function`);
          return Reflect.apply(...arguments);
        }
      });
    }
    out(`after getting with key: ${key} and value ${result}`);
    return result;
  },
  set(target, key, value) {
    const result = Reflect.set(target, key, value);
    if (!target.isValid()) {
      out("Target isn't valid");
    }
    return result;
  }
};

const typeHandler = {
  construct() {
    const result = Reflect.construct(...arguments);
    return new Proxy(result, handler);
  }
};

export default new Proxy(Order, typeHandler);