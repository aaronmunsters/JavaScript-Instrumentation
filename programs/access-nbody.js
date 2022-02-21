// From The Computer Language Benchmarks Game
// http://benchmarksgame.alioth.debian.org
let SOLAR_MASS = (4.0 * Math.PI * Math.PI);
let DAYS_PER_YEAR = 365.24;
let Body = /** @class */ (function () {
    function Body(x, y, z, vx, vy, vz, mass) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.vx = vx;
        this.vy = vy;
        this.vz = vz;
        this.mass = mass;
    }
    Body.prototype.offsetMomentum = function (px, py, pz) {
        this.vx = -px / SOLAR_MASS;
        this.vy = -py / SOLAR_MASS;
        this.vz = -pz / SOLAR_MASS;
        return this;
    };
    return Body;
}());
function Sun() {
    return new Body(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, SOLAR_MASS);
}
function Jupiter() {
    return new Body(4.8414314424647209, -1.16032004402742839, -1.03622044471123109e-1, 1.66007664274403694e-3 * DAYS_PER_YEAR, 7.69901118419740425e-3 * DAYS_PER_YEAR, -6.90460016972063023e-5 * DAYS_PER_YEAR, 9.54791938424326609e-4 * SOLAR_MASS);
}
function Saturn() {
    return new Body(8.34336671824457987, 4.12479856412430479, -4.03523417114321381e-1, -2.76742510726862411e-3 * DAYS_PER_YEAR, 4.99852801234917238e-3 * DAYS_PER_YEAR, 2.30417297573763929e-5 * DAYS_PER_YEAR, 2.85885980666130812e-4 * SOLAR_MASS);
}
function Uranus() {
    return new Body(1.2894369562139131e1, -1.51111514016986312e1, -2.23307578892655734e-1, 2.96460137564761618e-3 * DAYS_PER_YEAR, 2.3784717395948095e-3 * DAYS_PER_YEAR, -2.96589568540237556e-5 * DAYS_PER_YEAR, 4.36624404335156298e-5 * SOLAR_MASS);
}
function Neptune() {
    return new Body(1.53796971148509165e1, -2.59193146099879641e1, 1.79258772950371181e-1, 2.68067772490389322e-3 * DAYS_PER_YEAR, 1.62824170038242295e-3 * DAYS_PER_YEAR, -9.5159225451971587e-5 * DAYS_PER_YEAR, 5.15138902046611451e-5 * SOLAR_MASS);
}
let NBodySystem = /** @class */ (function () {
    function NBodySystem(bodies) {
        this.bodies = bodies;
        let px = 0.0;
        let py = 0.0;
        let pz = 0.0;
        let size = bodies.length;
        for (let i = 0; i < size; ++i) {
            let b = bodies[i];
            let m = b.mass;
            px += b.vx * m;
            py += b.vy * m;
            pz += b.vz * m;
        }
        bodies[0].offsetMomentum(px, py, pz);
    }
    NBodySystem.prototype.advance = function (dt) {
        let bodies = this.bodies;
        let size = bodies.length;
        // let buffer = changetype<usize>(bodies.buffer_);
        for (let i = 0; i < size; ++i) {
            let bodyi = bodies[i];
            // let bodyi = load<Body>(buffer + i * sizeof<Body>(), 8);
            let ix = bodyi.x;
            let iy = bodyi.y;
            let iz = bodyi.z;
            let bivx = bodyi.vx;
            let bivy = bodyi.vy;
            let bivz = bodyi.vz;
            let bodyim = bodyi.mass;
            for (let j = i + 1; j < size; ++j) {
                let bodyj = bodies[j];
                // let bodyj = load<Body>(buffer + j * sizeof<Body>(), 8);
                let dx = ix - bodyj.x;
                let dy = iy - bodyj.y;
                let dz = iz - bodyj.z;
                let distanceSq = dx * dx + dy * dy + dz * dz;
                let distance = Math.sqrt(distanceSq);
                let mag = dt / (distanceSq * distance);
                let bim = bodyim * mag;
                let bjm = bodyj.mass * mag;
                bivx -= dx * bjm;
                bivy -= dy * bjm;
                bivz -= dz * bjm;
                bodyj.vx += dx * bim;
                bodyj.vy += dy * bim;
                bodyj.vz += dz * bim;
            }
            bodyi.vx = bivx;
            bodyi.vy = bivy;
            bodyi.vz = bivz;
            bodyi.x += dt * bivx;
            bodyi.y += dt * bivy;
            bodyi.z += dt * bivz;
        }
    };
    NBodySystem.prototype.energy = function () {
        let e = 0.0;
        let bodies = this.bodies;
        for (let i = 0, size = bodies.length; i < size; ++i) {
            let bodyi = bodies[i];
            let ix = bodyi.x;
            let iy = bodyi.y;
            let iz = bodyi.z;
            let vx = bodyi.vx;
            let vy = bodyi.vy;
            let vz = bodyi.vz;
            let bim = bodyi.mass;
            e += 0.5 * bim * (vx * vx + vy * vy + vz * vz);
            for (let j = i + 1; j < size; ++j) {
                let bodyj = bodies[j];
                let dx = ix - bodyj.x;
                let dy = iy - bodyj.y;
                let dz = iz - bodyj.z;
                let distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                e -= (bim * bodyj.mass) / distance;
            }
        }
        return e;
    };
    return NBodySystem;
}());
let system;
function init() {
    system = new NBodySystem([Sun(), Jupiter(), Saturn(), Uranus(), Neptune()]);
}
function step() {
    system.advance(0.01);
    return system.energy();
}
function bench(steps) {
    for (let i = 0; i < steps; ++i)
        system.advance(0.01);
}
function getBody(index) {
    let bodies = system.bodies;
    return index < bodies.length ? bodies[index] : null;
}
function main() {
    init();
    bench(2000);
}

main();
