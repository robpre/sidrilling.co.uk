import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export type LayoutName =
  | "case-studies"
  | "home"
  | "what-we-do"
  | "equipment"
  | "layout";

const loopUntil = (tryer: () => boolean, done: () => void) => {
  let clearTimer: (() => void) | null = null;

  const tryit = () => {
    if (tryer()) {
      done();
      return;
    }

    const timeout = setTimeout(tryit, 250);

    clearTimer = () => clearTimeout(timeout);
  };

  tryit();

  return () => {
    clearTimer?.();
  };
};

export const Layout = ({
  layout,
  children,
}: PropsWithChildren<{ layout: LayoutName }>) => {
  const header = useRef<HTMLElement>(null);
  const footer = useRef<HTMLElement>(null);

  const [style, setStyle] = useState({
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      if (header.current && footer.current) {
        const top = header.current.clientHeight;
        const tail = footer.current.clientHeight;

        setStyle({
          paddingTop: top,
          paddingBottom: tail,
          marginBottom: -tail,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    const cleanup = loopUntil(
      () => Boolean(header.current && footer.current),
      handleResize
    );

    return () => {
      window.removeEventListener("resize", handleResize);
      cleanup();
    };
  }, []);

  return (
    <div className={`layout-file-${layout}`}>
      <Header ref={header} />
      <main className="main-layout" style={style}>
        <div className="main-wrapper">{children}</div>
      </main>
      <Footer ref={footer} />
    </div>
  );
};
