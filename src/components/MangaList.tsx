import { FixedSizeList, ListChildComponentProps } from "react-window";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton } from "@mui/material";
import data from "../../public/api.json";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import * as React from "react";
import ScrollToTopFab from "./scrollToTop";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name + name),
    },
    children: name,
  };
}

function renderRow(props: ListChildComponentProps) {
  const { index, style, data } = props;
  return (
    <>
      <ListItem
        style={style}
        key={index}
        component="div"
        divider
        sx={{ p: "10px" }}
      >
        {/* <ListItemButton> */}
        <Link
          href={
            "chapter_" +
            (Number(data[index]["chapter"]) % 1 == 0
              ? data[index]["chapter"].split(".")[0]
              : data[index]["chapter"])
          }
        >
          <Stack direction="row" spacing={2}>
            <Avatar
              {...stringAvatar(
                Number(data[index]["chapter"]) % 1 == 0
                  ? data[index]["chapter"].split(".")[0]
                  : data[index]["chapter"]
              )}
            />
            <ListItemText
              primary={`Chapter: ${
                Number(data[index]["chapter"]) % 1 == 0
                  ? data[index]["chapter"].split(".")[0]
                  : data[index]["chapter"]
              }`}
              secondary={
                data[index]["subtitle"].length > 2
                  ? data[index]["subtitle"]
                  : `Chapter: ${data[index]["chapter"]}`
              }
            />
          </Stack>
        </Link>
        {/* </ListItemButton> */}
      </ListItem>
    </>
  );
}

function skeleton(props: ListChildComponentProps) {
  const { index, style, data } = props;

  return (
    <ListItem
      style={style}
      key={index}
      component="div"
      divider
      sx={{ p: "10px" }}
    >
      <Stack direction="row" spacing={2}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={40} />
      </Stack>
    </ListItem>
  );
}

export default function VirtualizedList(props: { chapters: any }) {
  const { chapters } = props;
  console.log(chapters.length);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        border: "1px solid #eee",
      }}
    >
      {chapters.length > 1 ? (
        <FixedSizeList
          height={1000}
          width="auto"
          itemSize={60}
          itemCount={chapters.length}
          overscanCount={5}
          itemData={chapters}
        >
          {renderRow}
        </FixedSizeList>
      ) : (
        <FixedSizeList
          height={1000}
          width="auto"
          itemSize={60}
          itemCount={50}
          overscanCount={5}
          // itemData={chapters}
        >
          {skeleton}
        </FixedSizeList>
      )}
      <ScrollToTopFab />
    </Box>
  );
}
