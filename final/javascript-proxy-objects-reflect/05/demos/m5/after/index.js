import { out } from "./out.js";
import Order from "./Order.js";
console.clear();

out("Starting...");

const theOrder = new Order(1, 2, 1003);
theOrder.items.push({
  product: "Pens",
  price: 4.99,
  quantity: 10,
  discount: 0
});
theOrder.orderNumber = 0;
out(`Order: ${theOrder.orderNumber} - ${theOrder.orderDate}`);
out(`Order isValid: ${theOrder.isValid()}`);
// const person = {
//   name: "Shawn"
// };

// Reflect.set(person, "name", "Bob");

// out(Reflect.get(person, "name"));

// const order = {
//   orderId: 1,
//   orderNumber: "1001",
//   dueDate: Date(),
//   customerId: 1,
//   shipping: "UPS",
//   notes: ""
// };

// var theOrder = new Proxy(order, {
//   get() {
//     const result = Reflect.get(...arguments);
//     out(`reading a property: ${result}`);
//     return result;
//   },
//   set() { return Reflect.set(...arguments); },
//   apply() { return Reflect.apply(...arguments); },
//   defineProperty() { return Reflect.defineProperty(...arguments); }
// });

// theOrder.orderNumber = 1002;
// out(theOrder.orderNumber);


