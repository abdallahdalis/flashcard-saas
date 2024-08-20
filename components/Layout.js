// components/Layout.js
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";

export default async function Layout({ children }) {
  const user = await currentUser();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in/page.js">
              Login
            </Button>
            <Button color="inherit" href="/sign-up/page.js">
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </>
  );
}
