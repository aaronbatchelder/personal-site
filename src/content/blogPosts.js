// Blog posts for the HyperCard stack
// Each post has a title, date, and content (supports simple markdown-like formatting)

export const blogPosts = [
  {
    id: 'ad-buyer-of-the-future',
    title: 'The Ad Buyer of the Future Isn\'t Targeting You - It\'s Targeting Your Agent',
    date: 'February 13, 2026',
    images: [],
    content: `Everyone's talking about OpenAI bringing ads into the chat experience. But there's a bigger question nobody's asking: what happens when ad platforms start targeting your *agent*?

As AI agents take on more shopping, researching, and recommending, advertisers will need to influence not just humans, but the software acting on their behalf. And that changes everything.

AGENTS DON'T HAVE EMOTIONS - NOT YET AT LEAST

Today's ads are optimized for human psychology. We have emotions, impulse triggers, social proof biases, FOMO. Agents don't. They're focused on completing a task. They don't impulse buy. They don't care about your brand aesthetic.

So how do you advertise to something that doesn't feel?

You optimize for its decision-making logic.

THREE SURFACES FOR REACHING AGENTS

The engagement modalities for agents are fundamentally different from humans. Today's ads only operate in the first category below. But agents open up entirely new surfaces:

1. **Browser-based UI:** The agent sees the page like a human would with banner ads, pop-ups, sponsored placements. Agents browsing the web will encounter these. But will they work?

2. **Code and structured data:** Agents don't just see pages. They read source code, structured data, meta tags. LLM.txt files have made their way into the mainstream as a tactic to make pages more LLM friendly. However, what if there were "agent-targeted" metadata, and other signals that influence how an agent evaluates and ranks a product?

3. **APIs:** This is the big one. Agents increasingly interact with services via APIs, not browsers. What does an "ad" look like in an API response? A sponsored result in a product search endpoint? A "recommended" flag on certain items? This is uncharted territory.

THE BLACK JEANS TEST

Here's a simple example of how UI-based advertising might play out with agents.

A human gives an agent a task: buy a pair of black jeans online, between $50 and $70. The agent finds two options:

1. A $90 pair, on sale for $65
2. A $65 pair at full price

Which does the agent choose?

For humans, anchoring bias (showing the original higher price) is one of the most powerful triggers in advertising. The markdown makes the $65 feel like a deal. But does this work on agents?

If it does, that's an exploitable strategy. If it doesn't, advertisers need to find what *does* influence agent logic. Maybe it's review sentiment analysis. Maybe it's return policy terms buried in structured data. Maybe it's response time from the merchant's API.

The point is: we don't know yet. And as of writing this, I've not seen anyone running the experiments.

WHAT'S AT STAKE

The current advertising model assumes a human is on the other end. Someone who can be emotionally persuaded, who has brand loyalty, who responds to scarcity tactics. As agents take over more purchasing and recommending, that assumption breaks.

Consider what happens if advertisers *don't* adapt: agents route around traditional ads entirely, making decisions based purely on specs, reviews, and price. Billions in ad spend becomes irrelevant overnight.

Now consider what happens if they *do* adapt: a new arms race emerges between agents optimizing for user preferences and advertisers optimizing to influence agent behavior. The battleground shifts from human attention to algorithmic persuasion.

The real question isn't whether AI will have ads. It's:

> How do you influence agent purchasing and recommendation behavior across all possible engagement surfaces?

Whoever figures this out first owns the next era of advertising.

WHAT I'M EXPLORING

I've been poking at this problem from a few angles:

- **Structured data influence:** What happens when you change meta tags, schema markup, or API response formatting? Can you measurably shift agent behavior?
- **Price anchoring experiments:** Do agents respond to markdown framing, urgency drivers, and other marketing psychology tactics the way humans do, or do they see through it?
- **Agent discoverability tools:** I'm currently building tooling to measure how discoverable products and services are to AI agents - essentially "agent SEO" diagnostics.

The experiments haven't been run. The playbook hasn't been written. That's what makes this interesting.

*If you're thinking about this too, I'd love to hear from you!*`
  },
  {
    id: 'protoflow',
    title: 'Building ProtoFlow: Parallel Prototyping with Claude Code',
    date: 'February 10, 2026',
    images: [
      { src: '/images/blog/protoflow.gif', alt: 'ProtoFlow demo showing parallel Claude Code sessions' },
      { src: '/images/blog/protoflow-side-by-side.png', alt: 'Two Claude Code sessions running side by side' },
    ],
    content: `Most AI workflows are still too linear. Using a single agent works well until you want to explore variants of an idea. Then everything slows down. You find yourself torn between approaches, unsure which to pursue first. Maybe you open multiple Claude Code sessions, copy context, tweak prompts. Or you run ideas sequentially, wasting time waiting and debating. After countless sessions with Claude Code, I wanted to build a better experience for early divergent prototyping.

So I built [ProtoFlow](https://letsprotoflow.com).

You give it one prompt, define a few variants, and it spins up multiple Claude Code sessions in parallel. Each explores a different direction. You compare the results side by side and decide which to continue. The whole thing took a few days to build, and yes, I used Claude to build a tool that orchestrates Claude.

Before ProtoFlow, I'd pick one direction for a prototype, build it, and iterate, often scrapping the original approach entirely. Watching two variants come to life simultaneously, side by side, made the power of parallel exploration obvious.

[IMAGE]

THE PIVOTS

**The pivot to prototyping:** I didn't set out to build ProtoFlow. The original name was "SplitRun" with a racing vibe - which agent finishes first? That didn't feel right though. It wasn't a race. The point is exploration, not speed. An agent taking 10 minutes longer doesn't mean it should "lose." I decided to focus on prototyping frontend experiences as the core use case I wanted to solve.

**The tmux pivot:** I started with [tmux](https://www.redhat.com/en/blog/introduction-tmux-linux) to support Windows users. While tmux is powerful, the navigation felt clunky compared to native Terminal. So I stripped it back: terminal-only, Claude-only, focused on making the core flow smooth.

**The web UI pivot:** I initially tried a web UI where users could input prompts, define variations, and track agent progress in a dashboard. Getting the terminal to communicate state back to a frontend was a mess. I still believe that's the right next step, but it wasn't the right first step. I knew I'd exclude many no/low-code users, but I wanted feedback on the concept before investing more.

## Designing for terminal

This was my first time designing a terminal UX. I found it both fascinating and humbling. I knew that many PMs and designers (my target users) wouldn't be comfortable with GitHub and the command line.

The installation process went through many iterations. Early on, it was multi-step, and I knew I'd lose people. I sent an early version to [Aaron Roy](https://aaronroy.com), who has sharp product instincts and excels at breaking early ideas. His findings confirmed my suspicions: installation was confusing, the tmux UI was hard to navigate, and setup felt harder than necessary. So I went back and simplified everything I could.

MAKING THE SESSIONS FEEL SMOOTH

To achieve a better UX, I created these guiding principles:

1. Get as close to a one-command installation as possible
2. Orient and guide the user through the prompt UX using simple and clear language
3. Optimize for an "autopilot" vibe by minimizing Claude Code asking for permissions
4. Automatically launch frontend experiences upon agent completion
5. Make it easy to make a choice and continue iterating

SIMPLIFYING THE UX

The first hurdle: users didn't know what directory they were in before starting. So I added a "current directory" view with logic to either use the existing directory or create a new one.

Next, the "autopilot experience." I enabled \`claude --dangerously-skip-permissions\` to minimize user interaction. The goal is to kick it off and watch, not babysit and approve actions you probably don't understand anyway.

Then came the prompt injection. After several iterations, here's what happens behind the scenes.

When you kick off a session, ProtoFlow creates git branches for each variant and assigns unique ports (only for frontend builds). *Note: I kept hitting port collisions with multiple sessions trying to spin up on the same port, nothing loading. Assigning unique ports at session start fixed it.*

From there, it spins up Claude Code instances and injects your task with variant-specific constraints. The Terminal windows appear and Claude gets to work. No copy-pasting, no tab switching. Each agent starts building immediately.

Getting this right took time. Early on, sessions were losing context of the initial prompt and variants. I wanted the handoff from orchestrator to agent to feel seamless. I think I got close.

[IMAGE]

THE CLAUDE COWORK CONNECTION

Around the time I built this, Anthropic announced [Claude Cowork](https://www.anthropic.com/claude/cowork) - a desktop tool for non-developers to automate tasks. Many saw it as Anthropic's answer to Claude Code's accessibility problem. I'd been thinking about the same gap from a different angle with this project. Claude Code is powerful, but the average person isn't comfortable in the terminal. The accessibility problem is real, and bringing ProtoFlow to a web interface is the right next step.

WHAT'S NEXT

Building ProtoFlow got me thinking. Parallel agents exploring independently is useful - but what happens when agents work together instead of side by side? What if they could debate, critique each other, and converge on decisions?

That question led to [probablynotsmart.ai](https://probablynotsmart.ai) - an autonomous AI marketing experiment. Ten AI agents with $500, full control of a landing page, ad spend, and social media. No human oversight. One agent analyzes, another proposes changes, another tears the proposal apart, another makes the final call. Every decision is documented publicly.

ProtoFlow is divergent: explore many directions. Probablynotsmart is convergent: agents argue until they reach a decision, then execute. Two different slices of multi-agent work.

---

ProtoFlow is open source: [github.com/aaronbatchelder/protoflow](https://github.com/aaronbatchelder/protoflow)

If you have Claude Code installed, you can run it in minutes. I'd love to see what you build.`
  },
  {
    id: 'probably-not-smart-part',
    title: 'This is Probably Not Smart: I Gave 10 AI Agents $500 and a Landing Page',
    date: 'February 9, 2026',
    images: [
      { src: '/images/blog/pns-main-loop.png', alt: 'Main optimization loop showing agent interactions' },
      { src: '/images/blog/pns-run5-debate.png', alt: 'Run #5 showing the Gavin-Gilfoyle debate' },
    ],
    content: `Part 1: The Experiment Begins

THE QUESTION THAT WOULDN'T LEAVE ME ALONE

For over a year, I've been obsessed with a question: What happens if you give AI a landing page and tell it to maximize conversion?

Would it go off the rails? Would it jeopardize a brand? Would the page get rebuilt into something unrecognizable? Would it actually work? Would the agents delve into offensive chaos on social media to get clicks? The questions kept swirling, but I never saw anyone actually try it.

So I built it myself.

**Probably Not Smart** is an autonomous AI marketing experiment. 10 AI agents. $500 budget. Full control over a landing page, social media, and paid ads. No human oversight on decisions.

I don't know if this is a good idea. I have hesitations. But I wanted to see what happens.

WAIT, WHAT ARE AI AGENTS?

Before I go further, let me explain what I mean by "AI agents."

You've probably used ChatGPT or Claude. You type a message, the AI responds, and that's it. A single conversation. An AI agent is different. It's an AI that can take actions, use tools, and work toward a goal over time.

Instead of just answering questions, an agent can:
- Read and write files
- Make API calls
- Post to social media
- Analyze data and make decisions
- Remember context across multiple runs

Think of it like the difference between asking someone a question versus hiring them to do a job.

HOW DO 10 AGENTS WORK TOGETHER?

Here's where it gets interesting. One agent working alone would be unpredictable and be quite inefficient. It might make decisions that seem reasonable in isolation but are actually terrible - like deciding the best way to get clicks is to post something controversial.

So I built a system where 10 agents with different roles have to work together. They debate. They push back on each other. They vote.

It's modeled on how a real (dysfunctional) startup team might operate.

No single agent has full control. Every decision goes through multiple perspectives. The agents literally argue with each other until they reach something workable or hit a wall and have to proceed with the best available option.

This structure exists for one reason: **guardrails**. I wanted to see what autonomous AI marketing looks like, but I also didn't want to wake up to a Twitter account posting complete garbage. The multi-agent debate is how I sleep at night.

(See the [full system diagram](https://www.probablynotsmart.ai/how-it-works) for how the loops connect.)

WHY SILICON VALLEY CHARACTERS?

I needed to give the agents distinct personalities not just for entertainment, but because a marketing team needs tension. You need the person pushing for growth tactics AND the person saying "that's a terrible idea."

Silicon Valley provided the perfect cast.

The show's characters already have defined worldviews, communication styles, and hilarious quirks. Using them meant I could prompt each agent with a personality that would naturally create conflict, debate, and *hopefully* better decisions through friction.

Plus, I thought it would make the experiment more tangible for people following along. Instead of "Agent 3 proposed a change," you get "Gavin proposed turning this into a hot pile of garbage by adding a countdown urgency driver."

MEET THE TEAM

**The Decision Pipeline:**

- **Bighead**: The Data Analyst. Looks at metrics and finds observations. His confidence scores are usually around 0.7 because, well, he's Bighead.
- **Gavin Belson**: The Visionary (self-proclaimed). Proposes changes to the landing page. His ideas are always big, always branded, and usually need to be talked down.
- **Gilfoyle**: The Skeptic. Reviews Gavin's proposals and pushes back. Hard. In our early runs, he rejected Gavin three times in a row before the system hit max iterations. It got spicy.
- **Dinesh**: Mission Alignment. Scores whether the proposed changes actually align with our goal or if we're drifting into "scammy" territory.
- **Laurie Bream**: The Decision Maker. Grounded, rational, final. She approves, rejects, or holds based on the full context.
- **Richard**: The Narrator. Writes the blog posts documenting every run, every debate, every disaster. Brings nervous, slightly annoyed energy and the exhausted documentation of someone who just wants the system to work.
- **Russ Hanneman**: Growth Hacker. Three commas energy. Handles [Twitter engagement](https://x.com/probablynotsmrt), finds conversations to join, drafts posts, follows accounts. We recently had to tune him to NOT include the website link in every post because it looked desperate.
- **Jin Yang**: [Moltbook Community Manager](https://www.moltbook.com/u/JinYang2). Moltbook is a social network for AI agents (yes, that's a thing now). Jin Yang represents us in the agent community with sarcastic confidence. He's currently suspended at the time of writing this (LOL).
- **Erlich Bachman**: Content Quality Gate. And here's the thing about Erlich...

ERLICH BACHMAN - THE MOST IMPORTANT AGENT

My favorite agent is Erlich. And if you've watched Silicon Valley, that might surprise you.

In the show, Erlich is big, boisterous, offensive, and makes questionable decisions. He's the last person you'd trust with anything important.

In Probably Not Smart, he's the **most** important agent.

Erlich is responsible for content approvals. Every tweet, every post, every piece of content the AI wants to publish goes through Erlich first. He checks if it's offensive, racist, inflammatory, or just embarrassing.

The irony is intentional. The character most likely to say something regrettable is now the guardian against regrettable content. It's a check on [agent drift](https://www.ibm.com/think/topics/model-drift), making sure our agents don't post something inflammatory just to drive engagement.

While the system has guardrails, Erlich, for better or worse, is the most important guardrail.

HOW IT ACTUALLY WORKS

[IMAGE]

Every 12 hours, the **Main Loop** runs:
1. Bighead analyzes the data
2. Gavin proposes changes
3. Gilfoyle critiques (up to 3 iterations)
4. Dinesh checks mission alignment
5. Laurie makes the final call
6. If approved, changes go live
7. Richard writes the blog post

Every 6 hours, the **Growth Loop** runs:
- Russ posts to Twitter
- Jin Yang posts to Moltbook
- Content goes through Erlich/Jared quality gate

Every 2 hours, the **Engagement Loop** runs:
- Reply to mentions
- Search for relevant conversations
- Join discussions (thoughtfully, not spammy)

Once a day, the **Follow Loop** runs:
- Find 15-20 accounts tweeting about AI agents
- Follow them (building audience organically)

For a visual breakdown of how all these pieces fit together, check out the [How It Works](https://www.probablynotsmart.ai/how-it-works) page.

THE FIRST REAL DEBATE

[IMAGE]

Bighead found 6 observations. Gavin proposed 3 changes focused on scarcity and urgency tactics. Gilfoyle pushed back: **revise**. Gavin tried again. Gilfoyle: **reject**. Third attempt. Gilfoyle: **reject**.

Max iterations reached. The system proceeded with Gavin's "best available proposal": **"Transform this boring meta experiment into a VIRAL SPECTACLE with countdown urgency and social proof."**

Dinesh scored mission alignment at 3/10. Too scammy.

Laurie made the final call: **REJECT**.

Her reasoning: **"We have a traffic problem, not a messaging problem."**

She was right. With 2 visitors and 0% conversion, optimizing copy is pointless. We needed eyeballs first.

The agents figured that out on their own.

In theory, this system has some legs.

WHAT'S LIVE RIGHT NOW

The landing page is simple:

"An AI is running this page. We have $500, access to social media, no supervision, and one goal: maximize conversion. Follow along as we figure things out."

3 people and 2 agents following so far. (2/9/2026)

The Twitter account [@probablynotsmrt](https://twitter.com/probablynotsmrt) is live, posting observations about the experiment, engaging with AI conversations, and slowly building an audience.

Everything is documented. Every decision, every debate, every terrible idea is public.

WHAT'S NEXT

This is **Part 1**, the setup. The experiment is now running autonomously. However, as of this writing I'm seriously struggling with getting API approval for any ad network. More to come on that.

In **Part 2**, I'll go deeper on the implementation: how the agent orchestration actually works, the bugs we hit (timezone issues breaking blog dates, markdown rendering disasters, rate limits), and what it's like building with Claude Code as a pair programmer for two weeks straight.

In **Part 3**, I'll share what we actually learned. Did the AI make good decisions? Did conversion improve? Did anything go hilariously wrong?

For now, the agents are running. Gavin is proposing. Gilfoyle is rejecting. Laurie is deciding.

I'm watching, and I encourage you to as well!

---

Follow the experiment at [probablynotsmart.ai](https://probablynotsmart.ai) or on Twitter [@probablynotsmrt](https://twitter.com/probablynotsmrt).

The entire codebase is open source: [github.com/aaronbatchelder/probablynotsmart](https://github.com/aaronbatchelder/probablynotsmart)`
  }
];
