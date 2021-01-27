import { Label } from "@akashic/akashic-engine";
import { IUtil } from "./IUtil";
import { MTime } from "./MTime";
import { GameMainParameterObject, RPGAtsumaruWindow } from "./parameterObject";
import { Player } from "./Player";
import { Shot } from "./Shot";

declare const window: RPGAtsumaruWindow;
export interface IdefPositon {
	defX: number;
	defY: number;
};

export class MyScene implements IUtil {

	public iutil: IUtil = null;

	private scene: g.Scene = null;

	private gmSteat: () => void = null;
	private _assetIds = ["player", "shot", "se", "gameend", "title"];
	private _updateHandler: () => void = null;
	private _onLoadAddHandler: () => void = null;
	private MaxTime: number = 60;
	private _param: GameMainParameterObject = null;

	private cmitime: MTime = null;
	private cplayer: Player = null;
	private cshot: Shot = null;

	private titleSp: g.Sprite = null;
	private endSp: g.Sprite = null;

	constructor(param: GameMainParameterObject) {
		this._param = param;
		this.makeScene();
		this.init();
	}




	public getScene(): g.Scene {
		return this.scene;
	}

	private init(): void {
		// score を初期化
		g.game.vars.gameState = {};
		g.game.vars.gameState.score = 0;
		this.scene.onLoad.add(this.onLoadAddHandler);
		this.scene.onUpdate.add(this.onUpdateAddHandler);
	}
	// private setOnLoadHandler(handler: () => void): void {
	// 	this._onLoadAddHandler = handler;
	// }
	// private setUpdateHandler(handler: () => void): void {
	// 	this._updateHandler = handler;
	// }

	private makeScene(): void {
		this.scene = new g.Scene({
			game: g.game,
			assetIds: this._assetIds
		});
	}

	private onLoadAddHandler = (): void => {
		// var rect = new g.FilledRect({
		// 	scene: this.scene,
		// 	cssColor: "red",
		// 	width: 50,
		// 	height: 50
		// });

		// this.scene.append(rect);
		//
		// プレイヤーを生成します
		this.cplayer = new Player(this);
		this.scene.append(this.cplayer.getSp());
		this.cmitime = new MTime(this);
		// const timeLabel = new MTime(this).getTimeLabel();
		this.scene.append(this.cmitime.getTimeLabel());
		this.cmitime.isUpdate = true;
		this.cmitime.tcntDwnStart();

		this.titleSp = this.makeSprite("title");
		// this.scene.append(tSp);
		this.endSp = this.makeSprite("gameend");
		// this.scene.append(this.endSp);
		// tSp.destroy();
		this.scene.onPointMoveCapture.add((ev) => {
			this.cplayer.setTchMoveEV(ev);
		});
		this.scene.onPointDownCapture.add((ev) => {
			this.cplayer.setTchDownEV(ev);
		});
		this.scene.onPointUpCapture.add((ev) => {
			this.cplayer.setTchUpEV(ev);
		});
		this.gmSteat = this.gmSteatT();
	};

	private onUpdateAddHandler = (): void => {

		this.gmSteat();
		// this.cmitime.isUpdate = true;
		// this.cmitime.update();
		// let time = this.cmitime.getNowSocondTime();

		// this.cplayer.update();
		// if (time <= 0) {
		// 	this.cmitime.isUpdate = false;
		// 	// RPGアツマール環境であればランキングを表示します
		// 	if (this._param.isAtsumaru) {
		// 		const boardId = 1;
		// 		window.RPGAtsumaru.experimental.scoreboards.setRecord(boardId, g.game.vars.gameState.score).then(function () {
		// 			window.RPGAtsumaru.experimental.scoreboards.display(boardId);
		// 		});
		// 	}
		// 	this.scene.onUpdate.remove(this.onUpdateAddHandler); // カウントダウンを止めるためにこのイベントハンドラを削除します
		// }
		// // カウントダウン処理
		// // this.time -= 1 / g.game.fps;
		// // timeLabel.text = "TIME: " + Math.ceil(this.time);
		// // timeLabel.invalidate();
		// //
		// // this.cmitime.update();
	};

	private gmSteatT(): () => void {
		// let tSp = this.makeSprite("title");
		this.scene.append(this.titleSp);
		return () => {
			//
			// const tSp = this.makeSprite("title");
			this.scene.setTimeout(() => {
				this.scene.remove(this.titleSp);
				this.gmSteat = this.gmSteatM();
				// if (!tSp.destroyed()) tSp.destroy();


			}, 1000);

		};
	}

	private gmSteatM(): () => void {
		this.cplayer.isUpdate = true;
		this.cmitime.init();
		this.cmitime.isUpdate = true;

		return () => {
			//
			this.cmitime.isUpdate = true;
			this.cmitime.update();
			let time = this.cmitime.getNowSocondTime();

			this.cplayer.update();
			if (time <= 0) {
				this.cmitime.isUpdate = false;
				// RPGアツマール環境であればランキングを表示します
				if (this._param.isAtsumaru) {
					const boardId = 1;
					window.RPGAtsumaru.experimental.scoreboards.setRecord(boardId, g.game.vars.gameState.score).then(function () {
						window.RPGAtsumaru.experimental.scoreboards.display(boardId);
					});
				}
				// this.scene.onUpdate.remove(this.onUpdateAddHandler); // カウントダウンを止めるためにこのイベントハンドラを削除します
				this.gmSteat = this.gmSteatE();
			}
			// カウントダウン処理
			// this.time -= 1 / g.game.fps;
			// timeLabel.text = "TIME: " + Math.ceil(this.time);
			// timeLabel.invalidate();
			//
			// this.cmitime.update();
		};
	}

	private gmSteatE(): () => void {
		const btnRt = this.makeRect(100, 64, "blue");
		btnRt.x = 1000;
		btnRt.y = 600;
		this.scene.append(btnRt);
		const btnLabel = this.makeLabel(64, "red");
		btnLabel.text = "retry";
		btnLabel.x = 0;
		btnLabel.y = 0;
		btnLabel.invalidate();
		btnRt.append(btnLabel);
		btnRt.touchable = true;
		this.scene.append(this.endSp);
		this.cplayer.isUpdate = false;
		return () => {
			//
			// this.scene.setTimeout(() => {
			// 	this.scene.remove(this.endSp);
			// 	this.gmSteat = this.gmSteatT();
			// 	this.scene.remove(btnRt);
			// }, 1000);
			btnRt.onPointDown.add(() => {
				this.scene.remove(this.endSp);
				this.gmSteat = this.gmSteatT();
				this.scene.remove(btnRt);

			});

		};
	}






	// eslint-disable-next-line @typescript-eslint/member-ordering
	public makeLabel(size?: number, color?: string): g.Label {
		const font = new g.DynamicFont({
			game: g.game,
			fontFamily: "sans-serif",
			size: 48
		});
		return new g.Label({
			scene: this.scene,
			text: "ssssssssssssssssssssssssssss",
			font: font,
			fontSize: size / 2,
			textColor: color,
			x: 0.65 * g.game.width
		});

	}
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public makeSprite(spString: string): g.Sprite {
		const spImageAsset = this.scene.asset.getImageById(spString);

		const sp = new g.Sprite({

			scene: this.scene,
			src: spImageAsset,
			width: spImageAsset.width,
			height: spImageAsset.height
		});
		return sp;
	}
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public makeRect(widh: number, height: number, color: string): g.FilledRect {
		const rect = new g.FilledRect({
			scene: this.scene,
			cssColor: color,
			width: widh,
			height: height
		});
		return rect;
	}
}
