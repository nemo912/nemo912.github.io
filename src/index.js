import Matter from 'matter-js';

const { Engine, Render, Runner, Bodies, Composite, Composites, Mouse, MouseConstraint, Constraint } = Matter;

const engine = Engine.create({
    constraintIterations: 1,
    gravity: {
        scale: .001,
    }
});

const render = Render.create({
    engine: engine,
    element: document.body,

    options: {
        width: 1000,
        height: 500,
        showPerformance: true,
    }
});

const earth = Bodies.rectangle(0, 450, 1500, 10, {isStatic: true});
const lineA = Bodies.rectangle(0, 300, 300, 10, {isStatic: true});
const lineB = Bodies.rectangle(900, 300, 300, 10, { isStatic: true });

const boxA = Bodies.rectangle(800, 100, 60, 60);
const boxB = Bodies.rectangle(920, 100, 60, 60);

const boxesLines = Constraint.create({
    bodyA: boxA,
    bodyB: boxB,
});

const ground = Composites.stack(200, 300, 10, 1, 30, 0, (x, y) => Bodies.rectangle(x, y, 20, 10));
Composites.chain(ground, 0, 0, 0, 0);

const bridgeJointA = Constraint.create({
    bodyA: lineA,
    bodyB: Composite.allBodies(ground)[0],
    pointA: {x: 150, y: 0},
});

const bridgeJointB = Constraint.create({
    bodyA: lineB,
    bodyB: Composite.allBodies(ground)[9],
    pointA: {x: -150, y: 0},
});


const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: {
            visible: false,
        }
    }
});

Composite.add(engine.world, [lineA, lineB, earth, mouseConstraint, ground, bridgeJointA, bridgeJointB, boxA, boxB, boxesLines]);
Render.run(render);
Runner.run(Runner.create(), engine);
