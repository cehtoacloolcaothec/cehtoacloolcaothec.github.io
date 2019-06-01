String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g, function (m, n) { return args[n]; });
};


function iconError(icon, name) {
    icon.onerror = "";
    icon.src = '../../src/icons/{0}/icon-{0}-normal.svg'.format(name);
    return true;
}

function getClass(element) {
    var arr = element.attr('class').split(' ');
    return (arr.length == 1) ? arr[0] : arr;
}

function random(a, b) {
    if (b == undefined && a != undefined)
        return Math.floor(Math.random() * a);
    if (b == undefined && a == undefined)
        return Math.floor(Math.random() * 2);
    return Math.floor(Math.random() * (b - a)) + a;
}

function formatPreset(string) {
    var array = [];
    // S 2L 3P E P P
    for (var i = 0; i < string.length; i++) {
        if (!isNaN(string.charAt(i)) && !isNaN(string.charAt(i + 1))) { // if it is a two digit number
            array.push(string.substring(i, i + 3));
            i += 2;
        } else if (!isNaN(string.charAt(i))) {
            array.push(string.substring(i, i + 2));
            i++;
        } else {
            array.push(string.charAt(i));
        }
    }

    return array;
}

function randSort(array) {
    var newArray = [];
    var used = [];
    var index, tmpIndex;

    for (var i = 0; i < array.length; i++)
        used.push(i);
    
    for (var i = 0; i < array.length; i++) {
        tmpIndex = random(used.length);
        index = used[tmpIndex];
        used.splice(tmpIndex, 1);

        newArray.push(array[index]);
    }

    return newArray;
}