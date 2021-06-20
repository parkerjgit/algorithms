

//
function stringify(x) {

    const type = (x) => Object.prototype.toString.call(x).slice(8, -1); 
	const str = (x) => '"' + x + '"'
	const arr = (x) => x.map(stringify).join(',')
	const obj = (x) => (
        Object.keys(x)
		    .map((k) => str(k) + ': ' + stringify(x[k]))
            .join(',')
    )

	// switch(type(x)) {
	// 	case 'String' :
	// 		return str(x);
	// 	case 'Function':
	// 		return 'function () {}';
	// 	case 'Array':
	// 		return '[' + arr(x) + ']';
	// 	case 'Object':
	// 		return '{' + obj(x) + '}';
	// 	default:
	// 		return String(x);
    // }
    
    let f = ({
        'String': () => str(x),
        'Array':  () => arr(x),
        'Object': () => obj(x),
        'Number': () => String(x)
    })[type(x)]

    return f(x);
}