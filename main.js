var __main = function() {
    var images = {
        sky: 'img/sky.png',
        cloud: 'img/cloud.png',
        player: 'img/player.png',
        enemy0:'img/enemy0.png',
        enemy1:'img/enemy1.png',
        bullet:'img/bullet.png',
        fire:'img/fire.png',
        titlebg:'img/titlebg.png',
    }
    var game = XGame.instance(30, images, function(g){
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })
}

__main()
