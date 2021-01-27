import { MyScene } from "./MyScene";

export class MTime {
	public isUpdate: boolean = false;
	private mscene: MyScene = null;
	private _scene: g.Scene = null;
	private _timeLabel: g.Label = null;
	private time = 0;
	private defaltTime = 10;

	constructor(mscene: MyScene, time?: number) {
		this.mscene = mscene;
		this._scene = mscene.getScene();
		this.isUpdate = false;
		if (time !== null) this.time = this.defaltTime;
		this._timeLabel = this.makeTimeLabel();
		// this._timeLabel.textColor = "red";

	}

	public init(): void {
		this.time = this.defaltTime;
	}
	/** カウントダウンスタート */
	public tcntDwnStart(): void {
		this.isUpdate = true;
	}

	public getNowSocondTime(): number {
		return this.time;
	}

	public update(): void {
		if (!this.isUpdate) return;
		// カウントダウン処理
		this.time -= 1 / g.game.fps;
		this._timeLabel.text = "TIME: " + Math.ceil(this.time);
		this._timeLabel.invalidate();
	}

	public getTimeLabel(): g.Label {
		return this._timeLabel;
	}

	private makeTimeLabel(): g.Label {
		return this.mscene.makeLabel(48, "blue");
		// const font = new g.DynamicFont({
		// 	game: g.game,
		// 	fontFamily: "sans-serif",
		// 	size: 48
		// });
		// return new g.Label({
		// 	scene: this._scene,
		// 	text: "tttttttttttttttttttttttttttttt",
		// 	font: font,
		// 	fontSize: font.size / 2,
		// 	textColor: "blue",
		// 	x: 0.65 * g.game.width
		// });

	}
}
