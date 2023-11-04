import { createNoise3D } from 'simplex-noise';
import { Vector, Point, Config } from './types';

const perlinX = createNoise3D();
const perlinY = createNoise3D();

export function getForce(x: number, y: number, t: number) {
    const dx = perlinX(x, y, t) * 2 - 1;
    const dy = perlinY(x, y, t) * 2 - 1;
    const magnitude = Math.sqrt(dx * dx + dy * dy) / 10;
    const normalized = { x: dx / magnitude, y: dy / magnitude };
    return normalized as Vector;
}

export function generatePoints(count: number, width: number, height: number) {
    const points: Point[] = [];
    for (let i = 0; i < count; i++) {
        points.push({
            position: {
                x: Math.random() * width,
                y: Math.random() * height,
            },
            velocity: {
                x: 0,
                y: 0,
            }
        });
    }
    return points;
}

export function updatePoint(point: Point, time: number, deltaTime: number, config: Config) {
    const x = point.position.x / config.scale;
    const y = point.position.y / config.scale;
    const t = time * config.simulationSpeed;

    const force = getForce(x, y, t);
    point.velocity.x += force.x * deltaTime / config.pointMass;
    point.velocity.y += force.y * deltaTime / config.pointMass;
    const magnitude = Math.sqrt(point.velocity.x * point.velocity.x + point.velocity.y * point.velocity.y);
    point.velocity.x = point.velocity.x / magnitude * config.pointSpeed;
    point.velocity.y = point.velocity.y / magnitude * config.pointSpeed;

    point.position.x += point.velocity.x * deltaTime;
    point.position.y += point.velocity.y * deltaTime;
    point.position.x = (point.position.x + config.width) % config.width;
    point.position.y = (point.position.y + config.height) % config.height;
}
