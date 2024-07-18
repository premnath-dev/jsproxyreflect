import out from "./out.js";
import Order from "./Order.js";
console.clear();

out("Starting...");

const OrderClassProxy = new Proxy(Order, {
  construct(target, args) {
    out("Calling Constructor");
    return new Proxy(new target(...args), {
        defineProperty(target, key, descriptor) {
            out(`defining prop: ${key}`);
            target[key] = descriptor.value;
            return true;
          },
          deleteProperty(target, key) {
            out(`deleting prop: ${key}`);
        
            delete target[key];
            return true;
          },
          isExtensible(target) {
            out("testing extensibility");
            return Object.isExtensible(target);
          },
          preventExtensions(target) {
            out("locking down object");
            return Object.preventExtensions(target);
          }
    });
  }
})


const order = new OrderClassProxy(1, 2, "Net 30");
Object.preventExtensions(order);
if(Object.isExtensible(order)) {
    order.credits = 2000;
    
    delete order.credits;
}