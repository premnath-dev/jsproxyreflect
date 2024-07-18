import out from "./out.js";
console.clear();

out("Starting...");

const customer = {
    firstName: "Premnath",
    lastName: "P",
    _phone: "666-555-1212",
    companyName: "Google"
};

const customerProxy = Proxy.revocable(customer, {
    get(target, key) {
        if(key[0] === "_") return target[key];
        return `${target[key]}`.toUpperCase();
    }
})

out(customerProxy.proxy["firstName"]);
customerProxy.revoke();
out(customerProxy["firstName"]);