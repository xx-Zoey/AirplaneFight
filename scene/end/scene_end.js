class SceneEnd extends XScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function(){
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })

        var titlebg = XImage.new(game, 'titlebg')
        this.addElement(titlebg)
    }
    draw() {
        super.draw();
        // draw labels
        let context = this.game.context
        context.font = "25px Microsoft YaHei"
        context.fillStyle = "#fff";
        context.fillText('游戏结束', 130, 245)
        context.fillText('按 K 返回开始界面', 80, 280)
    }
}
