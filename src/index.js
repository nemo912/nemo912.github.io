import Matter from 'matter-js';

const engine = Matter.Engine.create();

const render = Matter.Render.create({
    engine: engine,
    element: document.body,
});

const boxA = Matter.Bodies.rectangle(100, 100, 60, 60);
const line = Matter.Bodies.rectangle(0, 300, 300, 1, {isStatic: true});

const part1 = Matter.Bodies.rectangle(300, 100, 60, 60, {isStatic: true});


const bridge = Matter.Composites.stack(200, 100, 3, 1, 30, 0, (x, y) => Matter.Bodies.rectangle(x, y, 60, 60));
Matter.Composite.add(bridge, part1);
Matter.Composites.chain(bridge, 0, 0, 0, 0);

const mouse = Matter.Mouse.create(render.canvas);
const mc = Matter.MouseConstraint.create(engine, { body: null, mouse: mouse });


Matter.Composite.add(engine.world, [boxA, line, bridge, mc]);
Matter.Render.run(render);
Matter.Runner.run(Matter.Runner.create(), engine);
