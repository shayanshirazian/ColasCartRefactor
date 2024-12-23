"use client";
import React from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="text-center text-xl font-bold"></header>
      {children}
    </div>
  );
}
