export const QuickContact = ({ title }: { title?: string }) => (
  <section className="quick-contact">
    {title ? (
      <p>
        <span>{title}</span>
      </p>
    ) : null}
    <ul>
      <li>
        <a href="mailto://sales@sidrilling.co.uk">sales@sidrilling.co.uk</a>
      </li>
      <li>
        <a href="tel://01603720271">01603720271</a>
      </li>
      <li>
        <a href="tel://07785313447">07785313447</a>
      </li>
    </ul>
  </section>
);
