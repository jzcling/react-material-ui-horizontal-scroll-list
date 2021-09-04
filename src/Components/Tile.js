import { ImageListItem, ImageListItemBar, makeStyles } from "@material-ui/core";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  gridListTile: {
    width: ({ tileWidth }) => `${getDimension(tileWidth)}px !important`,
    height: ({ tileHeight }) => `${getDimension(tileHeight)}px !important`,
    [theme.breakpoints.only("xl")]: {
      width: ({ tileWidth }) => `${getDimension(tileWidth, "xl")}px !important`,
      height: ({ tileHeight }) =>
        `${getDimension(tileHeight, "xl")}px !important`,
    },
    [theme.breakpoints.only("lg")]: {
      width: ({ tileWidth }) => `${getDimension(tileWidth, "lg")}px !important`,
      height: ({ tileHeight }) =>
        `${getDimension(tileHeight, "lg")}px !important`,
    },
    [theme.breakpoints.only("sm")]: {
      width: ({ tileWidth }) => `${getDimension(tileWidth, "sm")}px !important`,
      height: ({ tileHeight }) =>
        `${getDimension(tileHeight, "sm")}px !important`,
    },
    [theme.breakpoints.only("xs")]: {
      width: ({ tileWidth }) => `${getDimension(tileWidth, "xs")}px !important`,
      height: ({ tileHeight }) =>
        `${getDimension(tileHeight, "xs")}px !important`,
    },
  },
  gridListTileContent: {
    borderRadius: "10px",
  },
  gridListTileBarRoot: {
    [theme.breakpoints.down("xs")]: {
      height: "2rem",
    },
  },
  gridListTileBarTitle: {
    fontSize: "0.8rem",
    lineHeight: "1.1rem",
    whiteSpace: "normal",
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,

    [theme.breakpoints.down("xs")]: {
      fontSize: "0.6rem",
      lineHeight: "0.8rem",
    },
  },
  gridListTileBarTitleWrap: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },

  link: {
    textDecoration: "none",
    color: "rgba(0, 0, 0, 0.87)",
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

export default function Tile(props) {
  const {
    item,
    imageUrlAttribute,
    imageAltAttribute,
    titleAttribute,
    handleTileClick,
    tileLink,
    tileWidth,
    tileHeight,
  } = props;
  const classes = useStyles({
    tileWidth: tileWidth,
    tileHeight: tileHeight,
  });

  return (
    <Fragment>
      {tileLink ? (
        <Link to={tileLink(item)} className={classes.link}>
          <Content
            classes={classes}
            item={item}
            handleTileClick={handleTileClick}
            imageUrlAttribute={imageUrlAttribute}
            titleAttribute={titleAttribute}
            imageAltAttribute={imageAltAttribute}
          />
        </Link>
      ) : (
        <Content
          classes={classes}
          item={item}
          handleTileClick={handleTileClick}
          imageUrlAttribute={imageUrlAttribute}
          titleAttribute={titleAttribute}
          imageAltAttribute={imageAltAttribute}
        />
      )}
    </Fragment>
  );
}

const Content = (props) => {
  const {
    classes,
    item,
    handleTileClick,
    imageUrlAttribute,
    titleAttribute,
    imageAltAttribute,
  } = props;
  return (
    <ImageListItem
      classes={{
        root: classes.gridListTile,
        item: classes.gridListTileContent,
      }}
      onClick={(event) => handleTileClick(item)}
    >
      <img
        src={
          get(item, imageUrlAttribute) ||
          "https://via.placeholder.com/360/ffffff/808080?text=" +
            encodeURIComponent(get(item, titleAttribute))
        }
        alt={
          imageAltAttribute
            ? get(item, imageAltAttribute)
            : get(item, titleAttribute)
        }
        loading="lazy"
      />
      <ImageListItemBar
        title={get(item, titleAttribute)}
        classes={{
          root: classes.gridListTileBarRoot,
          title: classes.gridListTileBarTitle,
          titleWrap: classes.gridListTileBarTitleWrap,
        }}
      />
      )
    </ImageListItem>
  );
};

Tile.defaultProps = {
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
};

Tile.propTypes = {
  item: PropTypes.object.isRequired,
  imageUrlAttribute: PropTypes.string,
  imageAltAttribute: PropTypes.string,
  titleAttribute: PropTypes.string.isRequired,
  handleTileClick: PropTypes.func,
  tileLink: PropTypes.func,
  tileWidth: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  tileHeight: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};
