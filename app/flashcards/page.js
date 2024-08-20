"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";

import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs"; // Assuming you're using Clerk for authentication

import { AppBar, Toolbar, Typography, Button, Box, Grid } from "@mui/material";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
      if (!isLoaded || !isSignedIn) {
        console.error("User is not signed in or not loaded.");
        return;
      }
      console.log("User ID:", user.id); // Make sure this logs the correct user ID

      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);
      console.log("Doc Snap:", docSnap);
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcardSets || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }
    if (isLoaded) {
      getFlashcards();
    }
  }, [isLoaded]);

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };

  const handleGenerateClick = () => {
    router.push("/generate");
  };

  return (
    <>
      <Container maxWidth="md">
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {flashcard.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateClick}
          sx={{ mb: 2, mt: 2, width: "100%" }}
        >
          Make a new flashcard set
        </Button>
      </Container>
    </>
  );
}
