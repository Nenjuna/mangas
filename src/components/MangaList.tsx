import { FixedSizeList, ListChildComponentProps } from "react-window";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton } from "@mui/material";
import data from "../../public/api.json";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import * as React from "react";

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
  // let c = name.replace("Black Clover, ", "").split(" ");
  // let co = `${c[0][0]}${c[1]}`;
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

export default function VirtualizedList() {
  const [chapters, setChapters] = React.useState([]);

  const getChapters = async (limit = 10, offset = 0) => {
    let mangaList = await fetch(
      "/api/chapters?limit=" + limit + "&offset=" + offset
    );
    const data = await mangaList.json();
    setChapters(data.chapters);
    // console.log(data.chapters);
  };

  getChapters();
  return (
    <Box
      sx={{
        width: "50%",
        height: "100%",
        border: "1px solid #eee",
      }}
    >
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
    </Box>
  );
}
