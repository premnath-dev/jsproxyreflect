function out(...params) {
   if (params.length === 1 && typeof params[0] === 'string') {
     return console.log(params[0]);
   } else {
    return console.log(...params);
   }
 }
  
  const handler = {
    apply: (target, thisArg, args)=>{
      target.apply(thisArg, args);
    }
  }

  const proxy = new Proxy(out, handler);

  export default proxy