var Character = require('codepoint');
var Int64 = require('n64');
var Hash = function() {
    
};

Hash.lookup3ycs64 = function(s,start, end, initval) {
    var abc = new Int32Array(3);
    for (var i=0;i<abc.length;i++) {
        abc[i] = 0xdeadbeef + initval.toInt();

    }

    abc[2] += initval.ishrn(32).toInt();

        // only difference from lookup3 is that "+ (length<<2)" is missing
        // since we don't know the number of code points to start with,
        // and don't want to have to pre-scan the string to find out.
    var i=start;
    var mixed=true;  // have the 3 state variables been adequately mixed?
    for(;;) {
        if (i>= end) break;
        mixed=false;
        var ch;
        ch = s.charCodeAt(i++);

        abc[0] += Character.isHighSurrogate(ch) && i< end ? Character.toCodePoint(ch, s.charAt(i++)) : ch;

        if (i>= end) break;
        ch = s.charCodeAt(i++);
        abc[1] += Character.isHighSurrogate(ch) && i< end ? Character.toCodePoint(ch, s.charAt(i++)) : ch;
        if (i>= end) break;
        ch = s.charCodeAt(i++);
        abc[2] += Character.isHighSurrogate(ch) && i< end ? Character.toCodePoint(ch, s.charAt(i++)) : ch;
        if (i>= end) break;

        // mix(a,b,c)... Java needs "out" parameters!!!
        // Note: recent JVMs (Sun JDK6) turn pairs of shifts (needed to do a rotate)
        // into real x86 rotate instructions.

        {
            abc[0] -= abc[2];  abc[0] ^= (abc[2]<<4)|(abc[2]>>>-4);   abc[2] += abc[1];
            abc[1] -= abc[0];  abc[1] ^= (abc[0]<<6)|(abc[0]>>>-6);   abc[0] += abc[2];
            abc[2] -= abc[1];  abc[2] ^= (abc[1]<<8)|(abc[1]>>>-8);   abc[1] += abc[0];
            abc[0] -= abc[2];  abc[0] ^= (abc[2]<<16)|(abc[2]>>>-16); abc[2] += abc[1];
            abc[1] -= abc[0];  abc[1] ^= (abc[0]<<19)|(abc[0]>>>-19); abc[0] += abc[2];
            abc[2] -= abc[1];  abc[2] ^= (abc[1]<<4)|(abc[1]>>>-4);   abc[1] += abc[0];
        }
        mixed=true;
    }

    if (!mixed) {
        // final(a,b,c)
        abc[2] ^= abc[1]; abc[2] -= (abc[1]<<14)|(abc[1]>>>-14);
        abc[0] ^= abc[2]; abc[0] -= (abc[2]<<11)|(abc[2]>>>-11);
        abc[1] ^= abc[0]; abc[1] -= (abc[0]<<25)|(abc[0]>>>-25);
        abc[2] ^= abc[1]; abc[2] -= (abc[1]<<16)|(abc[1]>>>-16);
        abc[0] ^= abc[2]; abc[0] -= (abc[2]<<4)|(abc[2]>>>-4);
        abc[1] ^= abc[0]; abc[1] -= (abc[0]<<14)|(abc[0]>>>-14);
        abc[2] ^= abc[1]; abc[2] -= (abc[1]<<24)|(abc[1]>>>-24);
    }
    
    var b = Int64.fromInt(abc[1], true);
    
    b = b.ishln(32);
    
    var c = Int64.fromInt(abc[2], true);
    
    var result = c.iadd(b);
    
    return result;
};

module.exports = Hash;