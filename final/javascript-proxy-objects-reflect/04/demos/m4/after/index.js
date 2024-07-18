import { out } from "./out.js";
import Order from "./Order.js";

console.clear();
out("Starting...");

const classProxy = new Proxy(Order, {
  construct(target, args) {
    out("Calling Constructor");
    return new Proxy(new target(...args), {
      get(target, key) {
        out(`Getting ${key}`);
        return target[key];
      },
      // set(target, key, value) {
      //   return target[key] = value;
      // },
      defineProperty(target, key, descriptor) {
        if (key.indexOf("_") > -1) {
          throw new Error("No underscores");
        }
        out(`defining prop: ${key}`)
        return target[key] = descriptor.value;
      },
      deleteProperty(target, key) {
        if (key === "age") {
          throw new Error("Cannot delete age");
        }
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

const order = new classProxy(1001, 1, "Net 30");

out(order.terms);
Object.preventExtensions(order);
if (Object.isExtensible(order)) {
  out(order.credit = 2000);
  out(order.age = 45);

  delete order.credit;
}


async function checkUpdates() {
  // make some expensive call
  out("Fetching");
  try {
    const result = await fetch("https://catfact.ninja/fact");
    const fact = (await result.json()).fact;
    return fact;
  } catch (e) {
    out(e);
  }
  return true;
}

let lastTime = 0;
let cached;

const funcProxy = new Proxy(checkUpdates, {
  async apply(target, theThis, args) {
    const newTime = new Date().getTime();
    if (newTime - lastTime > 1000) {
      cached = await target.apply(theThis, args);
      lastTime = newTime;
      out(cached);
    }
    return cached;
  }
});

while (false) {
  await funcProxy();
}

const some = {
  name: "Shawn",
  city: "Atlanta"
};

const someProxy = Proxy.revocable(some, {
  get(target, key) {
    if (key === "name") return target[key].toUpperCase();
    return target[key];
  }
});

out(`${someProxy.proxy.name} from ${someProxy.proxy.city}`);
someProxy.revoke();
out(`${some.name} from ${some.city}`);
