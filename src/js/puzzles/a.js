var checkList = [false, false, false, false, false, false, false, false];
var solutions = "candy|hair|wrong|body|dinner|home|aunt|heart".split("|");
var typingTimer;                //timer identifier
var doneTypingInterval = 1000;  //time in ms (5 seconds)

function isSolution(id, input) {
    var string = (input.replace(/\s*/g, '')).toLowerCase();
    return string == solutions[id];
}

function check() {
    $('.form-control').each(function() {
        var input = $(this).val();
        var id = $(this).attr('id');                
        
        if (isSolution(id, input))
            checkList[id] = true;
        else
            checkList[id] = false;
    });

    $('.check').each(function() {
        var point = $(this);
        var id = point.attr('id');
        var isCorrect = point.attr('class').split(' ')[1].split('-')[1] == "true";                

        if(checkList[id]) {
            if (!isCorrect)
                point.attr('class', 'check is-true');
        } else {
            if (isCorrect)
                point.attr('class', 'check is-false');
        }
    });

    var allCorrect = true;
    for (var i = 0; i < checkList.length; i++) {
        if (!checkList[i])
            allCorrect = false;
    }

    return allCorrect;
}

function doneTyping () {
    window.setTimeout(function(){
        if (check()) {
            $('#imageModal1').modal('show');
            $('.icon-next').removeAttr('style');
        }
    }, 300);
}

$(document).ready(function() {
    $('#imageModal1').on('hidden.bs.modal', function (e) {
        setTimeout(function() {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 500);
    })

    $('.form-control').each(function() {
        var inputForm = $(this);

        inputForm.on({
            'keydown' : function(event) {
                var key = event.keyCode;
                if (key > 36 && key < 41) // arrow keys
                    return;

                doneTyping();
            }
        });
    });
});