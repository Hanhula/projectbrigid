import { Github, Heart } from "lucide-react";
import "./footer.scss";

const PROJECT_URL = "https://github.com/Hanhula/projectbrigid";
const KOFI_URL = "https://ko-fi.com/hanhula";

const Footer = () => (
  <footer className="site-footer bg-dark">
    <div className="site-footer-inner">
      <span>Copyright © 2026 Hanhula and contributors ♥</span>
      <span className="site-footer-license">
        Project Brigid is free software licensed under the GNU GPLv3.
      </span>
      <a
        href={PROJECT_URL}
        target="_blank"
        rel="noreferrer"
        title="View Project Brigid on GitHub"
      >
        <Github size={16} aria-hidden="true" />
        GitHub
      </a>
      <span className="site-footer-support">
        <Heart size={15} aria-hidden="true" />
        Primary development by Hanhula. Support the project on{" "}
        <a
          href={KOFI_URL}
          target="_blank"
          rel="noreferrer"
          title="Support Hanhula on Ko-fi"
        >
          Ko-fi!
        </a>
      </span>
    </div>
  </footer>
);

export default Footer;
