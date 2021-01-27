export class Shot {
	public id: string = "shot";
	private psp: g.Sprite = null;
	private timeCount: number = 0;
	private speed = 10;
	private vx: number = 0;
	private vy: number = 0;
	private sp: g.Sprite = null;
	private scene: g.Scene = null;
	constructor(scene: g.Scene, x: number, y: number, w: number, h: number, psp?: g.Sprite ) {
		this.scene = scene;
		this.spInit(x, y, w, h);
		if (psp !== null) this.psp = psp; 
		this.update();
	}

	public setPSp(psp: g.Sprite): void {
		this.psp = this.psp;
	}
	public update(): void {
		let shot = this.sp;
		shot.onUpdate.add(() => {
			this.timeCount += 1;
			// 毎フレームで座標を確認し、画面外に出ていたら弾をシーンから取り除きます
			if (shot.x > g.game.width || shot.x < 0) {
				this.vx = -this.vx;

			}
			if (shot.y > g.game.height || shot.y < 0) {
				this.vy = -this.vy;
			}

			// if (this.timeCount % 30 === 0) {



			// 弾を右に動かし、弾の動きを表現します
			shot.x += this.vx;
			shot.y += this.vy;
			// 変更をゲームに通知します
			shot.modified();
			if ( g.Collision.intersectAreas(this.psp, this.sp) ){
				this.sp.opacity = .3;
				this.sp.modified();
			}
			// }
		});

		this.scene.append(shot);

	}

	public getSp(): g.Sprite {
		return this.sp;
	}

	private spInit(x: number, y: number, w: number, h: number): void {
		this.sp = this.makeSprite();
		this.vxyInit();

		if (this.vx > 0 ) {
			this.sp.x = x + w;
		} else {
			this.sp.x = x - this.sp.width;
		}
		if (this.vy > 0 ) {
			this.sp.y = y + h;
		} else {
			this.sp.y = y - this.sp.height;
		}
		// this.sp.x = x;
		// this.sp.y = y;
	}
	private vxyInit(): void {

		const rd = Math.floor(g.game.random.generate() * 360);
		this.vx = Math.cos(rd * Math.PI / 180) * this.speed;
		this.vy = Math.sin(rd * Math.PI / 180) * this.speed;

	}
	private makeSprite(): g.Sprite {
		const shotImageAsset = this.scene.asset.getImageById("shot");
		const shotSp = new g.Sprite({
			scene: this.scene,
			src: shotImageAsset,
			width: shotImageAsset.width,
			height: shotImageAsset.height
		});
		return shotSp;
	}


}
