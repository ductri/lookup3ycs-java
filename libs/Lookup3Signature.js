var Hash = require('./hash');
var Int64 = require('n64');
var Lookup3Signature = function(){
    this.hash = Int64.from(0, true);
};

Lookup3Signature.prototype.add = function (content  ){
    this.hash = Hash.lookup3ycs64(content,0,content.length, this.hash);
    console.log("Hash=" + this.hash);
};

Lookup3Signature.prototype.getSignature = function() {
	var result = new Int8Array(8);
	for (var i=7;i>0;i--) {
		result[7-i] = this.hash.shrn(i*8).toInt();
	}
	result[7] = this.hash.toInt();
    return result;
};

module.exports = Lookup3Signature;