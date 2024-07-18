import out from "./out.js";
console.clear();

out("Starting...");
/* 
const customer = {
    firstName: "Premnath",
    lastName: "",
    phone: "",
    companyName: ""
};

Reflect.set(customer, "lastName", "P");
out(Reflect.get(customer, "lastName")) */

const order = {
    orderId: 1001,
    orderNumber: "1001",
    customerId: 1,
    terms: "Net 30",
    items: [],
    shipping: "FedEx",
    notes: "No notes",
    dueDate: new Date()
};

const orderProxy = new Proxy(order, {
    get() {
        out(`Getting property`);
        return Reflect.get(...arguments);
    },

    set() {
        out(`Setting property`);
        return Reflect.set(...arguments);
    },

    apply() {
        out(`Calling Function`);
        return Reflect.apply(...arguments);
    },

    deleteProperty() {
        out(`Deleting property`);
        return Reflect.deleteProperty(...arguments);
    },

    has() {
        out(`Testing property`);
        return Reflect.has(...arguments);
    },
    defineProperty() {
        out(`Defining property`);
        return Reflect.defineProperty(...arguments);
    }

});

out(orderProxy.orderId)