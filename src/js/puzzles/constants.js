// B --------------------------------------------------------------------------------------------------------------------------------------------------------
const imgSrcDir = '../../src/img/pipes/{0}-{1}.svg';

const gridSize = {
    'nm' : 18,
    'sm' : 10,
    'md' : 6,
    'lg' : 4,
    'gt' : 2
};

const connections = {
    'start' : {
        '0'   : [0,  1],
        '90'  : [1,  0],
        '180' : [0, -1],
        '270' : [-1, 0]
    },        
    'end' : {
        '0'   : [0,  1],
        '90'  : [1,  0],
        '180' : [0, -1],
        '270' : [-1, 0]
    },
    'elbow' : {
        '0'   : [[-1, 0], [0, -1]],
        '90'  : [[0,  1], [-1, 0]],
        '180' : [[1,  0], [0,  1]],
        '270' : [[0, -1], [1,  0]]
    },
    'line' : {
        '0'   : [[0,  1], [0, -1]],
        '90'  : [[1,  0], [-1, 0]],
        '180' : [[0,  1], [0, -1]],
        '270' : [[1,  0], [-1, 0]]
    },
    't' : {
        '0'   : [[-1, 0], [0,  1], [1,  0]],
        '90'  : [[0,  1], [1,  0], [0, -1]],
        '180' : [[1,  0], [0, -1], [-1, 0]],
        '270' : [[0, -1], [-1, 0], [0,  1]]
    },
    'cross' : {
        '0'   : [[0, -1], [-1, 0], [0,  1], [1,  0]],
        '90'   : [[0, -1], [-1, 0], [0,  1], [1,  0]],
        '180'   : [[0, -1], [-1, 0], [0,  1], [1,  0]],
        '270'   : [[0, -1], [-1, 0], [0,  1], [1,  0]]
    }
};

var mapDecoder = {

};

var gridPresets = {
    'gt'  : ['STPE', 'SPTE'],

    'lg'  : ['SPTLLPPPTLLTPPPE', 'SPPPTLLTPPPLPLPE', 'STTTPTTLPPPLLTPE', 'STPPTTPLLPPPTLLE', 'SPPPLPTLLPPPTLLE', 'SPPPLTLTTTPLPPPE', 'SLLTPPTTPTTPPTLE', 'SLTPPPLPLPLPTPTE'],

    'md'  : ['SLLTPPPPPTTPPPPPLPLPLPLPPTPPTTPLPPPE', 'PSLLLTPLPPPLPLPTPLPLPPPLPTTELTPPPPPP', 'PSPTLPPLPPPPPLPPTTPLPPELPLPPPLPTLLLT', 'PSPPPPPLPTTLPLPPPPPLPPPEPTLTPLPPPTLT', 'PSLLTPPPPPLPTPPPTTLLPPPLPTPTTLPPPETT', 'STPPPPPTLLLTPPPPPLLPTLLTPLLPPPPPTLEP', 'PSLLTPPPPPLPPLPTTPTLPLPPTLPLPPPPPTEP', 'PSLLLTPTTPPLPPPTLTPPLLPPPPPTEPLTPPPP', 'PSLLLTPPPPPLPPTPTLPLTPLLPPPPPETPPLPP', 'PSLLTPPPPPLPTLLLTPLPPPPPLPPTLTTLLTPE', 'PPTLTPSPLPLPLPLPLPTLTPLEPPPPLLPTPPTT', 'TLTPPPSPLPTTPPLPPPPPLPEPPPLPLPPPTLTP', 'PPPPPPSLLLTPLPPPLPLPLPLPLPPPLPTLLETP', 'TLLLTPSPPPLPPPTPLPPTLLTPPLPPPPPTLLEP', 'PPLTLTSPPLPLLPPLPLTLLTPLPPPPETPLPPPP', 'PPPPPPSLLTPPPPPLPPPLPLPPTTPTLEPPPPPP', 'TLLLTPSPPPLPPTLLTPPLPPPPPLPTLTPTLTPE', 'PPPTLTSLLTPLPPPPPLPPPPPLLPPEPLTPPTLT', 'PPTLTPPSLPLPPTTPTTPPPPPLPLPPPLPPPELT', 'PPPPPPPSTPTLPPLPPPPPLPPEPTTPPLPTLLLT', 'PPPPTPPSLLLTPLPPPLPTTPPLPPTLLEPPPPPP', 'PPTLTPPSTPLPPPLPTTPPLPPLTLTPETTLLLTP', 'PPPTLTPSPLPLPLPLPLPTLTPLPPPPPLTPPPET', 'PTLLLTPSPPPLPPPPPLPPPTLTPPPLPPTPPTLE', 'SPPPPTTLLTPPPPPLPPPPPLPETLLTPLTLLLLT', 'STLLLTLLPPPLLLPPPLTTPTLTPPPEPLPTPTLT', 'SPTLLTLPLPPLLPLPPLTLTPPLPPPPPEPPPTPP', 'SPPPLPLPPPPPTLLLTPLPPPLPLPPPEPTLLLTP'],

    'sm'  : ['PPPPPPPPPPSLLLLLLLLTPPPPPPPPPLTPPPPPPPPLPTTLLLLLLTPPLPPPPPPPPPLLPPTLLTPPLPPPLPPLPPTLLLTPPEPTPPPPPPPP', 'SPTLTPPPPPLPLPLPTLLPLPLPLPPPPPTLTPLPPPPPPPPPLPTLTPTLLLTPLPLPLPPPPPLPLPLPPPPPLPLPLPPPPTTPLPTLLLLTTPEP', 'PPSPPPPPPPPPLPPPPLTPPPTTLTPPPPPPPTLTTPPTPPPPPLTPPPPPPPTTPPPPPPTLTPPPPPPTTPPPPPPPPTLLLLLLEPPPPPPPPPPP', 'PPPPPPTTPPPSLTPPLLPTPPPLPPPPPPPTLTPPPPPPTTPPPPTLLTTTPPPPLPPLPLPPPPLPPLPTLLLLTTLEPPPPPPPPPPPPPPPPPPPP', 'PPPPPPPPPPPPSLLLLLTPPPLPPPPPLPPPLPPPPPLPPPTLLTPPLPPPPPPLPPTPPLPLPLPPTPPPPPPTLLEPPTTPPPPPPPPPTLPPPPPP', 'TLLLLLLTPPLPPPPPPLPPLPPPPPPLPPLPPPSLLTLLLPPPPPPPPLLPPTPPPPPLLPPLLTPPPPLPPPPPPEPPTLTPPPTLPPPPTLLLTPPP', 'PTLLLLLLLTPLPPPPPPPLPLPPPPPPPLPSPPTLLTPLPPPPLPPLPLPPPPLPPLPLPPLPLPPLPLPTLPLPPTLTLTPPTLEPPPPPPPPPPPPP', 'PPPPPPPPPPTLLLSPPPPPLPPPPPPPPPTLLLLLLLLTPPPPPPPPPLPPPPPPPPPLPPLTTPPTLTPPPTPPPLPPPLLLPPPLPEPPPPPPPTLT', 'TLLTPPPLTTLPPLPPPPPPLPPSPTLTPPLPPPPLPLPPTLLLLTPLPPPPPPPPPLPPPPTLLLLTPPPLLPPPPPPPPPTTPPPPPPPPPTLLLLLE', 'TLSLLLLTLPLPPPPPPLPPLPTPTPPLPPLPPLTPPTPPLPPLPPPTPPLPPPPPPPPPLPPPPTLTPPTLLLLTPLPPPPPPPPPEPPPPPPPPPPPP', 'PPPTTPPLLPPPPLLPPPPPSLLTLPPTLTPPPPLPPLPLPPPPLPPLPLTLLLTPPLPLLPPPPPPLPLTLLLLLLTPLPPPPPPPPPEPPPPPPPPPP', 'PPPPTLLTPPPPPPLPPLPPPPSLTPPLPPPPPPPPPLPPTLLLLLLTPPLPPPPPPPPPTLLLLLLLLTTPPPPPPPPLPPPLPPPELTPPPPPPPPPP', 'PPPPPPPTLTPPSTPPPLPLTLTTPPPLPLLPPPPPPLPLLPPLLPPLPLLPPPPPPLPLLPPPPPPLPLTLLLLLLTPLPPPPPPPPPLPPPPPPPPET', 'PPPPPPPPPPPPPPTPPPPPTSPPLPPTPPLPPPLPPLPPLPPPPPPTPPTTPPPPPLPPPTLLLLLLLTPPPPPPPPPLPPTTPLPPPLPPPPPPPPPE', 'PPPTLLLLLTSPTTPPPPPLLPLPPPPPPLLPTLLTPPPLLPPPPLPPPLTLLLLTPPPLPPPPPPPPTTPPPPPPPPLPPPLTLPPPEPPPPPPPPPPP', 'PPSPPPPPPPPPLPPPPPPPPPLPTLLTPPPPLPLPPTTPPPLPLPPPLPPPLPLPPTTPPPLTTPPLPPPPTTPPPEPPPPPPPTPPPPPPPPPTLPPP', 'PPPPPPPPPPPPPPPPPPPPPSTLLLLLLTPLPPPPPPPLPLPPPTLTPLPTLLLTPLPLPPPPPPPLPLPPPPPPTTPTPPTLPPELLTPPPPPPPPPP', 'PPTLLLLTPPPPLPPPPLPPPPLPPPPLPPPPSPPPPLPPPPPPPPPLPPPPPPPPPLPPPPPPPTLTPPPPPPTLPPPPPPPPPTTPPPPPPPPPEPPP', 'PPPPPPPPPPPPTPPPPPTTPPLTTPPPLLPPPPPPPPLLSLLLLLLLTLPPPPPPPPPLPPPPPPPPPLPPPPTLLEPLPPPPTTPPPLPPPPPTLLLL', 'PPPPPPPPPPPPPTTPPPPPPPPLLPPTLTSLLTLPPLPLPPPPLPTTPLPPTLTPLPPLPTTPPTTPPEPTLLLTPPPPPPPPPPPPPPPPPPPPPLLP', 'PPPPPPTLLTPPTPPPLPPLPPPPPPLPPLPSLLTPLPPLPPPPLPLPPLPTLPLPLPPLPPTPLPLPETTLLLTPLPPPLTPPPPLPPPTLLLLLTPPP', 'TLLLLLLLLTLPPPPPPPPLLPPTLLTPPLLPPSPPLPPLLPPPPPLPPLLPTLPPLPPLLPPTPPLPPLLPPPPPLPPETLLLLLTPPPPPPPPPPPPP', 'PPPPPPPPPPTLTPPPPPPPLPLPPPPPPPLPSPPPPPPPLPPPPPPPPPTLLLLLLLLTPPPPPPPPPLPPPPPPPPPLPLTTTPPEPLPPPPLPPTLT', 'PPPPPPPPPPPTPPPPPPPPPPPSLLLLTPPPPLPPPPLPTPPLPPPPLPTPPLPPPPLPTPPLTLPPLPLLTPPLPPLPPPPPPPPPLPPPPPPPTTEP', 'PPPPPPPPPPPPPSLLLTPPPPPPPPPLPPPTLTPPPLPLPLPLPPPLPTPLPLPPPLPLPLPTLLLTPPPLPPPPPPPPPTLLLLLTPPPPPPPPPEPP', 'PPPSLLLLLTTPPLPPPPPLTPPLPPPLPLPPPTPLPTPLPPPPPPPPPLPPTLLLLLLTPPLPPPPPPPPPLPPPPPPPPPTLLLLLEPPPPPPPPPPP', 'PPSPPPPPPPPPLPPPPTLTPPLPPPPLPLPPTLLLLTPLPPLPPPPPPLPPLPPPTLLTPPLPPPLPPPPPTPTPEPPPPPPPLPPPPPPPPPLPPPPL', 'TLTPPPPPPPLPSPPPPPPPLPPPTLLLLTLPPPLPPPPLTLLLTPPPPLPPPPPPPPPLPPPPPPPELTPPPPTTPPPPPLLLPPPPPPPPPPPPPPPP', 'PPTLLLLLLTPPLPPPPPPLPPSPPPPPPLPPPPPTLPPLPPPPPPPPPLPPPTLLEPPLTPPLPPPPPLPPPLPPPPPLPPPTTPPPTTPPPPTLLLTP', 'PPPPPPPPPPPPPTLLLLLTTSPLPPPPPLLPPLPPPPPLLPPLPPLPPLLPPLTLTPETLPPLPPPPPPTLLTPPPPPPPPPPPPLPPLPPPPPPPPPP', 'PPPPTLLLTPPPPPLPPPLPSLLLTPPPLPPPPPPPPPLPPPPPPPPPTEPPPPPLPPPPPPTPPPPPPPPPPTTPPPPPPPPPPPPLPPPPPPPPPPPP', 'PPPPPPPPPPSPPPPPPPTPLPPPPLPPPPLPPPPTPPPPTLTPPLPPPPPPLPPTLLEPPPLPPLPPPPTLTPPLPPTPLPPPPLPPPPTLLLLTPPPP', 'PPPPPPPPPPPSLLLLLTPPPLPPPPPTPPPLPPTLTPPPPLPPLPLPPPPLPPLPLPLPPTLLTPLPPPPPPPPPEPPPPPPPPPPPLPPPPPPPPPLP', 'PSLLLLTPPPPPPPPPLPPPPPPPPPLPPPPPPPPPTLTPPPTLLLLLTPPPLPPPPPPPPPLPPPPPPPPPTLLTPPPPPPPPPEPPPPPPPPPPPPPP', 'SLLLLTPPPPPPPPPLPPPPPPPPPLPPPPPTLLLTPPPPPLPPPPPTLTPTTPPPPLPLPPLPPPPLPLPPLPPPPLPLPPTLLLLTPLPPPPPPPPPE'],

    'nm'  : ['SPPPPPPPPLPPPPPPPPLPPPPTTPPPPPPPPPPPLPPPPPPPPPPPPPPPPPLPPPTPPPPTLLLLLLTPLPPPLPPPPLPPPPPPLPLPPTPPPPTTPPPPPTTPLPPPPPPPLPPPLPPLPPLPPPPPPPLPPPPPPLPPLPPPTPPPLPPLLPPLPPLPPPPPPPLPTLPPPLPPLPPPPPPPLPTPPPTTPPLPPPPPPPLPPPPPLPPETLLLLLLLTLPPPPLPPLPPPPPPPPPPPPPPLPPLPPPPPPPPPPPPPPLPPLPPPPPPPPPPPPPPTTPLPPPPPPPPPPPPPPPTLTPPPPPPPPPPPPPPPPPP', 'PPPPPPPPPPPPPPPPPPPSPPPPPPPPPPPPPPPPPLPPPPTLLLLLLLLLTPPLPPPPLPPPPPPPPPLPPTTPPPLPPPPPPPPPLPPPLPPTTPPPPPPPPPLPPPLPTTPPPPPPPPPPLPPPTLTPPPPPPPPPPPLPPPPPPPPPPPPPPPPPLPPPPPPPPPPPPPPPPTTPPPPPPPPPPTLLLLLTPPPPPPPPPPTTPPPPPPPPPPPLPPPPLPPTLLLTPPPLPLLPPPLPPLPPPLPPPPTTLPPPLPPLPEPLPPPPPPPPPPLPPLPLPLPPPTTPPPPPTLLTPLPLPPPPPPPPPPPPPPPTLTPP', 'PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPSLLLLLLTPPLLPPPPPPPPPPPPPLPPPPPPPPPPPPPPPPPLPPPPPPPPPPPPPPPPPLPPPPPPPPTLLLLLLLLTTPPPTTPPLPPPPPPPPPPPPPLLPPLPPPPPPPPPPPPTTLPPLPPPTTPPPPPPPLPLPPLPPPPPPTLLLLLTPLPPLPPPPPPLPPPPPPPLPPTLLLLLLTPPPTPPPLPPPPPPPPPPPPPPPPPLPPPPPPPPPPPPPPPPPEPPPPPPPPPTTTTPPPPPPPPPPPLLLTLLTTPPPPPPPPPPPPPPPPTPPPPP', 'PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPSLLLLLLLLLTPPPPPPPLPPPPPPPPPLPPPPPPPLPPPPPPPPPLPPTTPPPLPPTLLLLLLTPPLLPPPLPPLPPPPPPPPTTLPPPLPPLPPPPPPPPLPTTPPLPPTLLLLLLLLTPPLPPLPPPPPPPPPPPPPPLPPLPPPPPPPPPPPPPPLPPLPPPPPPPPPPPPPPLPPTPPPPPPPPPPPPPPLPPPPPPTTLTLTPPLPPLPPPPPPPPPPPPPPPPPLPPPPPLPPPPPPLPPPPLPPPPPPPPPPPPPPPPPLPPPPPPPPPPPPPPPPPE', 'PPPPPPPPPPPPPPPPPPPPPPPPPTLLLLLLTPPPPPPPPPPLPPPPPPLPPPPPPPPPPLPPPPPPLPPPPSLLLLLTPPTLTPLPPPPPPPPPPPPPLPLPLPPPPPPPPPPPPPLPLPLPPPPPPPPPPLPPLPTLTPPPPPPPPPPPPPLPPPPPPPPPPPPPPPPPLPPPPPPPPTLLLLTPPPLPPPPPPPPLPPPPLPPPLPPPPTPPPLPPPPLPPPLPPTTPPPPLPPPPTLLLTPPPTLLPPLPPPPPPPPPPPPPPPPPLPPPPPPPPPPPPPPPPPLPPPPPPPPTLLLLTPPPTLLLLLLLLTPPPLEPP', 'PPTLLLLLLLLLLLLTPPPPLPPPPPPPPPPPPLPPPPLPPPPPPPPPPPPLPPPPTLLSPPPPPLPPPLPPPPPPPPPPPPPPPPPLPPPPTPPPPLPPPLPPPLPPPPLLPPLLPLPLPPPLPPPPPTPPLPPPPLPPPLPPPPPPPPPPPPTLPPPLPPPPPLPPPPTTTTPPPLPPPPPPLPPTTPPLPPPLPPPPPPLPPPPPPLPPPLPPPPPPLPPLPPPLPPPLPPPPPTLTPPPPPLPPPLPPPPPPLLPPPPPPPPPTTPPPPPPPPPPPPPLLPPLPPPPPPPPPPPPPLPPPEPPPPPPPPPPPPPPPPPPP', 'PPPSPPPPPPPPPPPPPPPPPLPPPPPPPPLPLLPPPPPLPPLPTTPPLPPPPPPPPLPPPPPPPPPPPPPPPPPLPPPPPTLLLLLLTPPPPLPPPPPLPPPPPPLPPPPLPPLPPLPPPPPPLPPPPLPPLPPLPPTTPPLPPPPLPPPPPLPPPPPPLPPPPLPPPPPLPPPPPPLPPPPTLLLLLTPPTLPPLPPPPPPPTPPPPPPPPPLPPPPPPPTPPPPPPPPPLPPPPPPPLPPPPPPPPPEPPPPPPPLPPPTLPPPPPPPPLPPPTPPPPLPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP', 'PPPPPPPPPPPPPPPPPPPSLLLLLLTPPLPPPPPPPPPPPPPPLPPPLLTPPPPPPPPPPPLPPPLTPPPPPPPPPPPPLPPTLPPPPPPPPPPPPPLPPTPPPPPPPPTLLLLLTPPPPPTLTPPPLPPPPPPPPPPTTPLPPPLPPPPPPPPPTTPPLPPPLPPPLPPPTLTPPPLPPPLPLLTPPPLPPPPPLPPPLPPPTTPPLPPPPPLPPPLPPPPPPPLPPPPPLPPPTLLLLLLLTPPPPPLPPPPPPPPPPPPPPEPPLPPPPPPTPPPPPPPLPPLPPPPPPPPPPPPPPLPTTPPPPPPPPPPPPPPTLTPP', 'PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPTLLSPPPPPPPPPPPPPPLPPPPPPTLLTPPPPPPPLPPPPPPLPPTTPPPPPPTLLLLLLTPPPLPPPPPPPPPPPPPPPPPTLLLTPPPPPPPPPPPPPPPPPLPPPPTPPPPPPPPPPPPLPPPPPPPTLLPLPPPPPLPPPPPPPTLPPPPPPPPLPPPPLPPPLTTLPPPPPLPPPPPPPPPPPPPPPPPLPPPPPPPPPPPPPPPPPLPPPPPPPPPPPPPPPPPLPPPPPPPPTLLLLLLLLTPPPPPPPPLTTPPPPPPPPPPPPPPPTLLLLLLEPPP', 'PPPPPPPPPPPPPPPPPPTLLLLLLTPPLTPPTPPPLPPPPPPLPPPPLLLLPPTLLSPPPLPPPLLTPPPPPPPPPPPTTPPPPPPPPPPPPPPPPPLPPPPPPPPPPPPPTPPPLPPPPPTTPPPPPPPPPPLPPPPPLTLTPPPPPPPTTPPPPTTPPLPTLLLLLTPPPPPLPPPLPLPPPPPPPPPPPLPPPLPLPPPPPPPPTPPLPPPLPLPPPPPPTTPPPLPPPLPLPPPPPPPPPPPLPPPLPTLLLLLLLLLLLTPPPLPPPPPPPPPPPPPPPPPLPPPPPPPPPPPTPPPPPLPPPPPPPTPPPPPPPPPE', 'PPPPPPPPTLLLLTPPPPPPPPPPPPLPPPPLPPPPPPPPPPPPLPPPPLPPTPPSLLLLLLTPPPPLPTTPPPPPPPPPPPPPPLPPPPPPPPPPPPPPPPPLPPPPPPPPTLLLLLLLLTPPPPPPPPLPPPPPPPPPPPLPPPPPLPPPPLLPPPPPTTPPPPLPPPPPPPPPPPLLPLPPTLLLLLLTPPTLTLPPPPPPPPPPPTLLTPPLPPPPPPPPPPPPPPPPPLPPPPPPPPPLPPPPPPPLPPPPPPPPPPLPPPPPPLPPPTTLPPPPPPPPPPPLPPPPPTTPPPPPPPPPETPPPPPPPPPPPPPPPPPP', 'PPPPPPPPPPPPPPPPPPPPPSPPPPPPPTLLLTPPPPPLPPPPPPPLPPPLPPPPPLPPPPPPPLPPPLPPPPPLPPPPPPPLPPPLPPPPPTLLLLLLTLPPPLPPPPPPPPPPPPTTPPPLPPPPPPPPPPPPPPPPPLPPPPPPPPPPPPPPPPPLPPPPPPPPPPPPPPPPPLPPPTLLLLLLLLLTPPPLPPPLPPPPPPPPPTLLLTPPPLPPPPPPPPPPPPPPPPPLPPPPPPPPPPPPPPPPPLPPPPPPPPPPPPPPPPPTLLLLLLLLLLLLLLLTPPPPPPPPPPPPPPPPPEPPPPPPPPPPPPPPPPPP', 'TLLLLTPPPPPPPPPPPPLPPPPLPPPPPPPPPPPPTLLSPLPPTPTPPPTLLTPPPPPLPPTPPPPPLPPLPPPPPLPPPPTLLLTPPLPPPLPLPPPPLPPPPPPLPLTLPLPPTPLPPPPPPLPTTPPLPPTPLPTPPPPLPTTPPLPPTPLPPPPPPLPLLLPLPPPPLPPLPLPLPPPLPLPPPPLPPLTLPLPPPPPLPPPPLPPPLPPLPPPPPLPPPPLPPPPPPLTLLLLTPPPPLPPPPPPLLPPPPPPPPPLPPPPPPLLPPPPPPPPPLPPPELLTLPPPPPPPPPLPPPPPPPTLLLLLLLLLTPPPPPPP', 'PTLLLLLLLLLLLLLLLTPLPPPPPPPPPPPPPPPLPSPTLLLLLLLLLLTPPLPPPLPPPPPPPPPPLPPLPPPTTPPPPPPPPPLPPLPPPPLPPPPPPPPPLPPLPPPPLPPPPPPPPPLPPLPPPTTPPPPPPPPPLPPLPPPLPPPPPPPPPPLPPLPPTTPPPPPPPPPPTLLTPTTPPPPPPPPPPPPPPPTTPPPPPPPPPPPPPPPPLPPPPPPPPPPTLLTPPPLPPPPPPPPPPLPPTTPPTTPPPPPPPPPLPPPLPPPTLLLLLLLLLTPPPLPPPPPPPPPPPPPPPPPEPPPPPPPPPPPPPPPPPPPP', 'SLLLLLLLLTPPPPPPPPPPPPPPPPPLPPTLLTPPPPTPPLPPTLPPLPPLPPPPPPPPPLTLPTLPPLPPPPLPPPPPPLPPLPPLPPPPLPTPTLLTPPLPPLPPPPTPPPLPPPPTTPPLPPPPLPTPLPPPPLPPPLPPPPLPTPTLLLLTPPPLPPPPTPPPPPPPPPPPPLPPPPLPPPPPPPPPPPPLPPPPPPPPPPPPPPPPTTPPTLLLLLLLLLLLLLTPPPLPPPPPPPPPPPPPPPPPLPPPPPPPPPPPPPPPPPTLLLLLLLLLLLLLLLLTPPPPPPPPPPPPPPPPPEPPPPPPPPPPPPPPPPPP'],
};

var gridPipeTypes = {
    'S' : ['start'],
    'E' : ['end'],
    'T' : ['elbow', 'elbow', 'elbow', 'elbow', 'elbow', 'elbow', 't', 't', 'cross'],                          
    'L' : ['line', 'line', 'line', 'line', 'line', 't', 't', 't', 'cross'],                              
    'P' : ['empty', 'empty', 'empty', 'empty', 'empty', 'dead', 'dead', 'dead', 'line', 'cross', 't', 'elbow']          
};

class Stack { 
    // Array is used to implement a Stack 
    constructor() {
        this.items = (arguments.length == 0) ? [] : [arguments[0]];
        this.length = this.items.length;
    } 

    push(element) {
        this.items.push(element); 
        this.length++;
    }

    pop() {
        if (this.isEmpty()) {
            return undefined;
        }

        this.length--;
        return this.items.pop();
    }

    top() {
        if (this.isEmpty()) {
            return undefined;
        }

        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length == 0;
    }

    reset() {
        this.items = [];
        this.length = 0;
    }

    values(key) {
        var arr = [];

        for (var i = 0; i < this.length; i++) 
            arr.push(this.items[i][key]);
        
        return arr;
    }
}

// C --------------------------------------------------------------------------------------------------------------------------------------------------------
var questions = [
    {   // question 0
        'q' : 'Where is <span class="hint">home</span>?',
        'a' : ['29°58\'31"N, 31°08\'16"E', 'In the html', 'Quillota', 'Limache']
    },

    {   // question 1
        'q' : 'What <span class="hint">important</span> date is it in 2019, if: the day after tomorrow is not Monday, nor Wednesday; this year, the date number falls on Wednesday 4 months before and 5 after; the month has 31 days?',
        'a' : ['16/05', '12/06', 'I don\'t know', '24/03']
    },

    {   // question 2
        'q' : '<span class="hint">I\'m</span> missing some things.', 
        'a' : ['Nose', 'Emojis?', 'No', 'Eyes']
    },

    {   // question 3
        'q' : '<span class="hint">Who</span> is the author of the following: "Though men at their end know knight is right, because their words had forked no lightning, they don\'t go gentle into that good night."?',
        'a' : ['Esteban', 'Me', 'God himself', 'Dylan Thomas']
    },

    {   // question 4
        'q' : 'What <span class="hint">creature</span> is present in Queen\'s logo?',
        'a' : ['Phoenix', 'Dragon', 'Elizabeth II', 'Tiger']
    },

    {   // question 5
        'q' : 'What should you answer to this <span class="hint">question</span>?',
        'a' : ['I don\'t know', 'Yes', 'No', 'Maybe']
    },

    {   // question 6
        'q' : 'What color does <span class="hint">one</span> get, when mixing red and blue?',
        'a' : ['Depends', 'Three and a half', 'Violet', 'Magenta']
    },

    {   // question 7
        'q' : 'What is the word <span class="hint">encrypted</span> in this url, before the ".github.io/..."?',
        'a' : ['Chocolate', 'Cochlea', 'Ocelot', 'Catechol']
    },

    {   // question 8
        'q' : 'Which <span class="hint">emoji</span> have I not used?',
        'a' : ['😂', '😹', '🔥', '😏']
    },

    {   // question 9
        'q' : 'How <span class="hint">many</span> questions have I asked?',
        'a' : ['10', '9', 'Does it matter?', 'I uh.. 2? Maybe?']
    },

    {   // question 10
        'q' : 'Where does the <span class="hint">light</span> come from?',
        'a' : ['Top left', 'My heart', 'God himself, again', 'The Sun']
    },

    {   // question 11
        'q' : 'What\'s my <span class="hint">name</span>?',
        'a' : ['😹😹🔥🔥 bruh-cat', '😹😹😹🔥 bro-cat', '😹😹🔥🔥 bruh cat', 'Dark sphinxXx RAWR >3< XDD']
    },

    {   // question 12
        'q' : 'If I <span class="hint">were</span> to ask you the following: "Which is the answer you mustn\'t pick?", then which is the answer you wouldn\'t pick?',
        'a' : ['This one', 'For sure that one', 'Maybe this one', 'Not this one']
    },

    {   // question 13
        'q' : 'How many <span class="hint">shrimps</span> do you have to eat, before you make your skin turn pink?',
        'a' : ['It\'s not clear,<br>actually', 'Shrimps are pretty<br>rich', 'One is good enough', 'Eat too much']
    },

    {   // question 14
        'q' : 'Which of these animals, was the one that caused Minecraft to almost <span class="hint">crash</span> when you played?',
        'a' : ['Bats', 'Pigs', 'Turtles', 'Cows']
    },

    {   // question 15
        'q' : 'Wich of these words has a <span class="hint">mistake</span>?',
        'a' : ['The first one', '"word\'s"', '"this"', '"haves"']
    },

    {   // question 16
        'q' : 'What is Esteban\'s favorite <span class="hint">flavor</span>?',
        'a' : ['Mint', 'Chocolate', 'Cookies & Cream', 'Lucuma']
    },

    {   // question 17
        'q' : 'Is your boyfriend <span class="hint">cute</span>?',
        'a' : ['No', 'No', 'No', 'No']
    },

    {   // question 18
        'q' : 'Are you <span class="hint">cute</span>?',
        'a' : ['Yes', 'Yes', 'Yes', 'Yes']
    },

    {   // question 19
        'q' : 'What is Esteban\'s favorite <span class="hint">smell</span>?',
        'a' : ['Baby Ammens', 'Poopoo', 'Babies in general', 'Baby\'s blood']
    },

    {   // question 20
        'q' : 'What color was the ink of the <span class="hint">pen</span> you gifted to Esteban?',
        'a' : ['Blue', 'Black', 'Blood', 'Yes']
    },

    {   // question 21
        'q' : 'How <span class="hint">long</span> is this?',
        'a' : ['4', '1 more for sure', '3 pidgeons and a half', 'Minecraft']
    },

    {   // question 22
        'q' : 'What was de nickname Esteban\'s aunts gave to one of their <span class="hint">sisters</span>, Elizabeth?',
        'a' : ['Licha', 'Elicha', 'Eli', 'Lizbeth']
    },

    {   // question 23
        'q' : 'What does Esteban <span class="hint">allways</span> travel with?',
        'a' : ['Fucking everything', 'A diabetes kit', 'Deodorant and perfume', 'Tooth paste']
    },

    {   // question 24
        'q' : 'If I were to tell you that, by pressing the <span class="hint">home</span> button you would win, would you do it?',
        'a' : ['Yes', 'No', 'No, I don\'t want to do this again', 'Sansa Stark']
    },
];

var specialQuestions = [9, 17, 18, 24];

var hints = [
    'Here is a hint! A useless one though.',                                    // question 0
    '"izi pizi" as they say.',                                                  // question 1
    'Like, it\'s real. Gurl.',                                                  // question 2
    'Even if you are wrong, you are right.',                                    // question 3
    'Yes, she counts as a creature. I know.',                                   // question 4
    'May you repeat the question(8).',                                          // question 5
    'One, two, or however many people you would like :)',                       // question 6
    '"encrypted" is a strong word for this one :I',                             // question 7
    'For reals tho 🔥🔥🔥',                                                     // question 8
    'Real hint: this doesn\'t count past mistakes, like you being born :b',     // question 9
    'There is no need to be philosophical.',                                    // question 10
    '"Oh naanaa (8)" -Rihanna.',                                                // question 11
    'Not even I get this one.',                                                 // question 12
    'Ew.',                                                                      // question 13
    'Damned bitches >:c',                                                       // question 14
    'Or "Galatee" in hindi, if you must.',                                      // question 15
    'Should be easy, like you :3',                                              // question 16
    'Plain and simple.',                                                        // question 17
    'Plain and simple.',                                                        // question 18
    'Don\'t get the wrong idea.',                                               // question 19
    'Thank you for that one :P',                                                // question 20
    'If you know what I mean.',                                                 // question 21
    'What if were to ask you, "which one?".',                                   // question 22
    'At least he tries to.',                                                    // question 23
    'You know, the one on the top left',                                        // question 24
];

var wrongMsg = [
    ['Go check if you want >:c', 'That\'s where Esteban lives.', 'That\'s where you live :I'],                                      // question 0
    ['Happy 734.400 minutes <3', 'Oh sure, but you do know', 'It\'s not this one.'],                                                // question 1
    ['Actually true 🔥🔥', 'Wow, harsh.', 'Omg, no.'],                                                                              // question 2
    ['Me as literally me? or as you?', 'He ded, me kils', 'No, well yes, but no (changes were made).'],                             // question 3
    ['Is Freddie = Daenerys?', 'Well, no. She\'s not there. Kinda.', 'Sure.'],                                                       // question 4
    ['Malcom, is that u?', 'Yeah. "No" to you too.', 'I need answers bitch.'],                                                      // question 5
    ['Someone needs school.', 'Baudelaire???', 'Magenta and the CMYK-Men, he controls the metal inside ink 🔥'],                    // question 6
    ['Wrong, you hear me?', 'Miau', 'No idea what this is.'],                                                                       // question 7
    ['💃', '💃', '💃'],                                                                                                             // question 8
    ['I didn\'t start with 1', 'Well, not at this point.', 'Math, please.'],                                                        // question 9
    ['Awww, no.', 'Jesus, no- wait!', 'Not wrong, but wrong.'],                                                                     // question 10
    ['Omg, how could you :c', 'Should not forget the hyphens :I', 'Thats my son.'],                                                 // question 11
    ['I\'m enjoying fucking with you.', 'Well, it wasn\'t.', 'And even then, you chose this one.'],                                 // question 12
    ['Rich? Money?', 'THAT\'S ONE TOO MANY', 'And you\'ll get sick.'],                                                              // question 13
    ['Not as troublesom though.', 'Seeing those green disks explode was weird.', 'I don\'t they were used even.'],                  // question 14
    ['Inkorect 🔥', 'No(?)', 'Does that even exist?'],                                                                              // question 15
    ['Not that much really.', 'OMG YES, but there is one better.', 'OH YES, but there is one better.'],                             // question 16
    ['', '', ''],                                                                                                                   // question 17
    ['', '', ''],                                                                                                                   // question 18
    ['No 👶👶👶', 'Don\'t.', 'In the Sims maybe...'],                                                                              // question 19
    ['Black, like my soul :c', 'OF MY ENEMIES 🔥🔥', 'Why would you choose this one?'],                                             // question 20
    ['You will see.', 'I will leave you to your business, but don\'t touch me.', 'But then, how long is Minecraft?'],               // question 21
    ['Close, and weird.', 'No, I\'m not used to that one.', 'Too fancy.'],                                                          // question 22
    ['Sometimes I leave it behind, but true.', 'Yes and yes, but I do what I want with this game.', 'Yeah, well. Not so much.'],    // question 23
    ['THEN??', 'Pretty please?', 'Well, you will end up doing anyways.', 'Byeee sistaa.'],                                          // question 24
];