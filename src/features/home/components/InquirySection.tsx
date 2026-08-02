"use client";

import { ArrowRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { FormEvent, useState } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { brand } from "@/config/brand";
import type { ApiResponse } from "@/server/shared/api-response";

type FormStatus = "idle" | "submitting" | "success" | "error";
type FieldErrors = Record<string, string>;

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
    <section className="inquiry" id="contact" aria-labelledby="inquiry-title">
      <div className="page-shell inquiry__inner">
        <div className="inquiry__intro">
          <Reveal>
            <p className="eyebrow">START A PROJECT</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="inquiry-title">
              다음 장면을
              <br />
              같이 만듭시다.
            </h2>
          </Reveal>
          <Reveal delay={150} className="inquiry__contact-meta">
            <p>새로운 브랜드, 웹사이트, 디지털 제품에 관해 편하게 이야기해 주세요.</p>
            <a href={`mailto:${brand.contactEmail}`}>{brand.contactEmail}</a>
          </Reveal>
        </div>

        <Reveal className="inquiry__form-wrap" delay={120}>
          <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <label htmlFor="name">이름 *</label>
              <input id="name" name="name" type="text" autoComplete="name" required aria-describedby={fieldErrors.name ? "name-error" : undefined} />
              {fieldErrors.name ? <small id="name-error">{fieldErrors.name}</small> : null}
            </div>
            <div className="form-row">
              <label htmlFor="email">이메일 *</label>
              <input id="email" name="email" type="email" autoComplete="email" required aria-describedby={fieldErrors.email ? "email-error" : undefined} />
              {fieldErrors.email ? <small id="email-error">{fieldErrors.email}</small> : null}
            </div>
            <div className="form-row">
              <label htmlFor="company">회사 / 브랜드</label>
              <input id="company" name="company" type="text" autoComplete="organization" aria-describedby={fieldErrors.company ? "company-error" : undefined} />
              {fieldErrors.company ? <small id="company-error">{fieldErrors.company}</small> : null}
            </div>
            <div className="form-row form-row--message">
              <label htmlFor="project">프로젝트에 대해 알려주세요 *</label>
              <textarea id="project" name="project" rows={4} required minLength={20} aria-describedby={fieldErrors.project ? "project-error" : undefined} />
              {fieldErrors.project ? <small id="project-error">{fieldErrors.project}</small> : null}
            </div>
            <button className="submit-button" type="submit" disabled={status === "submitting"}>
              <span>{status === "submitting" ? "보내는 중" : status === "success" ? "접수 완료" : "문의 보내기"}</span>
              {status === "success" ? <CheckIcon aria-hidden="true" /> : <ArrowRightIcon aria-hidden="true" />}
            </button>
            <p className={`form-result form-result--${status}`} aria-live="polite">
              {message}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
