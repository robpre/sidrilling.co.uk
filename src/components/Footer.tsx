import { forwardRef } from "react";
import { Accreditations } from "./Accreditations/Accreditations";
import { QuickContact } from "./QuickContact";

export const Footer = forwardRef<HTMLElement>((props, ref) => (
  <footer ref={ref}>
    <div className="row copy-bar">
      <div className="columns small-12">
        <div className="row" data-equalizer>
          <div className="columns medium-4" data-equalizer-watch>
            <div className="column-offset">
              <QuickContact title="Contact Us" />
            </div>
          </div>
          <div className="columns medium-4 medium-push-4" data-equalizer-watch>
            <div className="column-offset">
              <div className="row expanded">
                <div className="columns">
                  <Accreditations />
                </div>
              </div>
            </div>
          </div>
          <div className="columns medium-4 medium-pull-4" data-equalizer-watch>
            <div className="column-offset">
              <div className="privacy-and-copy-right">
                <div className="privacy-and-social">
                  <a href="/privacy-policy">Privacy Policy</a>
                  <p className="copyrights">&copy; 2016 S I Drilling Ltd</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
));
