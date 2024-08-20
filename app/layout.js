import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flashcard SaaS",
  description:
    "Create Impactful Flashcards - Generated from the create next application",
};

export default async function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {/* AppBar Component */}
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                <Link href="/flashcards">Flashcard SaaS</Link>
              </Typography>
              <SignedOut>
                <Button color="inherit" href="/sign-in">
                  Login
                </Button>
                <Button color="inherit" href="/sign-up">
                  Sign Up
                </Button>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </Toolbar>
          </AppBar>
          {/* Main Content */}
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
