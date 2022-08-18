import { forwardRef } from "react";
import { Accreditations } from "./Accreditations/Accreditations";
import { HeaderNav } from "./HeaderNav";
import { QuickContact } from "./QuickContact";

export const Header = forwardRef<HTMLElement>((props, ref) => (
  <header ref={ref}>
    <div className="row">
      <div className="columns small-9 medium-12">
        <div className="logo-quick-contact">
          <div className="row">
            <div className="columns small-12 medium-3">
              <div className="logo">
                <a href="/">
                  S I Drilling
                  <sub>Cable Percussion Ltd</sub>
                </a>
              </div>
            </div>
            <div className="columns small-12 medium-9 show-for-medium">
              <div className="contact-and-creds">
                <div className="row">
                  <div className="columns medium-4">
                    <QuickContact />
                  </div>
                  <div className="columns medium-8">
                    <Accreditations />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="columns small-3">
        <button
          className="show-for-small-only hamburger hamburger--squeeze"
          type="button"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </div>
    <div className="js-mobile-nav show-for-small-only slidy-nav">
      <HeaderNav className="hide" vertical />
    </div>
    <div className="show-for-medium">
      <HeaderNav className="menu-centered" />
    </div>
    <div className="header-bottom-bar show-for-small-only"></div>
  </header>
));
