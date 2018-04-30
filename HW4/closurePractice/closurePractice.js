function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {

        //create a function that "saves" each loop iteration and then push that value
        result.push (function(x){
            return function(){
                var item = 'item' + list[x];
                alert(item + ' ' + list[x]);
            };
        }(i));
    }
    return result;
}

function testList() {
    var fnlist = buildList([1,2,3]);
    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}


testList();