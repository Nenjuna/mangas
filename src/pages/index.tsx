import Head from "next/head";
import * as React from "react";
import { Container, Box, CssBaseline } from "@mui/material";
import Header from "../components/Header";
import MangaList from "../components/MangaList";
import { NextFetchEvent } from "next/server";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";

export default function Home() {
  const [chapters, setChapters] = React.useState([]);

  useEffect(() => {
    const getChapters = async (limit = 50, offset = 0) => {
      let mangaList = await fetch(
        "/api/chapters?limit=" + limit + "&offset=" + offset
      );
      const data = await mangaList.json();
      setChapters(data.chapters);
    };

    getChapters();
  }, []);

  return (
    <>
      <Head>
        <title>Manga Reader</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <Box sx={{ display: "flex", p: 3, mt: 8 }} component="main">
        <CssBaseline />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <MangaList chapters={chapters} />
          </Grid>
        </Grid>

        {/* <Container
          sx={{ justifyItems: "left", alignItems: "flex-start" }}
        ></Container> */}
      </Box>
    </>
  );
}
