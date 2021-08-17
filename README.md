# React Material UI Horizontal Scroll List

A customizable horizontal scroll list using React Material UI components. This component provides the horizontal scroll functionality while allowing you to define your own content within the scroll list.

## Installation

```
npm install --save @jeremyling/react-material-ui-horizontal-scroll-list
```

## Usage Examples

Example with the default component of an image background with a translucent text area.

```jsx
import React from "react";
import HorizontalScrollList from "@jeremyling/react-material-ui-horizontal-scroll-list";

const categories = [
  {
    name: 'Fresh Produce',
    image: {
      url: "https://via.placeholder.com/360",
    },
    slug: 'fresh-produce',
  },
  {
    name: 'Meat & Seafood',
    image: {
      url: "https://via.placeholder.com/360",
    },
    slug: 'meat-seafood',
  },
  {
    name: 'Dairy, Chilled & Eggs',
    image: {
      url: "https://via.placeholder.com/360",
    },
    slug: 'dairy-chilled-eggs',
  },
  {
    name: 'Beverages',
    image: {
      url: "https://via.placeholder.com/360",
    },
    slug: 'beverages',
  },
  {
    name: 'Snacks',
    image: {
      url: "https://via.placeholder.com/360",
    },
    slug: 'snacks',
  },
];

export default function BasicDemo(props) {
  return (
    <HorizontalScrollList
      items={categories}
      rows={2}
      imageUrlAttribute="image.url"
      imageAltAttribute="name"
      titleAttribute="name"
      handleTileClick={(item) =>
        history.push("/categories/" + item.slug)
      }
    />
  );
}
/>
```

Example with a custom component as list content

```jsx
import React, { useMemo } from "react";
import ProductCard from "./ProductCard";
import HorizontalScrollList from "@jeremyling/react-material-ui-horizontal-scroll-list";

const cardHeight = {
  xs: 168,
  sm: 205,
  md: 265,
};

export default function HorizontalProductList(props) {
  const { products } = props;
  const { widthType } = useDimensions();

  const cardWidth = useMemo(() => {
    switch (widthType) {
      case "xs":
        return 90;
      case "sm":
        return 120;
      default:
        return 180;
    }
  }, [widthType]);

  return (
    <HorizontalScrollList
      items={products}
      rows={1}
      tileWidth={cardWidth + 16}
      tileHeight={cardHeight}
      heightAllowance={0}
      component={(item) => <ProductCard product={item} cardWidth={cardWidth} />} // custom built component
      style={{ justifyContent: "flex-start" }}
    />
  );
}
```

## Props

| Prop               | Type                 | Default                        | Description                                                                          |
| ------------------ | -------------------- | ------------------------------ | ------------------------------------------------------------------------------------ |
| items              | `array`              | required                       | Content data                                                                         |
| rows               | `number`             | `1`                            | Number of rows in list                                                               |
| imageUrlAttribute^ | `string`             | `undefined`                    | Attribute used to determine img src for default component                            |
| imageAltAttribute^ | `string`             | `undefined`                    | Attribute used to determine img alt for default component                            |
| titleAttribute^    | `string`             | `undefined`                    | Attribute used to determine text for default component                               |
| handleTileClick^   | `func`               | `(item) => {}`                 | Method to handle individual tile click event                                         |
| tileLink^          | `func`               | `undefined`                    | Link to route to using React Router. By default, item is passed as the only argument |
| tileWidth          | `object` or `number` | `{ xs: 90, sm: 120, md: 180 }` | Width of individual tile. Can be a number or an object with values for breakpoints   |
| tileHeight         | `object` or `number` | `{ xs: 90, sm: 120, md: 180 }` | Height of individual tile. Can be a number or an object with values for breakpoints  |
| heightAllowance    | `number`             | `10`                           | Height allowance to adjust container height for scrollbar, margin, etc.              |
| component          | `func`               | `undefined`                    | Custom component for list content                                                    |
| showIndicators     | `bool`               | `true`                         | Whether to show scroll indicators                                                    |
| style              | `object`             | `undefined`                    | Style to apply to root container                                                     |

^ Only applicable if using the default component
