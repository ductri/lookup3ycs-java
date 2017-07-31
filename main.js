var Lookup3Signature = require('./libs/Lookup3Signature');
var sig = new Lookup3Signature();

sig.add("oh-yeah tri dep trai");

var HEX_DIGITS = ['0', '1', '2', '3', '4', '5', '6',
        '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f','h','g' ];
var signature = sig.getSignature();
for (var i=0; i<signature.length; i++) {
}
var arr = [];
var temp = new Int32Array(signature.length);
for (var i=0; i<signature.length; i++) {
	temp[i] = signature[i];
}
console.log('')
for (var i=0; i<temp.length; i++) {
    var idx = i<<1;
    arr[idx]= HEX_DIGITS[(temp[i] >> 4) & 0xf];
    arr[idx+1]= HEX_DIGITS[temp[i] & 0xf];
}

console.log(arr.join('').toString());
