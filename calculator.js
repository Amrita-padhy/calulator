const inputItem = document.querySelector("#equation")
const outputItem = document.querySelector(".results")
const form = document.querySelector("#equation_form")
// console.log(outputItem);
const PATANTHESIS_REGEX = /\((?<equation>[^\(\)]*)\)/
const MULTIPLY_DIVIDE_REGEX = /(?<operant_1>\d+)\s*(?<operation>[\/\*])\s*(?<operant_2>\d+)/
const EXPONET_REGEX = /(?<operant_1>\d+)\s*(?<operation>\^)\s*(?<operant_2>\d+)/
const ADD_SUBTRACT_REGEX = /(?<operant_1>\d+)\s*(?<operation>[\+\-])\s*(?<operant_2>\d+)/

form.addEventListener("submit", e => {
    e.preventDefault();
    const result = parse(inputItem.value)
    outputItem.textContent = result
})

function parse(equation) {
    console.log((equation.match(PATANTHESIS_REGEX)));
    if (equation.match(PATANTHESIS_REGEX)) {
        console.log(equation.match(PATANTHESIS_REGEX).groups.equation);
        const subEquation = equation.match(PATANTHESIS_REGEX).groups.equation
        console.log(subEquation);
        const result = parse(subEquation)

        const newEquation = equation.replace(PATANTHESIS_REGEX,result)
        return parse(newEquation)

    }
    else if (equation.match(EXPONET_REGEX)) {
        const result = handleMath(equation.match(EXPONET_REGEX).groups)
        const newEquation = equation.replace(EXPONET_REGEX, result)
        return parse(newEquation)

    } 
    else if (equation.match(MULTIPLY_DIVIDE_REGEX)) {
        const result = handleMath(equation.match(MULTIPLY_DIVIDE_REGEX).groups)
        const newEquation = equation.replace(MULTIPLY_DIVIDE_REGEX, result)
        return parse(newEquation)

    } 
    else if (equation.match(ADD_SUBTRACT_REGEX)) {
        const result = handleMath(equation.match(ADD_SUBTRACT_REGEX).groups)
        const newEquation = equation.replace(ADD_SUBTRACT_REGEX, result)
        return parse(newEquation)
    }
    else {
        return parseFloat(equation)
    }


}

function handleMath({ operant_1, operant_2, operation }) {
    const number1 = parseFloat(operant_1)
    const number2 = parseFloat(operant_2)
    switch (operation) {
        case "*":
            return number1 * number2
        case "/":
            return number1 / number2
        case "+":
            return number1 + number2
        case "-":
            return number1 - number2
            case "^":
            return number1 ** number2
    }
}
