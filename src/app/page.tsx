"use client"
import Image from "next/image";
import React, { useRef, useState } from "react";

export default function Home() {

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const uploadFile = async() => {
    try {
      if(!file) {
        alert("No file selected");
        return;
      }

      setUploading(true);
      const data = new FormData();
      data.set("file", file);

      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const signedUrl = await uploadRequest.json();
      setUploading(false);
    } catch (error) {
      console.error(error);
      alert("Error uploading file");
      setUploading(false);
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold text-center pt-10">
          From SVG images to animations
        </h1>
        

        <div className="flex flex-wrap gap-1 p-5 bg-white w-[650px] min-h-[300px] mx-auto mt-6 mb-10 rounded-md shadow-sm">
          {imageUrls.map((url) => (
            <img
              key={url}
              src={url}
              alt="SVG Image"
              className="w-full h-full object-contain"
            />
          ))}
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <input 
            type="file" 
            disabled={uploading}
            className="hidden" ref={fileInputRef}
            onChange={async (e) => {
              const file = e.target.files?.[0] as File;

              setUploading(true);

              const data = new FormData();
              data.set("file", file)

              const uploadRequest = await fetch("/api/files", {
                method: "POST",
                body: data,
              });
              const signedUrl = await uploadRequest.json();
              setImageUrls([...imageUrls, signedUrl]);

              setUploading(false);
            }}
          />
          <button
            type="button"
            disabled={uploading}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            {uploading ? "Uploading" : "Upload SVG Image"}
          </button>
          
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
