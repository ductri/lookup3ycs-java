var Character = require('codepoint');
var Hash = function() {
    
};

Hash.lookup3ycs64 = function(s,start, end, initval) {
    var a,b,c;
    console.log("initval: " + initval);
    a = b = c = 0xdeadbeef + parseInt(initval);
    console.log("a=b=c: ", a);
    c += parseInt(initval>>>32);

    console.log("c: ", c);
        // only difference from lookup3 is that "+ (length<<2)" is missing
        // since we don't know the number of code points to start with,
        // and don't want to have to pre-scan the string to find out.

    var i=start;
    var mixed=true;  // have the 3 state variables been adequately mixed?
        for(;;) {
            if (i>= end) break;
            mixed=false;
            var ch;
            ch = s.charAt(i++);
            a += Character.isHighSurrogate(ch) && i< end ? Character.toCodePoint(ch, s.charAt(i++)) : ch;
            if (i>= end) break;
            ch = s.charAt(i++);
            b += Character.isHighSurrogate(ch) && i< end ? Character.toCodePoint(ch, s.charAt(i++)) : ch;
            if (i>= end) break;
            ch = s.charAt(i++);
            c += Character.isHighSurrogate(ch) && i< end ? Character.toCodePoint(ch, s.charAt(i++)) : ch;
            if (i>= end) break;

            // mix(a,b,c)... Java needs "out" parameters!!!
            // Note: recent JVMs (Sun JDK6) turn pairs of shifts (needed to do a rotate)
            // into real x86 rotate instructions.
            {
                a -= c;  a ^= (c<<4)|(c>>>-4);   c += b;
                b -= a;  b ^= (a<<6)|(a>>>-6);   a += c;
                c -= b;  c ^= (b<<8)|(b>>>-8);   b += a;
                a -= c;  a ^= (c<<16)|(c>>>-16); c += b;
                b -= a;  b ^= (a<<19)|(a>>>-19); a += c;
                c -= b;  c ^= (b<<4)|(b>>>-4);   b += a;
            }
            mixed=true;
        }


        if (!mixed) {
            // final(a,b,c)
            c ^= b; c -= (b<<14)|(b>>>-14);
            a ^= c; a -= (c<<11)|(c>>>-11);
            b ^= a; b -= (a<<25)|(a>>>-25);
            c ^= b; c -= (b<<16)|(b>>>-16);
            a ^= c; a -= (c<<4)|(c>>>-4);
            b ^= a; b -= (a<<14)|(a>>>-14);
            c ^= b; c -= (b<<24)|(b>>>-24);
        }

        return c + ((b) << 32);
};

module.exports = Hash;