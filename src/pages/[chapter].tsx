import { useRouter } from "next/router";
import Header from "../components/Header";
import {
  Container,
  Box,
  CssBaseline,
  ImageList,
  ImageListItem,
  Divider,
  Typography,
} from "@mui/material";
// import data from "../../public/api.json";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";

function Chapter() {
  const router = useRouter();

  const chapter = router.query.chapter as string;
  // const chapterid = Number(chapter.split("_")[1]);
  // console.log(chapter);

  // const chapters = data;

  // console.log(chapter);

  // type image = { src: string; id: string };

  type image = string;

  const [images, setImages] = useState<image[]>([]);
  // const [images, setImages] = useState<image[]>([
  //   {
  //     src: "https://img.spoilerhat.com/img/?url=https://i.imgur.com/bUqKp0v.png",
  //     id: "def",
  //   },
  // ]);

  // const filteredChapter = Object.entries(chapters).find(
  //   (el) =>
  //     el[0].replace(/ /g, "_").toLowerCase().replace("black_clover,_", "") ===
  //     chapter
  // );
  // useEffect(() => {
  //   if (filteredChapter) setImages(filteredChapter[1].chapters);
  // }, [filteredChapter]);

  useEffect(() => {
    const getChapter = async (mangaid: string) => {
      let pages = await fetch("/api/getchapter?mangaid=" + mangaid);
      const data = await pages.json();
      setImages(data.chapter.pages.split(","));
      // console.log(images);
    };
    // const chapterid = Number(chapter.split("_")[1]);
    getChapter(chapter);
  }, [chapter]);

  return (
    <>
      <Header></Header>
      <Box sx={{ display: "flex", p: 3, mt: 8 }} component="main">
        <CssBaseline />
        <Container sx={{ border: "1px solid #eee" }}>
          {images.length > 1 ? (
            <ImageList sx={{ width: "90%", height: "90vh" }} cols={1}>
              {images.map((item, index) => (
                <ImageListItem key={index} sx={{ borderBottom: "1px solid" }}>
                  <img src={item} alt={item.split("/").at(-1)} loading="lazy" />
                </ImageListItem>
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
