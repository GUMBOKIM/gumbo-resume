import CanvasSquare, {Location, SquareType} from "./CanvasSquare";

type Direction = 'LEFT' | 'RIGHT'
type XStatus = 'STOP' | 'LEFT' | 'RIGHT';
type YStatus = 'STOP' | 'UP' | 'DOWN';

const Sprites = {
    'STOP': {
        'LEFT': [16 * 13 + 1.5],
        'RIGHT': [16 * 16 + 6],
    },
    'MOVE': {
        'LEFT': [16 * 10 + 4, 16 * 11 + 3.5, 16 * 12 + 2],
        'RIGHT': [16 * 17 + 5, 16 * 18 + 3.5, 16 * 19 + 4],
    },
    'JUMP': {
        'LEFT': [16 * 8 + 0.25],
        'RIGHT': [16 * 21 + 6.5],
    }
}


class Mario extends CanvasSquare {
    scale: number;
    ground: number;

    direction: Direction = 'LEFT';
    xStatus: XStatus = 'STOP';
    yStatus: YStatus = 'STOP';
    jumpMax = 0;

    image: HTMLImageElement;

    tic = 0;

    constructor(location: Location, scale: number, context: CanvasRenderingContext2D) {
        super(location, {width: 16 * scale, height: 16 * scale}, context);
        this.type = 'MOVEABLE';
        this.scale = scale;
        this.ground = this.location.y;
        this.image = new Image();
        this.image.src = './canvas/mario.png'
    }

    keyDown(keyCode: string) {
        switch (keyCode) {
            // Left
            case 'KeyA'  :
            case 'ArrowLeft':
                if (this.xStatus === 'STOP') {
                    if (this.direction === 'RIGHT') this.tic = 0;
                    this.direction = 'LEFT'
                    this.xStatus = 'LEFT';
                }
                break;
            // Right
            case 'KeyD' :
            case 'ArrowRight':
                if (this.xStatus === 'STOP') {
                    if (this.direction === 'LEFT') this.tic = 0;
                    this.direction = 'RIGHT'
                    this.xStatus = 'RIGHT';
                }
                break;
            // Up
            case 'Space' :
                if (this.yStatus === "STOP"){
                    this.jumpMax = this.location.y - this.scale * 60;
                    this.yStatus = 'UP';
                }
                break;
        }
    }

    keyUp(keyCode: string) {
        switch (keyCode) {
            // Left
            case 'KeyA':
            case  'ArrowLeft':
                if (this.xStatus === 'LEFT') this.xStatus = 'STOP';
                break;
            // Right
            case 'KeyD' :
            case 'ArrowRight':
                if (this.xStatus === 'RIGHT') this.xStatus = 'STOP';
                break;
        }
    }

    locate() {
        this.move();
    }

    draw() {
        this.drawSprite();
        this.checkJump();
        this.setTic();
    }

    private move() {
        // X
        switch (this.xStatus) {
            case "LEFT":
                this.location.x -= 3 * this.scale;
                break;
            case "RIGHT":
                this.location.x += 3 * this.scale;
                break;
            default:
                break;
        }
        console.log(this.context.canvas.width, this.location.x);
        if(this.location.x > this.context.canvas.width) this.location.x = this.context.canvas.width;
        if(this.location.x < 0) this.location.x = 0;

        // Y
        switch (this.yStatus) {
            case "UP":
                this.location.y -= 5 * this.scale;
                break;
            case "DOWN":
                this.location.y += 5 * this.scale;
                break;
            default:
                break;
        }
    }

    private drawSprite() {
        let sx;
        if (this.yStatus === 'STOP') {
            if (this.xStatus === 'STOP') sx = Sprites.STOP[this.direction][0];
            else sx = Sprites.MOVE[this.direction][Math.floor(this.tic / 5) % 3];
        } else sx = Sprites.JUMP[this.direction][0];
        this.context.drawImage(this.image, sx, 0, 16, 16, this.location.x, this.location.y, 16 * this.scale, 16 * this.scale);
    }

    private checkJump() {
        switch (this.yStatus) {
            case "UP":
                if (this.location.y <= this.jumpMax) this.yStatus = 'DOWN';
                break;
            case "DOWN":
                if (this.ground <= this.location.y) {
                    this.location.y = this.ground;
                    this.yStatus = 'STOP';
                }
                break;
        }
    }

    private setTic() {
        this.tic++;
        if (this.tic >= 60) {
            this.tic = 0;
        }
    }

    effectCollision() {}

    isCollisionTop(canvasSquare: CanvasSquare): boolean {
        const result = super.isCollisionTop(canvasSquare);
        if(result && this.yStatus === "UP") this.yStatus = "DOWN";
        return result;
    }

    isCollisionBottom(canvasSquare: CanvasSquare): boolean {
        const result = super.isCollisionBottom(canvasSquare);
        if(result && this.yStatus === "DOWN") this.yStatus = "STOP";
        return result;
    }

    isCollisionLeft(canvasSquare: CanvasSquare): boolean {
        const result = super.isCollisionLeft(canvasSquare);
        if(result && this.xStatus === "LEFT") this.xStatus = 'STOP';
        return result;
    }

    isCollisionRight(canvasSquare: CanvasSquare): boolean {
        const result =  super.isCollisionRight(canvasSquare);
        if(result && this.xStatus === 'RIGHT') this.xStatus = 'STOP';
        return result;
    }
}

export default Mario;