"use client"

import { lazy, Suspense } from "react";
const DisplayProducts = lazy(()=>import('@/app/components/DisplayProducts'))

export default function Home() {
  return (
    <div className="flex flex-col mt-10 mb-20 items-center justify-center font-sans dark:bg-black">
      <h1 className="text-2xl font-semibold italic underline underline-offset-4">Products CRUD Application</h1>
      <Suspense fallback={<p className="text-2xl text-gray-400">Loading...</p>}>
        <DisplayProducts />
      </Suspense>
    </div>
  );
}
