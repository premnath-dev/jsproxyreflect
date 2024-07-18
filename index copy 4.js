import out from "./out.js";
console.clear();

out("Starting...");

function checkUpdates() {
  // expensive call
  out("Fetching");
  return true;
}

let lastTime = 0;
let cached = false;

const funcProxy = new Proxy(checkUpdates, {
  apply(target, theThis, args) {
    const newTime = new Date().getTime();
    if (newTime - lastTime > 1000) {
      cached = target.apply(theThis, args);
      lastTime = newTime;
    }
    return cached;
  },
});
