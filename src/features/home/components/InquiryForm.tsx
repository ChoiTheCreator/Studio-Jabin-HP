"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";

import { submitInquiry, type InquiryState } from "@/app/_actions/inquiry";
import { easeOut } from "@/components/ui/tailwind";
import { serviceOptions, type InquiryService, type InquiryType } from "@/config/inquiry";
import {
  getContactEntryPoint,
  getProjectStatus,
  getServiceType,
  startContact,
  trackEvent,
} from "@/lib/analytics";

import { InquiryPricingPanel } from "./InquiryPricingPanel";
import { InquiryScenarioSelector } from "./InquiryScenarioSelector";

const initialState: InquiryState = { status: "idle" };

type InquiryDetails = {
  idea: string;
  problem: string;
  materials: string;
  reference: string;
  currentState: string;
  continuationScope: string;
  resourceLink: string;
  constraints: string;
  serviceUrl: string;
  priorityIssue: string;
  issueContext: string;
  environment: string;
  expectedOutcome: string;
};

const initialDetails: InquiryDetails = {
  idea: "",
  problem: "",
  materials: "",
  reference: "",
  currentState: "",
  continuationScope: "",
  resourceLink: "",
  constraints: "",
  serviceUrl: "",
  priorityIssue: "",
  issueContext: "",
  environment: "",
  expectedOutcome: "",
};

const fieldRow = "relative border-t border-white/35 pt-[18px] focus-within:border-navy-signal";
const fieldLabel = "mb-2.5 block text-[12px] font-bold";
const fieldControl =
  "w-full resize-y rounded-none border-0 bg-transparent p-0 pb-[22px] text-[16px] text-white outline-0 placeholder:text-white/55 sm:text-[18px]";
const fieldMessage = "mt-0.5 mb-2.5 block text-[12px] text-red-300";

export function InquiryForm() {
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);
  const [scenario, setScenario] = useState<InquiryType | "">("");
  const [details, setDetails] = useState<InquiryDetails>(initialDetails);
  const [selectedServices, setSelectedServices] = useState<InquiryService[]>([]);
  const formStarted = useRef(false);
  const leadTracked = useRef(false);
  const errors = state.fields;
  const succeeded = state.status === "success";
  const detailsOrder =
    scenario === "concept"
      ? "[order:20]"
      : scenario === "continuation"
        ? "[order:40]"
        : "[order:60]";

  const updateDetail = (key: keyof InquiryDetails, value: string) => {
    setDetails((current) => ({ ...current, [key]: value }));
  };

  const selectScenario = (nextScenario: InquiryType | "") => {
    setScenario(nextScenario);
    if (!nextScenario) return;
    startContact("contact_section");
    trackEvent("project_status_select", { project_status: getProjectStatus(nextScenario) });
  };

  const selectService = (service: InquiryService, checked: boolean) => {
    setSelectedServices((current) =>
      checked ? [...new Set([...current, service])] : current.filter((item) => item !== service),
    );
    if (checked) trackEvent("service_select", { service_type: getServiceType(service) });
  };

  const startForm = () => {
    if (formStarted.current || !scenario) return;
    formStarted.current = true;
    trackEvent("form_start", {
      project_status: getProjectStatus(scenario),
      entry_point: getContactEntryPoint(),
    });
  };

  useEffect(() => {
    if (state.status !== "success" || leadTracked.current || !scenario) return;
    leadTracked.current = true;
    trackEvent("generate_lead", {
      project_status: getProjectStatus(scenario),
      service_type: selectedServices.map(getServiceType).sort().join(","),
      entry_point: getContactEntryPoint(),
    });
  }, [scenario, selectedServices, state.status]);

  return (
    <form className="grid" action={formAction}>
      <InquiryScenarioSelector
        error={errors?.inquiryType}
        selectedScenario={scenario}
        onChange={selectScenario}
      />

      {scenario ? (
        <div
          className={`grid border-b border-white/25 py-12 sm:py-14 lg:py-16 ${detailsOrder}`}
          id="inquiry-details"
          onFocusCapture={startForm}
        >
          <input name="inquiryType" type="hidden" value={scenario} />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_760px] lg:items-start lg:gap-16">
            <InquiryPricingPanel scenario={scenario} />

            <div className="grid">
              <div className="inquiry-fields-enter grid" key={scenario}>
                {scenario === "concept" ? (
                  <>
                    <div className={fieldRow}>
                      <label className={fieldLabel} htmlFor="idea">
                        어떤 서비스를 구상하고 계신가요? *
                      </label>
                      <textarea
                        className={`${fieldControl} min-h-28 leading-[1.5]`}
                        id="idea"
                        name="idea"
                        rows={4}
                        required
                        minLength={10}
                        placeholder="만들고 싶은 서비스와 현재 생각을 알려주세요."
                        value={details.idea}
                        onChange={(event) => updateDetail("idea", event.target.value)}
                      />
                    </div>
                    <div className={fieldRow}>
                      <label className={fieldLabel} htmlFor="problem">
                        누구의 어떤 문제를 해결하려 하나요? *
                      </label>
                      <textarea
                        className={`${fieldControl} min-h-28 leading-[1.5]`}
                        id="problem"
                        name="problem"
                        rows={4}
                        required
                        minLength={10}
                        placeholder="서비스를 사용할 사람과 해결하려는 문제를 적어주세요."
                        value={details.problem}
                        onChange={(event) => updateDetail("problem", event.target.value)}
                      />
                    </div>
                    <div className={fieldRow}>
                      <label className={fieldLabel} htmlFor="materials">
                        현재 준비된 자료가 있나요?
                      </label>
                      <select
                        className={`${fieldControl} min-h-13.5 appearance-none`}
                        id="materials"
                        name="materials"
                        value={details.materials}
                        onChange={(event) => updateDetail("materials", event.target.value)}
                      >
                        <option className="text-navy-ink" value="">
                          선택해 주세요
                        </option>
                        <option className="text-navy-ink">정리된 자료 없음</option>
                        <option className="text-navy-ink">아이디어 메모</option>
                        <option className="text-navy-ink">사업계획 또는 요구사항</option>
                        <option className="text-navy-ink">리서치 또는 참고자료</option>
                      </select>
                    </div>
                    <div className={fieldRow}>
                      <label className={fieldLabel} htmlFor="reference">
                        참고 서비스 또는 자료 링크
                      </label>
                      <input
                        className={`${fieldControl} min-h-13.5`}
                        id="reference"
                        name="reference"
                        type="text"
                        placeholder="URL 또는 서비스 이름"
                        value={details.reference}
                        onChange={(event) => updateDetail("reference", event.target.value)}
                      />
                    </div>
                  </>
                ) : null}

                {scenario === "continuation" ? (
                  <>
                    <div className={fieldRow}>
                      <label className={fieldLabel} htmlFor="currentState">
                        현재 어디까지 준비되어 있나요? *
                      </label>
                      <textarea
                        className={`${fieldControl} min-h-28 leading-[1.5]`}
                        id="currentState"
                        name="currentState"
                        rows={4}
                        required
                        minLength={10}
                        placeholder="기획서, Figma, 프로토타입, 코드, MVP 등 현재 결과물을 알려주세요."
                        value={details.currentState}
                        onChange={(event) => updateDetail("currentState", event.target.value)}
                      />
                    </div>
                    <div className={fieldRow}>
                      <label className={fieldLabel} htmlFor="continuationScope">
                        어느 부분부터 이어서 맡기고 싶으신가요? *
                      </label>
                      <textarea
                        className={`${fieldControl} min-h-28 leading-[1.5]`}
                        id="continuationScope"
                        name="continuationScope"
                        rows={4}
                        required
                        minLength={10}
                        placeholder="이어갈 작업과 현재 중단된 지점을 알려주세요."
                        value={details.continuationScope}
                        onChange={(event) => updateDetail("continuationScope", event.target.value)}
                      />
                    </div>
                    <div className={fieldRow}>
                      <label className={fieldLabel} htmlFor="resourceLink">
                        검토할 수 있는 자료 링크
                      </label>
                      <input
                        className={`${fieldControl} min-h-13.5`}
                        id="resourceLink"
                        name="resourceLink"
                        type="text"
                        placeholder="Figma, Repository 또는 서비스 URL"
                        value={details.resourceLink}
                        onChange={(event) => updateDetail("resourceLink", event.target.value)}
                      />
                    </div>
                    <div className={fieldRow}>
                      <label className={fieldLabel} htmlFor="constraints">
                        반드시 유지해야 하는 조건이 있나요?
                      </label>
                      <textarea
                        className={`${fieldControl} min-h-24 leading-[1.5]`}
                        id="constraints"
                        name="constraints"
                        rows={3}
                        placeholder="기능, 디자인, 기술 또는 일정 조건"
                        value={details.constraints}
                        onChange={(event) => updateDetail("constraints", event.target.value)}
                      />
                    </div>
                  </>
                ) : null}

                {scenario === "improvement" ? (
                  <>
                    <div className={fieldRow}>
                      <label className={fieldLabel} htmlFor="serviceUrl">
                        현재 서비스 URL
                      </label>
                      <input
                        className={`${fieldControl} min-h-13.5`}
                        id="serviceUrl"
                        name="serviceUrl"
                        type="url"
                        placeholder="공개 가능한 경우 입력해 주세요."
                        value={details.serviceUrl}
                        onChange={(event) => updateDetail("serviceUrl", event.target.value)}
                      />
                    </div>
                    <div className={fieldRow}>
                      <label className={fieldLabel} htmlFor="priorityIssue">
                        가장 먼저 해결하고 싶은 문제는 무엇인가요? *
                      </label>
                      <select
                        className={`${fieldControl} min-h-13.5 appearance-none`}
                        id="priorityIssue"
                        name="priorityIssue"
                        required
                        value={details.priorityIssue}
                        onChange={(event) => updateDetail("priorityIssue", event.target.value)}
                      >
                        <option className="text-navy-ink" value="">
                          선택해 주세요
                        </option>
                        <option className="text-navy-ink">기능 추가 또는 개선</option>
                        <option className="text-navy-ink">속도와 성능</option>
                        <option className="text-navy-ink">서버 안정성과 트래픽</option>
                        <option className="text-navy-ink">클라우드 비용</option>
                        <option className="text-navy-ink">보안</option>
                        <option className="text-navy-ink">UI/UX와 반응형</option>
                        <option className="text-navy-ink">SEO</option>
                        <option className="text-navy-ink">오래된 코드와 유지보수</option>
                      </select>
                    </div>
                    <div className={fieldRow}>
                      <label className={fieldLabel} htmlFor="issueContext">
                        현재 문제와 발생 상황을 알려주세요. *
                      </label>
                      <textarea
                        className={`${fieldControl} min-h-28 leading-[1.5]`}
                        id="issueContext"
                        name="issueContext"
                        rows={4}
                        required
                        minLength={10}
                        placeholder="언제, 어떤 상황에서 문제가 발생하는지 적어주세요."
                        value={details.issueContext}
                        onChange={(event) => updateDetail("issueContext", event.target.value)}
                      />
                    </div>
                    <div className={fieldRow}>
                      <label className={fieldLabel} htmlFor="environment">
                        현재 기술 또는 서버 환경
                      </label>
                      <input
                        className={`${fieldControl} min-h-13.5`}
                        id="environment"
                        name="environment"
                        type="text"
                        placeholder="알고 있는 범위에서 적어주세요."
                        value={details.environment}
                        onChange={(event) => updateDetail("environment", event.target.value)}
                      />
                    </div>
                    <div className={fieldRow}>
                      <label className={fieldLabel} htmlFor="expectedOutcome">
                        개선 이후 기대하는 결과
                      </label>
                      <textarea
                        className={`${fieldControl} min-h-24 leading-[1.5]`}
                        id="expectedOutcome"
                        name="expectedOutcome"
                        rows={3}
                        placeholder="가장 중요하게 보는 변화가 있다면 알려주세요."
                        value={details.expectedOutcome}
                        onChange={(event) => updateDetail("expectedOutcome", event.target.value)}
                      />
                    </div>
                  </>
                ) : null}
              </div>

              <p className="mt-3 mb-8 text-[12px] leading-[1.6] text-white/65">
                비밀번호, API 키와 서버 접속 정보는 입력하지 마세요.
              </p>
              {errors?.project ? <span className={fieldMessage}>{errors.project}</span> : null}

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
                        onChange={(event) => selectService(service, event.target.checked)}
                      />
                      <span>{service}</span>
                    </label>
                  ))}
                </div>
                {errors?.services ? <span className={fieldMessage}>{errors.services}</span> : null}
              </fieldset>

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

              <input
                className="sr-only"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <p className="mt-7 mb-0 min-h-6 text-[13px]" role="status" aria-live="polite">
                {succeeded
                  ? "문의가 접수되었습니다. 대표와 기술 책임자가 내용을 검토한 뒤 연락드리겠습니다."
                  : null}
                {state.status === "error" ? (
                  <span className="text-red-300">{state.message}</span>
                ) : null}
              </p>

              <button
                className={`flex min-h-14.5 w-full cursor-pointer items-center justify-between rounded-lg bg-white px-5 font-bold text-navy-deep transition-[transform,background-color] duration-200 not-disabled:hover:-translate-y-0.5 not-disabled:hover:bg-navy-tint disabled:cursor-default disabled:opacity-70 ${easeOut}`}
                type="submit"
                disabled={isPending || succeeded}
              >
                <span>{succeeded ? "접수 완료" : isPending ? "보내는 중" : "프로젝트 문의"}</span>
                <ArrowRightIcon className="size-4.75" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </form>
  );
}
