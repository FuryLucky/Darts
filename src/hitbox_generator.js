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

        console.log("c", i, y);

        a++;
        i++;
        
    }

    circle25 = new Phaser.Circle(255, 230,24);
    circle50 = new Phaser.Circle(255, 230,14);

}

function detector(i) {

    console.log(i, values[i]);
    game.physics.arcade.overlap(flechette, graphics, alo, null, this);
    game.physics.arcade.overlap(flechette, circle50, alo, null, this);
    game.physics.arcade.overlap(flechette, circle25, alo, null, this);

}

function alo() {

    console.log('yolo');

}