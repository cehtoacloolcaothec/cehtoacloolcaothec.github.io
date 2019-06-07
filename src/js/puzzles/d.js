var typingTimer;                //timer identifier
var doneTypingInterval = 1000;  //time in ms (5 seconds)
const solution = "keanu reeves,brad pitt,emma watson,meryl streep,cate blanchett:boron,yttrium,sulphur,wolfram,oxygen:titanic,inception,jumanji,aladdin,moana:escoba,carioca,truco,poker,uno:cocaine,meth,ecstasy,heroin,crack:green,red,yellow,blue,orange";
const inputOrder = ['actor', 'element', 'movie', 'card', 'drug', 'color'];
var corrects = [
    [false, false, false, false, false], 
    [false, false, false, false, false], 
    [false, false, false, false, false], 
    [false, false, false, false, false], 
    [false, false, false, false, false],
    [false, false, false, false, false]
];

function chartId(element) {
    var id = element.attr('id').split('-');
    return {'t': inputOrder.indexOf(id[0]), 'i': Number(id[1])};
}

function checkGlobal() {
    for (var i = 0; i < corrects.length; i++) {
        for (var j = 0; j < corrects[0].length; j++) {
            if (!corrects[i][j]) 
                return false;
        }
    }

    return true;
}

function check() {
    $('.form-control.last-puzzle').each(function() {
        var inputForm = $(this);
        var id = chartId(inputForm);
        var string = (inputForm.val().replace(/^\s*|\s*$/g, '')).toLowerCase();
        var sol = solution.split(':')[id['t']].split(',')[id['i']];

        corrects[id['t']][id['i']] = string == sol;
    });    

    console.info(JSON.stringify(corrects));
    
    return checkGlobal();
}

function doneTyping(inputForm) {

    window.setTimeout(function(){
        if (check(inputForm)) {
            $('#fakeModal').modal('show');
        }
    }, 300);
}

function toggleMark(li, markType) {
    if (markType == 1) {
        if (li.attr('class') == 'hint-unmarked') {
            li.attr('class', 'hint-marked-0');
        } else {
            li.attr('class', 'hint-unmarked');
        }
    } else {
        if (li.attr('class') == 'hint-unmarked') {
            li.attr('class', 'hint-marked-1');
        } else {
            li.attr('class', 'hint-unmarked');
        }
    }
}

$('document').ready(function() {
    $('.hint-marked-0, .hint-marked-1, .hint-unmarked').each(function() {
        var hint = $(this);

        hint.on({
            'mouseup' : function(event) {
                var markType = event.which
                if (markType == 1 || markType == 3)
                    toggleMark(hint, markType);
                }
            }
        });
    });
    
    $('.form-control.last-puzzle').each(function() {
        var inputForm = $(this);

        inputForm.on({
            'keydown' : function() {
                if (check()) {
                    $('#fakeModal').modal('show');
                }   
            }
        });
    });

    $('.form-control.lock').on({
        'keydown' : function() {
            if ($(this).val() == 'dracarys') {
                window.location.assign('http://cehtoacloolcaothec.github.io/puzzle/end.html');
            }
        }
    });
});
