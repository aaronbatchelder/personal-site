// Blog posts for the HyperCard stack
// Each post has a title, date, and content (supports simple markdown-like formatting)

export const blogPosts = [
  {
    id: 'probably-not-smart-part-1',
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
• Read and write files
• Make API calls
• Post to social media
• Analyze data and make decisions
• Remember context across multiple runs

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

• **Bighead**: The Data Analyst. Looks at metrics and finds observations. His confidence scores are usually around 0.7 because, well, he's Bighead.

• **Gavin Belson**: The Visionary (self-proclaimed). Proposes changes to the landing page. His ideas are always big, always branded, and usually need to be talked down.

• **Gilfoyle**: The Skeptic. Reviews Gavin's proposals and pushes back. Hard. In our early runs, he rejected Gavin three times in a row before the system hit max iterations. It got spicy.

• **Dinesh**: Mission Alignment. Scores whether the proposed changes actually align with our goal or if we're drifting into "scammy" territory.

• **Laurie Bream**: The Decision Maker. Grounded, rational, final. She approves, rejects, or holds based on the full context.

• **Richard**: The Narrator. Writes the blog posts documenting every run, every debate, every disaster. Brings nervous, slightly annoyed energy and the exhausted documentation of someone who just wants the system to work.

• **Russ Hanneman**: Growth Hacker. Three commas energy. Handles [Twitter engagement](https://x.com/probablynotsmrt), finds conversations to join, drafts posts, follows accounts. We recently had to tune him to NOT include the website link in every post because it looked desperate.

• **Jin Yang**: [Moltbook Community Manager](https://www.moltbook.com/u/JinYang2). Moltbook is a social network for AI agents (yes, that's a thing now). Jin Yang represents us in the agent community with sarcastic confidence. He's currently suspended at the time of writing this (LOL).

• **Erlich Bachman**: Content Quality Gate. And here's the thing about Erlich...

ERLICH BACHMAN - THE MOST IMPORTANT AGENT

My favorite agent is Erlich. And if you've watched Silicon Valley, that might surprise you.

In the show, Erlich is big, boisterous, offensive, and makes questionable decisions. He's the last person you'd trust with anything important.

In Probably Not Smart, he's the **most** important agent.

Erlich is responsible for content approvals. Every tweet, every post, every piece of content the AI wants to publish goes through Erlich first. He checks if it's offensive, racist, inflammatory, or just embarrassing.

The irony is intentional. The character most likely to say something regrettable is now the guardian against regrettable content. It's a check on [agent drift](https://www.ibm.com/think/topics/model-drift), making sure our agents don't post something inflammatory just to drive engagement.

While the system has guardrails, Erlich, for better or worse, is the most important guardrail.

HOW IT ACTUALLY WORKS

[IMAGE]

**Every 12 hours, the Main Loop runs:**
1. Bighead analyzes the data
2. Gavin proposes changes
3. Gilfoyle critiques (up to 3 iterations)
4. Dinesh checks mission alignment
5. Laurie makes the final call
6. If approved, changes go live
7. Richard writes the blog post

**Every 6 hours, the Growth Loop runs:**
• Russ posts to Twitter
• Jin Yang posts to Moltbook
• Content goes through Erlich/Jared quality gate

**Every 2 hours, the Engagement Loop runs:**
• Reply to mentions
• Search for relevant conversations
• Join discussions (thoughtfully, not spammy)

**Once a day, the Follow Loop runs:**
• Find 15-20 accounts tweeting about AI agents
• Follow them (building audience organically)

For a visual breakdown of how all these pieces fit together, check out the [How It Works](https://www.probablynotsmart.ai/how-it-works) page.

THE FIRST REAL DEBATE

[IMAGE]

Bighead found 6 observations. Gavin proposed 3 changes focused on scarcity and urgency tactics. Gilfoyle pushed back: **revise**. Gavin tried again. Gilfoyle: **reject**. Third attempt. Gilfoyle: **reject**.

Max iterations reached. The system proceeded with Gavin's "best available proposal": **"Transform this boring meta experiment into a VIRAL SPECTACLE with countdown urgency and social proof."**

Dinesh scored mission alignment at 3/10. Too scammy.

Laurie made the final call: **REJECT.**

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
