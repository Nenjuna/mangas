import { FixedSizeList, ListChildComponentProps } from "react-window";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton } from "@mui/material";
import data from "../../public/api.json";
import Link from "next/link";

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
          <ListItemText
            primary={`${data[index][0]}`}
            secondary={
              data[index][1]["chapter_name"]
                ? data[index][1]["chapter_name"]
                : ""
            }
            // sx={{ width: 850 }}
          />
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
