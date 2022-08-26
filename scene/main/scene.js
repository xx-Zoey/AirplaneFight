const config = {
    player_speed: 10,
    cloud_speed: 1,
    enemy_speed: 5,
    bullet_speed: 5,
    fire_cooldown: 3,
}

const randomBetween = function (start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

class Scene extends XScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        var game = this.game

        // 敌人数量
        this.numberOfEnemies = 12

        this.bg = XImage.new(game, 'sky')
        this.cloud = Cloud.new(game, 'cloud')

        // 初始飞机位置
        this.player = Player.new(game)
        this.player.x = 200
        this.player.y = 200


        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)

        this.bullet = Bullet.new(game, 'bullet')

        // add
        this.addEnemies()

    }
    // 画敌机
    addEnemies() {
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }

    // 键盘按下的动作
    setupInputs() {
        var g = this.game
        var s = this
        g.registerAction('a', function(){
            s.player.moveLeft()
        })
        g.registerAction('d', function(){
            s.player.moveRight()
        })
        g.registerAction('w', function(){
            s.player.moveUp()
        })
        g.registerAction('s', function(){
            s.player.moveDown()
        })
        g.registerAction('j', function(){
            s.player.fire()
            // 每次点击都让子弹的发射位置在飞机的位置开始发射
            s.bullet.x = s.player.x
            s.bullet.y = s.player.y
        })
    }

    update() {
        super.update()

        // 判断 我机 和 敌机 碰撞
        for (let i = 0; i < this.enemies.length; i++) {
            let enemy = this.enemies[i]
            if (enemy.collide(this.player)) {
                let end = SceneEnd.new(this.game)
                this.game.replaceScene(end)
            }
        }

        // 判断 敌机子弹 和 我机 碰撞
        let player = this.player
        for (let i = 0; i < this.enemies.length; i++) {
            let enemy = this.enemies[i]
            if (player.collide(enemy.bullet)) {
                let x = player.x
                let y = player.y
                player.kill()
                let end = SceneEnd.new(this.game)
                this.game.replaceScene(end)

            }
        }

        // 判断 我机子弹 和 敌机 碰撞
        if (this.bullet.update() > 0) {
            for (let i = 0; i < this.enemies.length; i++) {
                let enemy = this.enemies[i]
                if (enemy.collide(this.bullet)) {
                    let x = enemy.x
                    let y = enemy.y
                    let ps = XParticleSystem.new(this.game)
                    ps.x = x
                    ps.y = y
                    this.addElement(ps)
                    enemy.kill()
                }
            }
        }
    }

    draw() {
        super.draw();
    }
}