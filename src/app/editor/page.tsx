"use client";

import RichTextEditor from "@/components/RichTextEditor";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function EditorPage() {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
    router.refresh();
    console.log("refersh");
  }, []);
  return <RichTextEditor />;
}
