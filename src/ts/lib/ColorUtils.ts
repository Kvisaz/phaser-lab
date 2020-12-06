export class ColorUtils {
    /**
     * cssToNumber - преобразует CSS-колор в число для Phaser
     * удобно, чтобы быстро менять цвет
     * @param color '#dedede'
     * @return 0xdedede
     */
    static cssToNumber(color: string):number{
        return parseInt(color.replace('#', '0x'));
    }
}