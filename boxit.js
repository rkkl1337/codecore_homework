const args = process.argv.splice(2);

const array = args;

// Draw line function

function drawLine(num) {
    return `${"━".repeat(num)}\n`;
}

// Draw top border function

function drawTopBorder(num) {
    return `┏${"━".repeat(num)}┓\n`;
}

// Draw middle border function

function drawMiddleBorder(num) {
    return `┣${"━".repeat(num)}┫\n`;
}

// Draw bottom border function

function drawBottomBorder(num) {
    return `┗${"━".repeat(num)}┛\n`;
}

// Draw bars around function

function drawBarsAround(string) {
    return `┃${string}┃\n`;
}

// Box it function

function boxIt(array) {
    let result = "";
    let middleBorderCount = 1;
    let num = 0;

    // num counter

    for(let string of array) {
        if(string.length > num) {
            num = string.length;
        }
    }

    // Add top border

    result += drawTopBorder(num);

    //  Fill empty space in string  

    for(let string of array) {
        if(string.length < num) {
            string += " ".repeat(num - string.length);
        }

    // Add string

        result += drawBarsAround(string);

    // Add middle border

        if(middleBorderCount < array.length) {
            result += drawMiddleBorder(num);
            middleBorderCount += 1;
        }
    }

    // Add bottom border

    result += drawBottomBorder(num);
    return result;
}

console.log(boxIt(array));
