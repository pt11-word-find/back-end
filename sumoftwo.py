def sumOfTwo(a,b,v):
    hash = {}
    for i in a:
        if i in hash.keys():
            continue
        else:
            hash[i] = v - i
    for i in b:
        if i in hash.values():
            return True
    return False

print(sumOfTwo([1,2],[1,2], 4))

print(sumOfTwo([1,2],[1,2], 8))