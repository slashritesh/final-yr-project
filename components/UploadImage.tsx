"use client";

import { useState } from "react";
import { pinata } from "@/utils/pinata.config";
import { Button } from "./ui/button";

export default function UploadImage() {
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);

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

  return (
    <div className="border flex justify-between">
      <div>
        <input type="file" onChange={handleChange} />
        <Button type="button" disabled={uploading} onClick={uploadFile}>
          {uploading ? "Uploading..." : "Upload"}
        </Button>
        {url && <img src={url} alt="Image from Pinata" />}
      </div>
    </div>
  );
}
