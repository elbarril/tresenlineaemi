// tablero para trabajar la lógica para encontrar ganador
let board = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];

// creamos clase Player
class Player {
    // establecemos las propiedades cuando se crea un nuevo Player
    constructor(id, color){
        this.id = id;
        this.isTurn = id == 1 ? true : false;
        this.symbol = id == 1 ? 'o' : 'x';
        this.color = color;
        this.won = false;
        this.points = 0;
    }

    // establecemos el metodo para hacer ganar al jugador
    win() {
        $('.heading').text('Player ' + (this.id == 1 ? 'One' : 'Two') + ' Wins!');
        $('.heading').css('color', this.color);
        this.points++;
        // this.points = this.counter + 1;
        // this.points += 1;
        $('.p' + this.id).text('Player ' + this.id + ": " + this.points);
        this.won = true;
    }
}

// creamos un arreglo de objetos Player
var players = [
    new Player(1, 'tomato'),
    new Player(2, '#00a1ec')
]

// creamos clase Space
class Space {
    // establecemos las propiedades cuando se crea un nuevo Space
    constructor(id){
        this.played = false;
        this.id = id;
    }

    // establecemos el método para gregar simbolo al espacio del tablero HTML
    addSymbol(spaceElement, symbol) {
        // ejemplo de 'error handled'
        if ($(spaceElement).length){
            $(spaceElement).append("<div class='" + symbol + "'>" + symbol + "</div>");
            this.played = true;
        }else{
            console.log('no se encontro el elemento');
        }
    }
}

// creamos un arreglo de objetos Space
var spaces = [
    new Space('one'),
    new Space('two'),
    new Space('three'),
    new Space('four'),
    new Space('five'),
    new Space('six'),
    new Space('seven'),
    new Space('eight'),
    new Space('nine')
]

// gameplay
$('.board').on('click', function (event){
    // preguntamos si no gano alguno de los jugadores
    if (!players.some(p => p.won)){
        // preguntamos si en alguno de los espacios sucede lo siguiente
        spaces.some(function(s,index){
            // pregunamos si coincide el espacio con el elemento que se hizo click
            // y si el espacio no fue jugado ya
            if (s.id == event.target.id && !s.played == true) {
                // por cada jugador 
                players.forEach(function(p){
                    // preguntamos si es su turno
                    if (p.isTurn){
                        // ejecutamos el metodo del espacio
                        s.addSymbol(event.target, p.symbol);
                        // ejecutamos la funcion para guardar la jugada en el tablero
                        saveSpacePlayed(index, p.symbol);
                        // preguntamos si hay tres en linea para hacer ganar al jugador
                        if (isThreeInLine(p.symbol)) {
                            p.win();
                        };
                    }
                });
                // cambiamos de turno
                switchTurn();
            }
        });
    }
});

function switchTurn(){
    players.forEach(p => p.isTurn = !p.isTurn);
}

function saveSpacePlayed (index, symbol) {
    let rowIndex, columnIndex;
    switch (index) {
        case 0: case 1: case 2:
            rowIndex = 0;
            break;
        case 3: case 4: case 5:
            rowIndex = 1;
            break;
        case 6: case 7: case 8:
            rowIndex = 2;
            break;
    }
    columnIndex = board[rowIndex].indexOf(index+1);
    board[rowIndex][columnIndex] = symbol;
}

function isThreeInLine(symbol) {
    [   // 0
    //   0 1 2
        [1,2,3],
        // 1
    //   0 1 2
        [4,5,6],
        // 2
    //   0 1 2
        [7,8,9]
    ]

    // match rows
    // top [0,0] + [0,1] + [0,2]
    // middle [1,0] + [1,1] + [1,2]
    // bottom [2,0] + [2,1] + [2,2]

    // match columns
    // left [0,0] + [1,0] + [2,0]
    // middle [0,1] + [1,1] + [2,1]
    // right [0,2] + [1,2] + [2,2]

    // match diagonals
    // left to right [0,0] + [1,0] + [2,0]
    // right to left [0,1] + [1,1] + [2,1]

}