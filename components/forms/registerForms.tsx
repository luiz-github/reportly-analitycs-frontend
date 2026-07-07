import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import { useState } from "react";
import { useRegister } from "@/hooks/useRegister";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const { handleRegister, loading, error } = useRegister();
  const [formData, setFormData] = useState({
    agency_name: "",
    password: "",
    email: "",
  });

  const onSubmit = async () => {
    const response = await handleRegister(formData);
    if (response) {
      router.push("/dashboard");
    }
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign Up to your account</CardTitle>
        <CardAction>
          <Link href="/login">
            <Button variant="link">Log In</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Agency Name</Label>
              <Input
                id="agency_name"
                type="text"
                placeholder="Example Agency"
                value={formData.agency_name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    agency_name: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                required
              />
            </div>
            {error && (
              <div className="grid gap-2">
                <p className="text-sm text-destructive text-center first-letter:uppercase">
                  {error}
                </p>
              </div>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" onClick={onSubmit} className="w-full">
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
        <Button variant="outline" className="w-full" disabled>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Sign Up with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
