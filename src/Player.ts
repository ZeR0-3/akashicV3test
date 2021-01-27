import { PointDownEvent, PointMoveEvent, PointUpEvent } from "@akashic/akashic-engine";
import { IdefPositon, MyScene } from "./MyScene";
import { Shot } from "./Shot";

export class Player {
	// 後で定数の処理に変更する予定
	public defPos: IdefPositon = {defX: 640, defY: 360};
	/** デバグ用のラベル */
	public dbTxtLabel: g.Label = null;
	/** アップデートフラグ */
	public isUpdate: boolean = false;
	/** スプライト速度 */
	private speed: number = 1;
	private tcont = 0;
	/** g.gameオリジナルシーン */
	private scene: g.Scene = null;
	/** 自分用MyScene */
	private mscene: MyScene = null;
	/** 自機のスプライト */
	private sp: g.Sprite = null;
	/** 当たり判定用レクト */
	private rc: g.FilledRect = null;

	/** shot配列 */
	private arrShot: Shot[] = [];
	private vx: number = 0;
	private vy: number = 0;
	private dx: number = 0;
	private dy: number = 0;
	/** タッチイベント関係 */
	private scTchMoveEV: PointMoveEvent = null;
	private scTchDownEV: PointDownEvent = null;
	private scTchUpEV: PointUpEvent = null;

	private isDownEvnt: boolean = false;
	private isUpEvnt: boolean = false;
	private isMoveEvnt: boolean = false;


	constructor(scene: MyScene) {
		this.mscene = scene;
		this.scene = scene.getScene();
		this.spInit();
		this.rc = this.mscene.makeRect(this.sp.width, this.sp.height, "red");
		this.rc.opacity = .3;
		this.sp.append(this.rc);
	}
	public getSp(): g.Sprite {
		return this.sp;
	}

	public update(): void {
		this.dbTxtLabel.text = "UP: " + this.isUpEvnt;
		this.dbTxtLabel.invalidate();
	}

	public setTchMoveEV(ev: PointMoveEvent): void {
		this.isMoveEvnt = true;
		if (this.isDownEvnt) {
			this.sp.x += (ev.prevDelta.x);
			this.sp.y += (ev.prevDelta.y);
			// this.isDownEvnt = false;
		}
		// this.isDownEvnt = false;
		// this.sp.x = (ev.point.x + ev.startDelta.x);
		// this.sp.y = (ev.point.y + ev.startDelta.y);
		this.scTchMoveEV = ev;
		// this.vx = (ev.point.x + ev.startDelta.x);
		// this.vy = (ev.point.y + ev.startDelta.y);
		// this.vx = (ev.startDelta.x);
		// this.vy = (ev.startDelta.y);
		// this.sp.x += (ev.prevDelta.x);
		// this.sp.y += (ev.prevDelta.y);


	}
	public setTchDownEV(ev: PointDownEvent): void {
		this.scTchDownEV = ev;
		this.isDownEvnt = true;
		// this.dx = ev.point.x - this.sp.x;
		// this.dy = ev.point.y - this.sp.y;


	}
	public setTchUpEV(ev: PointUpEvent): void {
		this.isUpEvnt = true;
		this.scTchUpEV = ev;
		this.isDownEvnt = false;
		// this.dx = ev.point.x - this.sp.x;
		// this.dy = ev.point.y - this.sp.y;


	}
	private spInit(): void {
		// プレイヤースプライトがなかったら作る
		if (!this.sp) this.sp = this.makeSprite();
		// 位置を初期化
		// this.sp.x = defSp
	}


	// プレイヤーを生成します
	private makeSprite(): g.Sprite {
		const playerImageAsset = this.scene.asset.getImageById("player");
		const player = new g.Sprite({
			scene: this.scene,
			src: playerImageAsset,
			width: playerImageAsset.width,
			height: playerImageAsset.height
		});
		// プレイヤーの初期座標を、画面の中心に設定します
		player.x = (g.game.width - player.width) / 2;
		player.y = (g.game.height - player.height) / 2;

		player.onUpdate.add(() => {
			if (!this.isUpdate) return;

			this.tcont += 1;
			if (this.isDownEvnt) {
				this.dx = 0;
				this.dy = 0;
				// this.isDownEvnt = false;
			}

			// プレイヤーの座標に変更があった場合、 modified() を実行して変更をゲームに通知します
			this.sp.x = Math.max(0, Math.min(this.sp.x, g.game.width - this.sp.width));
			this.sp.y = Math.max(0, Math.min(this.sp.y, g.game.height - this.sp.height));
			player.modified();

			// 玉生成
			if (this.tcont % 30 === 0) {
				this.rc.cssColor = "blue";
				this.rc.modified();
				this.scene.setTimeout(()=> {
					this.rc.cssColor = "red";
					this.rc.modified();

				}, 500);
				this.makeShot();
			}
		});
		/** デバグ用テキスト */
		this.dbTxtLabel = this.mscene.makeLabel(48, "black");
		this.scene.append(this.dbTxtLabel);
		this.dbTxtLabel.text = "test";
		this.dbTxtLabel.x = 200;
		this.scene.append(player);

		return player;
	}


	private getRadian(x2: number, y2: number): number {
		const radian = Math.atan2(y2 - this.sp.y, x2 - this.sp.x);
		return radian;
	}
	private getvxy(rad: number): void {

		const rd = rad;
		this.vx = Math.cos(rd * Math.PI / 180) * this.speed;
		this.vy = Math.sin(rd * Math.PI / 180) * this.speed;

	}


	private makeShot(): void {
		const x = this.sp.x;
		const y = this.sp.y;
		const w = this.sp.width;
		const h = this.sp.height;

		const cshot = new Shot(this.scene, x, y, w, h, this.sp);
		cshot.getSp().tag = "shot";
		cshot.setPSp(this.sp);
	}
}
