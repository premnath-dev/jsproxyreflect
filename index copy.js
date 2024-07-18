import out from "./out.js";
console.clear();
out("Starting...");
const customer = {
    firstName: "",
    lastName: "",
    phone: "",
    companyName: ""
};
const temp = {...customer}
const handler = {
    set(target, prop, value) {
        if (prop === 'firstName') {
            target.firstName = `${value} P`;
        }
        return true;
    },
    get(target, prop) {
        if (prop === 'firstName') {
            return `${target.firstName}`.toUpperCase();
        }
        return target[prop];
    }
};

const custProxy = new Proxy(temp, handler)
custProxy.firstName = "Premnath";
out("Original",customer)
out("Proxy",custProxy)
out("Proxy firstName",custProxy.firstName)