var FizzBuzz = {
    "getNumber": function(number) {
        if(this.isMultipleOfFiveAndThree(number)) {
            return "FizzBuzz";
        } else if(this.isMultipleOfThree(number)) {
            return "Fizz";
        } else if(this.isMultipleOfFive(number)) {
            return "Buzz";
        }

        return number;
    },
    "isMultipleOfThree": function(number) {
        return number % 3 == 0 && number != 0;
    },
    "isMultipleOfFive": function(number) {
        return number % 5 == 0  && number != 0;
    },
    "isMultipleOfFiveAndThree": function(number) {
        return number % 15 == 0  && number != 0;
    }
}