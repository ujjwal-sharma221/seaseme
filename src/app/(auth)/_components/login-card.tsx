"use client";

import { z } from "zod";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { EyeToggleIcon } from "@/components/icons/eye-icon";
import { authClient } from "@/lib/auth";
import { LoaderCircle } from "lucide-react";

const formSchema = z.object({
  email: z
    .string()
    .min(2)
    .max(50)
    .email({ message: "Please enter a valid email" }),
  password: z
    .string({ message: "Please enter a valid password" })
    .max(50, { message: "Password must be less than 50 characters" }),
});
type formValues = z.infer<typeof formSchema>;

export function LoginCard() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const [isPending, startTransition] = useTransition();

  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: formValues) {
    startTransition(async () => {
      await authClient.signIn.email(
        {
          email: values.email,
          password: values.password,
        },
        {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: (ctx) => {
            toast.success("welcome back");
            console.log(ctx);
          },
        },
      );
    });
  }

  return (
    <Card className="border-none shadow-none w-[600px]">
      <CardHeader>
        <CardTitle className="text-3xl">Hey, welcome back</CardTitle>
        <CardDescription>
          Please enter your credentials to access your account.
          <br />
          Don&apos;t have an account?
          <Link
            className="text-primary underline font-semibold ml-1"
            href="/sign-up"
          >
            SignUp
          </Link>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="gojo.satarou@mail.com" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        className="pe-9"
                        placeholder="Password"
                        type={isVisible ? "text" : "password"}
                      />
                      <button
                        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label={
                          isVisible ? "Hide password" : "Show password"
                        }
                        aria-pressed={isVisible}
                        aria-controls="password"
                      >
                        {isVisible ? <EyeToggleIcon /> : <EyeToggleIcon />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isPending ? (
              <LoaderCircle className="animate-spin size-5 text-muted-foreground ml-4" />
            ) : (
              <InteractiveHoverButton
                disabled={isPending}
                type="submit"
                className="rounded-md"
              >
                Submit
              </InteractiveHoverButton>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
