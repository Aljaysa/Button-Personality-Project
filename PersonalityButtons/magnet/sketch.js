let magnet;
let boxes;
 

function setup() {
  bgWidth = 1090;
  bgHeight = 683;
  const canvas = createCanvas(bgWidth, bgHeight);

  // create an engine
  let engine = Matter.Engine.create();
  let world = engine.world;

  // no gravity
  engine.world.gravity.scale = 0;
  
  bg = loadImage("../assets/bg.png");

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


  // friend= new Block(
  //   world,
  //   { x: width/2, y: height/2, w: 100, h: 100, color: 'white', image: friend },
  //   { isStatic: true }
  // )

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

  tent = loadImage("../assets/tent.png");
  videoGames = loadImage("../assets/videoGames.png");
  baseball = loadImage("../assets/baseball.png");
  microphone = loadImage("../assets/microphone.png");
  backpack = loadImage("../assets/backpack.png");

  hobbyObjectsIdx = 0;
  hobbyObjects = [
    new Block(
      world,
      { x: 400, y: 100, w: 10, h: 10, color: 'white', image: friend },
      { isStatic: true }
    ), 
    new Block(
      world,
      { x: 250, y:150, w: 10, h: 10, color: 'white', image: videoGames },
      { isStatic: true }
    ),
    new Block(
      world,
      { x: 270, y: 200, w: 10, h: 10, color: 'white', image: baseball },
      { isStatic: true }
    ),
    new Block(
      world,
      { x: 350, y:500, w: 10, h: 10, color: 'white', image: microphone },
      { isStatic: true }
    ),
    new Block(
      world,
      { x: 400, y: 500, w: 10, h: 10, color: 'white', image: backpack },
      { isStatic: true }
    ),
    new Block(
      world,
      { x: 600, y: 500, w: 10, h: 10, color: 'white', image: tent },
      { isStatic: true }
    )
  ]

  hobbyObjectsIsClicked = [false, false, false, false, false, false];

  // run the engine
  Matter.Runner.run(engine);
}

function mousePressed() {
  if (magnet.isMouseOver()) {
    hobbyObjectsIsClicked[hobbyObjectsIdx] = true;
    if (hobbyObjectsIdx < hobbyObjects.length - 1) {
      console.log(hobbyObjectsIdx);
      hobbyObjectsIdx++;
    }
    
  }
  
}

function draw() {
  background(0);
  image(bg, 0, 0, width, height);

  if (mouseIsPressed) {
    // smoothly move the attractor body towards the mouse
    Matter.Body.translate(magnet.body, {
      x: (mouseX - magnet.body.position.x) * 0.03,
      y: (mouseY - magnet.body.position.y) * 0.03
    });
  }



  magnet.attract();
  magnet.draw();
  for(i=0; i<hobbyObjects.length; i++){
    if(hobbyObjectsIsClicked[i]){
      hobbyObjects[i].draw();
  }
  }
  
  boxes.draw();
  //mouse.draw();
}
