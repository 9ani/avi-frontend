"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@components/common/Button";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"request" | "verify">("request");
  const [code, setCode] = useState("");
  const [resendTimer, setResendTimer] = useState(60);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    // TODO: integrate with backend reset password request
    setTimeout(() => {
      setIsLoading(false);
      setStep("verify");
      setResendTimer(60);
    }, 600);
  };

  React.useEffect(() => {
    if (step !== "verify") return;
    if (resendTimer <= 0) return;
    const id = setInterval(
      () => setResendTimer((v) => (v > 0 ? v - 1 : 0)),
      1000
    );
    return () => clearInterval(id);
  }, [step, resendTimer]);

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    // TODO: integrate with backend verification
    setTimeout(() => {
      setIsLoading(false);
      // success flow goes here
    }, 600);
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    // TODO: integrate with backend resend code
    setResendTimer(60);
  };

  return (
    <>
      {/* wrapper to stack content vertically inside parent flex container */}
      <div className="w-full max-w-[640px] flex flex-col">
        {step === "request" && (
          <>
            <div className="mb-6 flex flex-col items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-(--color-button-hover) flex items-center justify-center">
                <span aria-hidden>🔒</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-(--color-text)">
                  Сброс пароля
                </h1>
                <p className="text-(--color-text-gray) text-[13px]">
                  Укажите адрес электронной почты, который вы использовали при
                  регистрации в Shai. Мы отправим вам письмо для сброса пароля.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="w-full ">
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="my-2 text-(--color-text) font-semibold"
                >
                  Адрес электронной почты
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    placeholder="Ваш адрес электронной почты"
                    className="w-full rounded-md bg-[#f3eee6] text-(--color-text) placeholder:text-(--color-text-gray) px-4 py-3 outline-none border border-transparent focus:border-(--color-accent)"
                  />
                </div>
              </div>

              <div className="mb-2">
                <Button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  disabled={isLoading || !email}
                  className="w-full rounded-lg bg-(--color-accent) py-3 text-(--color-accent-contrast) hover:bg-(--color-accent-hover) disabled:opacity-60 cursor-pointer"
                >
                  Отправить код подтверждения
                </Button>
              </div>
            </form>

            <div className="mt-4 text-[13px] text-center">
              <Link
                href="/login"
                className=" inline-flex items-center gap-2 text-(--color-text-gray) hover:text-(--color-text)"
              >
                <span aria-hidden>←</span>
                Назад ко входу
              </Link>
            </div>
          </>
        )}

        {step === "verify" && (
          <>
            <div className="mb-6 flex flex-col items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-(--color-button-hover) flex items-center justify-center">
                <span aria-hidden>✉️</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-(--color-text)">
                  Проверьте почту
                </h1>
                <p className="text-(--color-text-gray) text-[13px]">
                  Мы отправили код подтверждения на{" "}
                  <span className="font-semibold text-(--color-text)">
                    {email}
                  </span>
                </p>
                <p className="text-(--color-text-gray) text-[13px]">
                  Код действителен в течение 5 минут
                </p>
              </div>
            </div>

            <form onSubmit={handleVerify} className="w-full">
              <label
                htmlFor="code"
                className="my-2 text-(--color-text) font-semibold"
              >
                Код подтверждения
              </label>
              <div className="mt-1">
                <input
                  id="code"
                  inputMode="numeric"
                  pattern="\\d{6}"
                  maxLength={6}
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  placeholder="Введите 6-значный код"
                  className="w-full rounded-md bg-[#f3eee6] text-(--color-text) placeholder:text-(--color-text-gray) px-4 py-3 outline-none border border-transparent focus:border-(--color-accent) tracking-widest"
                />
              </div>

              <div className="mt-3">
                <Button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleVerify();
                  }}
                  disabled={isLoading || code.length !== 6}
                  className="w-full rounded-lg bg-(--color-accent) py-3 text-(--color-accent-contrast) hover:bg-(--color-accent-hover) disabled:opacity-60 cursor-pointer"
                >
                  Подтвердить
                </Button>
              </div>
            </form>

            <div className="mt-3 text-[13px] text-(--color-text-gray)">
              {resendTimer > 0 ? (
                <span>Не получили код? {resendTimer}с</span>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-(--color-text) underline"
                >
                  Отправить код ещё раз
                </button>
              )}
            </div>

            <div className="mt-6 text-[13px] text-center cursor-pointer">
              <button
                onClick={() => setStep("request")}
                className=" inline-flex items-center gap-2 text-(--color-text-gray) hover:text-(--color-text)"
              >
                <span aria-hidden>←</span>
                Назад
              </button>
            </div>
          </>
        )}
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 text-[12px] text-(--color-text-gray)">
        работает на shai.pro
      </div>
    </>
  );
}
