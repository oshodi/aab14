var ClosestToZero = {

    "findClosestToZero": function(array) {
        var closest_to_zero_index,
            closest_to_zero = Math.abs(array[0]);

        for(var i = 0; i <= array.length; i++) {
            if(Math.abs(array[i]) < closest_to_zero) {
                closest_to_zero = Math.abs(array[i]);
                closest_to_zero_index = i;
            }
        }

        return array[closest_to_zero_index];
    }

}