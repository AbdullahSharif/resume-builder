"use client";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import GeneralInfoForm from "./forms/GeneralInfoForm";
// import PersonalInfoForm from "./forms/PersonalInfoForm";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import { useState } from "react";
import { ResumeValues } from "@/lib/validators";

export default function ResumeEditor() {
  const [resumeData, setResumeData] = useState<ResumeValues>({
    email: "",
    phone: "",
    city: "",
    country: "",
    desciption: "",
    firstName: "",
    lastName: "",
    title: "",
    id: "",
    jobTitle: "",
    photo: "",
    workExperiences: [],
    educations: [],
    summary: "",
  });

  const searchParams = useSearchParams(); // get the search params.

  const currentStep = searchParams.get("step") || steps[0].key;

  const setStep = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    // now we push the search params in the url.
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);

    // if we use router.push by importing the router from next/navigation, it will make a request to server and it will take some time to load the url.
    // but with window.history.push, it will immediately put the params in the url.
  };

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;

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
          <div className="w-full space-y-6 overflow-y-auto p-3 md:w-1/2">
            {/* <GeneralInfoForm /> */}
            {/* <PersonalInfoForm /> */}
            <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <div className="grow md:border-r" />
          <div className="hidden w-1/2 overflow-y-auto md:flex">
            <pre>{JSON.stringify(resumeData, null, 2)}</pre>
          </div>
        </div>
      </main>
      <Footer currentStep={currentStep} setCurrentStep={setStep} />
    </div>
  );
}
