import { FixedSizeList, ListChildComponentProps } from "react-window";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton } from "@mui/material";
import data from "../../public/api.json";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

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
  let c = name.replace("Black Clover, ", "").split(" ");
  let co = `${c[0][0]}${c[1]}`;
  return {
    sx: {
      bgcolor: stringToColor(co + co),
    },
    children: co.replace("C", ""),
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
          href={data[index][0]
            .replace(/ /g, "_")
            .toLowerCase()
            .replace("black_clover,_", "")}
        >
          <Stack direction="row" spacing={2}>
            <Avatar {...stringAvatar(data[index][0])} />
            <ListItemText
              primary={`${data[index][0].replace(",", ":")}`}
              secondary={
                data[index][1]["chapter_name"]
                  ? data[index][1]["chapter_name"]
                  : data[index][0].replace("Black Clover, ", "")
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
  const chapters = Object.fromEntries(
    Object.entries(data).sort((a, b) => {
      return (
        parseInt(b[0].replace("Black Clover, Chapter ", "")) -
        parseInt(a[0].replace("Black Clover, Chapter ", ""))
      );
    })
  );
  const val = Object.entries(chapters);

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
        itemCount={val.length}
        overscanCount={5}
        itemData={val}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
