import { useRouter } from "next/router";
import Header from "../components/Header";
import {
  Container,
  Box,
  CssBaseline,
  ImageList,
  ImageListItem,
  Divider,
  ManagedModalProps,
} from "@mui/material";
import data from "../../public/api.json";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";

function Chapter() {
  const router = useRouter();

  const chapter = router.query.chapter as string;

  const chapters = data;

  type image = { src: string; id: string };

  const [images, setImages] = useState<image[]>([
    {
      src: "https://img.spoilerhat.com/img/?url=https://i.imgur.com/bUqKp0v.png",
      id: "",
    },
  ]);
  const filteredChapter = Object.entries(chapters).find(
    (el) =>
      el[0].replace(/ /g, "_").toLowerCase().replace("black_clover,_", "") ===
      chapter
  );
  useEffect(() => {
    if (filteredChapter) setImages(filteredChapter[1].chapters);
  }, [filteredChapter]);

  return (
    <>
      <Header></Header>
      <Box sx={{ display: "flex", p: 3, mt: 8 }} component="main">
        <CssBaseline />
        <Container sx={{ border: "1px solid #eee" }}>
          {images.length > 0 ? (
            <ImageList sx={{ width: "90%", height: "90vh" }} cols={1}>
              {images.map((item) => (
                <>
                  <ImageListItem key={item.id}>
                    <img
                      src={item.src}
                      alt={item.id}
                      loading="lazy"
                      // key={item.id}
                    />
                  </ImageListItem>
                  <Divider />
                </>
              ))}
            </ImageList>
          ) : (
            <CircularProgress />
          )}
        </Container>
      </Box>
    </>
  );
}
export default Chapter;
