"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Github, LoaderCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LetterSwapPingPong from "@/components/fancy/letter-swap-pingpong-anim";
import { createProject } from "../actions/create.project.action";
import { useTransition } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  githubUrl: z.string().nonempty(),
  projectName: z.string(),
  githubToken: z.string().optional(),
});

export type CreateFormValues = z.infer<typeof formSchema>;

export function ProjectForm() {
  const form = useForm<CreateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      githubToken: "",
      projectName: "",
      githubUrl: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  function onSubmit(values: CreateFormValues) {
    startTransition(async () => {
      await createProject(values).then(() => {
        toast.success("Project created");
      });
    });
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Fill the following fields to create a project</CardTitle>
        <CardDescription>
          Enter the link of your github repository and a project name to get
          started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="space-y-2">
                      <FormLabel>Repo Url</FormLabel>
                      <div className="relative">
                        <Input
                          {...field}
                          className="peer pe-9"
                          placeholder="url"
                          disabled={isPending}
                        />
                        <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                          <Github
                            size={16}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="githubToken"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <div className="mb-2 flex items-center justify-between gap-1">
                        <FormLabel className="leading-6">
                          Github Token
                        </FormLabel>
                        <span className="text-sm text-muted-foreground">
                          Optional
                        </span>
                      </div>
                      <Input
                        {...field}
                        placeholder="for private repos"
                        disabled={isPending}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" disabled={isPending}>
              {isPending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <LetterSwapPingPong label="Submit"></LetterSwapPingPong>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
