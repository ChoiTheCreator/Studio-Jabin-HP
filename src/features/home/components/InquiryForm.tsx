"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useActionState } from "react";

import { submitInquiry, type InquiryState } from "@/app/_actions/inquiry";
import { easeOut } from "@/components/ui/tailwind";
import { serviceOptions } from "@/config/inquiry";

const initialState: InquiryState = { status: "idle" };

const fieldRow = "relative border-t border-white/35 pt-[18px] focus-within:border-navy-signal";
const fieldLabel = "mb-2.5 block text-[12px] font-bold";
const fieldControl =
  "w-full resize-y rounded-none border-0 bg-transparent p-0 pb-[22px] text-[16px] text-white outline-0 placeholder:text-white/35 sm:text-[18px]";
const fieldMessage = "mt-0.5 mb-2.5 block text-[12px] text-red-300";

export function InquiryForm() {
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);
  const errors = state.fields;
  const succeeded = state.status === "success";

  return (
    <form className="grid" action={formAction}>
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
            aria-invalid={Boolean(errors?.name)}
            aria-describedby={errors?.name ? "name-error" : undefined}
          />
          {errors?.name ? (
            <span className={fieldMessage} id="name-error">
              {errors.name}
            </span>
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
            aria-invalid={Boolean(errors?.company)}
            aria-describedby={errors?.company ? "company-error" : undefined}
          />
          {errors?.company ? (
            <span className={fieldMessage} id="company-error">
              {errors.company}
            </span>
          ) : null}
        </div>
      </div>

      <div className={fieldRow}>
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
          aria-invalid={Boolean(errors?.email)}
          aria-describedby={errors?.email ? "email-error" : undefined}
        />
        {errors?.email ? (
          <span className={fieldMessage} id="email-error">
            {errors.email}
          </span>
        ) : null}
      </div>

      <fieldset className={fieldRow}>
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
        {errors?.services ? <span className={fieldMessage}>{errors.services}</span> : null}
      </fieldset>

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
          aria-invalid={Boolean(errors?.project)}
          aria-describedby={errors?.project ? "project-error" : undefined}
        />
        {errors?.project ? (
          <span className={fieldMessage} id="project-error">
            {errors.project}
          </span>
        ) : null}
      </div>

      <div className="border-t border-white/35 pt-4.5">
        <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-normal">
          <input
            className="mt-0.5 size-4 shrink-0 cursor-pointer accent-navy-signal"
            name="privacyConsent"
            type="checkbox"
            required
          />
          <span>
            문의 접수를 위한 개인정보 수집 및 이용에 동의합니다.{" "}
            <Link className="border-b border-current font-bold" href="/privacy">
              내용 보기
            </Link>
          </span>
        </label>
        {errors?.privacyConsent ? (
          <span className={fieldMessage}>{errors.privacyConsent}</span>
        ) : null}
      </div>

      {/* honeypot. 사람에게는 보이지 않고 자동 제출만 값을 채운다. */}
      <input
        className="sr-only"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <p className="mt-7 mb-0 min-h-6 text-[13px]" role="status" aria-live="polite">
        {succeeded ? "문의가 접수되었습니다. 확인 후 회신드리겠습니다." : null}
        {state.status === "error" ? <span className="text-red-300">{state.message}</span> : null}
      </p>

      <button
        className={`flex min-h-14.5 w-full cursor-pointer items-center justify-between rounded-lg bg-white px-5 font-bold text-navy-deep transition-[transform,background-color] duration-200 not-disabled:hover:-translate-y-0.5 not-disabled:hover:bg-navy-tint disabled:cursor-default disabled:opacity-70 ${easeOut}`}
        type="submit"
        disabled={isPending || succeeded}
      >
        <span>{succeeded ? "접수 완료" : isPending ? "보내는 중" : "문의 보내기"}</span>
        <ArrowRightIcon className="size-4.75" aria-hidden="true" />
      </button>
    </form>
  );
}
