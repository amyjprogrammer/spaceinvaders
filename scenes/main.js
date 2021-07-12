
const MOVE_SPEED = 200;
const TIME_LEFT = 14;

layers([
  "bg", 'obj', 'ui',
], 'obj');

addLevel([
  "@                        $",
  "@------------            $",
  "@------------            $",
  "@------------            $",
  "@------------            $",
  "@------------            $",
  "@                        $",
  "@                        $",
  "@                        $",
  "@                        $",
  "@                        $",
  "@                        $", 

], {
  width: 30,
  height: 22,
  '-': [sprite('space_invader'), scale(0.7)],
  'x': [sprite('ground'), solid()],
  '@': [sprite('wall'), solid(), 'left-wall'],
  '$': [sprite('wall'), solid(), 'right-wall']
});

const player = add([
  sprite('spaceship'),
  pos(width()/ 2, height()/2),
  origin('center')
]);

keyDown('right', () => {
  player.move(MOVE_SPEED, 0);
});

keyDown('left', () => {
  player.move(-MOVE_SPEED, 0);
});

const score = add ([
  text('0'),
  pos(10,10),
  layer('ui'),
  scale(2),
  {
    value: 0,
  },
]);

const timer = add ([
  text('0'),
  pos(100,10),
  scale(1.5),
  layer('ui'),
  {
    time: TIME_LEFT,
  },
]);

timer.action(() => {
  timer.time -= dt()
  timer.text = timer.time.toFixed(2) 
  if (timer.time <= 0) {
    go('lose', score.value)
  }  
});