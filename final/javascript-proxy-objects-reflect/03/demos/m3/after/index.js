import out from "./out.js";

console.clear();

out("Starting...");

// Arrays
const people = [
  {
    name: "Shawn",
    age: 50
  },
  {
    name: "James",
    age: 44
  },
  {
    name: "Betty",
    age: 29
  },
  {
    name: "Phillip",
    age: 88
  },
];

const proxyCollection = new Proxy(people, {
  get(target, key) {
    out(`Key: ${key}`);
    if (key === "pop") throw Error("pop is not allowed.");
    return target[key];
  },
  set(target, key, value) {
    if (key < target.length) {
      throw new Error("Cannot assign existing items");
    }
    if (key < target.length) throw Error("existing objects are locked");
    return target[key] = value;
  }
});

//const first = proxyCollection[0].name;
//proxyCollection.forEach(c => out(`foreach: ${c.name}`));

//proxyCollection.splice(1, 1, { name: "Bob" });

//const last = proxyCollection.pop();
//out(proxyCollection.length);

// OwnKeys
const customer = {
  firstname: "Shawn",
  lastname: "Wildermuth",
  phone: "4045551212",
  companyname: "Wilder Minds",
  _id: 100,
  address: {
    city: "Atlanta",
    country: "USA"
  }
};

const proxyCust = new Proxy(customer, {
  ownKeys(target) {
    return Object.keys(target).filter(k => k[0] !== "_");
  },
  get(target, key) {
    out(`Key: ${key}`)
    if (key[0] === "_") return;
    return new Proxy(target[key], {
      get(target, key) {
        out(`nested: ${key}`);
        return target[key];
      }
    });
  },
  set(target, key, value) {
    if (key[0] === "_") throw Error(`Cannot find ${key} in object.`);
    return target[key] = value;
  },
  has(target, key) {
    if (key[0] === "_") return false;
    return key in target;
  }
});

// for (let key in proxyCust) {
//   out(key);
//   out(customer[key]);
// }

out(proxyCust.address.city)

//out(proxyCust._id);
//proxyCust._id = 101;

// if ("_id" in proxyCust) {
//   out("found");
// } else {
//   out("Not Found");
// }