import { out } from "./out.js";

console.clear();

out("Starting...");

const customer = {
  firstName: "",
  lastName: "",
  phone: "",
  companyName: ""
};

const handler = {
  set(target, prop, val) {
    out(`Setting: ${prop} - ${val}`);
    //if (prop === "firstName") {
    target[prop] = val;
    //}
    return true;
  },
  get(target, prop) {
    out(`Getting: ${prop}`);
    const value = target[prop];
    if (typeof value === "string") {
      return `"${value}"`;
    }
    return value;
  },
  apply() { }
};

const custProxy = new Proxy(customer, handler);
custProxy.firstName = "Shawn";
custProxy.lastName = "Wildermuth";

out(`FirstName: ${customer.firstName}`);
out(`FirstName (Proxy): ${custProxy.firstName}`);
out(`LastName: ${customer.lastName}`);

out(`LastName: (Proxy): ${custProxy.lastName}`);

let something = new Date();

if (typeof something === 'object') {
  var proxy = new Proxy(something, {});
  out(proxy);
} else {
  out(`Cannot create a proxy with a ${typeof something}`)
}


function formatCustomer(cust) {
  return `${cust.lastName}, ${cust.firstName}`;
}

const formatProxy = new Proxy(formatCustomer, {
  apply(target, thisArg, args) {
    out(`Calling ${target}`);
    const returnValue = target.apply(thisArg, args);
    if (!returnValue) return "UNKNOWN";
    return returnValue;
  }
});

out(formatProxy(custProxy));