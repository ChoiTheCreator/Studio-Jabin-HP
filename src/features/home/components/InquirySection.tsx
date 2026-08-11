"use client";

import { ArrowRightIcon, CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState, type FormEvent } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { contentShell, easeOut, eyebrow } from "@/components/ui/tailwind";
import { brand } from "@/config/brand";
import { budgetOptions, projectTypes, scheduleOptions, serviceOptions } from "@/config/inquiry";
import type { ApiResponse } from "@/server/shared/api-response";

type FormStatus = "idle" | "submitting" | "success" | "error";
type FieldErrors = Record<string, string>;

const fieldRow = "relative border-t border-white/35 pt-[18px] focus-within:border-navy-signal";
const fieldLabel = "mb-2.5 block text-[12px] font-bold";
const fieldControl =
  "w-full resize-y rounded-none border-0 bg-transparent p-0 pb-[22px] text-[16px] text-white outline-0 placeholder:text-white/35 sm:text-[18px]";
const fieldError = "mt-[-12px] mb-3 block text-[12px] text-navy-signal";

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
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      phone: formData.get("phone"),
      projectType: formData.get("projectType"),
      services: formData.getAll("services"),
      schedule: formData.get("schedule"),
      budget: formData.get("budget"),
      project: formData.get("project"),
      privacyConsent: formData.get("privacyConsent") === "on",
      website: formData.get("website"),
    };

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
    <section
      className="bg-navy-primary py-22 text-white sm:py-28 lg:py-32"
      id="contact"
      aria-labelledby="inquiry-title"
    >
      <div
        className={`${contentShell} grid gap-18 lg:grid-cols-[minmax(0,0.9fr)_minmax(520px,1.1fr)] lg:gap-20`}
      >
        <div>
          <Reveal>
            <p className={eyebrow}>START A PROJECT</p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="mt-9 mb-0 text-[38px] leading-[1.08] font-bold break-keep sm:text-[46px] lg:text-[54px]"
              id="inquiry-title"
            >
              필요한 시스템을,
              <br />
              함께 정의합시다.
            </h2>
          </Reveal>
          <Reveal delay={150} className="mt-12 grid gap-6.5 border-t border-white/35 pt-4.5">
            <p className="m-0 max-w-117.5 text-[16px] leading-[1.55] break-keep text-white/70">
              현재 상황과 필요한 범위를 알려주시면 기술 검토 후 일정과 견적을 함께 정리하겠습니다.
            </p>
            <a
              className="w-fit border-b border-current text-[18px] font-bold"
              href={`mailto:${brand.contactEmail}`}
            >
              {brand.contactEmail}
            </a>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <form className="grid" onSubmit={handleSubmit} noValidate>
            <div
              className="pointer-events-none absolute left-[-9999px] size-px overflow-hidden"
              aria-hidden="true"
            >
              <label htmlFor="website">웹사이트</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid sm:grid-cols-2">
              <div className={`${fieldRow} sm:pr-5`}>
                <label className={fieldLabel} htmlFor="name">
                  이름 *
                </label>
                <input
                  className={`${fieldControl} min-h-13.5`}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? "name-error" : undefined}
                />
                {fieldErrors.name ? (
                  <small className={fieldError} id="name-error">
                    {fieldErrors.name}
                  </small>
                ) : null}
              </div>
              <div className={`${fieldRow} sm:pl-5`}>
                <label className={fieldLabel} htmlFor="company">
                  회사 / 브랜드
                </label>
                <input
                  className={`${fieldControl} min-h-13.5`}
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  aria-invalid={Boolean(fieldErrors.company)}
                  aria-describedby={fieldErrors.company ? "company-error" : undefined}
                />
                {fieldErrors.company ? (
                  <small className={fieldError} id="company-error">
                    {fieldErrors.company}
                  </small>
                ) : null}
              </div>
            </div>

            <div className="grid sm:grid-cols-2">
              <div className={`${fieldRow} sm:pr-5`}>
                <label className={fieldLabel} htmlFor="email">
                  이메일 *
                </label>
                <input
                  className={`${fieldControl} min-h-13.5`}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? "email-error" : undefined}
                />
                {fieldErrors.email ? (
                  <small className={fieldError} id="email-error">
                    {fieldErrors.email}
                  </small>
                ) : null}
              </div>
              <div className={`${fieldRow} sm:pl-5`}>
                <label className={fieldLabel} htmlFor="phone">
                  연락처
                </label>
                <input
                  className={`${fieldControl} min-h-13.5`}
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  aria-invalid={Boolean(fieldErrors.phone)}
                  aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                />
                {fieldErrors.phone ? (
                  <small className={fieldError} id="phone-error">
                    {fieldErrors.phone}
                  </small>
                ) : null}
              </div>
            </div>

            <div className={fieldRow}>
              <label className={fieldLabel} htmlFor="projectType">
                프로젝트 유형 *
              </label>
              <div className="relative">
                <select
                  className={`${fieldControl} min-h-13.5 cursor-pointer appearance-none pr-10`}
                  id="projectType"
                  name="projectType"
                  defaultValue=""
                  required
                  aria-invalid={Boolean(fieldErrors.projectType)}
                  aria-describedby={fieldErrors.projectType ? "project-type-error" : undefined}
                >
                  <option value="" disabled className="text-navy-ink">
                    유형을 선택해 주세요
                  </option>
                  {projectTypes.map((option) => (
                    <option value={option} key={option} className="text-navy-ink">
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon
                  className="pointer-events-none absolute top-3 right-0 size-5"
                  aria-hidden="true"
                />
              </div>
              {fieldErrors.projectType ? (
                <small className={fieldError} id="project-type-error">
                  {fieldErrors.projectType}
                </small>
              ) : null}
            </div>

            <fieldset
              className={fieldRow}
              aria-describedby={fieldErrors.services ? "services-error" : undefined}
            >
              <legend className={fieldLabel}>필요한 범위 *</legend>
              <div className="grid grid-cols-2 gap-x-5 sm:grid-cols-3">
                {serviceOptions.map((service) => (
                  <label
                    className="flex min-h-11 cursor-pointer items-center gap-2.5 border-b border-white/20 text-[13px]"
                    key={service}
                  >
                    <input
                      className="size-4 shrink-0 cursor-pointer accent-navy-signal"
                      name="services"
                      type="checkbox"
                      value={service}
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
              {fieldErrors.services ? (
                <small className={`${fieldError} mt-3`} id="services-error">
                  {fieldErrors.services}
                </small>
              ) : null}
            </fieldset>

            <div className="grid sm:grid-cols-2">
              <div className={`${fieldRow} sm:pr-5`}>
                <label className={fieldLabel} htmlFor="schedule">
                  예상 일정
                </label>
                <div className="relative">
                  <select
                    className={`${fieldControl} min-h-13.5 cursor-pointer appearance-none pr-9`}
                    id="schedule"
                    name="schedule"
                    defaultValue=""
                    aria-invalid={Boolean(fieldErrors.schedule)}
                    aria-describedby={fieldErrors.schedule ? "schedule-error" : undefined}
                  >
                    <option value="" className="text-navy-ink">
                      선택하지 않음
                    </option>
                    {scheduleOptions.map((option) => (
                      <option value={option} key={option} className="text-navy-ink">
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon
                    className="pointer-events-none absolute top-3 right-0 size-5"
                    aria-hidden="true"
                  />
                </div>
                {fieldErrors.schedule ? (
                  <small className={fieldError} id="schedule-error">
                    {fieldErrors.schedule}
                  </small>
                ) : null}
              </div>
              <div className={`${fieldRow} sm:pl-5`}>
                <label className={fieldLabel} htmlFor="budget">
                  예산 구간
                </label>
                <div className="relative">
                  <select
                    className={`${fieldControl} min-h-13.5 cursor-pointer appearance-none pr-9`}
                    id="budget"
                    name="budget"
                    defaultValue=""
                    aria-invalid={Boolean(fieldErrors.budget)}
                    aria-describedby={fieldErrors.budget ? "budget-error" : undefined}
                  >
                    <option value="" className="text-navy-ink">
                      선택하지 않음
                    </option>
                    {budgetOptions.map((option) => (
                      <option value={option} key={option} className="text-navy-ink">
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon
                    className="pointer-events-none absolute top-3 right-0 size-5"
                    aria-hidden="true"
                  />
                </div>
                {fieldErrors.budget ? (
                  <small className={fieldError} id="budget-error">
                    {fieldErrors.budget}
                  </small>
                ) : null}
              </div>
            </div>

            <div className={fieldRow}>
              <label className={fieldLabel} htmlFor="project">
                프로젝트에 대해 알려주세요 *
              </label>
              <textarea
                className={`${fieldControl} min-h-37.5 leading-[1.45]`}
                id="project"
                name="project"
                rows={5}
                required
                minLength={20}
                placeholder="현재 상황, 필요한 기능, 참고 서비스 등을 적어주세요."
                aria-invalid={Boolean(fieldErrors.project)}
                aria-describedby={fieldErrors.project ? "project-error" : undefined}
              />
              {fieldErrors.project ? (
                <small className={fieldError} id="project-error">
                  {fieldErrors.project}
                </small>
              ) : null}
            </div>

            <div className="border-t border-white/35 pt-4.5">
              <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-normal">
                <input
                  className="mt-0.5 size-4 shrink-0 cursor-pointer accent-navy-signal"
                  name="privacyConsent"
                  type="checkbox"
                  required
                  aria-invalid={Boolean(fieldErrors.privacyConsent)}
                  aria-describedby={fieldErrors.privacyConsent ? "privacy-error" : undefined}
                />
                <span>
                  문의 접수를 위한 개인정보 수집 및 이용에 동의합니다.{" "}
                  <Link className="border-b border-current font-bold" href="/privacy">
                    내용 보기
                  </Link>
                </span>
              </label>
              {fieldErrors.privacyConsent ? (
                <small className={`${fieldError} mt-3`} id="privacy-error">
                  {fieldErrors.privacyConsent}
                </small>
              ) : null}
            </div>

            <button
              className={`mt-7 flex min-h-14.5 w-full cursor-pointer items-center justify-between rounded-lg bg-white px-5 font-bold text-navy-deep transition-[transform,background-color] duration-200 enabled:hover:-translate-y-0.5 enabled:hover:bg-navy-tint disabled:cursor-wait disabled:opacity-70 ${easeOut}`}
              type="submit"
              disabled={status === "submitting"}
            >
              <span>
                {status === "submitting"
                  ? "보내는 중"
                  : status === "success"
                    ? "접수 완료"
                    : "문의 보내기"}
              </span>
              {status === "success" ? (
                <CheckIcon className="size-4.75" aria-hidden="true" />
              ) : (
                <ArrowRightIcon className="size-4.75" aria-hidden="true" />
              )}
            </button>
            <p
              className={`mx-1.5 mt-3.5 mb-0 min-h-5.5 text-[13px] ${
                status === "success"
                  ? "text-navy-signal"
                  : status === "error"
                    ? "text-navy-signal"
                    : ""
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
