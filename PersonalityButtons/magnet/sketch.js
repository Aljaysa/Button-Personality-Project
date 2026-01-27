let magnet;
let boxes;


function setup() {
  const canvas = createCanvas(800, 600);

  // create an engine
  let engine = Matter.Engine.create();
  let world = engine.world;

  // no gravity
  engine.world.gravity.scale = 0;


  friend = loadImage("../assets/friend.png");

  // add a group of identical boxes
  boxes = new Stack(
    world,
    { x: width/2, y: 100, cols: 1, rows: 10, colGap: 5, rowGap: 5, color: 'white',
      create: (x, y) => {
      const body = Matter.Bodies.rectangle(x, y, 10, 10, {
        restitution: 0.9
      });

      return body;
    }
    
    }
  );


  friend= new Block(
    world,
    { x: width/2, y: height/2, w: 100, h: 100, color: 'white', image: friend },
    { isStatic: true }
  )

  chamelion = loadImage("../assets/chamelion.png");


  // add magnet
  magnet = new Magnet(
    world,
    { x: width/2, y: height/2, r: 20, color: 'grey', attraction: 0.45e-5 , image: chamelion },
    { isStatic: true }
  );
  magnet.addAttracted(boxes.body.bodies);
  //magnet.addAttracted(friend);

  // add a mouse to manipulate Matter objects
  //mouse = new Mouse(engine, canvas, { stroke: 'magenta', strokeWeight: 2 });

  // run the engine
  Matter.Runner.run(engine);
}

function mousePressed() {
  if (magnet.isMouseOver()) {
    magnet.isClicked = !magnet.isClicked;
  }
}

function draw() {
  background(0);

  if (mouseIsPressed) {
    // smoothly move the attractor body towards the mouse
    Matter.Body.translate(magnet.body, {
      x: (mouseX - magnet.body.position.x) * 0.03,
      y: (mouseY - magnet.body.position.y) * 0.03
    });
  }



  magnet.attract();
  magnet.draw();

  if(magnet.isClicked){
    friend.draw();

  }
  boxes.draw();
  //mouse.draw();
}
