"use client";

import { ArrowRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { FormEvent, useState } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { easeOut, eyebrow, pageShell } from "@/components/ui/tailwind";
import { brand } from "@/config/brand";
import type { ApiResponse } from "@/server/shared/api-response";

type FormStatus = "idle" | "submitting" | "success" | "error";
type FieldErrors = Record<string, string>;

const fieldRow = "relative border-t border-white/50 pt-[18px] focus-within:border-lime";
const fieldLabel = "mb-2.5 block text-[12px] font-bold";
const fieldControl = "w-full resize-y rounded-none border-0 bg-transparent p-0 pb-[22px] text-[20px] text-white outline-0";
const fieldError = "absolute right-0 bottom-1.5 text-[11px] text-[#fff27d]";

export function InquirySection() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");
    setFieldErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as ApiResponse<{ id: string; receivedAt: string }>;

      if (!result.ok) {
        setStatus("error");
        setMessage(result.error.message);
        setFieldErrors(result.error.fields ?? {});
        return;
      }

      form.reset();
      setStatus("success");
      setMessage("문의가 접수되었습니다. 내용을 확인한 뒤 이메일로 연락드리겠습니다.");
    } catch {
      setStatus("error");
      setMessage("네트워크 연결을 확인한 뒤 다시 시도해 주세요.");
    }
  }

  return (
    <section className="bg-blue py-[88px] text-white sm:py-28 lg:py-36" id="contact" aria-labelledby="inquiry-title">
      <div className={`${pageShell} grid gap-[72px] lg:grid-cols-[minmax(0,1fr)_minmax(500px,0.9fr)] lg:gap-28`}>
        <div>
          <Reveal>
            <p className={eyebrow}>START A PROJECT</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-9 mb-0 text-[50px] leading-[0.95] font-bold [word-break:keep-all] sm:text-[74px] lg:text-[92px]" id="inquiry-title">
              다음 장면을
              <br />
              같이 만듭시다.
            </h2>
          </Reveal>
          <Reveal delay={150} className="mt-12 grid gap-[26px] border-t border-white/50 pt-[18px]">
            <p className="m-0 max-w-[440px] text-[16px] leading-[1.55] text-white/70">
              새로운 브랜드, 웹사이트, 디지털 제품에 관해 편하게 이야기해 주세요.
            </p>
            <a className="w-fit border-b border-current text-[18px] font-bold" href={`mailto:${brand.contactEmail}`}>
              {brand.contactEmail}
            </a>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <form className="grid" onSubmit={handleSubmit} noValidate>
            <div className={fieldRow}>
              <label className={fieldLabel} htmlFor="name">이름 *</label>
              <input className={`${fieldControl} min-h-[54px]`} id="name" name="name" type="text" autoComplete="name" required aria-describedby={fieldErrors.name ? "name-error" : undefined} />
              {fieldErrors.name ? <small className={fieldError} id="name-error">{fieldErrors.name}</small> : null}
            </div>
            <div className={fieldRow}>
              <label className={fieldLabel} htmlFor="email">이메일 *</label>
              <input className={`${fieldControl} min-h-[54px]`} id="email" name="email" type="email" autoComplete="email" required aria-describedby={fieldErrors.email ? "email-error" : undefined} />
              {fieldErrors.email ? <small className={fieldError} id="email-error">{fieldErrors.email}</small> : null}
            </div>
            <div className={fieldRow}>
              <label className={fieldLabel} htmlFor="company">회사 / 브랜드</label>
              <input className={`${fieldControl} min-h-[54px]`} id="company" name="company" type="text" autoComplete="organization" aria-describedby={fieldErrors.company ? "company-error" : undefined} />
              {fieldErrors.company ? <small className={fieldError} id="company-error">{fieldErrors.company}</small> : null}
            </div>
            <div className={fieldRow}>
              <label className={fieldLabel} htmlFor="project">프로젝트에 대해 알려주세요 *</label>
              <textarea className={`${fieldControl} min-h-[140px] leading-[1.45]`} id="project" name="project" rows={4} required minLength={20} aria-describedby={fieldErrors.project ? "project-error" : undefined} />
              {fieldErrors.project ? <small className={fieldError} id="project-error">{fieldErrors.project}</small> : null}
            </div>
            <button
              className={`mt-3 flex min-h-[58px] w-full cursor-pointer items-center justify-between rounded-full bg-lime px-5 font-bold text-ink transition-[transform,background-color] duration-200 enabled:hover:-translate-y-[3px] enabled:hover:bg-white disabled:cursor-wait disabled:opacity-70 ${easeOut}`}
              type="submit"
              disabled={status === "submitting"}
            >
              <span>{status === "submitting" ? "보내는 중" : status === "success" ? "접수 완료" : "문의 보내기"}</span>
              {status === "success" ? <CheckIcon className="size-[19px]" aria-hidden="true" /> : <ArrowRightIcon className="size-[19px]" aria-hidden="true" />}
            </button>
            <p
              className={`mx-1.5 mt-3.5 mb-0 min-h-[22px] text-[13px] ${
                status === "success" ? "text-lime" : status === "error" ? "text-[#fff27d]" : ""
              }`}
              aria-live="polite"
            >
              {message}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
