const firstIndex = (hex, needle) => {
    let str = "";
    let hexarr = hex.split(" ")

    for (i = 0; i < hexarr.length; i++) {
        if(needle[0] === String.fromCharCode(parseInt(hexarr[i], 16))) {
            let found = true;
            for (j = 1; j < needle.length; j++) {
                console.log("found letter", needle[0], String.fromCharCode(parseInt(hexarr[i], 16)))
                if (needle[j] !== String.fromCharCode(parseInt(hexarr[i + j], 16))) {
                    console.log("mismatch", needle[j], String.fromCharCode(parseInt(hexarr[i + j], 16)))
                    found = false
                }
            }
            if (found) return i

        }
    }

}

const printPi = len => {
    return Math.round(Math.PI * (10 ** len)) / (10 ** len)
    
}

console.log(printPi(5))