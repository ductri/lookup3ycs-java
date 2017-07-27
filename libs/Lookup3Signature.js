var Hash = require('./hash');
var Lookup3Signature = function(){
    this.hash = 0;
};

Lookup3Signature.prototype.add = function (content  ){
    this.hash = Hash.lookup3ycs64(content,0,content.length,this.hash);
    console.log('hash: ', this.hash);
};

Lookup3Signature.prototype.getSignature = function() {
    return [(this.hash>>56),(this.hash>>48),(this.hash>>40),(this.hash>>32),(this.hash>>24),(this.hash>>16),(this.hash>>8),(this.hash>>0)];
};

module.exports = Lookup3Signature;