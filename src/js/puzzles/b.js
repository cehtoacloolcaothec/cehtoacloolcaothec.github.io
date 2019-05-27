$.fn.extend({

    // PIPE METHODS
    pos : function() {
        var args = arguments;

        if (args.length == 0) {
            var values = this.attr('id').split('-')[1];
            return values;

        } else if (args.length == 1) {
            var pos = args[0];
            if (typeof pos != 'string') {
                pos = String(pos[0]) + ',' + String(pos[1]);
            }

            this.attr('id', 'pos-' + pos);
            return;

        } else if (args.length == 2) {
            this.attr('id', 'pos-{0},{1}'.format(args[0], args[1]));
            return;
        }

        return undefined;
    },

    type : function() {
        var pipeClass = getClass(this);
        
        if (typeof pipeClass != 'string') {
            return pipeClass[1].split('-')[0];
        } else {
            return pipeClass;
        }
    },

    rot : function() {
        var args = arguments;

        if (args.length == 0) {
            return getClass(this)[1].split('-')[1];

        } else if (args.length == 1) {
            var rot = String(args[0]);
            var values = getClass(this);
            var type = values[1].split('-')[0];
            values[1] = type + '-' + rot;

            this.attr('class', values.join(' '));
            return;
        }

        return undefined;
    },

    rotate : function() {
        if (this.canRotate()) {
            this.canRotate(false);

            var newRot = String(Number(this.rot()) + 90);

            if (newRot == '360') {
                this.rot('0');
                this.css({'-webkit-transform': 'rotate(360deg)',
                        '-moz-transform': 'rotate(360deg)',
                        '-o-transform': 'rotate(360deg)',
                        '-ms-transform': 'rotate(360deg)',
                        'transform': 'rotate(360deg)',
                        'transition': 'transform .35s cubic-bezier(0.49, 0.07, 0.3, 0.86)'})

                setTimeout(function(pipe) {
                    pipe.css({'-webkit-transform': 'rotate(0deg)',
                              '-moz-transform': 'rotate(0deg)',
                              '-o-transform': 'rotate(0deg)',
                              '-ms-transform': 'rotate(0deg)',
                              'transform': 'rotate(0deg)',
                              'transition': 'none'})

                    setTimeout(function(pipe) {
                        pipe.removeAttr('style'); 
                        pipe.canRotate(true);
                    }, 50, pipe);
                }, 500, this);

            } else {
                this.rot(newRot);
                setTimeout(function(pipe) {
                    pipe.canRotate(true);
                }, 500, this);
            }
        }
    },

    isStop : function() {
        var t = this.type();
        if (t == 'empty' || t == 'dead') {
            return true;
        }

        return false;
    },

    isNonRotational : function() {
        var t = this.type();
        if (t == 'empty' || t == 'cross') {
            return true;
        }

        return false;
    },

    targetPos : function() {
        this.updateTargetPos();
        var targets = this.data('target-pos');
        return (targets == '') ? undefined : targets;
    },

    updateTargetPos : function() {
        if (this.isStop()) {
            this.data('target-pos', '');
            return undefined;
        }

        var type = this.type();
        var dir = connections[type][this.rot()];
        var pos = this.pos().split(',').map(p => Number(p));
        var values = [];
        var maxSize = this.getGridSize() - 1;
        var xOff, yOff;

        if (type == 'start' || type == 'end') {
            xOff = pos[0] + dir[0];
            yOff = pos[1] + dir[1];

            if (xOff < 0 || xOff > maxSize || yOff < 0 || yOff > maxSize) {
                this.data('target-pos', '');
                return undefined;
            }

            this.data('target-pos', '{0},{1}'.format(xOff, yOff));
            return;

        } else {
            for (var i = 0; i < dir.length; i++) {
                xOff = pos[0] + dir[i][0];
                yOff = pos[1] + dir[i][1];

                if (xOff < 0 || xOff > maxSize || yOff < 0 || yOff > maxSize)
                    continue;
                
                values.push('{0},{1}'.format(xOff, yOff));
            }

            this.data('target-pos', values.join(':'));
            return;
        }
    },

    targetPosArray : function() {
        var targets = this.targetPos();
        return (targets == undefined) ? undefined : targets.split(':');
    },

    imgSrc : function() {
        var args = arguments;
        var type = this.type();

        if (args.length == 0) {
            if (type != 'empty') {
                this.attr('src', imgSrcDir.format(type, 'normal'));
            } else {
                this.attr('src', '../../src/img/pipes/empty.svg');
            }
            return;

        } else if (args.length == 1) {
            if (type != 'empty')
                this.attr('src', imgSrcDir.format(type, args[0]));
            
            return;
        }

        return undefined;
    },

    canRotate : function() {
        var args = arguments;

        if (args.length == 0) {
            return this.data('can-rotate');
            
        } else if (args.length == 1) {
            this.data('can-rotate', args[0]);
            return;
        }

        return undefined;
    },

    looksAt : function() {
        var args = arguments;

        if (args.length == 1) {
            var targets = this.targetPosArray();
            var pos = args[0];

            if (typeof args[0] != 'string')
                pos = args[0].pos();

            if (targets == undefined)
                return false;

            for (var i = 0; i < targets.length; i++) {
                if (targets[i] == pos)
                    return true;
            }

            return false
        }

        return undefined;
    },

    getGridSize : function() {
        
        return Number(this.data('grid-size'));
    },

    setGridSize : function(size) {
        this.data('grid-size', size);
        return;
    },

    // SYSTEM METHODS ---------------------------------------------------
    getPipeByType : function(type) {
        var results = [];
    
        this.find('.d-flex').children('img').each(function() {
            var pipe = $(this)
            
            if (pipe.type() == type) {            
                results.push(pipe);
            }
        });
    
        return (results.length == 1) ? results[0] : results;
    },

    getPipeAt : function(position) {
        if (position == undefined)
            return undefined;

        var pos = (typeof position == 'string') ? position : position.join(',');
        var result = undefined;
    
        this.find('.d-flex').children('img').each(function() {
            var pipe = $(this)
            
            if (pipe.pos() == pos) {            
                result = pipe;
            }
        });
    
        return result;
    },

    create : function() {
        var pipeString = '<img class="{0}">';
        var size = getClass(this)[3].split('-')[1];
        var preset = gridPresets[size][random(gridPresets[size].length)];
        var string = ['<div class="d-flex flex-wrap">'];

        var char;
        var pipeTypes;
        
        for (var i = 0; i < preset.length; i++) {
            char = preset.charAt(i);
            pipeTypes = gridPipeTypes[char];

            string.push(pipeString.format(pipeTypes[random(pipeTypes.length)]));
        }

        string.push('</div>');

        
        this.append($(string.join('')));

    },

    check : function() {
        var system = this;
        var start = system.getPipeByType('start');
        var end = system.getPipeByType('end');
    
        var visited = [start.pos()];                                                                // the visited pipes (added all i/o to 'nextPos').        
        var nextPos = new Stack({'target': system.getPipeAt(start.targetPos()), 'parent': start});  // the next pos with deep search priority.
        var index = 0;                                                                              // index of the pipe in 'visited' we are looking at.

        var next;                                                                                   // stores the next pipe, if there is one.
        var current;                                                                                // the current pipe visited

        var targets;                                                                                // temporal array for next.targetPosArray()
        var target;                                                                                 // temporal pipe of each target in 'targets'

        if (nextPos.top()['target'] == undefined)
            return false;

        while (nextPos.length > 0) {
            next = nextPos.top()['target'];
            current = nextPos.top()['parent'];

            // check if:
            //  - the next pipe is not a 'stop' type.
            //  - it doesn't have an i/o to the current one.
            //  - it hasn't been visited before (checked in 'visited')
            // if true, then skip.
            if (next.isStop() || !next.looksAt(current.pos()) || visited.includes(next.pos())) {
                nextPos.pop();
                continue;
            }

            // check if the next pipe is the 'end' type.
            if (next.type() == 'end' && current.looksAt(end.pos()))
                return true;

            // add 'next' as visited pipe.
            visited.push(next.pos());
            nextPos.pop();
            index++;

            // for each i/o of the 'next' pipe, add positions to 'nextPos' stack.
            // do not include current position.
            targets = next.targetPosArray();
            for (var i = 0; i < targets.length; i++) {
                target = system.getPipeAt(targets[i]);
                if (!visited.includes(target.pos()))
                    nextPos.push({'target': target, 'parent': next});
            }
        }

        return false
    },
});

function loadPipes() {
    var orientations = ['0', '90', '180', '270'];

    // class="container pipe-system system-<n> size-<size>"
    $('.pipe-system').each(function() {
        var system = $(this);
        var size = getClass(system)[3].split('-')[1];
        var pos = { 'x' : 0, 'y' : -1 };

        system.create();
        
        // class="pipe <type>-<rot> pipe-<size>"
        system.find('.d-flex').children('img').each(function() {
            if (pos['y'] + 1 == gridSize[size]) {
                pos['x']++;
                pos['y'] = -1;
            }

            pos['y']++;

            var pipe = $(this);
            var type = getClass(pipe);
            var rot = orientations[Math.floor(Math.random() * 3)];

            pipe.imgSrc();

            if (type != 'empty') {   
                pipe.attr('class', 'pipe {0}-{1} pipe-{2}'.format(type, rot, size));
            } else {
                pipe.attr('class', 'pipe empty pipe-{0}'.format(size));
            }

            pipe.pos(pos['x'], pos['y']);
            pipe.targetPos(size);
            pipe.canRotate((pipe.isNonRotational()) ? false : true);
            pipe.setGridSize(gridSize[size]);
        })
    });
}

loadPipes();

$('document').ready(function() {
    var systemsReady = [false, false, false, false, false]
    
    // class="container pipe-system system-<n> size-<size>"
    $('.pipe-system').each(function() {
        var system = $(this);
        var systemNumber = Number(getClass(system)[2].split('-')[1]);
        var size = getClass(system)[3].split('-')[1];

        // class="pipe <type>-<rot> pipe-<size>"
        system.find('.d-flex').children('img').each(function() {
            var pipe = $(this);
            
            pipe.on({
                'mouseenter' : function() {
                    pipe.imgSrc('hover');
                },

                'mouseleave' : function() {
                    pipe.imgSrc();
                },

                'mouseup' : function() {
                    if (pipe.type() != 'cross') {
                        window.setTimeout(function() {
                            if (pipe.filter(':hover').length != 0) {
                                pipe.imgSrc('hover');
                            } else {
                                pipe.imgSrc();
                            }

                            pipe.rotate();

                            var systemClass = system.attr('class');
                            if (system.check()) {
                                system.attr('class', systemClass.replace(/(?<=container )pipe-system(?= system-\d)/g, 'pipe-system-correct'));
                                systemsReady[systemNumber - 1] = true;

                                let allCorrect = true;
                                for (var i = 0; i < systemsReady.length; i++) {
                                    if (!systemsReady[i])
                                        allCorrect = false;
                                }

                                if (allCorrect)
                                    $('#imageModal2').modal('show');
                            } else {
                                system.attr('class', systemClass.replace(/(?<=container )pipe-system-correct(?= system-\d)/g, 'pipe-system'));
                                systemsReady[systemNumber - 1] = false;
                            }
                        }, 150);
                    }
                }
            });
        });
    });
});