import { ThemeConfig } from "antd";
import {base} from './collection'
import {dark} from './collection'


export interface ThemeProps {
    [themeKey: string]: ThemeConfig;
}

const instance: ThemeProps = {
    default: base,
    dark
};

export default instance;