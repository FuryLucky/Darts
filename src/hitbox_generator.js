let a = 0;
let multi;

function generator() {

    // Affiche les valeurs et leur index
    // console.log(i + " = " + values[i]);

    // Création des HitBox
    for (let i = 0; i < 40; i++) {

        let y = i+1;

        poly = new Phaser.Polygon();
        
        poly.setTo([ 
            // Point A
            new Phaser.Point(point_a[i],point_a[y]), 
            // Point B
            new Phaser.Point(point_b[i],point_b[y]), 
            // Point C
            new Phaser.Point(point_c[i],point_c[y]), 
            // Point D
            new Phaser.Point(point_d[i],point_d[y])
        ]);

        graphics = game.add.graphics(0, 0);
        let random_color = Phaser.Color.getRandomColor(50, 255, 255);
    
        graphics.beginFill(random_color);
        graphics.drawPolygon(poly.points);
        graphics.endFill();

        detector(a);

        a++;
        i++;
        
    }

    circle_2    = new Phaser.Circle(236, 172, 218);
    circle_high = new Phaser.Circle(236, 172, 198);
    circle_3    = new Phaser.Circle(236, 172, 140);
    circle_low  = new Phaser.Circle(236, 172, 121);
    circle25    = new Phaser.Circle(236, 172, 20 );
    circle50    = new Phaser.Circle(236, 172, 10 );

    if (circle50.contains(flechette.body.x, flechette.body.y)){ // Centre

        total.push(50);
        score.text = total;
    }
    else if (circle25.contains(flechette.body.x, flechette.body.y)){ // Anneau 25

        total.push(25);
        score.text = total;

    }else if (circle_low.contains(flechette.body.x, flechette.body.y)) { // Petit Anneau

        total.push(multi);

    }else if (circle_3.contains(flechette.body.x, flechette.body.y)) { // Multiplicateur *3

        total.push(multi*3);

    }else if (circle_high.contains(flechette.body.x, flechette.body.y)) { // Grand Anneau

        total.push(multi);

    }else if (circle_2.contains(flechette.body.x, flechette.body.y)) { // Multiplicateur *2

        total.push(multi*2);

    }else{
        total.push(0);
    }

    score.setText(total);

}

// Detecte qu'elles polygones est toucher
function detector(i) {

    if (poly.contains(flechette.body.x, flechette.body.y))
    {
        multi = values[i];
        
    }

    graphics.clear();

    setTimeout(function() {
        if (total.length < 5) {
            refresh();
        }else{
           restart(); 
        }     
    }, 1000);
}

// Pour lancer les flechettes
function refresh() {

    multi = 1;
    a = 0;
}

//Fin
function restart() {

    let max = total.reduce(function(a, b) { return a + b; }, 0);
    score.text = max;

}