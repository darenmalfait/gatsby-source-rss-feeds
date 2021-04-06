import { GatsbyNode, PluginOptions } from 'gatsby';
export interface PluginConfig extends PluginOptions {
    url: string;
    name: string;
}
export interface RSSItem {
    guid: string;
    link: string;
    [key: string]: any;
}
export declare const sourceNodes: GatsbyNode['sourceNodes'];
