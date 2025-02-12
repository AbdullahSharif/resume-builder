"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";

export default function ResumeEditor() {
  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Design Your Resume</h1>
        <p className="text-sm text-muted-foreground">
          Follow the steps to create an ATS tested resume. Your progress will be
          saved automatically.
        </p>
      </header>
      {/* Doesn't matter what the zoom level is, the main editor portion will take up the full height of the screen */}
      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div className="w-full overflow-y-auto p-3 md:w-1/2">
            {/* <GeneralInfoForm /> */}
            <PersonalInfoForm />
          </div>
          <div className="grow md:border-r" />
          <div className="hidden w-1/2 md:flex">Right</div>
        </div>
      </main>
      <footer className="w-full border-t px-3 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* buttons for going to the previous and next steps. */}
            <Button variant={"secondary"}>Previous Step</Button>
            <Button>Next Step</Button>
          </div>
          <div className="flex items-center gap-3">
            <Button variant={"secondary"} asChild>
              <Link href={"/resumes"}>Close</Link>
            </Button>
            <p className="text-muted-foreground">Saving...</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
