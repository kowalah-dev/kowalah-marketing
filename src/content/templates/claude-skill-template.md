---
title: "Claude Skill Creation Template"
meta_title: "Claude Skill Creation Template | Build Custom AI Skills for Claude"
description: "A collaborative planning template for designing Claude skills before you build them. Map out your skill's architecture, including instructions, references, assets, and scripts, as a team on a shared screen or as a solo thinking exercise."
template_type: "program-template"
category: "AI Development"
hero:
  title: "Claude Skill Creation Template"
  subtitle: "A thinking tool to plan and architect your Claude skills before building them, whether as a team workshop or a solo design exercise"
  image: "/images/resources/templates/claude-skill-template-hero.webp"
  badge: "New"
overview:
  who_its_for: "Teams planning AI workflows together, prompt engineers designing skill architecture, and anyone who wants to think through a Claude skill's structure before building it"
  when_to_use: "Before you start building a skill. Use this as a scratchpad to map out what your skill needs: what instructions to include, what reference documents to provide, what output templates to create, and what scripts to integrate. Ideal for collaborative sessions where a team gathers around a shared screen to design a skill together."
  key_benefit: "Think through your skill's architecture before writing a single line. By planning what references, assets, and scripts your skill needs, you avoid the common trap of diving into writing instructions before understanding the full workflow. Once your plan is clear, use Claude's built-in skill-creator to assemble the actual skill."
  sections_included:
    - "SKILL.md main instruction file with name and description frontmatter"
    - "References folder for supporting context documents"
    - "Reference document placeholders with guidance"
    - "Assets folder for output templates and forms"
    - "Asset document placeholders with examples"
    - "Scripts folder for executable automation"
    - "Script placeholders with integration patterns"
how_to_use:
  title: "How to Use This Template"
  steps:
    - title: "Make a copy of the Google Doc"
      description: "Open the template in Google Docs and create your own copy (File > Make a Copy). Share it with your team or put it on a screen for a collaborative planning session."
      icon: "document-duplicate"
    - title: "Map out your skill's purpose"
      description: "Start with the SKILL.md tab. Sketch out what the skill does, when it should activate, and the high-level workflow. Don't worry about perfect wording - focus on capturing the intent."
      icon: "pencil-square"
    - title: "Identify your sources and outputs"
      description: "Use the Reference and Asset tabs as a scratchpad. Jot down what context documents the skill will need, what templates it should produce, and any scripts for system integrations."
      icon: "folder-plus"
    - title: "Build with the skill-creator"
      description: "Once your architecture is clear, use Claude's built-in skill-creator skill to assemble the actual skill files from your plan. The thinking is done; now let Claude handle the writing."
      icon: "rocket-launch"
faq:
  title: "Frequently Asked Questions"
  subtitle: "Common questions about building Claude skills"
  questions:
    - question: "Is this template for writing my skill or planning my skill?"
      answer: "Planning. This template is a thinking tool, not a drafting tool. The goal is to map out the architecture of your skill: what it should do, what context it needs, what it should produce, and what systems it connects to. Think of it like a whiteboard or scratchpad where you sketch out the blueprint. You don't need to write polished instructions or final copy here. Once your architecture is clear, you use Claude's built-in skill-creator skill to actually write and assemble the finished skill files. The template helps you think; the skill-creator helps you build."
    - question: "What is a Claude skill?"
      answer: "A Claude skill is a reusable package of instructions, context, and tools that extends Claude's capabilities for a specific task. Think of it as a specialized role that Claude can step into. Skills are defined by a SKILL.md file (the main instructions), optionally supported by reference documents (background context), asset templates (output blueprints), and scripts (executable automation). When activated, Claude follows your skill's instructions to perform tasks consistently and effectively."
    - question: "What goes in the SKILL.md file?"
      answer: "The SKILL.md file is the heart of your skill. It starts with YAML frontmatter containing the skill's name and description. The description is especially important because Claude loads it into context for every available skill and uses it to decide which one to activate, so it should clearly explain when to use the skill and what triggers it. The body contains detailed instructions telling Claude how to approach the task, what tools to use, what decisions to make, and what output to produce. When planning your skill with this template, focus on capturing the workflow and decision points. You don't need to write the final instructions word-for-word; the skill-creator will help with that."
    - question: "When should I use References vs. Assets?"
      answer: "References are context documents that get loaded into Claude's conversation to inform its work, such as style guides, process documentation, decision frameworks, or domain knowledge. Assets are output templates that Claude uses as blueprints for what it creates, such as document templates, form structures, report formats, or code scaffolds. The key distinction: References inform how Claude thinks; Assets define what Claude produces. References are loaded into context; Assets direct the output format without necessarily being loaded."
    - question: "Do I need Scripts in my skill?"
      answer: "Most skills don't need scripts. Scripts are optional and only necessary when your skill needs to interact with external systems through bash commands or API calls, such as deploying code, fetching data from an API, running tests, or managing files in specific ways. Importantly, you do NOT need scripts to use MCP servers or connectors that are already enabled in your environment. Simply mention the available MCP tools in your SKILL.md or Reference files and Claude will use them directly."
    - question: "How detailed should my planning notes be?"
      answer: "Detailed enough that someone reading your plan understands the workflow, but don't worry about polished prose. Bullet points, rough notes, and shorthand are fine. The important things to capture are: the workflow steps in order, decision points where the skill needs to choose between approaches, what reference documents exist (or need to be created), what output format the skill should produce, and any systems it needs to connect to. When you hand this plan to the skill-creator, Claude will turn your rough architecture into well-structured skill files."
    - question: "Can I use this template for skills across different Claude interfaces?"
      answer: "Yes. The SKILL.md structure works across Claude Code (the CLI tool), Claude.ai projects, and custom Claude integrations via the API. The template uses the standard skill format that Claude recognizes regardless of interface. Some features like Scripts are specific to Claude Code where bash execution is available, but the core SKILL.md and References pattern works everywhere Claude accepts custom instructions."
    - question: "Can I use this template in a team workshop?"
      answer: "Absolutely, that's one of the best ways to use it. Put the Google Doc on a shared screen and walk through each tab together. The SKILL.md tab becomes a discussion about workflow: 'What should this skill actually do? What steps should it follow?' The References tab sparks questions like: 'What existing documents does the team already use that Claude should know about?' The Assets tab drives conversation about outputs: 'What should the finished deliverable look like?' This collaborative mapping often surfaces workflow knowledge that no single person holds. Once the team has sketched out the architecture together, one person can take the plan and use the skill-creator to build it."
    - question: "What happens after I've planned my skill with this template?"
      answer: "Once your architecture is mapped out, use Claude's built-in skill-creator skill to actually build the finished skill. You can share your planning notes directly: describe the workflow, list the references you identified, explain the output templates you need, and mention any scripts. The skill-creator will turn your rough plan into properly structured SKILL.md instructions, reference documents, asset templates, and scripts. Think of this template as the architectural drawing and the skill-creator as the builder."
    - question: "How do I test and iterate on my skill once it's built?"
      answer: "After the skill-creator assembles your skill, activate it and run it against a real task. Observe where Claude deviates from your expectations, produces inconsistent output, or misses important steps. Then refine the instructions to address those gaps. Common iteration patterns include: adding explicit decision criteria where Claude made wrong choices, providing examples of expected output, adding constraints to prevent unwanted behavior, and breaking complex steps into smaller sub-steps. Most skills take 3-5 iterations to reach production quality. You may find yourself returning to this planning template to rethink the architecture when changes are needed."
    - question: "What makes the difference between a good skill and a great skill?"
      answer: "Good skills complete the task. Great skills do it consistently, handle edge cases gracefully, and produce output that needs minimal human revision. The differentiators are: (1) Clear scope boundaries, telling Claude when NOT to use the skill is as important as when to use it; (2) Specific quality criteria so Claude can self-check its work; (3) Well-chosen references that provide genuine context rather than information overload; (4) Asset templates that show exact output structure; (5) Iterative refinement based on real usage rather than theoretical perfection. Great skills almost always start with thorough planning, which is exactly what this template is for."
related_templates:
  - "prompt-hackathon-facilitator-guide"
external_resources:
  google_doc:
    url: "https://docs.google.com/document/d/19dkuQBOejNuFo5VxeH8N4YJZMHap4oc411kqpeaY4ws/edit?usp=sharing"
    label: "Open Template in Google Docs"
cta:
  title: "Want Help Designing AI Skills for Your Organization?"
  content: "Kowalah's AI experts help organizations plan, design, and deploy custom Claude skills that accelerate team productivity. From facilitating skill architecture workshops to building full skill packages with automation, we turn your team's workflows into reusable AI capabilities."
  button_label: "Talk to an Expert"
  button_link: "/contact"
draft: false
featured: false
---

*To use this template, open the Google Doc link above and make your own copy (File > Make a Copy). Share it with your team or put it on a screen for a collaborative planning session. Use the tabs as a scratchpad to map out your skill's architecture before building it.*

# Claude Skill Creation Template

**This template is a thinking tool, not a writing tool.** Its purpose is to help you plan the architecture of a Claude skill before you build it. Whether you're working solo or running a team workshop with the doc on a shared screen, the goal is the same: map out what your skill needs to do, what context it requires, what it should produce, and what systems it connects to.

You don't need to write polished instructions here. Jot down notes, bullet points, rough workflows, and the names of documents that already exist. Once your architecture is clear, use Claude's built-in **skill-creator** skill to assemble the actual skill files from your plan.

Claude skills are reusable instruction packages that give Claude specialized capabilities for specific tasks. A well-structured skill turns a one-off prompt into a reliable, shareable workflow that anyone on your team can activate. This template helps you think through that structure before committing to building it.

---

## Template Structure

The Google Doc contains the following tabs. Use each tab as a scratchpad to capture your thinking about that component of the skill:

### Tab 1: SKILL.md

The main instruction file. This is the only required component of a skill.

```yaml
---
name: Your Skill Name
description: Use when the user wants to [specific task]. Also use when the user mentions [related keywords or triggers].
---

Detailed instructions for Claude go here...
```

**The frontmatter** contains two fields:
- **name** - A clear, descriptive name for your skill (e.g., "Code Review Assistant", "Meeting Notes Generator")
- **description** - This is critically important. Claude loads the description of every available skill into its context and uses it to decide which skill to activate. Your description should clearly explain **when to use this skill** versus other skills. Don't just describe what the skill does; describe the situations, triggers, and user requests that should activate it. For example: "Use when the user asks to review code, check for bugs, or audit pull requests. Also use when the user mentions 'code quality' or 'PR review'."

**The body** contains your full instructions. Write these as if you're briefing a knowledgeable colleague on exactly how to approach a task.

### Tab 2: References (Folder Overview)

References are optional supporting documents that get loaded into Claude's context to inform its work. Use references for:

- **Process documentation** - Step-by-step workflows the skill should follow
- **Decision frameworks** - Criteria for choosing between options (Option A vs. Option B)
- **Style guides** - Tone, formatting, and brand guidelines
- **Domain knowledge** - Technical specifications, regulatory requirements, or industry context

References are loaded into the conversation alongside the SKILL.md, giving Claude the background knowledge it needs to execute well.

### Tabs 3-4: Reference #1, Reference #2

Placeholder tabs for individual reference documents. Each reference should be a self-contained document covering one topic or process. Keep references focused rather than creating one large document covering everything.

### Tab 5: Assets (Folder Overview)

Assets are optional template documents that define what Claude should produce. Unlike references (which inform Claude's thinking), assets direct Claude's output. Use assets for:

- **Document templates** - Agendas, reports, proposals, emails
- **Form structures** - Customer intake forms, feedback surveys, checklists
- **Content formats** - Blog post structures, social media templates, newsletter layouts
- **Code scaffolds** - Project templates, test suite structures, configuration files

Assets are not loaded into Claude's context directly. Instead, your SKILL.md instructions reference them and tell Claude to use them as output blueprints.

### Tabs 6-7: Asset #1, Asset #2

Placeholder tabs for individual asset documents. Create one tab per output template your skill needs to produce.

### Tab 8: Scripts (Folder Overview)

Scripts are optional executable files that give your skill the ability to interact with external systems. Use scripts for:

- **Bash commands** - File operations, build processes, deployment steps
- **API integrations** - Fetching data from external services, posting updates
- **System automation** - Running tests, generating reports, managing infrastructure

**Important:** Scripts are NOT required for using MCP servers or connectors that are already enabled in your Claude environment. If you have Slack, GitHub, Jira, or other integrations available via MCP, simply mention them in your SKILL.md or Reference files. Claude will use them directly without needing separate scripts.

### Tabs 9-10: Script #1, Script #2

Placeholder tabs for individual scripts. Each script should handle one specific automation task.

---

## What to Capture in Each Section

When planning your skill, these are the key things to think through and jot down in each tab. You don't need final copy, just enough detail that the skill-creator (or a colleague) could understand your intent.

### Start with the Trigger

Note when the skill should activate:

```markdown
Use this skill when the user asks to [specific task].
Also use when the user mentions [related keywords or phrases].
```

### Define the Workflow

Sketch out the steps, even roughly:

```markdown
## Workflow

1. **Gather context** - Ask the user for [specific inputs]
2. **Analyze requirements** - Check [specific conditions]
3. **Generate output** - Create [specific deliverable] following the template in assets/
4. **Review and refine** - Verify [quality criteria] before presenting
```

### Include Decision Criteria

Note any points where the skill needs to choose between approaches:

```markdown
## Decision Framework

When choosing between approaches:
- If [condition A], use [approach 1] because [reason]
- If [condition B], use [approach 2] because [reason]
- If unclear, ask the user to clarify before proceeding
```

### Specify Output Format

Describe what the finished output should look like:

```markdown
## Output Format

Present results as:
- A summary section (2-3 sentences)
- A detailed breakdown using the template in assets/report-template
- Action items as a numbered list with owners and deadlines
```

### Add Quality Checks

Note how the skill should verify its own work:

```markdown
## Before Finishing

Verify:
- [ ] All required sections are complete
- [ ] Tone matches [specified style guide]
- [ ] No assumptions made without user confirmation
- [ ] Output follows the template structure exactly
```

---

## Folder Structure

For reference, here's what the final skill package looks like once the skill-creator builds it from your plan:

```
your-skill-name/
├── SKILL.md              # Main instructions (required)
├── references/           # Context documents (optional)
│   ├── process-guide.md
│   └── style-guide.md
├── assets/               # Output templates (optional)
│   ├── report-template.md
│   └── email-template.md
└── scripts/              # Executable scripts (optional)
    ├── deploy.sh
    └── fetch-data.sh
```

---

## Planning Best Practices

### Keep Skills Focused

If you're sketching out a skill and it starts covering multiple unrelated tasks, that's a signal to split it into separate skills. A "Code Review" skill and a "Test Writer" skill are better than a "Code Quality" skill that tries to do both. Catching this at the planning stage saves significant rework later.

### Think About the Workflow End-to-End

Walk through a real scenario in your head (or as a team). What triggers the skill? What does Claude need to know? What decisions does it face? What does the output look like? What could go wrong? This end-to-end thinking is the main value of using this template rather than jumping straight to building.

### Be Selective with References

When listing references, ask: "Does Claude actually need this to do the job?" Every reference consumes context window space. A focused 500-word process guide is more effective than a 5,000-word comprehensive manual where only 10% is relevant. Note existing documents by name; you don't need to write new ones during planning.

### Sketch Assets, Don't Perfect Them

When planning assets, focus on structure rather than content. Note what sections the output template should have, what fields to include, and what format to use. Placeholder text like `[Company Name]` or `[Date]` is perfect at this stage. The skill-creator will flesh them out.

### Identify Scripts Early

If your skill needs to interact with external systems, note that during planning. It's easier to design the skill workflow around available integrations than to bolt them on afterward. Also note which integrations are already available via MCP (and therefore don't need scripts).

---

## Example: What Planning Notes Might Look Like

Here's what your planning notes might look like for a simple meeting summary skill. Notice it's structured enough to communicate intent, but doesn't need to be polished prose:

**SKILL.md:**
```yaml
---
name: Meeting Summary Writer
description: Use when the user shares meeting notes, transcripts, or asks to summarize a meeting. Also use when the user mentions "meeting recap", "action items from the call", or "what did we decide".
---

## When to Use
Use this skill when the user shares meeting notes, transcripts,
or asks to summarize a meeting.

## Workflow
1. Read the provided meeting content
2. Identify: attendees, key decisions, action items, and open questions
3. Generate a summary following the template in assets/
4. Present the summary and ask if any corrections are needed

## Output Rules
- Keep summaries under 500 words
- List action items with owner and deadline
- Flag any decisions that need follow-up confirmation
- Use professional but accessible tone
```

**assets/summary-template.md:**
```markdown
# Meeting Summary: [Meeting Title]
**Date:** [Date] | **Duration:** [Duration]
**Attendees:** [Names]

## Key Decisions
- [Decision 1]
- [Decision 2]

## Action Items
| Action | Owner | Deadline |
|--------|-------|----------|
| [Task] | [Name] | [Date] |

## Open Questions
- [Question requiring follow-up]

## Notes
[Additional context or discussion points]
```

These planning notes are detailed enough that you (or the skill-creator) could build the complete skill from them. That's the goal: capture the architecture, then let Claude handle the assembly.

---

## Using This Template in Different Contexts

### Solo Planning
When working alone, use the template as a personal thinking exercise. Walk through each tab and jot down notes. You might spend 15-30 minutes mapping out a skill's architecture before asking the skill-creator to build it. This upfront investment saves significant back-and-forth during construction.

### Team Workshops
Put the Google Doc on a shared screen and facilitate a discussion through each tab. This works especially well when the skill encodes a workflow that multiple people contribute to. The marketing team might know what the output should look like (assets), while the operations team knows the process steps (SKILL.md), and IT knows the system integrations (scripts). The template gives everyone a shared structure to contribute to.

### Organization-Wide Skills
For enterprise skills, the planning stage is especially important. Use the References tab to identify compliance requirements and brand guidelines. Use Assets for standardized deliverables. Use Scripts for internal system integrations. Consider having the plan reviewed by relevant stakeholders (legal for compliance skills, brand team for content skills) before passing it to the skill-creator.

### For Different Claude Interfaces
- **Claude Code (CLI):** Full skill support including scripts. Best for developer workflows and automation-heavy tasks.
- **Claude.ai Projects:** SKILL.md and references work as project instructions and knowledge. Assets can be included as knowledge files. Scripts are not supported.
- **API Integrations:** SKILL.md content becomes system prompts. References become additional context. Assets and scripts are handled by your application logic.
