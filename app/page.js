import Image from "next/image";
import { AppBar, Toolbar, Typography, Button, Box, Grid } from "@mui/material";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs"; // Assuming you're using Clerk for authentication
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { origin: "http://localhost:3000" },
    });
    const checkoutSessionJson = await checkoutSession.json();

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  const user = await currentUser();

  return (
    <main>
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          The easiest way to create flashcards from your text.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mr: 2 }}
          href="/generate"
        >
          Get Started
        </Button>
        <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
          Learn More
        </Button>
      </Box>

      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Easy Text Input</Typography>
            <Typography>
              {" "}
              Simply input your text and let our software do the rest!
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Different Packages</Typography>
            <Typography>
              {" "}
              Gain Access to a variety of features for a small cost!
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Create Impactful Flashcards</Typography>
            <Typography>
              {" "}
              Be able to increase your knowledge by studying up on flashcards
              using our site!
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Box sx={{ border: "1px solid white", p: 3, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>
                Basic
              </Typography>
              <Typography variant="h6" gutterBottom>
                Free
              </Typography>
              <Typography>
                {" "}
                Access to basic flashcard features and limited storage
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                href="/fllashcards"
              >
                Choose Basic
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ border: "1px solid white", p: 3, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>
                Pro
              </Typography>
              <Typography variant="h6" gutterBottom>
                $5/month
              </Typography>
              <Typography>
                {" "}
                Unlimited flashcards and storage with priority support
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Choose Pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
