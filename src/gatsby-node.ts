import crypto from 'crypto';
import { GatsbyNode, SourceNodesArgs, PluginOptions } from 'gatsby';
import Parser from 'rss-parser';
import omitBy from 'lodash/omitBy';

export interface PluginConfig extends PluginOptions {
  url: string;
  name: string;
}

export interface RSSItem {
  guid: string;
  link: string;
  [key: string]: any;
}

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

  return {
    ...omitBy(item, (_, key) => key.match(/:/)),
    ...namespaced,
  };
};

const invalidkeys = [`$`, `_`];

const clearInvalid = obj => {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === `object`) {
      const isInvalid = Object.keys(obj[key]).filter(value =>
        invalidkeys.includes(value)
      ).length;

      if (isInvalid) {
        return (obj[key] = ``);
      }

      clearInvalid(obj[key]);
    }

    return obj[key];
  });
};

const createContentDigest = (obj: { [key: string]: any } & Parser.Item) =>
  crypto.createHash(`md5`).update(JSON.stringify(obj)).digest(`hex`);

export const sourceNodes: GatsbyNode['sourceNodes'] = async (
  { actions, createNodeId }: SourceNodesArgs,
  { url, name }: PluginConfig
): Promise<void> => {
  if (!url) {
    throw new Error(`url is required.`);
  }

  if (!name) {
    throw new Error(`name is required.`);
  }

  const { createNode } = actions;
  const parser = new Parser();

  const feed = await parser.parseURL(url);
  const { items } = feed;

  (items as Array<RSSItem>).forEach((item: RSSItem) => {
    const normalizedItem = normalize(item);
    clearInvalid(normalizedItem);

    const { guid, link } = item;
    const nodeId = createNodeId(guid || link);
    createNode({
      ...normalizedItem,
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        contentDigest: createContentDigest(item),
        type: `Feed${name}`,
      },
    });
  });
};
