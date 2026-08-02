import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell site-footer__inner">
        <Link className="footer-wordmark" href="#top">
          JABO/STUDIO
        </Link>
        <div className="site-footer__meta">
          <p>Strategy · Design · Technology</p>
          <p>Seoul, Republic of Korea</p>
          <p>© {new Date().getFullYear()} Studio JABO</p>
        </div>
      </div>
    </footer>
  );
}
