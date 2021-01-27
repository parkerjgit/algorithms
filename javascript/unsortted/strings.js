
// interleave arbitrary number of strings
var interleave = function(...strArr) {

	var sml = strArr.reduce((a, b) => a.length <= b.length ? a : b);
    var big = strArr.reduce((a, b) => a.length >= b.length ? a : b);
    
    // should sort by length then reduce

	let interleaved = ''
	for (let i=0; i<sml.length; i++) {
		let oneFromEach = ''
		for (let j=0; j<strArr.length; j++) {
			oneFromEach += strArr[j][i]
		}
		interleaved += oneFromEach; 
	}
	var rest = big.slice(sml.length)
	return interleaved + rest

}

