import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";
import { Archive, File, Link, SquareArrowOutUpRight } from "lucide-react";
import { Application } from "../schema";

export default async function ApplicationsList({
  folderId,
}: Readonly<{
  folderId: string;
}>) {
  const applications = await api.applications.getAllApplications({ folderId });

  return (
    <section className="flex flex-col gap-4 p-8">
      <h2 className="text-2xl font-semibold">Applications</h2>
      <ul className="flex flex-col gap-2">
        {applications.map((application) => (
          <ApplicationItem key={application.folderId} {...application} />
        ))}
      </ul>
    </section>
  );
}

function ApplicationItem(application: Readonly<Application>) {
  return (
    <li
      key={application.folderId}
      className="flex items-center gap-4 rounded border p-4"
    >
      <div className="flex flex-1 gap-8">
        <div className="flex w-1/5 flex-col gap-1">
          <p className="text-xs text-gray-300">Company</p>
          <p>{application.companyName}</p>
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-xs text-gray-300">Job Title</p>
          <p>{application.jobTitle}</p>
        </div>
        <div className="flex w-1/5 flex-col gap-1">
          <p className="text-xs text-gray-300">Status</p>
          <p>Interview</p>
        </div>
      </div>
      <div className="flex w-1/6 justify-end border-l pl-4">
        {application.jobDescriptionUrl ? (
          <Button variant="ghost" asChild title="Job Description">
            <a href={application.jobDescriptionUrl} target="_blank">
              <Link />
            </a>
          </Button>
        ) : null}
        <Button variant="ghost" asChild title="Document's Folder">
          <a
            href={`https://drive.google.com/drive/u/1/folders/${application.folderId}`}
            target="_blank"
          >
            <SquareArrowOutUpRight />
          </a>
        </Button>
        <Button variant="ghost">
          <File />
          <span className="sr-only">CV</span>
        </Button>
        <Button variant="ghost">
          <Archive />
          <span className="sr-only">Archive</span>
        </Button>
      </div>
    </li>
  );
}
