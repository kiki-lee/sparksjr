
//% color=#774518
//% icon="\uf06d"
//% blockGap=8 block="Sparks"
//% groups='["Sprite", "Game", "Controller", "Score"]'
namespace sparksjr {

    export let firePit: Sprite = null
    export let scoreText = textsprite.create("", 15, 1)

    /**
    * Adds kindling to the correct place
    */
    //% blockId=set_kindling_sprite
    //% block="add `ICON.stick-pile`"
    //% thisImg.defl=sparks.pile1
    //% thisImg.shadow=screen_image_picker
    //% group="Sprite"
    //% help=github:docs/set_kindling_sprite
    export function addFire() {
        firePit = sprites.create(img`
.............1............
............1e1...........
...........1ef1...........
.......11..1ef1...........
......1ef1.1ef1...........
.......1ef11ef1...........
.......1eef1efe1..........
........1ef1eee11.........
.......11eefee11e1........
......1e1eeeff1ef111......
.......1e1eeffef11ef1.....
.......1e1fffff1eef1......
........1ffeefeeff1.......
........1feefeefe1........
.......1eeef1eff1.........
......1eeffeefef1.........
.....1eef11ffeeef1........
..1111ef11fee1eeef1.......
.1eeeff1efeeee1fef1111....
.1eeeeeffffe1ee1eefeee1...
..11eeffefeffffeeeefff1...
..1eff1e1eeeeeeffffe11....
.1ffeeeeeefffffeeeeff11...
1eeeeefffffffffffeeeeff1..
.fefffffff.......ffffeef..
..ffff...............ff...
`, SpriteKind.Player)
        firePit.setPosition(70, 80)
    }


    /**
    * Special lose sequence
    */
    //% blockId=set_kindling_lose
    //% block="game over `ICON.frown-open-white`"
    //% group="Game"
    //% help=github:docs/set_kindling_lose
    export function fireLoss() {
        game.setGameOverPlayable(false, music.createSoundEffect(WaveShape.Noise, 4173, 1026, 100, 0, 800, SoundExpressionEffect.Warble, InterpolationCurve.Curve), false)
        game.gameOver(false)
    }


    /**
    * Special win sequence
    */
    //% blockId=set_kindling_win
    //% block="game over `ICON.smile-beam-white`"
    //% group="Game"
    //% help=github:docs/set_kindling_win
    export function fireWin() {
        game.setGameOverEffect(true, effects.blizzard)
        game.setGameOverScoringType(game.ScoringType.LowScore)
        info.setScore(stopwatch.getTimerValue(stopwatch.TimerGran.Tenths))
        game.gameOver(true)
    }

    /**
     * Register code run when a controller event occurs
    * @param event
    * @param handler
    */
    //% weight=99 blockGap=8
    //% blockId=ctrlonB block="on `ICON.b-button-white-invert`"
    //% group="Controller"
    //% color=#512e0e
    //% help=docs/on-b
    export function onB(handler: () => void) {
        controller.B.onEvent(ControllerButtonEvent.Pressed, handler)
    }



    /**
    * Overrides the normal score UI with an iconified version
    */
    //% blockId=set_score_override
    //% block="set `ICON.fire` to $thisScore"
    //% thisScore.defl=0
    //% group="Score"
    //% help=github:docs/set_score_override
    export function setScoreOverride(thisScore: number) {
        info.setScore(thisScore)
        sparksjr.scoreText.setText(" x " + convertToText(info.score()))
        scoreText.setIcon(img`
. . . . . 4 . . . . 
. . . 4 . 4 4 . . . 
. . . . . 4 4 . 4 . 
. . 4 . 4 4 4 4 4 . 
. 4 4 4 4 5 4 4 . . 
. 4 4 4 4 5 5 4 4 4 
4 4 4 5 5 5 5 4 4 4 
4 4 4 5 5 d 5 5 4 4 
4 4 5 d d d 5 5 4 4 
. 4 5 d d d d 5 4 . 
. . 4 5 d d 5 4 4 . 
. . . 4 4 4 4 . . . 
`)

        //scoreText.setBorder(1, 3, 1)
        scoreText.setMaxFontHeight(9)
        scoreText.right = 160
        scoreText.top = 1
        scoreText.update()
        info.showScore(false)
    }


    /**
    * Changes the score and overrides the traditional UI
    * with an iconified version
    */
    //% blockId=change_fire_override
    //% block="change `ICON.fire` by $thisScore"
    //% thisScore.defl=1
    //% group="Score"
    //% help=github:docs/change_fire_override
    export function changeScoreOverride(thisScore: number) {
        info.changeScoreBy(thisScore)
        sparksjr.setScoreOverride(info.score())
        if (thisScore >= 0) {
            firePit.startEffect(effects.fire, 500)
        } else {
            firePit.startEffect(effects.blizzard, 100)
        }
    }

    /**
     * Runs code once each time 🔥 reaches a given value. This will also
     * run if the score "passes" the given value in either direction without ever
     * having the exact value (e.g. if score is changed by more than 1)
     *
     * @param score the score to fire the event on
     * @param handler code to run when the score reaches the given value
     */
    //% blockId=gameonscore2
    //% block="on `ICON.fire` $score"
    //% score.defl=100
    //% help=docs/on_score
    //% color=#512e0e
    //% group="Score"
    export function onScore(score: number, handler: () => void) {
        info.player1.impl.onScore(score, handler);
    }

}

namespace stopwatch {
    /**
     * Starts stopwatch for kids pointbased games in tenths
     */
    //% blockId=stopwatch_jr
    //% block="start `ICON.stopwatch-0-white`"
    //% help=docs/stopwatch_jr
    export function stopJr() {
        stopwatch.startTimer(stopwatch.TimerType.Tens)
    }
}

namespace scene {
    /**
     * Sets the background with fewer words
     */
    //% blockId=set_bg
    //% block="set scene $thisBG"
    //% thisBG.shadow=background_image_picker
    //% help=docs/set_bg
    export function setBG(thisBG:Image) {
        scene.setBackgroundImage(thisBG)
    }
}

namespace game {
    /**
     * Run code on an interval of time. This executes before game.onUpdate()
     * @param body code to execute
     */
    //% group="Gameplay"
    //% help=game/on-update-interval weight=99 afterOnStart=true
    //% blockId=gameinterval3 block="every $period second(s)"
    //% period.defl=1
    //% blockAllowMultiple=1
    export function onUpdateInterval3(period: number, a: () => void): void {
        period = period * 1000;
        if (!a || period < 0) return;
        let timer = 0;
        game.eventContext().registerFrameHandler(scene.UPDATE_INTERVAL_PRIORITY, () => {
            const time = game.currentScene().millis();
            if (timer <= time) {
                timer = time + period;
                a();
            }
        });
    }
}