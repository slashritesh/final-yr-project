"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { z } from "zod";
import UploadImage from "./UploadImage";
import { pinata } from "@/utils/pinata.config";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { createProject } from "@/actions/project";
import { toast } from "sonner";
import { redirect } from "next/navigation";


export const projectFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  techStack: z.string().min(1, "Tech stack is required"),
  tags: z.string().min(1, "Tags are required"),
  category: z.string().min(1, "Category is required"),
  imageurl: z.string().min(1, "Image is required"),
});

const CreateProjectForm = () => {
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      tags: "",
      techStack: "",
      title: "",
      description: "",
      category: "",
      imageurl: "",
    },
  });

  const uploadFile = async () => {
    if (!file) {
      alert("No file selected");
      return;
    }

    try {
      setUploading(true);
      const urlRequest = await fetch("/api/url"); // Fetches the temporary upload URL
      const urlResponse = await urlRequest.json(); // Parse response
      const upload = await pinata.upload.public.file(file).url(urlResponse.url); // Upload the file with the signed URL
      const fileUrl = await pinata.gateways.public.convert(upload.cid);
      setUrl(fileUrl);

      form.setValue('imageurl',fileUrl)
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files?.[0]);
  };
  

  async function onSubmit(values: z.infer<typeof projectFormSchema>) {
    console.log(values);
    const res = await createProject(values)
    if (res?.status === "error") {
        form.setError('root',{message : res.message})
    }else{
      toast.success("🥳 Project Created Sucessfully!")
      redirect("/projects")
    }
  }
  return (
    <div className="flex justify-center my-10 items-center flex-col">
      <h3 className="text-2xl">Create New Project</h3>
      <div className="w-[650px] p-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Project Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter Project Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Label>Project Thumbnail Image</Label>
              <div className="flex flex-col space-y-5 text-sm p-5 my-3 bg-card rounded-lg border">
                <div className="flex justify-between items-center p-3 border">
                  <input type="file" onChange={handleChange} />
                  <Button
                    type="button"
                    disabled={uploading}
                    onClick={uploadFile}
                  >
                    {uploading ? "Uploading..." : "Upload"}
                  </Button>
                </div>
                <div>
                  {url && (
                    <div>
                      <h2>Preview Image</h2>
                      <img
                        className="rounded-lg"
                        src={url}
                        alt="Image from Pinata"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Catgory</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Project category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project tags</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Project Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="techStack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Tech Stack</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Project Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p>{form?.formState?.errors?.root?.message}</p>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateProjectForm;
