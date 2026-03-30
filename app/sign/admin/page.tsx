import type { Metadata } from "next"

import SigningExperience from "@/components/signing-experience"

export const metadata: Metadata = {
  title: "Company Representative Sign",
}

type AdminSignPageProps = {
  searchParams: Promise<{
    token?: string
  }>
}

export default async function AdminSignPage({
  searchParams,
}: AdminSignPageProps) {
  const { token } = await searchParams

  return <SigningExperience role="admin" token={token} />
}
