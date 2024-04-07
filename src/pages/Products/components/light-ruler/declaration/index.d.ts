// 监听的滚动对象
export interface ScrollObject {
    readonly scrollObject: HTMLElement;
}

// export type RulerSize = number; // 标尺宽度: 横向标尺和纵向标尺相同 small/middle/large Todo

// 分辨率
export type Ratio = number[];

// 单位样式
export interface UnitStyle {
    backgroundColor?: string; // 单位背景颜色
    fontColor?: string; // 单位字体颜色
    fontSize?: number; // 单位字体大小
    text?: string; // 单位内容
}

// 标尺默认内部所需样式
export interface RulerInnerStyle {
    size?: number; // 标尺宽度: 横向标尺和纵向标尺相同 small/middle/large Todo
    backgroundColor?: string; // 背景颜色
    fontWeight?: "bold" | "bolder" | number | string; // 字体加粗
    fontColor?: string; // 字体颜色
    fontSize?: number; // 字体大小
    tickColor?: string; // 刻度颜色
    unit?: UnitStyle; // 单位
    gap?: number; // 间隔
    maxSize?: number; // 标尺最尺寸
    maxWidth?: number; // 标尺最大长度
    maxHeight?: number; // 标尺最大高度
    scale?: number; // 缩放比例
    show?: boolean; // 是否显示
    mode?: "center" | "right"; // 展示样式
}

// 标尺绘制所需外部样式
export interface RulerOuterStyle extends RulerInnerStyle {
    mountRef?: HTMLElement;
    wrapperElement?: string | HTMLElement; // 容器id
    width?: number; // 画布宽
    height?: number; // 画布高
    rulerId?: string;
    scrollLeft?: number; // 横向滚动距离
    scrollTop?: number; // 纵向滚动距离
    isInfinite?: boolean; // 是否无限生成
}

// 标尺对象
export interface Ruler {
    mountRef?: HTMLElement; // ruler挂载dom
    wrapperElement?: string | HTMLElement;
    mode?: "infinite" | "translate" | "auto"; // 标尺渲染模式： 1.无限渲染 2.div translate 3.自动选择最优渲染
    type?: "single" | "wrapped"; // 标尺类型，单独生成还是带滚动条整体生生成
    direction?: "horizontal" | "vertical"; // 标尺方向，单独生成模式使用
    width?: number; // 画布宽度
    height?: number; // 画布高度
    scrollElement: string | HTMLElement; // 滚动元素元素选择器
    rulerId?: string;
    style?: RulerOuterStyle; // 标尺样式
    onScroll?: (x: number, y: number) => void; // 滚动回调
}

// 容器大小
export interface WrapperSize {
    width: number;
    height: number;
}

export interface ResizeObject extends WrapperSize {
    size?: number;
}

export enum RulerDefaultConfig {}

export type DomElement = HTMLElement | Node;

// screenCanvasRuler参数
export interface Params {
    options: Ruler;
    isInfinite: boolean;
    [key: string]: any;
}

declare class LightRuler {
    private wrapperSize: WrapperSize; // 容器大小

    private scrollObject: HTMLElement; // 监听滚动DOM

    private canvasXbox: HTMLElement; // 横向canvas

    private canvasYbox: HTMLElement; // 纵向canvas

    private unitDom: HTMLElement; // 单位元素

    public options: Required<Ruler>; // 标尺配置项

    public canvas: any; // canvas标尺实例 主线程canvas

    public canvasWrapper: HTMLElement; // 标尺最外层DOM容器
    // 标尺最外层DOM容器

    public ratio: Ratio; // 当前分辨率
    // 当前分辨率

    public isInfinite: boolean; // 是否无限算法

    public init: Function;

    public render: Function;

    public setWrapperSize: Function;

    public createWrappedRuler: Function;

    public createCanvasInnerRuler: Function;

    public createSingleRuler: Function;

    public scale: Function;

    public resize: Function;

    public update: Function;

    public updateUnitStyle: Function;

    public destroy: Function;

    public bindScrollEvent: Function;

    public limitedScrollEvent: Function;

    public infiniteScrollEvent: Function;

    public getEventNeedsDom: Function;

    public changeScrollElement: Function;

    public show: Function;

    public hide: Function;
}

export default LightRuler;
