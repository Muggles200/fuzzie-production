"use client";

import React from "react";
import "@aws-amplify/ui-react/styles.css";
import {
  Authenticator,
  Button,
  Heading,
  useAuthenticator,
  useTheme,
  View,
  Text,
  Image,
} from "@aws-amplify/ui-react";

// Define the prop type for the AuthPage component
type AuthPageProps = {
  onBackToGetStarted: () => void;
  authMode: string;
};

export default function AuthPage({ onBackToGetStarted, authMode }: AuthPageProps) {
  const components = {
    Header() {
      const { tokens } = useTheme();

      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Image
            alt="Amplify logo"
            src="https://docs.amplify.aws/assets/logo-dark.svg"
          />
        </View>
      );
    },

    Footer() {
      const { tokens } = useTheme();

      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Text color={tokens.colors.neutral[80]}>
            &copy; All Rights Reserved
          </Text>
        </View>
      );
    },

    SignIn: {
      Header() {
        const { tokens } = useTheme();

        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Sign in to your account
          </Heading>
        );
      },
      Footer() {
        const { toForgotPassword } = useAuthenticator();

        return (
          <View textAlign="center">
            <Button
              fontWeight="normal"
              onClick={toForgotPassword}
              size="small"
              variation="link"
            >
              Reset Password
            </Button>
            <Button
              fontWeight="normal"
              onClick={onBackToGetStarted}
              size="small"
              variation="link"
            >
              Back to Get Started
            </Button>
          </View>
        );
      },
    },

    SignUp: {
      Header() {
        const { tokens } = useTheme();

        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Create a new account
          </Heading>
        );
      },
      Footer() {
        const { toSignIn } = useAuthenticator();

        return (
          <View textAlign="center">
            <Button
              fontWeight="normal"
              onClick={toSignIn}
              size="small"
              variation="link"
            >
              Back to Sign In
            </Button>
            <Button
              fontWeight="normal"
              onClick={onBackToGetStarted}
              size="small"
              variation="link"
            >
              Back to Get Started
            </Button>
          </View>
        );
      },
    },
  };

  return (
    <Authenticator
      components={components}
      initialState={authMode === "signIn" ? "signIn" : "signUp"} // This determines the initial page shown
    >
      {({ signOut, user }) => (
        <View>
          <Text>Welcome, {user?.username}</Text>
          <Button onClick={signOut}>Sign out</Button>
        </View>
      )}
    </Authenticator>
  );
}