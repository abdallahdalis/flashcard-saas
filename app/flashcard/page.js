"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { FlashcardArray } from "react-quizlet-flashcard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Flashcard() {
  const { isLoaded, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState(1);
  const controlRef = useRef({});
  const searchParams = useSearchParams();
  const setName = searchParams.get("id");
  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
      if (!setName || !user) return;

      try {
        const userDocRef = doc(db, "users", user.id);
        const setDocRef = doc(userDocRef, "flashcardSets", setName);
        const setDocSnap = await getDoc(setDocRef);

        if (setDocSnap.exists()) {
          const flashcardsData = setDocSnap.data().flashcards || [];
          const flashcards = flashcardsData.map((flashcard, index) => ({
            id: index,
            frontHTML: <div>{flashcard.front}</div>,
            backHTML: <div>{flashcard.back}</div>,
          }));

          setFlashcards(flashcards);
        } else {
          console.log("No such flashcard set exists!");
          setFlashcards([]); // Set an empty array if no flashcards are found
        }
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    }

    if (isLoaded) {
      getFlashcards();
    }
  }, [setName, user, isLoaded]);

  return (
    <Container maxWidth="md">
      {/* Back Button */}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => router.push("/flashcards")}
        sx={{ mt: 2, mb: 2 }}
      >
        Back
      </Button>

      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        {flashcards.length > 0 ? (
          <>
            <FlashcardArray
              cards={flashcards}
              controls={false}
              showCount={false}
              forwardRef={controlRef}
              onCardChange={(id, index) => {
                setCurrentCard(index);
              }}
              FlashcardArrayStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}
              frontCardStyle={{
                justifyContent: "center",
                alignItems: "center",
              }}
              frontContentStyle={{
                backgroundColor: "#f8f8f8",
                border: "2px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                fontSize: "3rem",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
              backContentStyle={{
                backgroundColor: "#f8f8f8",
                border: "2px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                fontSize: "1.6rem",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            />
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ color: "white", mt: 2 }}
                >
                  {currentCard} / {flashcards.length}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    controlRef.current.resetArray();
                    setCurrentCard(1);
                  }}
                >
                  Reset
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => controlRef.current.prevCard()}
                >
                  Prev
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => controlRef.current.nextCard()}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </>
        ) : (
          <div style={{ color: "white" }}>No flashcards found.</div>
        )}
      </Grid>
    </Container>
  );
}
