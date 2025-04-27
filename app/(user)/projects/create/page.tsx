"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  techStack: z.string(),
  tags: z.string(),
  category: z.string(),
  isLookingForCollaborators: z.boolean().default(false),
});

export default function CreateProjectPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      techStack: "",
      tags: "",
      category: "",
      isLookingForCollaborators: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Later connect this to your API/Server Action
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Create New Project</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your project title..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe your project in detail..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tech Stack */}
          <FormField
            control={form.control}
            name="techStack"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tech Stack (comma separated)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Next.js, Prisma, MongoDB" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tags */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags (comma separated)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Web App, AI, Fintech" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Software, Hardware, Research" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Collaborators */}
          <FormField
            control={form.control}
            name="isLookingForCollaborators"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Looking for Collaborators?</FormLabel>
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button type="submit" className="w-full">Submit Project</Button>
        </form>
      </Form>
    </div>
  );
}
