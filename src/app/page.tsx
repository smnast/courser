'use client';
import Image from "next/image";
import * as api from "./api";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <button onClick={ () => console.log(api.fetchYears()) }>Test</button>
        <button onClick={ () => console.log(api.fetchTerms("2025")) }>Test</button>
        <button onClick={ () => console.log(api.fetchDepartments("2025", "spring")) }>Test</button>
        <button onClick={ () => console.log(api.fetchCourses("2025", "spring", "phil")) }>Test</button>
        <button onClick={ () => console.log(api.fetchSections("2025", "spring", "phil", "105")) }>Test</button>
        <button onClick={ () => console.log(api.fetchInstructors("2025", "spring", "phil", "105", "d100")) }>Test</button>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>Courser is not affiliated with SFU.</p>
      </footer>
    </div>
  );
}
