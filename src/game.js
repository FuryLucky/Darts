// Création de base de Phaser
// ...Dimensions du Canvas
// ... ...Nom du niveau
// ... ... ...Function de bases
let game = new Phaser.Game(800, 600, Phaser.CANVAS, 'Arrow', { preload: preload, create: create, update: update});

// Création des outils de jeu
let flechette;
let cible;
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
let point_a = [235, 92,  277, 94,  318, 110, 350, 134, 378, 168, 390, 208, 390, 252, 376, 290, 350, 326, 318, 352, 276, 364, 234, 363, 192, 350, 158, 326, 132, 290, 120, 250, 120, 208, 134, 166, 160, 132, 194, 108];
let point_b = [275, 92,  316, 109, 350, 132, 376, 168, 390, 208, 390, 250, 378, 292, 352, 326, 316, 350, 276, 364, 234, 364, 193, 352, 160, 326, 134, 292, 120, 252, 120, 208, 132, 168, 158, 134, 192, 108, 234, 94 ];
let point_c = [255, 220, 261, 219, 264, 218, 267, 224, 268, 226, 268, 232, 268, 236, 264, 239, 262, 240, 257, 242, 254, 242, 249, 240, 247, 238, 243, 234, 244, 232, 243, 227, 243, 224, 247, 220, 249, 218, 254, 218];
let point_d = [255, 220, 256, 217, 261, 220, 262, 222, 264, 226, 266, 227, 264, 232, 266, 233, 264, 238, 261, 240, 256, 242, 254, 242, 249, 239, 246, 239, 245, 233, 243, 232, 243, 226, 245, 225, 248, 220, 249, 219];
// Score
let score;
let total = [];

// Chargement des images
function preload() {
    game.load.image('background', '../assets/wood.jpeg');
    game.load.image('target', '../assets/target.png');
    game.load.image('darts', '../assets/darts.png');
}

// Création des éléments
function create() {

    game.scale.scaleMode = Phaser.ScaleManager.aspectRatio;
    game.scale.pageAlignVertically = true;
    game.scale.pageAlignHorizontally = true;
    game.scale.setShowAll();
    game.scale.refresh();

    //background
    game.add.sprite(0, 0, 'background').scale.setTo(0.32, 0.4);

    // Ajout des sprites et redimensionnement
    cible = game.add.sprite(75, 50, 'target');
    cible.scale.setTo(0.15, 0.15);

    flechette = game.add.sprite(200, 450, 'darts');

    // Ajout de la physique aux éléments
    game.physics.enable([flechette, cible], Phaser.Physics.ARCADE);

    // Définition des HitBox
    flechette.body.setSize(100, 100, -2500, -900);
    cible.body.setCircle(1200);

    dragInit();

    // Function a executer au Drag et quand on relâche
    flechette.events.onDragStart.add(startDrag, this);
    flechette.events.onDragStop.add(stopDrag, this);

    //Score
    let style = { font: 'bold 40pt Arial', fill: 'white'}; //, align: 'left', wordWrap: true, wordWrapWidth: 10 
    score = game.add.text(600, 100, total, style);
    score.anchor.setTo(0.5, 0.5);

}

function dragInit() {

    //Repositionnement 
    flechette.scale.setTo(0.03, 0.03);
    flechette.angle = 90;

    // Rend le Drag possible
    flechette.inputEnabled = true;
    flechette.input.enableDrag();

}

function startDrag() {
    flechette.body.moves = false;
    // Agrandissement de la fléchette pour un effet smooth
    flechette.scale.setTo(0.04, 0.04);

}

function stopDrag() {
    flechette.body.moves = true;
    // Effet de fléchette qui s'éloigne
    flechette.scale.setTo(0.02, 0.02);
    // Effet de lancer smooth
    flechette.angle = 110;
    // On retire la possibilité de saisir la fléchette
    flechette.inputEnabled = false;

    setTimeout(function() {
        launch();
    }, 100);

}

function launch() {

    generator();

}

function update() {
    game.scale.setShowAll();
    game.scale.refresh();
}