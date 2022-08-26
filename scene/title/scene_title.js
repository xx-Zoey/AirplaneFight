class SceneTitle extends XScene {
    constructor(game) {
        super(game)
        game.registerAction('r', function(){
            var s = Scene.new(game)
            game.replaceScene(s)
        })

        var titlebg = XImage.new(game, 'titlebg')
        this.addElement(titlebg)
    }

    draw() {
        super.draw();
        // draw labels
        let context = this.game.context
        context.font = "30px Microsoft YaHei"
        context.fillStyle = "#fff";
        context.fillText('按 R 开始游戏', 75, 260)
    }
}

