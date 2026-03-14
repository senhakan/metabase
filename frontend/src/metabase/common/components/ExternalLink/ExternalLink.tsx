import type { AnchorHTMLAttributes, ReactNode, Ref } from "react";
import { forwardRef } from "react";

import CS from "metabase/css/core/index.css";
import { getUrlTarget } from "metabase/lib/dom";

import S from "./ExternalLink.module.css";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  target?: string;
  className?: string;
  children?: ReactNode;
}

function getSafeHref(href?: string): string | undefined {
  if (!href) {
    return undefined;
  }

  try {
    const url = new URL(href, window.location.origin);
    return url.origin === window.location.origin ? href : undefined;
  } catch {
    return undefined;
  }
}

export const ExternalLink = forwardRef(function ExternalLink(
  { href, target = getUrlTarget(href), className, children, ...props }: Props,
  ref: Ref<HTMLAnchorElement>,
) {
  const safeHref = getSafeHref(href);

  return (
    <a
      ref={ref}
      role="link"
      href={safeHref}
      className={`${S.LinkRoot} ${className || CS.link}`}
      target={safeHref ? target : undefined}
      // prevent malicious pages from navigating us away
      rel={safeHref ? "noopener noreferrer" : undefined}
      // disables quickfilter in tables
      onClickCapture={(e) => e.stopPropagation()}
      onClick={(e) => {
        if (!safeHref) {
          e.preventDefault();
        }
      }}
      aria-disabled={!safeHref}
      {...props}
    >
      {children}
    </a>
  );
});

export const ButtonLink = forwardRef(function ButtonLink(
  props: Props,
  ref: Ref<HTMLAnchorElement>,
) {
  return <ExternalLink {...props} className={S.ButtonLink} ref={ref} />;
});
