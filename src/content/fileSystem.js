// File system structure for the Mac OS desktop

export const fileSystem = {
  desktop: [
    { id: 'about-me', name: 'About Me', type: 'folder' },
    { id: 'portfolio', name: 'My Portfolio', type: 'folder' },
    { id: 'github', name: 'GitHub', type: 'alias', url: 'https://github.com/aaronbatchelder' },
    { id: 'linkedin', name: 'LinkedIn', type: 'alias', url: 'https://linkedin.com/in/aaronbatchelder' },
    { id: 'games', name: 'Games', type: 'folder' },
  ],

  folders: {
    'about-me': {
      name: 'About Me',
      items: [
        { id: 'bio', name: 'Bio', type: 'document', content: 'bio' },
        { id: 'photo', name: 'Photo', type: 'picture', content: 'photo' },
        { id: 'resume', name: 'Résumé', type: 'download', url: '/Aaron-Batchelder-Resume.pdf' },
        { id: 'contact', name: 'Contact', type: 'document', content: 'contact' },
      ]
    },
    'portfolio': {
      name: 'My Portfolio',
      items: [
        { id: 'project-1', name: 'Dispute Drop', type: 'document', content: 'project1' },
        { id: 'project-2', name: 'Project Two', type: 'document', content: 'project2' },
        { id: 'project-3', name: 'Project Three', type: 'document', content: 'project3' },
      ]
    },
    'github': {
      name: 'GitHub Projects',
      items: [
        { id: 'repo-1', name: 'Repo One', type: 'alias', url: 'https://github.com/aaronbatchelder' },
        { id: 'repo-2', name: 'Repo Two', type: 'alias', url: 'https://github.com/aaronbatchelder' },
        { id: 'github-readme', name: 'Read Me', type: 'document', content: 'githubReadme' },
      ]
    },
    'subscribe': {
      name: 'Subscribe',
      items: [
        { id: 'newsletter', name: 'Newsletter', type: 'form', content: 'newsletter' },
        { id: 'why-subscribe', name: 'Why Subscribe', type: 'document', content: 'whySubscribe' },
      ]
    },
    'games': {
      name: 'Games',
      items: [
        { id: 'brick-breaker', name: 'Brick Breaker', type: 'game' },
        { id: 'minesweeper', name: 'Minesweeper', type: 'minesweeper' },
        { id: 'high-scores', name: 'High Scores', type: 'document', content: 'highScores' },
        { id: 'game-readme', name: 'Read Me', type: 'document', content: 'gameReadme' },
      ]
    },
    'macintosh-hd': {
      name: 'Macintosh HD',
      items: [
        { id: 'about-me-alias', name: 'About Me', type: 'folder-alias', target: 'about-me' },
        { id: 'portfolio-alias', name: 'My Portfolio', type: 'folder-alias', target: 'portfolio' },
        { id: 'github-alias', name: 'GitHub Projects', type: 'folder-alias', target: 'github' },
        { id: 'subscribe-alias', name: 'Subscribe', type: 'folder-alias', target: 'subscribe' },
        { id: 'games-alias', name: 'Games', type: 'folder-alias', target: 'games' },
      ]
    },
    'trash': {
      name: 'Trash',
      items: []
    }
  },

  documents: {
    bio: {
      title: 'Bio',
      content: `Hi there 👋! I'm Aaron Batchelder. Thanks for stopping by—feel free to say hi! Oh, and don't forget to check out the Games folder before you leave. There are a few classics in there.

By nature, I'm a pure builder—and a seasoned product leader with 15+ years of experience building impactful B2C and B2B2C products, as well as the teams behind them. I got my start in 2011 as an entrepreneur in the mobile space, and I'm as comfortable taking a product from 0→1 as I am evolving a decade-old platform while driving meaningful outcomes.

Today, I'm a Director of Product at Teachable, leading teams across learning, commerce, third-party solutions and APIs, and trust & safety. My focus is turning ambiguity into clear direction and ensuring the teams I oversee ship high-quality work that matters to customers and the business.

Outside of work, you'll find me up in apple trees in the fall foraging for cider press apples, hanging out with my family, or up late after my toddler goes to bed building side projects with my llama friends (LLMs).`
    },

    resume: {
      title: 'Résumé',
      content: `AARON BATCHELDER
Product Manager

EXPERIENCE

Teachable (2020 - Present)
Senior Product Manager
• Led fraud prevention initiatives reducing chargebacks by 40%
• Built automation tools saving 100+ hours/month
• Managed cross-functional team of 8

Previous Role (2015 - 2020)
Product Manager
• Shipped 12 major features
• Grew user base by 3x
• Led agile transformation

SKILLS
• Product Strategy
• Data Analysis
• User Research
• Agile/Scrum
• SQL, Python
• Figma

EDUCATION
University Name
Degree in Relevant Field`
    },

    contact: {
      title: 'Contact',
      content: `Get in touch:

Email: aaronmb7@gmail.com
LinkedIn: linkedin.com/in/aaronbatchelder
GitHub: github.com/aaronbatchelder

Feel free to reach out about product,
side projects, or just to say hi!`
    },

    project1: {
      title: 'Dispute Drop',
      content: `DISPUTE DROP
Stripe Dashboard Extension

OVERVIEW
A Stripe Apps project that provides fraud prevention tools directly in the Stripe dashboard.

MY ROLE
Product Manager & Developer

THE PROBLEM
Merchants lose significant revenue to fraudulent chargebacks with no easy way to dispute them from within Stripe.

THE SOLUTION
Built a dashboard extension that:
• Identifies high-risk transactions
• Automates evidence collection
• Streamlines the dispute process

RESULTS
• 40% reduction in chargeback rate
• 60% faster dispute resolution
• 95% merchant satisfaction

TECH STACK
TypeScript, React, Stripe UI Extension SDK`
    },

    project2: {
      title: 'Project Two',
      content: `PROJECT TWO
[Description pending]

OVERVIEW
Coming soon...

MY ROLE
[Role]

THE PROBLEM
[Problem statement]

THE SOLUTION
[Solution description]

RESULTS
[Outcomes]`
    },

    project3: {
      title: 'Project Three',
      content: `PROJECT THREE
[Description pending]

OVERVIEW
Coming soon...`
    },

    githubReadme: {
      title: 'GitHub Read Me',
      content: `MY OPEN SOURCE WORK

I contribute to various open source projects and maintain a few of my own.

Notable contributions:
• Project A - Feature X
• Project B - Bug fixes
• Project C - Documentation

Visit my GitHub profile to see all repositories and contributions.`
    },

    whySubscribe: {
      title: 'Why Subscribe',
      content: `WHY SUBSCRIBE?

Join my newsletter for:

• Product management insights
• Building in public updates
• Side project progress
• Occasional cocktail recipes

No spam. Unsubscribe anytime.

One email per week, max.`
    },

    highScores: {
      title: 'High Scores',
      content: `BRICK BREAKER HIGH SCORES

1. AAA ........ 10000
2. BBB ........  8500
3. CCC ........  7200
4. DDD ........  6800
5. EEE ........  5500

Can you beat these scores?`
    },

    gameReadme: {
      title: 'Brick Breaker Read Me',
      content: `BRICK BREAKER

HOW TO PLAY

Use your mouse or arrow keys to move the paddle left and right.

Bounce the ball to break all the bricks. Don't let the ball fall!

CONTROLS
• Mouse: Move paddle
• Arrow Keys: Move paddle
• Spacebar: Pause/Resume
• Click: Start game

SCORING
• White bricks: 10 points
• Gray bricks: 20 points
• Dark bricks: 30 points

LIVES
You start with 3 lives. Lose a life when the ball falls below the paddle.

Good luck!`
    }
  }
};
