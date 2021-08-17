import { debounce, Grid, ImageList, makeStyles } from "@material-ui/core";
import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import HorizontalScrollIndicators from "./HorizontalScrollIndicators";
import Tile from "./Tile";

const useStyles = makeStyles((theme) => ({
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    cursor: "pointer",
    position: "relative",
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote into its own layer. Maintains high FPS at a memory cost
    transform: "translateZ(0)",

    height: ({ rows, tileHeight, heightAllowance }) =>
      getDimension(tileHeight, "md", heightAllowance) * rows,
    [theme.breakpoints.down("xl")]: {
      height: ({ rows, tileHeight, heightAllowance }) =>
        getDimension(tileHeight, "xl", heightAllowance) * rows,
    },
    [theme.breakpoints.down("lg")]: {
      height: ({ rows, tileHeight, heightAllowance }) =>
        getDimension(tileHeight, "lg", heightAllowance) * rows,
    },
    [theme.breakpoints.down("sm")]: {
      height: ({ rows, tileHeight, heightAllowance }) =>
        getDimension(tileHeight, "sm", heightAllowance) * rows,
    },
    [theme.breakpoints.down("xs")]: {
      height: ({ rows, tileHeight, heightAllowance }) =>
        getDimension(tileHeight, "xs", heightAllowance) * rows,
    },
  },
  gridListContainer: {
    height: ({ rows, tileHeight, heightAllowance }) =>
      `${getDimension(tileHeight, "md", heightAllowance) * rows}px !important`,
    [theme.breakpoints.only("xl")]: {
      height: ({ rows, tileHeight, heightAllowance }) =>
        `${
          getDimension(tileHeight, "xl", heightAllowance) * rows
        }px !important`,
    },
    [theme.breakpoints.only("lg")]: {
      height: ({ rows, tileHeight, heightAllowance }) =>
        `${
          getDimension(tileHeight, "lg", heightAllowance) * rows
        }px !important`,
    },
    [theme.breakpoints.only("sm")]: {
      height: ({ rows, tileHeight, heightAllowance }) =>
        `${
          getDimension(tileHeight, "sm", heightAllowance) * rows
        }px !important`,
    },
    [theme.breakpoints.only("xs")]: {
      height: ({ rows, tileHeight, heightAllowance }) =>
        `${
          getDimension(tileHeight, "xs", heightAllowance) * rows
        }px !important`,
    },
  },
}));

function getDimension(dim, breakpoint = "md", allowance = 0) {
  var value = dim.xs || dim;
  if (["sm", "md", "lg", "xl"].includes(breakpoint) && dim.sm) {
    value = dim.sm;
  }
  if (["md", "lg", "xl"].includes(breakpoint) && dim.md) {
    value = dim.md;
  }
  if (["lg", "xl"].includes(breakpoint) && dim.lg) {
    value = dim.lg;
  }
  if (breakpoint === "xl" && dim.xl) {
    value = dim.xl;
  }
  if (allowance > 0) {
    value += allowance;
  }
  return value;
}

export default function HorizontalScrollList(props) {
  const {
    items,
    rows,
    imageUrlAttribute,
    imageAltAttribute,
    titleAttribute,
    handleTileClick,
    tileLink,
    tileWidth,
    tileHeight,
    heightAllowance,
    component,
    showIndicators,
    style,
  } = props;
  const classes = useStyles({
    rows: rows,
    tileWidth: tileWidth,
    tileHeight: tileHeight,
    heightAllowance: heightAllowance,
  });

  const [showScrollIndicatorLeft, setShowScrollIndicatorLeft] = useState(false);
  const [showScrollIndicatorRight, setShowScrollIndicatorRight] =
    useState(true);

  const indexes = useMemo(() => {
    const indexes = [];
    for (var i = 0; i < items.length; i++) {
      if (i % rows === 0) {
        indexes.push(i);
      }
    }
    return indexes;
  }, [items, rows]);

  return (
    <div className={classes.gridListRoot} style={style}>
      <ImageList
        className={classes.gridList}
        cols={1}
        onScroll={debounce((event) => {
          if (event.target.scrollLeft > 0) {
            setShowScrollIndicatorLeft(true);
          } else {
            setShowScrollIndicatorLeft(false);
          }
          if (
            event.target.scrollLeft + event.target.offsetWidth ===
            event.target.scrollWidth
          ) {
            setShowScrollIndicatorRight(false);
          } else {
            setShowScrollIndicatorRight(true);
          }
        }, 100)}
      >
        {indexes.map((index) => (
          <Grid
            key={index}
            container
            spacing={1}
            direction="column"
            className={classes.gridListContainer}
          >
            {[...Array(rows).keys()].map((row) => (
              <Grid item key={row}>
                {items[index + row] &&
                  (component ? (
                    component(items[index + row])
                  ) : (
                    <Tile
                      item={items[index + row]}
                      imageUrlAttribute={imageUrlAttribute}
                      imageAltAttribute={imageAltAttribute}
                      titleAttribute={titleAttribute}
                      handleTileClick={handleTileClick}
                      tileLink={tileLink}
                      tileWidth={tileWidth}
                      tileHeight={tileHeight}
                    />
                  ))}
              </Grid>
            ))}
          </Grid>
        ))}
      </ImageList>

      {showIndicators && (
        <HorizontalScrollIndicators
          showLeft={showScrollIndicatorLeft}
          showRight={showScrollIndicatorRight}
        />
      )}
    </div>
  );
}

HorizontalScrollList.defaultProps = {
  rows: 1,
  handleTileClick: (item) => {},
  tileWidth: {
    xs: 90,
    sm: 120,
    md: 180,
  },
  tileHeight: {
    xs: 90,
    sm: 120,
    md: 180,
  },
  heightAllowance: 10,
  showIndicators: true,
};

HorizontalScrollList.propTypes = {
  items: PropTypes.array.isRequired,
  rows: PropTypes.number,
  imageUrlAttribute: PropTypes.string,
  imageAltAttribute: PropTypes.string,
  titleAttribute: PropTypes.string.isRequired,
  handleTileClick: PropTypes.func,
  tileLink: PropTypes.func,
  tileWidth: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  tileHeight: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  heightAllowance: PropTypes.number,
  component: PropTypes.func,
  showIndicators: PropTypes.bool,
  style: PropTypes.object,
};
