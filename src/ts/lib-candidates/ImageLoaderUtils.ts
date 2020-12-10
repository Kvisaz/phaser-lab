export class ImageLoaderUtils {
  /**
   * @method loadWithXhr - load image from network with standard Phaser loader
   * @param scene
   * @param url
   *
   * @return string url as texture key
   */
  static async loadWithXhr(scene: Phaser.Scene, url: string): Promise<string> {
    return new Promise<string>((resolve) => {
      const loader = scene.load.image(url);
      loader.on(Phaser.Loader.Events.FILE_KEY_COMPLETE, () => {
        resolve(url);
      });
      if (!loader.isLoading()) loader.start();
    });
  }

  /**
   * @method loadWithoutXhr - load image from network with Image blob,
   * useful when CORS setup is annoying or for local loading
   * @param scene
   * @param url
   *
   * @return string url as texture key
   */
  static async loadWithoutXhr(scene: Phaser.Scene, url: string): Promise<string> {
    return new Promise<string>((resolve) => {
      const htmlImageElement = new Image();
      htmlImageElement.crossOrigin = 'anonymous';
      htmlImageElement.addEventListener('load', (e) => {
        scene.textures.addImage(url, htmlImageElement);
        resolve(url);
      });
      htmlImageElement.src = url;
    });
  }

  /**
   * @method loadRemote - load image from network
   * @param scene
   * @param url
   * @param xhr - if true, use Phaser Loader, if false - use html Image
   */
  static async loadRemote(scene: Phaser.Scene, url: string, xhr = true): Promise<string> {
    if (scene.sys.textures.exists(url)) return url; // check already loaded
    if (xhr) return ImageLoaderUtils.loadWithXhr(scene, url);
    else return ImageLoaderUtils.loadWithoutXhr(scene, url);
  }
}
