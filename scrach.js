console.log(squish([1, 2, 3, 4, 5], "right"))
// [[1, 2, 3, 4, 5], [3, 3, 4, 5], [6, 4, 5], [10, 5], [15]]

function squish(arr, dir) {
	if (arr.length <=1) return arr
	let output = [];
	let done = false;
	output.push(arr)
	if (dir === "left") {
		while (!done) {
			arr = squishLeft(arr)
			output.push(arr)
			if (output[output.length -1 ].length === 1) done = true
		}
	} if (dir === "right") {
		while (!done) {
			arr = squishRight(arr)
			output.push(arr)
			if (output[output.length -1 ].length === 1) done = true
		}
	}
	return output
}

function squishLeft(arr) {
	let output = []
	for (let i = 1; i < arr.length; i++) {
		if (i === 1) {
			output.push(arr[i] + arr[i-1])
		} else {
			output.push(arr[i])
		}
	}
	console.log(output)
	return output
}

function squishRight(arr) {
	let output = []
	for (let i = arr.length-2 ; i >= 0 ; i--) {
		if (i === arr.length-2) {
			output.unshift(arr[arr.length-1] + arr[arr.length-2])
		} else {
			output.unshift(arr[i])
		}
	}
	console.log(output)
	return output
}




function codeCracker(string) {
	let codes = []
	for (let i = 0 ; i < string.length; i++) {
		codes.push(string.charCodeAt(i))
	}
	return codes.map(item => 
		String(item).split("").map(digit => Number(digit)).reduce((acc,val) => acc + val), 0)
}


function routeTracer(grid, input) {
	let myPos = []
	let items = ["&", "$", "#"]
	let myitems = ""
	grid.map((item, row) => {
		item.map((tile, col) => {
			if (tile === "@") {
					myPos = [row, col]
			}
		})
	})
	for (i = 0; i < input.length; i++) {
		console.log(input[i])
		switch(input[i]) {
			case "l":
				console.log(myPos)
				myPos = [myPos[0], myPos[1]-1]
				console.log(myPos)
				break
			case "r":
				myPos = [myPos[0], myPos[1]+1]
				break
			case "u":
				myPos = [myPos[0]-1, myPos[1]]
				break
			case "d":
				myPos = [myPos[0]+1, myPos[1]]
				break
		}
		if (items.includes(grid[myPos[0]][myPos[1]]) ) {
			myitems += grid[myPos[0]][myPos[1]];
		}
		console.log(myPos)
		grid[myPos[0]][myPos[1]] = "x";
	}
	
	return {route: grid, items: myitems}
}


function sortContacts(names, sort) {
	if (!names) return []
	
	if (sort === "ASC") {
		return names.sort((a,b) => alphabetizeDesc(a,b))
	} else {
		return names.sort((a,b) => alphabetize(a,b))
	}
}

function alphabetize(word1, word2) {
	for (i = 0; i < word1.length; i++) {
		if (word1.charCodeAt(i) > word2.charCodeAt(i)) {
			return 1
		} else if (word2.charCodeAt(i) > word1.charCodeAt(i)) {
			return -1
		}
	}
}

function alphabetizeDesc(word1, word2) {
	for (i = 0; i < word1.length; i++) {
		if (word1.charCodeAt(i) < word2.charCodeAt(i)) {
			return -1
		} else if (word2.charCodeAt(i) < word1.charCodeAt(i)) {
			return 1
		}
	}
}

console.log(sortContacts(['John Locke', 'Thomas Aquinas', 'David Hume', 'Rene Descartes'], 'ASC'))

// function removeWordsLastVowel(word) {
// 	const vowels = ["a", "e", "i", "o", "u"];
// 	if (word.length = 1 && vowels.includes(word)) return ""
// 	let lastVowel = -1;
// 	for (i = 0 ; i < word.length ; i++) {
// 		if (vowels.includes(word[i].toLowerCase())) {
// 			lastVowel = i
// 		}
// 	}
// 	if (lastVowel !== -1) {
// 		return word.substring(0,lastVowel) + (word.length !== lastVowel + 1 ? word.substring(lastVowel+1) : "")
// 	}
// }

// console.log(removeWordsLastVowel("taz"))


// function reverseLegoYoda(text) {
// 	let sentences = text.split(". ")
// 	console.log(sentences)
// 	let output = sentences.map(item => phraseFlipper(item))
// 	return output.join(". ") +"."
// }

// function phraseFlipper(text) {
// 	let beginning = decapitalize(text.split(", ")[0])
// 	let ending = capitalize(text.split(", ")[1].replace(".",""))

// 	return ending + " " + beginning;
// }

// function capitalize(str) {
// 	let output = ""
// 	for (let i = 0; i < str.length; i++) {
// 		if (i === 0) {output += str[i].toUpperCase()}
// 		else {output += str[i]}
// 	}
// 	return output
// }

// function decapitalize(str) {
// 	let output = ""
// 	for (let i = 0; i < str.length; i++) {
// 		if (i === 0) {output += str[i].toLowerCase()}
// 		else {output += str[i]}
// 	}
// 	return output
// }

// console.log(reverseLegoYoda("Hit you with my stick, I shall."))
// console.log(reverseLegoYoda("Rejected me, my crush has. Ketamine, I need."))


// let grid = [
// 	["-", "-", "-", "#"],
// 	["-", "-", "$", "-"],
// 	["-", "-", "-", "@"],
// 	["-", "&", "-", "-"] ]

// console.log(routeTracer(grid, "luur"))


// // function balanced(word) {
// // 	let dict = {
// // 		a: 1,
// // 		b: 2,
// // 		c: 3,
// // 		d: 4,
// // 		e: 5,
// // 		f: 6,
// // 		g: 7,
// // 		h: 8,
// // 		i: 9,
// // 		j: 10,
// // 		k: 11,
// // 		l: 12,
// // 		m: 13,
// // 		n: 14,
// // 		o: 15,
// // 		p: 16,
// // 		q: 17,
// // 		r: 18,
// // 		s: 19,
// // 		t: 20,
// // 		u: 21,
// // 		v: 22,
// // 		w: 23,
// // 		x: 24,
// // 		y: 25,
// // 		z: 26
// // 	}
// // 	let firstHalf = word.split("").slice(0, Math.floor(word.length / 2)).reduce((acc,val) => acc + dict[val], 0)
// // 	let secondHalf = word.split("").slice(Math.ceil(word.length /2)).reduce((acc,val) => acc + dict[val], 0)
// // 	return firstHalf === secondHalf



// // }

// // balanced("hello")
// // balanced("word")


// // // function pop(state) {
// // // 	let water = state.find(item => item > 0);
// // // 	console.log(water)
// // // 	if (!water) return state
// // // 	let arr = []
// // // 	for (i = 0; i < state.length; i++) {
// // // 		console.log(i)
// // // 		for (j = 0; j < water; j++) {
// // // 			console.log(state)
// // // 			if (state[i + j] === water) {
// // // 				state[i] = water - j
// // // 			} else if(state[i - j] === water) {
// // // 				state[i] = water - j
// // // 			}
// // // 		}
// // // 	}
// // // 	return state
// // // }
// // // console.log(pop([0,0,0,3,0,0,0]))



// // // const firstIndex = (hex, needle) => {
// // //     let str = "";
// // //     let hexarr = hex.split(" ")

// // //     for (i = 0; i < hexarr.length; i++) {
// // //         if(needle[0] === String.fromCharCode(parseInt(hexarr[i], 16))) {
// // //             let found = true;
// // //             for (j = 1; j < needle.length; j++) {
// // //                 console.log("found letter", needle[0], String.fromCharCode(parseInt(hexarr[i], 16)))
// // //                 if (needle[j] !== String.fromCharCode(parseInt(hexarr[i + j], 16))) {
// // //                     console.log("mismatch", needle[j], String.fromCharCode(parseInt(hexarr[i + j], 16)))
// // //                     found = false
// // //                 }
// // //             }
// // //             if (found) return i

// // //         }
// // //     }

// // // }

// // // const printPi = len => {
// // //     return Math.round(Math.PI * (10 ** len)) / (10 ** len)
    
// // // }

// // // function isPrefix(word, prefix) {
// // //     console.log(word.substr(0, prefix.length-1))
// // // 	if (word.substr(0, prefix.length-1) === prefix.replace("-", "")) return true
// // // 	return false
// // // }
// // // function isSuffix(word, suffix) {
// // //     console.log(word.substr(word.length -suffix.length + 1, word.length))
// // //     if ( word.substr(word.length -suffix.length + 1, word.length) === suffix.replace("-", "")) return true
// // //     return false
// // // }

// // // function isSpecialArray(arr) {
// // // 	for (i = 0; i < arr.length; i++) {
// // // 		if (i % 2 === 1 && arr[i] % 2 !== 1) return false
// // // 		if (i % 2 === 0 && arr[i] % 2 !== 0) return false
// // // 		return true
// // // 	}
// // // }


// // // function isWristband(arr) {
// // // 	// check horizontal
// // // 	let horizontal = true
// // // 	for (i = 0; i < arr.length; i++) {
// // // 		for (j = 0; j < arr[0].length; j++) {
// // // 			if (arr[i][j] !== arr[i][0]) horizontal = false
// // // 		}
// // // 	}
// // //     if (horizontal) return true
// // //     // check vertical
// // //     let vertical = true
// // //     for (i = 0; i < arr[0].length; i++) {
// // //         for(j = 0; j < arr.length; j++) {
// // //             if (arr[j][i] !== arr[0][i]) vertical = false
// // //         }
// // //     }
// // //     if (vertical) return true
// // //     // check upper left / lower right diagonal
// // //     let leftdiag = true
// // //     for (i = 0; i < arr.length; i++) {
// // //         for(j = 0; j < arr[i].length; j++) {
// // //             if (arr[i][j] !== arr[(i+1) % arr.length][(j+1) % arr[0].length]) leftdiag= false
// // //         }
// // //     }
// // //     if (leftdiag) return true
// // //     let rightdiag = true
// // //     for (i = 0; i < arr.length; i++) {
// // //         for(j = 0; j < arr[i].length; j++) {
// // //             if (arr[i][j] !== arr[(i+1) % arr.length][j-1 < 0 ? arr.length -1 : (j-1) % arr[0].length]) rightdiag= false
// // //         }
// // //     }
// // //     if (rightdiag) return true

// // //     return false
// // // }

// // // console.log(isWristband([[1,1],[2,2],[3,3]]))
// // // console.log(isWristband([['A', 'B', 'C'], 
// // // ['C', 'A', 'B'], 
// // // ['B', 'C', 'A'], 
// // // ['A', 'B', 'C']]))
// // // console.log(isWristband([[1,2,3],[3,1,2],[2,3,1]]))
// // // console.log(isWristband([[1,2,3],[2,3,1],[3,1,2]]))
