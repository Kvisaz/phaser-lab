type IButtonAble = Phaser.GameObjects.Image
    | Phaser.GameObjects.Sprite
    | Phaser.GameObjects.Container
    | Phaser.GameObjects.Text
    | Phaser.GameObjects.Shape;

export class ButtonFabric {

    /**
     * @method просто создай кнопку из любого объекта
     * @param object {IButtonAble} - картинка, контейнер, шейп
     * @param onClick {Function} - функция по нажатию
     *
     *  примеры
     *
     *  const rect = this.add.rectangle(100,20,200,25, ColorUtils.cssToNumber('#e80fa9'));
     rect.setOrigin(0,0);
     ButtonFabric.makeButton(rect, ()=> console.log('rect button'));

     const text = this.add.text(100, 200, 'Hello Button', {
                fontFamily: 'Open Sans, Roboto',
                fontSize: 24,
                color: '#e80fa9'
            });
     text.setOrigin(0,0);
     ButtonFabric.makeButton(text, ()=> console.log('text button'));
     */
    static makeButton(object: IButtonAble, onClick: Function) {
        // @ts-ignore
        const scene = object.scene;

        object.setInteractive({
            cursor: 'pointer'
        });

        const Y = object.y;
        const SCALE = object.scale;
        const SCALE_OVER = object.scale * 1.08;
        let tween: Phaser.Tweens.Tween;

        object.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            tween?.resetTweenData(false);

            tween = scene.tweens.add({
                targets: object,
                props: {scaleX: SCALE_OVER, scaleY: SCALE_OVER},
                duration: 50,
            });
        });

        object.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            tween?.resetTweenData(false);

            tween = scene.tweens.add({
                targets: object,
                props: {scaleX: SCALE, scaleY: SCALE},
                duration: 50,
            });
        });

        object.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            tween?.resetTweenData(false);
            tween = scene.tweens.add({
                targets: object,
                props: {y: Y + 5},
                duration: 50,
            });
        });

        object.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
            tween?.resetTweenData(false);
            tween = scene.tweens.add({
                targets: object,
                props: {y: Y},
                duration: 50,
                onComplete: (tween1, targets) => {
                    onClick();
                }
            });
        })
    }

    /**
     * @method просто создай переключаемую кнопку из двух любых объектов
     * @param objectOn {IButtonAble} - объект для состояния on
     * @param objectOff {IButtonAble} - объект для состояния off
     * @param onClick {Function} - функция по нажатию, получает аргумет isOn (true/false)
     *
     *  примеры
     *
     *  const rect = this.add.rectangle(100,20,200,25, ColorUtils.cssToNumber('#e80fa9'));
     rect.setOrigin(0,0);
     ButtonFabric.makeButton(rect, ()=> console.log('rect button'));

     const text = this.add.text(100, 200, 'Hello Button', {
                fontFamily: 'Open Sans, Roboto',
                fontSize: 24,
                color: '#e80fa9'
            });
     text.setOrigin(0,0);
     ButtonFabric.makeButton(text, ()=> console.log('text button'));
     */
    static makeSwitch(objectOn: IButtonAble, objectOff: IButtonAble, onClick: ISwitchCallback) {

        let isOn = true;

        function switchButton() {
            isOn = !isOn;
            objectOn.setVisible(isOn);
            objectOff.setVisible(!isOn);
            onClick(isOn);
        }

        // инициализируем состояние и видимость
        objectOn.setVisible(isOn);
        objectOff.setVisible(!isOn)

        ButtonFabric.makeButton(objectOn, () => {
            switchButton();
        });

        ButtonFabric.makeButton(objectOff, () => {
            switchButton();
        });
    }
}

// интерфейс функции
export interface ISwitchCallback {
    (isOn: boolean): any
}