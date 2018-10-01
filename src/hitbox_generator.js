let a = 0;

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
            //Point B
            new Phaser.Point(point_b[i],point_b[y]), 
            //Point C
            new Phaser.Point(point_c[i],point_c[y]), 
            //Point D
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

    circle25 = new Phaser.Circle(255, 230,24);
    circle50 = new Phaser.Circle(255, 230,14);

    if (circle50.contains(flechette.body.x, flechette.body.y)){
        total.push(50);
        score.text = total;
    }
    else if (circle25.contains(flechette.body.x, flechette.body.y)){
        total.push(25);
        score.text = total;
    }
    

}

function detector(i) {

    if (poly.contains(flechette.body.x, flechette.body.y))
    {
        total.push(values[i]);
        score.text = total;
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

// Pour relancer la flechette
function refresh() {

    flechette.x = 200;
    flechette.y = 450;

    dragInit();

    a = 0;
}

//Fin
function restart() {

    let max = total.reduce(function(a, b) { return a + b; }, 0);
    score.text = max;

}