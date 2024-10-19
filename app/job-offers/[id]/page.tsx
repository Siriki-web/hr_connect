import { JobListingComponent } from "@/components/job-listing"

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  return <JobListingComponent jobId={params.id} />
}