var Lookup3Signature = require('./libs/Lookup3Signature');
var sig = new Lookup3Signature();
sig.add("link");
sig.add("linhtinh.minh");
var HEX_DIGITS = ['0', '1', '2', '3', '4', '5', '6',
        '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f','h','g' ];
var signature = sig.getSignature();
console.log(signature);
var arr = []; //new char[signature.length<<1];
for (var i=0; i<signature.length; i++) {
    var b = signature[i];
    var idx = i<<1;
    arr[idx]= HEX_DIGITS[(b >> 4) & 0xf];
    arr[idx+1]= HEX_DIGITS[b & 0xf];
}
var sigString = arr.toString();

console.log(sigString);