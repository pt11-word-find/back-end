function wordlistValidator(string) {
    let regex = /^[A-Za-z,\s]+$/
    let output = []
    for (let i = 0; i < string.length; i++) {
        if (string[i].match(regex)) {
            output.push(string[i])
        }
    }
    return output.join("")
}

module.exports = wordlistValidator;