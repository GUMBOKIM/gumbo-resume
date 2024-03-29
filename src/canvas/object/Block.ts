import CanvasSquare, {Location} from "./CanvasSquare";
import AudioPlayer from "../../optimization/AudioPlayer";

type Status = 'INITIAL' | 'HIT' | 'EMPTY';

const Sprites: { [key in Status]: number[] } = {
    'INITIAL': [16 * 0, 16 * 1, 16 * 2],
    'HIT': [16 * 3],
    'EMPTY': [16 * 4],
}

class Block extends CanvasSquare {
    status: Status;
    scale: number;

    image: HTMLImageElement;
    timer = 0;

    isCollide = false;
    collideEvent;

    constructor(location: Location, scale: number, context: CanvasRenderingContext2D, collideEvent: () => void) {
        super(location, {width: 16 * scale, height: 16 * scale}, context);
        this.status = 'INITIAL';
        this.scale = scale;
        this.image = new Image();
        this.image.src = './scene/2/block.png'
        this.collideEvent = collideEvent;
    }

    effectCollideBottom() {
        AudioPlayer.play('coin');
        if (!this.isCollide) {
            this.collideEvent();
            this.isCollide = true;
        }
    }

    draw() {
        this.drawSprite();
        this.countTimer();
    }

    private drawSprite() {
        let sx;
        if (this.status === 'INITIAL') {
            sx = Sprites[this.status][Math.floor(this.timer / 20) % 3];
        } else {
            sx = Sprites[this.status][0];
        }
        this.context.drawImage(this.image, sx, 0, 16, 16, this.location.x, this.location.y, 16 * this.scale, 16 * this.scale);
    }

    private countTimer() {
        this.timer++;
        if (this.timer >= 60) {
            this.timer = 0;
        }
    }
}

export default Block;