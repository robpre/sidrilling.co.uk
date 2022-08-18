import { useRouter } from "next/router";

export const HeaderNav = ({
  className,
  vertical,
}: {
  className?: string;
  vertical?: boolean;
}) => {
  const { asPath } = useRouter();

  return (
    <nav className={className}>
      <ul className={`menu ${vertical ? "vertical" : ""}`}>
        <li>
          <a className={`${asPath === "/" ? "active" : ""}`} href="/">
            <span>Home</span>
          </a>
        </li>
        <li>
          <a
            className={`${asPath === "/services-what-we-do/" ? "active" : ""}`}
            href="/services-what-we-do/"
          >
            <span>What we do</span>
          </a>
        </li>
        <li>
          <a
            className={`${asPath === "/team-who-we-are/" ? "active" : ""}`}
            href="/team-who-we-are/"
          >
            <span>Who we are</span>
          </a>
        </li>
        <li>
          <a
            className={`${asPath === "/equipment/" ? "active" : ""}`}
            href="/equipment/"
          >
            <span>Equipment</span>
          </a>
        </li>
        <li>
          <a
            className={`${asPath === "/case-studies/" ? "active" : ""}`}
            href="/case-studies/"
          >
            <span>Case Studies</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};
