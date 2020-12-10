/**
 *  SvgGenerator быстро генерирует и отдает элементы, не встроенные в DOM
 *  предназначение: использовать там, где нужно
 *  1. быстро создать какой-то svg-элемент без изменений DOM
 *  2. впихнуть его в другой элемент или DOM
 *
 *  все элементы кроме svg, требуют вставки в svg
 *
 *  svg можно использовать как группу для сборки других элементов
 *  svg можно вставлять в другой svg
 *  svg может иметь x,y (трактуется как расположение в родительском svg, игнорируется в самом верхнем svg)
 *  svg может иметь width, height и viewbox
 *
 *  для установки аттрибутов - attr({x:0,y:0}) с произвольным набором полей
 *
 *  PS: если нужно менять уже созданные элементы в DOM- можно использовать svg.js
 пример
 let element = svgjs.adopt(polygon);
 element.fill('#f06')
 */

const NAME_SPACE = 'http://www.w3.org/2000/svg';
const X_LINK = 'xlink:href';
const X_LINK_NAME_SPACE = 'http://www.w3.org/1999/xlink';

function createElementNS(elName: string): SVGElement {
  return document.createElementNS(NAME_SPACE, elName);
}

export const SvgGenerator = {
  el(elName: string, props?: any): SVGElement {
    const element = createElementNS(elName);
    if (props) this.attr(element, props);
    return element;
  },

  svg(props?: any): SVGElement {
    return this.el('svg', props);
  },

  fromTemplate(template: string): SVGElement {
    let svg = SvgGenerator.svg();
    svg.innerHTML = template.trim();
    if (svg.children.length > 1) {
      console.warn(
        `SvgGenerator fromTemplate WARNING: 
            string template contains more than one element
            -- only FIRST will be generated
            `,
        template,
      );
    }
    return svg.firstChild as SVGElement;
  },

  rect(props?: any): SVGElement {
    return this.el('rect', props);
  },

  // всегда однострочный текст
  text(str: string, props?: any): SVGElement {
    const textEl = this.el('text', props);
    textEl.innerHTML = str;
    return textEl;
  },

  // внешние картинки - размер обязателен, иначе будут нулевые размеры по стандарту
  imageExternal(src: string, width: number = 100, height: number = 100): SVGElement {
    return this.el('image', {
      src: src,
      width: width,
      height: height,
      draggable: false, // отключить ghost image
      // для User-Input придется использовать обертки
      // - что собственно почти всегда и происходит все равно
      'pointer-events': 'none', // отключить ghost image Firefox при draggable
    });
  },

  attr(el: SVGElement, props: any): SVGElement {
    let prop: any;
    Object.keys(props).forEach((key) => {
      prop = props[key];
      if (prop == null) return; // пустые поля не вставляем
      if (key == X_LINK || key == 'src') {
        el.setAttributeNS(X_LINK_NAME_SPACE, X_LINK, prop);
      } else {
        el.setAttribute(key, prop);
      }
    });
    return el;
  },

  // взять координаты клика мышки в координатах svgParent
  getMousePositionCTM(evt: { clientX: number; clientY: number }, svgParent: SVGGraphicsElement) {
    const CTM = svgParent.getScreenCTM();
    return {
      x: (evt.clientX - CTM.e) / CTM.a,
      y: (evt.clientY - CTM.f) / CTM.d,
    };
  },
};

let bufferSvg: SVGElement;
