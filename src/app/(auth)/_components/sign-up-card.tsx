"use client";

import { z } from "zod";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { EyeToggleIcon } from "@/components/icons/eye-icon";
import { authClient } from "@/lib/auth";
import { toast } from "sonner";

const formSchema = z.object({
  email: z
    .string()
    .min(2)
    .max(50)
    .email({ message: "Please enter a valid email" }),
  password: z
    .string({ message: "Please enter a valid password" })
    .max(50, { message: "Password must be less than 50 characters" })
    .min(8, { message: "Password too short" }),
  name: z
    .string()
    .min(3, { message: "The name should be atleast 3 characters long" })
    .max(50, { message: "Provided name is too long" }),
});
export type FormValues = z.infer<typeof formSchema>;

export function SignUpCard() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      const { error } = await authClient.signUp.email({
        email: values.email,
        password: values.password,
        name: values.name,
      });

      if (error) {
        toast.error(error.message);
      }
    });
  }

  return (
    <Card className="border-none shadow-none w-[600px]">
      <CardHeader>
        <CardTitle className="text-3xl">
          Hey, thanks for considering us
        </CardTitle>
        <CardDescription>
          By making an account you accept our terms and services
          <br />
          Already have an account?
          <Link
            className="text-primary underline font-semibold ml-1"
            href="/login"
          >
            Login
          </Link>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="gojo staraou" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    This will be your display name
                  </FormDescription>
                </FormItem>
              )}
            />

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

            <InteractiveHoverButton
              disabled={isPending}
              type="submit"
              className="rounded-md"
            >
              Submit
            </InteractiveHoverButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
