import out from "./out.js";
console.clear();
/* 
out("Starting...");

const people = [
    {
        name: "Premnath",
        age: 50
    },
    {
        name: "Sathiya",
        age: 44
    },
    {
        name: "Bill",
        age: 29
    },
    {
        name: "Mark",
        age: 88
    },
];


const proxyCollecion = new Proxy(people, {
    get(target, key) {
        out(`Getting ${key}: ${JSON.stringify(target[key])}`); 
        return target[key];
    },
    set(target, key, value) {
        target[key] = value;
        return true;
    }
});

out(proxyCollecion[0]);

 */

const customer = {
  firstName: "Premnath",
  lastName: "P",
  phone: "6382709971",
  companyName: "eReleGo Technologies Pvt Ltd",
};

const proxyCust = new Proxy(customer, {
  ownKeys(target) {
    return Object.keys(target).filter((key) => key !== "firstName");
  },
  has(target, key) {
    if(key === "firstName") return false;
    return key in target;
  }
});
for (let key in proxyCust) {
  out(key);
}
