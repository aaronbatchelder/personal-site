import { Window } from './Window';

const PHOTO_URL = '/images/aaron-photo.jpeg';

const BIO_CONTENT = `Hi there! I'm Aaron Batchelder. Thanks for stopping by and feel free to say hi! Oh, and don't forget to check out the Games folder before you leave. There are a few classics in there.

By nature, I'm a builder - and a product leader with 13+ years shipping B2C and B2B2C products. I got my start in 2011 as an entrepreneur in mobile (7M+ downloads, exited), and I'm as comfortable taking a product from 0→1 as I am evolving a mature platform and growing the teams that ship them.

Today, I'm Director of Product at Teachable, a creator economy platform that's powered $2B+ in sales. I lead 6 pods across commerce, learning experience, trust & safety, developer experience, APIs & integrations, core services, and mobile. My focus is turning ambiguity into clear direction and ensuring teams ship work that actually matters.

I stay closer to the craft than most product leaders. I build tools myself, regularly prototype and experiment with AI, and train teams to do the same.

Outside of work, you'll find me foraging wild apples in the fall, hanging with my family, or up late after my toddler goes to bed building side projects with my llama friends (LLMs).`;

const CONTACT_LINKS = [
  { label: 'Email', value: 'aaronmb7@gmail.com', href: 'mailto:aaronmb7@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/aaronbatchelder', href: 'https://linkedin.com/in/aaronbatchelder' },
  { label: 'GitHub', value: 'github.com/aaronbatchelder', href: 'https://github.com/aaronbatchelder' },
];

export function AboutMeWindow({ windowProps }) {
  return (
    <Window {...windowProps} className="about-me-window">
      <div className="about-me">
        <div className="about-me-header">
          <img
            src={PHOTO_URL}
            alt="Aaron Batchelder"
            className="about-me-photo"
          />
          <div className="about-me-intro">
            <h1 className="about-me-name">Aaron Batchelder</h1>
            <p className="about-me-title">Director of Product at Teachable</p>
          </div>
        </div>

        <div className="about-me-content">
          <div className="about-me-bio">
            {BIO_CONTENT.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="about-me-contact">
            <h2>Get in touch</h2>
            <div className="about-me-links">
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="about-me-link"
                >
                  <span className="about-me-link-label">{link.label}</span>
                  <span className="about-me-link-value">{link.value}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}
