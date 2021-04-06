# gatsby-source-rss-feeds

[![npm version](https://badge.fury.io/js/gatsby-source-rss-feeds.svg)](https://badge.fury.io/js/gatsby-source-rss-feeds)

Source plugin for pulling data into Gatsby from RSS feed based on [gatsby-source-rss-feeds-feed](https://github.com/mottox2/gatsby-source-rss-feeds-feed).

## Install

```bash
npm install --save gatsby-source-rss-feeds
```

or

```bash
yarn add gatsby-source-rss-feeds
```

## How to use

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

Data not part of the `items` can be accessed with `Feed${name}Meta`

When name of options is `GatsbyBlog`, query named as `FeedGatsbyBlogMeta`.

```graphql
{
  feedGatsbyBlogMeta {
    title
    author
    description
    lastBuiltDate
  }
}
```
