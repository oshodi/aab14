var RomanNumerals = {
    "values": [1000,900,500,400,100,90,50,40,10,9,5,4,1],
    "numerals": ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"],
    "NumberToRoman": function (number) {
        if (number < 0 || number > 2999) {
            return false;
        } else {
            //good number
            if (number === 0) return "N";

            var convertedNumber = this.NumberConverter(number);

            return convertedNumber;
        }
    },
    "NumberConverter": function (number) {
        var romanNumeral = "";
        for (var i = 0; i < this.values.length; i++)
        {
            while (number >= this.values[i])
            {
                number -= this.values[i];
                romanNumeral = romanNumeral + this.numerals[i];
            }
        }
        return romanNumeral;
    }
}