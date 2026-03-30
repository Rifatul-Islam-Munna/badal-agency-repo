import type { Metadata } from "next"

import SigningExperience from "@/components/signing-experience"

export const metadata: Metadata = {
  title: "Counterparty Sign",
}

type ClientSignPageProps = {
  searchParams: Promise<{
    token?: string
  }>
}

export default async function ClientSignPage({
  searchParams,
}: ClientSignPageProps) {
  const { token } = await searchParams

  return <SigningExperience role="client" token={token} />
}
