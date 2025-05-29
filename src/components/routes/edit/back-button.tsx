'use client'

import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";

export function BackButton() {
  const { back } = useRouter();

  return <Button className="self-start" variant='outline' onClick={back}>Voltar</Button>
}