"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sourceNodes = void 0;
const crypto_1 = __importDefault(require("crypto"));
const rss_parser_1 = __importDefault(require("rss-parser"));
const omitBy_1 = __importDefault(require("lodash/omitBy"));
const normalize = item => {
    const namespaceMatched = Object.keys(item).filter(e => e.match(/:/));
    if (namespaceMatched.length === 0) {
        return item;
    }
    const namespaced = {};
    namespaceMatched.forEach(key => {
        const [namespace, childKey] = key.split(`:`);
        if (!namespaced[namespace]) {
            namespaced[namespace] = {};
        }
        namespaced[namespace][childKey] = item[key];
    });
    return Object.assign(Object.assign({}, omitBy_1.default(item, (_, key) => key.match(/:/))), namespaced);
};
const invalidkeys = [`$`, `_`];
const clearInvalid = obj => {
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === `object`) {
            const isInvalid = Object.keys(obj[key]).filter(value => invalidkeys.includes(value)).length;
            if (isInvalid) {
                return (obj[key] = ``);
            }
            clearInvalid(obj[key]);
        }
        return obj[key];
    });
};
const createContentDigest = (obj) => crypto_1.default.createHash(`md5`).update(JSON.stringify(obj)).digest(`hex`);
const sourceNodes = async ({ actions, createNodeId }, { url, name }) => {
    if (!url) {
        throw new Error(`url is required.`);
    }
    if (!name) {
        throw new Error(`name is required.`);
    }
    const { createNode } = actions;
    const parser = new rss_parser_1.default();
    const feed = await parser.parseURL(url);
    const { items } = feed;
    items.forEach((item) => {
        const normalizedItem = normalize(item);
        clearInvalid(normalizedItem);
        const { guid, link } = item;
        const nodeId = createNodeId(guid || link);
        createNode(Object.assign(Object.assign({}, normalizedItem), { id: nodeId, parent: null, children: [], internal: {
                contentDigest: createContentDigest(item),
                type: `Feed${name}`,
            } }));
    });
};
exports.sourceNodes = sourceNodes;
//# sourceMappingURL=gatsby-node.js.map