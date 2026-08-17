import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type InquiryEmailProps = {
  name: string;
  company: string;
  email: string;
  inquiryType: string;
  services: string[];
  project: string;
  receivedAt: string;
};

const colors = {
  background: "#f3f5f8",
  border: "#d9dde5",
  ink: "#080d1c",
  muted: "#667085",
  signal: "#2357c6",
  white: "#ffffff",
};

export function InquiryEmail({
  name,
  company,
  email,
  inquiryType,
  services,
  project,
  receivedAt,
}: InquiryEmailProps) {
  return (
    <Html lang="ko">
      <Head />
      <Preview>
        {inquiryType} 문의 · {name}
      </Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={eyebrow}>JABIN STUDIO / NEW INQUIRY</Text>
            <Heading style={heading}>{inquiryType}</Heading>
            <Text style={lead}>
              {name}
              {company ? ` · ${company}` : ""}
            </Text>
          </Section>

          <Section style={section}>
            <Text style={label}>CONTACT</Text>
            <Text style={value}>{email}</Text>
            <Text style={meta}>{company || "회사 / 브랜드 미입력"}</Text>
          </Section>

          <Hr style={rule} />

          <Section style={section}>
            <Text style={label}>REQUESTED SCOPE</Text>
            <Text style={value}>{services.join(" · ")}</Text>
          </Section>

          <Hr style={rule} />

          <Section style={section}>
            <Text style={label}>PROJECT DETAILS</Text>
            <Text style={projectText}>{project}</Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>접수 시각 · {receivedAt}</Text>
            <Text style={footerText}>이 메일에 답장하면 문의자에게 바로 전달됩니다.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  margin: "0",
  backgroundColor: colors.background,
  color: colors.ink,
  fontFamily: "Arial, 'Noto Sans KR', sans-serif",
};

const container = {
  width: "100%",
  maxWidth: "640px",
  margin: "40px auto",
  backgroundColor: colors.white,
  borderTop: `4px solid ${colors.signal}`,
};

const header = { padding: "40px 40px 32px" };
const section = { padding: "28px 40px" };
const footer = { padding: "24px 40px", backgroundColor: colors.ink };
const eyebrow = {
  margin: "0 0 28px",
  color: colors.signal,
  fontSize: "11px",
  fontWeight: "700",
};
const heading = {
  margin: "0",
  color: colors.ink,
  fontSize: "32px",
  lineHeight: "1.2",
};
const lead = { margin: "12px 0 0", color: colors.muted, fontSize: "16px" };
const label = {
  margin: "0 0 10px",
  color: colors.signal,
  fontSize: "11px",
  fontWeight: "700",
};
const value = { margin: "0", color: colors.ink, fontSize: "18px", fontWeight: "700" };
const meta = { margin: "8px 0 0", color: colors.muted, fontSize: "14px" };
const projectText = {
  margin: "0",
  color: colors.ink,
  fontSize: "15px",
  lineHeight: "1.7",
  whiteSpace: "pre-wrap" as const,
};
const rule = { margin: "0 40px", borderColor: colors.border };
const footerText = { margin: "0 0 6px", color: "#c9d0dc", fontSize: "12px" };
