import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validators";
// import { MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "date-fns";
import { Badge } from "./ui/badge";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function ResumePreview({
  resumeData,
  className,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  // the cn function replaces the class names in the first argument, with the class names supplied in the 2nd argument and merges the two.
  // e.g. cn("bg-500 px-2", "bg-200") evaluates to : "bg-200 px-2"
  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-black",
        className,
      )}
      id="mainContainer"
      ref={containerRef}
    >
      <div
        // className={cn("space-y-6 p-6", !width && "invisible")}
        className="space-y-6 p-6"
        style={{
          zoom: (1 / 794) * width,
        }}
      >
        <PersonalInfo resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <WorkExperiencesSection resumeData={resumeData} />
        <EducationSection resumeData={resumeData} />
        <SkillsSection resumeData={resumeData} />
      </div>
    </div>
  );
}

interface ResumeInfoProps {
  resumeData: ResumeValues;
}

function PersonalInfo({ resumeData }: ResumeInfoProps) {
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email,
    colorHex,
  } = resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);

    if (photo == null || photo == undefined) setPhotoSrc("");

    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          alt="author image"
          width={100}
          height={100}
          className="aspect-squzre object-cover"
        />
      )}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <p className="text-3xl font-bold" style={{ color: colorHex }}>
            {firstName} {lastName}
          </p>
          <p className="font-medium">{jobTitle}</p>
        </div>

        <p className="text-xs text-gray-500">
          {/* {(city || country) && <MapPin className="inline text-xs" size={12} />} */}
          {city}
          {city && country ? ", " : ""}
          {country}
          {(city || country) && (phone || email) ? " • " : ""}
          {[phone, email].filter(Boolean).join(" • ")}
        </p>
      </div>
    </div>
  );
}

function SummarySection({ resumeData }: ResumeInfoProps) {
  const { summary, colorHex } = resumeData;

  if (!summary) return;

  return (
    <>
      <hr className="border-2" style={{ borderColor: resumeData.colorHex }} />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Professional Summary
        </p>
        <div className="whitespace-pre-line text-sm">{summary}</div>
      </div>
    </>
  );
}

function WorkExperiencesSection({ resumeData }: ResumeInfoProps) {
  const { workExperiences, colorHex } = resumeData;

  const ValidWorkExperiences = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0,
  );

  if (!ValidWorkExperiences?.length) return null;

  return (
    <>
      <hr className="border-2" style={{ borderColor: resumeData.colorHex }} />
      <div className="space-y-3">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Work Experience
        </p>
        {ValidWorkExperiences.map((exp, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>{exp?.position}</span>
              {exp?.startDate && (
                <span>
                  {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{exp?.company}</p>
            <div className="whitespace-pre-line text-xs">
              {exp?.description}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function EducationSection({ resumeData }: ResumeInfoProps) {
  const { educations, colorHex } = resumeData;

  const validEducations = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0,
  );

  if (!validEducations?.length) return;

  return (
    <>
      <hr className="border-2" style={{ borderColor: resumeData.colorHex }} />
      <div className="space-y-3">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Education
        </p>
        {validEducations.map((edu, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>{edu?.degree}</span>
              {edu?.startDate &&
                `${formatDate(edu.startDate, "MM/yyyy")} ${edu.endDate ? ` - ${formatDate(edu.endDate, "MM/yyyy")}` : ""}`}
            </div>
            <p className="text-xs">{edu?.school}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function SkillsSection({ resumeData }: ResumeInfoProps) {
  const { skills, colorHex } = resumeData;

  if (!skills?.length) return;

  return (
    <>
      <hr className="border-2" style={{ borderColor: resumeData.colorHex }} />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Skills
        </p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              className="rounded-md bg-black p-2 text-white hover:bg-black"
              key={index}
              style={{
                backgroundColor: colorHex,
              }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}
