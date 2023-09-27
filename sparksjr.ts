
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
    export function addFire(thisImg: Image) {
        firePit = sprites.create(thisImg, SpriteKind.Player)
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
    //% blockId=ctrlonB block="on `ICON.b-button-white`"
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