class Bullet extends XImage {
    constructor(game, a) {
        super(game,'bullet')
        this.setup()

    }
    static new(game) {
        return new this(game)
    }

    setup() {
        // 子弹的速度
        this.speed = config.bullet_speed
        this.up = true
    }

    update() {
        // 子弹向上移动
        if(this.up) {
            this.y -= this.speed
        } else {
            this.y += this.speed
        }
        return this.y
    }
}
