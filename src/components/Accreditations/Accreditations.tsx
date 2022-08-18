import BDALogo from "./bda-logo.gif";
import FSBLogo from "./FSBLog_mem.jpg";

export const Accreditations = () => (
  <div className="accreditations">
    <div className="row small-up-2 small-collapse medium-uncollapse">
      <div className="column column-block">
        <a href="https://www.fsb.org.uk/">
          <img src={FSBLogo.src} alt="Federation of Small Businesses Logo" />
        </a>
      </div>
      <div className="column column-block">
        <a href="http://www.britishdrillingassociation.co.uk/Members/SI-Drilling-Cable-Percussion-Ltd">
          <img src={BDALogo.src} alt="British Drilling Association logo" />
        </a>
      </div>
    </div>
  </div>
);
