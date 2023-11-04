export type Vector = {
    x: number;
    y: number;
};

export type Point = {
    position: Vector;
    velocity: Vector;
};

export type Config = {
    color: string,
    backgroundColor: string,
    pointCount: number,
    width: number,
    height: number,
    scale: number,
    simulationSpeed: number,
    pointSpeed: number,
    pointMass: number
};