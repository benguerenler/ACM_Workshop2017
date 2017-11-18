export class Character {

    public sprite: Phaser.Sprite;
    private cursors: Phaser.CursorKeys;

    private maxSpeed: number = 400;
    private inAir: boolean = false;
    private jumpTimer: number = 0;

    constructor (
        public game: Phaser.Game,
        public physics: Phaser.Physics,
        public x: number,
        public y: number,
        public assetUrl: string
    ) {
        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.sprite = this.game.add.sprite(0, this.game.height, "mushroom");
        this.physics.arcade.enable(this.sprite);
        this.sprite.anchor.setTo(0.1, 0.1);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.setSize(64, 64, 0, 0);
        this.sprite.body.velocity.x = 0;

    }

    preRender() {
    }

    update() {
        if(this.inAir && (this.sprite.body.touching.down || this.sprite.body.blocked.down)) {
            this.inAir = false;
        }

        if (this.cursors.left.isDown){
            if(this.sprite.body.velocity.x > (this.maxSpeed * -1)){
                this.sprite.body.velocity.x -= 20;
            }
        }
        else if (this.cursors.right.isDown){
            if(this.sprite.body.velocity.x < this.maxSpeed){
                this.sprite.body.velocity.x += 20;
            }
        }

        if (this.cursors.up.isDown){
            if(!this.inAir){
                this.inAir = true;
                this.sprite.body.velocity.y = -400;
            }
        }
    }
}
