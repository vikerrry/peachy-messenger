function ready() {
	let x = document.querySelectorAll("button")
	for (let i in x) {
		!x[i].setAttribute || x[i].setAttribute("onclick", "doit(this)")
	}
}

function log10(val) {
	return Math.log(val) / Math.log(10)
}

function parseSign(args) {
	let sign = 1
	while (args[2] <= args[3] && (args[0][args[2]] == '+' || args[0][args[2]] == '-')) {
		if (args[0][args[2]] == '-') {
			sign = -sign
		}
		++args[2]
	}
	
	if (args[2] > args[3]) {
		return false
	}
	return sign
}
function parseFunction(args) {
	let savePos = args[2]
	let sign = parseSign(args)
	
	if (sign === false) {
		return false
	}

	let func = Math.sqrt
	let count = 1
	if (args[0].substr(args[2], 2) == "√(") {
	} else if (args[0].substr(args[2], 3) == "lg(") {
		func = log10
		count = 2
	} else if (args[0].substr(args[2], 3) == "ln(") {
		func = Math.log
		count = 2
	} else {
		args[2] = savePos
		return false
	}

	args[2] += count
	last_end = args[3]
	args[3] = args[1][args[2]] - 1
	++args[2]
	let result = sign * func(evalExpr(args))
	++args[2]
	args[3] = last_end
	
	return result
}

function parseFloat(args) {
	let sign = parseSign(args)
	
	if (sign === false) {
		return false
	}

	if (args[0][args[2]] == "e") {
		++args[2]
		return sign * Math.exp(1)
	} else if (args[0][args[2]] == "π") {
		++args[2]
		return sign * Math.acos(-1)
	}
	
	let X = 0
	
	let pow = 0.1
	let exponent = 0
	let state = 1
	let sign2 = 1
	let error = false
	let errorDesc = "errInInt"
	let pos_copy = args[2]

	while (args[2] <= args[3]) {
		let current = args[0][args[2]]
		switch (state) {
			case 1: 
				if (current >= '0' && current <= '9') {
					X = parseInt(current)
					state = 2
					errorDesc = "no"
				} else if (current == '.') {
					state = 3
				} else if (current == 'e' || current == 'E') {
					state = 4
				} else {
					error = true
				}
				break;
			case 2:
				if (current >= '0' && current <= '9') {
					X = X * 10 + parseInt(current)
				} else if (current == '.') {
					state = 3
				} else if (current == 'e' || current == 'E') {
					state = 4
				} else {
					error = true
				}
				break;
			case 3:
				if (current >= '0' && current <= '9') {
					X += pow * parseInt(current)
					errorDesc = "no"
					pow *= 0.1
				} else if (current == 'e' || current == 'E') {
					errorDesc = "errInInt"
					state = 4
				} else {
					error = true
				}
				break
			case 4:
				if (current == '-') {
					sign2 = -sign2
				} else if (current >= '0' && current <= '9') {
					exponent = parseInt(current)
					errorDesc = "no"
				} else if (current != '+') {
					error = true
				}
				break
			case 5:
				if (current >= '0' && current <= '9') {
					exponent = exponent * 10 + parseInt(current)
				} else {
					error = true
				}
				break
		}
		if (error) {
			break
		}
		++args[2]
	}
	if (errorDesc != "no") {
		args[2] = pos_copy
		return false
	}
	return sign * X * Math.pow(10, sign2 * exponent)
}

function parseOp(args) {
	if (args[0][args[2]] == '+') {
		++args[2]
		return '+'
	}
	
	if (args[0][args[2]] == '-') {
		++args[2]
		return '-'
	}

	if (args[0][args[2]] == '/') {
		++args[2]
		return '/'
	}

	if (args[0].substr(args[2], 2) == '**') {
		++args[2]
		++args[2]
		return '**'
	}

	if (args[0][args[2]] == '*') {
		++args[2]
		return '*'
	}

	return false
}

function evalExpr(args) {
	console.log(1)
	let values = []
	let ops = []
	while (args[2] <= args[3]) {
		if (args[0][args[2]] == '(') {
			last_end = args[3]
			args[3] = args[1][args[2]] - 1
			++args[2]
			values.push(evalExpr(args))
			if (typeof values[values.length - 1] === "object") {
				return [false, "error at " + args[0].substr(args[2], args[3] - args[2] + 1)]
			}
			++args[2]
			args[3] = last_end
		} else {
			let val = false
			if ((val = parseFunction(args)) !== false) {
				values.push(val)
			} else if ((val = parseFloat(args)) !== false) {
				values.push(val)
			} else {
				return [false, "error at " + args[0].substr(args[2], args[3] - args[2] + 1)]
			}
		}
		if (args[2] > args[3]) {
			break;
		}
		let val = parseOp(args)
		if (val === false) {
			return [false, "error at " + args[0].substr(args[2], args[3] - args[2] + 1)]
		}
		ops.push(val)
	}
	values.push(0)
	let accum = values[0]
	let res = 0
	let sign = 1
	for (let i = 0; i < values.length - 1; ++i) {
		let next_val = values[i + 1]
		switch (ops[i]) {
			case "*": accum *= next_val; break;
			case "/": accum /= next_val; break;
			case "**": accum = Math.pow(accum, next_val); break;
			case "+": res += sign * accum; sign = 1; accum = next_val; break;
			case "-": res += sign * accum; sign = -1; accum = next_val; break;
		}
	}
	return res + sign * accum
}

function evaluate(expression) {
	// Шаг 0. Прекальк индекса закрывающей скобки для каждой открывающей скобки
	let stack = []
	let result = []
	for (let i in expression) {
		result.push(-1)
		if (expression[i] == '(') {
			stack.push(i)
		} else if (expression[i] == ')') {
			if (stack.length == 0) {
				return "missing ("
			} else {
				result[stack.pop()] = parseInt(i)
			}
		}
	}
	if (stack.length > 0) {
		return "missing )"
	}
	// доклеим + в конец, чтобы было меньше проверок
	expression += "+"
	obj = [expression, result, 0, expression.length - 1]
	// ЗЫ работает за честные O(N)
	// без прекалька на шаге 0 будет работает за O(N^2) для ((((((1))))))
	return evalExpr(obj)
}

function doit(ev) {
	if (ev.innerText.trim() == "=") {
		document.querySelector("#result").innerText = evaluate(document.querySelector("#expression").innerText)
	} else {
		if (ev.innerText.trim() == "AC") {
			document.querySelector("#expression").innerText = ""
			document.querySelector("#result").innerText = "0"
			ev.innerText = "CE"
		} else if (ev.innerText.trim() == "CE") {
			let was = document.querySelector("#expression").innerText
			was = was.substr(0, was.length - 1)
			document.querySelector("#expression").innerText = was
		} else {
			document.querySelector("#expression").innerText += ev.innerText.trim()
		}
	}
}

document.addEventListener("DOMContentLoaded", ready);