import { MyScene } from "./MyScene";
import { GameMainParameterObject, RPGAtsumaruWindow } from "./parameterObject";
// import { Player } from "./Player";
// import { Shot } from "./Shot";

declare const window: RPGAtsumaruWindow;

export function main(param: GameMainParameterObject): void {
	// const scene = new g.Scene({
	// 	game: g.game,
	// 	// このシーンで利用するアセットのIDを列挙し、シーンに通知します
	// 	assetIds: ["player", "shot", "se", "gameend"]
	// });
	// let time = 60; // 制限時間
	// if (param.sessionParameter.totalTimeLimit) {
	// 	time = param.sessionParameter.totalTimeLimit; // セッションパラメータで制限時間が指定されたらその値を使用します
	// }
	// // 市場コンテンツのランキングモードでは、g.game.vars.gameState.score の値をスコアとして扱います
	// g.game.vars.gameState = { score: 0 };
	// scene.onLoad.add(() => {
	// 	// ここからゲーム内容を記述します

	// 	// 各アセットオブジェクトを取得します
	// 	// const playerImageAsset = scene.asset.getImageById("player");
	// 	// const shotImageAsset = scene.asset.getImageById("shot");
	// 	// const seAudioAsset = scene.asset.getAudioById("se");

	// 	// プレイヤーを生成します
	// 	// const pplayer = new Player(scene);
	// 	// let px: number = 0;
	// 	// let py: number = 0;
	// 	// フォントの生成
	// 	const font = new g.DynamicFont({
	// 		game: g.game,
	// 		fontFamily: "sans-serif",
	// 		size: 48
	// 	});

	// 	// スコア表示用のラベル
	// 	const scoreLabel = new g.Label({
	// 		scene: scene,
	// 		text: "SCORE: 0",
	// 		font: font,
	// 		fontSize: font.size / 2,
	// 		textColor: "black"
	// 	});
	// 	scene.append(scoreLabel);

	// 	// 残り時間表示用ラベル
	// 	const timeLabel = new g.Label({
	// 		scene: scene,
	// 		text: "TIME: 0",
	// 		font: font,
	// 		fontSize: font.size / 2,
	// 		textColor: "black",
	// 		x: 0.65 * g.game.width
	// 	});
	// 	scene.append(timeLabel);

	// 	// 画面をタッチしたとき、SEを鳴らします
	// 	// scene.onPointMoveCapture.add((ev) => {
	// 	// 	// 制限時間以内であればタッチ1回ごとにSCOREに+1します
	// 	// 	if (time > 0) {
	// 	// 		g.game.vars.gameState.score++;
	// 	// 		scoreLabel.text = "SCORE: " + g.game.vars.gameState.score;
	// 	// 		scoreLabel.invalidate();
	// 	// 	}
	// 	// 	// seAudioAsset.play();


	// 	// 	// px = (ev.point.x + ev.startDelta.x);
	// 	// 	// py = (ev.point.y + ev.startDelta.y);
	// 	// 	// pplayer.getSp().x = px;
	// 	// 	// pplayer.getSp().y = py;


	// 	// });
	// 	const updateHandler = (): void => {
	// 		// if (time <= 0) {
	// 		// 	// RPGアツマール環境であればランキングを表示します
	// 		// 	if (param.isAtsumaru) {
	// 		// 		const boardId = 1;
	// 		// 		window.RPGAtsumaru.experimental.scoreboards.setRecord(boardId, g.game.vars.gameState.score).then(function() {
	// 		// 			window.RPGAtsumaru.experimental.scoreboards.display(boardId);
	// 		// 		});
	// 		// 	}
	// 		// 	scene.onUpdate.remove(updateHandler); // カウントダウンを止めるためにこのイベントハンドラを削除します
	// 		// }
	// 		// カウントダウン処理
	// 		// time -= 1 / g.game.fps;
	// 		// timeLabel.text = "TIME: " + Math.ceil(time);
	// 		// timeLabel.invalidate();
	// 		//

	// 	};
	// 	scene.onUpdate.add(updateHandler);
	// 	// ここまでゲーム内容を記述します
	// });
	const scene: g.Scene = new MyScene(param).getScene();
	g.game.pushScene(scene);
}
