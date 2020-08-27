import confetti from "canvas-confetti";

const defaults = {
  origin: { y: 0.8 },
};

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const fire = (particleRatio: number, opts: any) => {
  const count = randomInRange(150, 250);
  confetti({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio),
  });
};

export default () => {
  const angle = randomInRange(55, 125);
  const spread = () => randomInRange(50, 250);
  fire(0.25, {
    angle,
    spread: spread(),
    startVelocity: 55,
  });
  fire(0.2, {
    angle,
    spread: spread(),
  });
  fire(0.35, {
    angle,
    spread: spread(),
    decay: 0.91,
  });
  fire(0.1, {
    angle,
    spread: spread(),
    startVelocity: 25,
    decay: 0.92,
  });
  fire(0.1, {
    angle,
    spread: spread(),
    startVelocity: 45,
  });
};
