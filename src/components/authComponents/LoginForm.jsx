import { doSocialLogin } from "@/app/actions";
import React from "react";
import { Button } from "@/components/ui/button";
import { EnvelopeOpenIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

function LoginForm() {
  return (
    <div>
      <form action={doSocialLogin}>
        <Button type="submit" name="action" value="google" className="mx-2">
          <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Sign in with Google
        </Button>
        <Button type="submit" name="action" value="github" className="mx-2">
          <GitHubLogoIcon className="mr-2 h-4 w-4" /> Sign in with GitHub
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
