import { FixedSizeList, ListChildComponentProps } from "react-window";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton } from "@mui/material";
import data from "../../public/api.json";
import Link from "next/link";

function renderRow(props: ListChildComponentProps) {
  const { index, style, data } = props;
  // console.log(data);
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
  // console.log(chapters);

  const val = Object.entries(chapters);
  // console.log(data);

  // const chapters = Object.keys(data).sort((a, b) => {
  //   return (
  //     b[0].replace("Black Clover, Chapter ", "") -
  //     a[0].replace("Black Clover, Chapter ", "")
  //   );
  // });

  return (
    <Box
      sx={{
        width: "80%",
        height: "100%",
        border: "1px solid #eee",
      }}
    >
      <FixedSizeList
        height={1000}
        width="100%"
        itemSize={40}
        itemCount={val.length}
        overscanCount={5}
        itemData={val}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
