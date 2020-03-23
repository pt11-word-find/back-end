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

function isPrefix(word, prefix) {
    console.log(word.substr(0, prefix.length-1))
	if (word.substr(0, prefix.length-1) === prefix.replace("-", "")) return true
	return false
}
function isSuffix(word, suffix) {
    console.log(word.substr(word.length -suffix.length + 1, word.length))
    if ( word.substr(word.length -suffix.length + 1, word.length) === suffix.replace("-", "")) return true
    return false
}

function isSpecialArray(arr) {
	for (i = 0; i < arr.length; i++) {
		if (i % 2 === 1 && arr[i] % 2 !== 1) return false
		if (i % 2 === 0 && arr[i] % 2 !== 0) return false
		return true
	}
}


function isWristband(arr) {
	// check horizontal
	let horizontal = true
	for (i = 0; i < arr.length; i++) {
		for (j = 0; j < arr[0].length; j++) {
			if (arr[i][j] !== arr[i][0]) horizontal = false
		}
	}
    if (horizontal) return true
    // check vertical
    let vertical = true
    for (i = 0; i < arr[0].length; i++) {
        for(j = 0; j < arr.length; j++) {
            if (arr[j][i] !== arr[0][i]) vertical = false
        }
    }
    if (vertical) return true
    // check upper left / lower right diagonal
    let leftdiag = true
    for (i = 0; i < arr.length; i++) {
        for(j = 0; j < arr[i].length; j++) {
            if (arr[i][j] !== arr[(i+1) % arr.length][(j+1) % arr[0].length]) leftdiag= false
        }
    }
    if (leftdiag) return true

    return false
}

console.log(isWristband([[1,1],[2,2],[3,3]]))
console.log(isWristband([[1,2],[1,2],[1,2]]))
console.log(isWristband([[1,2,3],[3,1,2],[2,3,1]]))
console.log(isWristband([[1,2,3],[2,3,1],[3,1,2]]))
