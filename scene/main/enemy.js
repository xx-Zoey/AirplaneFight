// 敌机
class Enemy extends XImage {
    constructor(game) {
        var type = randomBetween(0, 1)
        var name = 'enemy' + type
        super(game, name)
        this.setup()
    }

    setup() {
        // 随机速度
        this.speed = randomBetween(1, 5)
        // 随机位置
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(1, 180)
        this.alive = true

        var game = this.game

        this.cooldown = 1
        this.bullets = []

        this.bullet = Bullet.new(this.game)
    }

    update() {
        super.update()
        this.speed = 2

        // 敌机的 y 大于 600 就再调用一次 setup
        // 再画一次敌机
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }

        // 冷却时间
        if (this.cooldown > 0) {
            this.cooldown--
        } else if(this.cooldown === 0) {
            // 控制几帧以后发射
            this.cooldown = 100
            // 子弹发射的位置
            // 正中心发射
            var x = this.x + this.w / 2.4
            var y = this.y + this.h - 10
            this.bullet = Bullet.new(this.game)
            this.bullet.up = false
            this.bullet.x = x
            this.bullet.y = y
            this.scene.addElement(this.bullet)
        }

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