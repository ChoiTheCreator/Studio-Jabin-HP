import type { ComponentPropsWithoutRef } from "react";

type TextHighlightProps = ComponentPropsWithoutRef<"mark">;

export function TextHighlight({ className, ...props }: TextHighlightProps) {
  return (
    <mark
      className={`bg-lime box-decoration-clone px-[0.07em] py-[0.025em] text-inherit ${className ?? ""}`}
      {...props}
    />
  );
}
