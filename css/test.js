var sampleData = [6,3,1,4,7,4,2,8,9,2];


function duplicates (sampleData) {

}


define('should find the duplicates', function() {
    it('finds first duplicates', function () {
        var data = [1,3,4,7,9,6,4,18];
        var dupes = duplicates(data);
        expect(dupes).toBe(4);
    })
})