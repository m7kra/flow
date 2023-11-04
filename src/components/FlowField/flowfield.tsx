import { useRef, useEffect } from 'react';
import { Point, Config } from './types';
import { updatePoint, generatePoints } from './utils';


export default function FlowField({ config }: { config: Config}) {
    const ref = useRef<HTMLCanvasElement>(null);
    useEffect(() => flowField(ref, config))

    return <canvas ref={ref} width={window.innerWidth} height={window.innerHeight} />;
}

function flowField(ref: React.RefObject<HTMLCanvasElement>, config: Config) {
    const context = ref.current!.getContext('2d')!;

    let time = new Date().getTime() / 1000;
    const points = generatePoints(config.pointCount, config.width, config.height);
    context.fillStyle = config.backgroundColor;
    context.fillRect(0, 0, config.width, config.height);

    const draw = (t: number) => {
        t /= 1000;
        const deltaTime = t - time;
        time = t;

        for (const point of points) {

            updatePoint(point, time, deltaTime, config);
            drawPoint(context, point, config.color);
        }

        requestId = requestAnimationFrame(draw);
    }
    let requestId = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(requestId);
}

function drawPoint(context: CanvasRenderingContext2D, point: Point, color: string) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(point.position.x, point.position.y, 1, 0, 2 * Math.PI);
    context.fill();
}
