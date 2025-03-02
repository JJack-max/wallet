import bip39 from "bip39";

let res = bip39.generateMnemonic(128);

console.log(res);