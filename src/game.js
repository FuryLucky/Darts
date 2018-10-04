// Création de base de Phaser
// ...Dimensions du Canvas
// ... ...Nom du niveau
// ... ... ...Function de bases
let game = new Phaser.Game(690, 440, Phaser.CANVAS, 'Arrow', { preload: preload, create: create, update: update});

// Création des outils de jeu
let flechette;
let circle_2;
let circle_high;
let circle_3;
let circle_low;
let circle25;
let circle50;
// Création hitbox
let graphics;
let poly;
var circle;
let values = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];
//            20         1         18        4         13        6         10        15        2         17        3         19        7         16        8         11        14        9         12        5       
let point_a = [219, 65,  253, 65,  285, 76,  313, 96,  332, 123, 343, 155, 343, 189, 332, 221, 312, 249, 285, 269, 252, 278, 219, 279, 186, 268, 159, 248, 140, 220, 129, 189, 129, 155, 140, 122, 160, 96,  187, 75 ];
let point_b = [252, 65,  285, 76,  312, 95,  332, 123, 343, 155, 343, 188, 332, 220, 313, 248, 285, 268, 253, 278, 219, 279, 187, 268, 160, 248, 140, 221, 129, 189, 129, 156, 140, 123, 159, 96,  187, 76,  219, 66 ];
let point_c = [237, 161, 240, 163, 243, 164, 245, 166, 246, 170, 247, 174, 246, 178, 244, 180, 241, 182, 238, 183, 235, 183, 231, 182, 228, 180, 225, 178, 225, 174, 225, 170, 226, 167, 228, 165, 231, 162, 234, 161];
let point_d = [235, 161, 238, 162, 241, 162, 244, 164, 246, 167, 247, 170, 247, 173, 245, 177, 244, 180, 241, 182, 237, 183, 234, 183, 231, 181, 228, 179, 226, 177, 225, 173, 225, 170, 226, 166, 228, 164, 231, 161];
// Score
let score;
let points = [];
let total = 0;
// Bouton
let refr;
let cross;

// Chargement des images
function preload() {
    game.load.image('background', '../assets/back.jpg');
    game.load.image('darts', '../assets/darts.png');
    game.load.image('cross', '../assets/cross.png');
    game.load.image('refresh', '../assets/refresh.png');
}

// Création des éléments
function create() {

    // Responsive
    game.scale.scaleMode = Phaser.ScaleManager.aspectRatio;
    game.scale.pageAlignVertically = true;
    game.scale.pageAlignHorizontally = true;
    game.scale.setShowAll();
    game.scale.refresh();

    // Background
    game.add.sprite(0, 0, 'background');

    // Flechettes
    let flechette_1 = game.add.sprite(470, 390, 'darts');
    flechette_1.scale.setTo(0.3, 0.3);
    let flechette_2 = game.add.sprite(500, 390, 'darts');
    flechette_2.scale.setTo(0.3, 0.3);
    let flechette_3 = game.add.sprite(530, 390, 'darts');
    flechette_3.scale.setTo(0.3, 0.3);
    let flechette_4 = game.add.sprite(560, 390, 'darts');
    flechette_4.scale.setTo(0.3, 0.3);
    let flechette_5 = game.add.sprite(590, 390, 'darts');
    flechette_5.scale.setTo(0.3, 0.3);
    // activer le clic
    flechette_1.inputEnabled = true;
    flechette_2.inputEnabled = true;
    flechette_3.inputEnabled = true;
    flechette_4.inputEnabled = true;
    flechette_5.inputEnabled = true;
    // au clic
    flechette_1.events.onInputDown.add(take, this);
    flechette_2.events.onInputDown.add(take, this);
    flechette_3.events.onInputDown.add(take, this);
    flechette_4.events.onInputDown.add(take, this);
    flechette_5.events.onInputDown.add(take, this);

    //Score
    let style = { font: 'bold 20pt Arial', fill: '#990000', boundsAlignV: "center", align: 'left', wordWrap: true, wordWrapWidth: 1 };
    score = game.add.text(600, 126, points, style);
    somme = game.add.text(590, 330, total, style);
    score.anchor.setTo(0.5, 0.5);

    //Bouton
    refr = game.add.button(500, 0, 'refresh', reload, this);
    refr.scale.setTo(0.14, 0.14);
    cross = game.add.button(620, 10, 'cross', close, this);
    cross.scale.setTo(0.2, 0.2);

}

function take(select) {

    flechette = select;

    // Ajout de la physique aux éléments
    game.physics.enable(flechette, Phaser.Physics.ARCADE);

    // Définition des HitBox
    flechette.body.setSize(5, 5, -3, -3);

    dragInit();

    // Function a executer au Drag et quand on relâche
    flechette.events.onDragStart.add(startDrag, this);
    flechette.events.onDragStop.add(stopDrag, this);
}

function dragInit() {

    // Rend le Drag possible
    flechette.inputEnabled = true;
    flechette.input.enableDrag();

}

function startDrag() {

    flechette.body.moves = false;
    // Agrandissement de la fléchette pour un effet smooth
    flechette.scale.setTo(0.7, 0.7);
    flechette.angle = 100;

}

function stopDrag() {

    flechette.body.moves = true;
    // Effet de lancer smooth
    flechette.angle = 80;
    // On retire la possibilité de saisir la fléchette
    flechette.inputEnabled = false;

    // Effet de fléchette qui s'éloigne
    game.add.tween(flechette).to( { x: '+7', y: '-17' }, 500, Phaser.Easing.Linear.None, true);
    game.add.tween(flechette.scale).to( { x: '-0.4', y: '-0.4' }, 500, Phaser.Easing.Linear.None, true);

    setTimeout(function() {
        generator();
    }, 500);

}

function update() {

    // Responsive
    // game.scale.setShowAll();
    game.scale.refresh();
}

//Relancer la page
function reload () {
    location.reload();
}
//Ferme la page
function close() {
    window.close();
}