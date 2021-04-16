<div align="center">
<h1>gatsby-source-rss-feeds</h1>

<p>Source plugin for pulling data into Gatsby from RSS feed based on <a href="https://github.com/mottox2/gatsby-source-rss-feed">gatsby-source-rss-feed</a>.</p>
</div>

---

<!-- prettier-ignore-start -->
[![Build Status][build-badge]][build]
[![version][version-badge]][package]
[![MIT License][license-badge]][license]
<!-- prettier-ignore-end -->

## The problem

When loading a xml file with empty values, `gatsby-source-rss-feed` converted the rss in objects which in turn gave errors.

## This solution

Build on the plugin and make sure the empty fields are handled.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
  - [basic pattern](#basic-pattern)
  - [use multiple feed](#use-multiple-feed)
- [How to query](#how-to-query)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This module should be installed as one of your project's `dependencies`:

```
npm install --save gatsby-source-rss-feeds
```

## Usage

### basic pattern

```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-rss-feeds`,
      options: {
        url: `https://www.gatsbyjs.org/blog/rss.xml`,
        name: `GatsbyBlog`,
      }
    }
  ]
}
```

### use multiple feed


```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-rss-feeds`,
      options: {
        url: `https://www.gatsbyjs.org/blog/rss.xml`,
        name: `GatsbyBlog`,
      }
    }
    {
      resolve: `gatsby-source-rss-feeds`,
      options: {
        url: `https://www.gatsbyjs.org/blog/rss.xml`,
        name: `MyBlog`,
      }
    }
  ]
}
```

## How to query

Query is `Feed${name}`.

When name of options is `GatsbyBlog`, query named as `FeedGatsbyBlog`.

```graphql
{
  allFeedGatsbyBlog {
    edges {
      node {
        title
        link
        content
      }
    }
  }

  feedGatsbyBlog {
    title
    link
    content
  }
}
```


<!-- prettier-ignore-start -->
[npm]: https://www.npmjs.com
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/github/workflow/status/daren-malfait/gatsby-source-rss-feeds/CI?logo=github&style=flat-square
[build]: https://github.com/daren-malfait/gatsby-source-rss-feeds/actions?query=workflow
[version-badge]: https://img.shields.io/npm/v/gatsby-source-rss-feeds.svg?style=flat-square
[package]: https://www.npmjs.com/package/gatsby-source-rss-feeds
[downloads-badge]: https://img.shields.io/npm/dm/gatsby-source-rss-feeds.svg?style=flat-square
[license-badge]: https://img.shields.io/npm/l/gatsby-source-rss-feeds.svg?style=flat-square
[license]: https://github.com/daren-malfait/gatsby-source-rss-feeds/blob/main/LICENSE
<!-- prettier-ignore-end -->