"use client";

import { Button, Link } from "@heroui/react";

export default function LoginBtn() {
  return <Button as={Link} href="/auth/login" size="lg" className="max-w-lg font-bold" color="primary">Login</Button>;
}
