class Player extends XImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }

    setup() {
        this.speed = 5
        this.cooldown = 0
        this.alive = true
    }

    update() {
        this.speed = config.player_speed
        // 冷却时间
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }

    fire() {
        if (this.cooldown === 0) {
            // 控制几帧以后发射
            this.cooldown = config.fire_cooldown
            // 子弹发射的位置
            var x = this.x + this.w / 2.4
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
    }

    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }

    kill() {
        this.alive = false
        this.x = 700
        this.y = 700
    }

    collide(b) {
        return  this.alive && (rectIntersects(this, b) || rectIntersects(b, this))
    }
}
