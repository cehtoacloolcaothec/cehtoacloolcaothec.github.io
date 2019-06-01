var currentQuestion = 0;
var tablet = $('.questions-tablet');

const html = {
    'qNumber' : '<p class="question-number q-{0}" style="color: transparent; text-shadow: none;">question {1}</p>',
    'qContent' : '<div class="question-content">{0}</div>',
    'qText' : '<p class="question-text q-{0}" style="color: transparent; text-shadow: none;">{1}</p>',
    'qOptions' : '<p class="option option-{0} {1} option-index-{2}">{3}</p>'
};

function changeIcon(icon, type) {
    icon.attr('src', '../../src/img/sphinx/start/icon-start-{0}.svg'.format(type))
}

function triggerWrongAnswer(msg) {
    var modal = $('#errorModal');
    $('.modal-body.mistake').append($('<p>{0}</p>'.format(msg)));
    modal.modal('show');
}

function triggerCorrectAnswer() {
    currentQuestion++;
    $('.question-content').remove();
    $('.question-number').remove();
    loadNextQuestion();
}

function loadNextQuestion() {
    
    var qNumber = (currentQuestion == 9) ? 'x' : currentQuestion;
    var current = questions[currentQuestion];
    var htmlQContent = html['qText'].format(currentQuestion, current['q']);
    var options = randSort(current['a']);

    var size;
    for (var i = 0; i < 4; i++) {
        if (options[i].length > 22) { size = 'lg';}
        else { size = 'nm'; }

        htmlQContent += html['qOptions'].format(i, size, current['a'].indexOf(options[i]), options[i]);
    }

    var htmlAppend = html['qNumber'].format(currentQuestion, qNumber) + html['qContent'].format(htmlQContent);

    tablet.append($(htmlAppend));

    setTimeout(function() {
        $('.q-' + currentQuestion).removeAttr('style');
        $('.hint').tooltip({title: hints[currentQuestion], container: '.hint', trigger: 'hover'});
        $('.option').each(function() {
            var o = $(this);
            var qIndex = getClass(o)[3].split('-')[2];

            o.on({
                'mouseup' : function() {
                    if (qIndex == 0) {
                        if (currentQuestion == 24) {
                            triggerWrongAnswer(wrongMsg[currentQuestion][qIndex]);
                        } else {
                            triggerCorrectAnswer();
                        }
                    } else {
                        if (currentQuestion == 17 || currentQuestion == 18) {
                            triggerCorrectAnswer();
                        } else {
                            triggerWrongAnswer(wrongMsg[currentQuestion][qIndex - 1]);
                        }
                    }
                }
            });
        });
    }, 300);

    if (currentQuestion == 24) {
        var home = $('.iicon.icon-home');
        home.data('link', '');
        home.replaceClass('iicon', 'final-question');

        $('.final-question').each(function() {
            var btn = $(this);
            btn.on({
                'mouseenter' : function() {
                    changeIcon(btn, 'hover');
                },
    
                'mouseleave' : function() {
                    changeIcon(btn, 'normal');
                },
    
                'mousedown' : function() {
                    changeIcon(btn, 'click');
                },
    
                'mouseup' : function() {
                    window.setTimeout(function(){
                        $('#imageModal3').modal('show');
                        $('.icon-next').removeAttr('style');                                             
                    }, 300);
                }
            });
        });
    }
}

$.fn.extend({
    replaceClass : function() {
        var args = arguments;

        if (args.length == 1) {
            this.attr('class', args[0]);

        } else if (args.length == 2) {
            var currClasses = this.attr('class').split(' ');

            var oldClass = args[0];
            var newClass = args[1];

            if (oldClass == '') {
                return this.insertClass(newClass);
            }

            if (newClass == '') {
                this.removeClass(oldClass);
                if (currClasses.join(' ') == this.attr('class'))
                    return true;
                return false;
            }

            currClasses[currClasses.indexOf(oldClass)] = newClass;
            this.attr('class', currClasses.join(' '));

            if (currClasses.join(' ') == this.attr('class'))
                return true;
            return false;
        }
    },

    insertClass : function() {
        var args = arguments;

        if (args.length == 1) {
            this.insertClass(args[0], -1);

        } else if (args.length == 2) {
            var currClasses = this.attr('class').split(' ');

            var newClass = args[0];
            var index = (args[1] < 0) ? currClasses.length + args[1]: args[1];

            if (index < 0)
                index = 0;

            currClasses.splice(index, 0, newClass);

            this.attr('class', currClasses.join(' '));

            if (currClasses.join(' ') == this.attr('class'))
                return true;
            return false;
        }
    }
});

$('document').ready(function() {
    $('#errorModal').on('hidden.bs.modal', function (e) {
        setTimeout(function() {
            redirect('puzzle/c/ill_iiii_i_ili_i.html');
        }, 100);
    });

    $('.hint').each(function() {
        $(this).tooltip({title: hints[0], container: '.hint', trigger: 'hover'});
    });

    $('.start-btn').each(function() {
        var btn = $(this);
        var background = $('.tablet');
        var intro = $('.collapsible');

        btn.on({
            'mouseenter' : function() {
                changeIcon(btn, 'hover');
            },

            'mouseleave' : function() {
                changeIcon(btn, 'normal');
            },

            'mousedown' : function() {
                changeIcon(btn, 'click');
            },

            'mouseup' : function() {
                intro.replaceClass('collapsible', 'collapsible collapsed');
                window.setTimeout(function(){
                    btn.css({'display': 'none'});
                    background.attr('src', '../../src/img/sphinx/tablet/icon-tablet-options.svg');  
                    loadNextQuestion();                                              
                }, 300);
            }
        });
    });
});