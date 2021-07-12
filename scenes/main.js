
const MOVE_SPEED = 200;
const TIME_LEFT = 45;
const INVADER_SPEED = 150;
let CURRENT_SPEED = INVADER_SPEED;
const LEVEL_DOWN = 200;
const BULLET_SPEED = 400;

layers([
  "bg", 'obj', 'ui',
], 'obj');

addLevel([
  "@                    $",
  "@------------        $",
  "@------------        $",
  "@------------        $",
  "@------------        $",
  "@------------        $",
  "@                    $",
  "@                    $",
  "@                    $",
  "@                    $",
  "@                    $",
  "@                    $", 
  "@                    $", 
  

], {
  width: 30,
  height: 22,
  '-': [sprite('space_invader'), scale(0.7),'space_invader'],
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

function spawnBullet(p) {
  add([
    rect(6,18), 
    pos(p), 
    origin('center'),
    color(0.5, 0.5, 1),
    'bullet'
  ])
};

keyPress('space', () => {
  spawnBullet(player.pos.add(0,-25))
});

action('bullet', (b) => {
  b.move(0,-BULLET_SPEED)
  if (b.pos.y < 0) {
    destroy(b)
  }
});

collides('bullet', 'space_invader', (b,s) => {
  destroy(b)
  destroy(s)
  score.value ++
  score.text = score.value
  camShake(1)
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
    go('lose', {score: score.value})
  }  
});

action('space_invader', (s) => {
  s.move(CURRENT_SPEED, 0)
});

collides('space_invader', 'right-wall', () => {
  CURRENT_SPEED = -INVADER_SPEED
  every('space_invader', (s) => {
    s.move(0, LEVEL_DOWN)
  })
});

collides('space_invader', 'left-wall', () => {
  CURRENT_SPEED = INVADER_SPEED
  every('space_invader', (s) => {
    s.move(0, LEVEL_DOWN)
  })
});

player.overlaps('space_invader', () => {
  go('lose', {score: score.value})
});

action('space_invader', (s) => {
  if(s.pos.y >= height()/2) {
    go('lose', {score: score.value})
  }
});