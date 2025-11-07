"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@components/common/Button";

function noop(e?: React.FormEvent) {
  if (e) e.preventDefault();
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInvite] = useState(false);

  const isEmailSetup = useMemo(() => Boolean(email), [email]);

  const handleEmailPasswordLogin = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 600);
  };

  return (
    <>
      <form onSubmit={noop} className="w-full max-w-[480px]">
        <div className="mb-3">
          <label
            htmlFor="email"
            className="my-2 text-(--color-text) font-semibold"
          >
            Адрес электронной почты
          </label>
          <div className="mt-1">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isInvite}
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Ваш адрес электронной почты"
              tabIndex={1}
              className="w-full rounded-md bg-[#F5F0EC] text-(--color-text) placeholder:text-(--color-text-gray) px-4 py-3 outline-none border border-transparent focus:border-(--color-accent)"
            />
          </div>
        </div>

        <div className="mb-3">
          <label
            htmlFor="password"
            className="my-2 flex items-center justify-between"
          >
            <span className="font-semibold text-(--color-text)">Пароль</span>
            <Link
              href="/reset-password"
              className={[
                "text-[12px]",
                isEmailSetup
                  ? "text-(--color-accent) hover:underline"
                  : "pointer-events-none text-(--color-text-gray)",
              ].join(" ")}
              tabIndex={isEmailSetup ? 0 : -1}
              aria-disabled={!isEmailSetup}
            >
              Забыли пароль?
            </Link>
          </label>
          <div className="relative mt-1">
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleEmailPasswordLogin();
              }}
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Ваш пароль"
              tabIndex={2}
              className="w-full rounded-md bg-[#F5F0EC] text-(--color-text) placeholder:text-(--color-text-gray) px-4 py-3 pr-12 outline-none border border-transparent focus:border-(--color-accent)"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <Button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="rounded-md px-3 py-2 text-(--color-text) hover:bg-(--color-button-hover)"
              >
                👀
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-2">
          <Button
            tabIndex={2}
            onClick={(e) => {
              e.preventDefault();
              handleEmailPasswordLogin();
            }}
            disabled={isLoading || !email || !password}
            className="w-full rounded-lg bg-(--color-accent) py-3 text-(--color-accent-contrast) hover:bg-(--color-accent-hover) disabled:opacity-60 cursor-pointer"
          >
            Войти
          </Button>
        </div>
      </form>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 text-[12px] text-(--color-text-gray)">
        работает на shai.pro
      </div>
    </>
  );
}
