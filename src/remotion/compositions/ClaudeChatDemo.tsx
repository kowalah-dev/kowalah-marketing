import { AbsoluteFill, useVideoConfig } from "remotion";
import { ChatBubble } from "../components/ChatBubble";
import { ThinkingIndicator } from "../components/ThinkingIndicator";
import { SkillLoadBadge } from "../components/SkillLoadBadge";

/**
 * ClaudeChatDemo - A simulated Claude conversation showcasing Skills.
 *
 * Timeline:
 *   0.5s  - User message starts typing
 *   ~5s   - User message complete, thinking dots appear
 *   ~6.5s - Claude's initial response ("Let me load up...")
 *   ~9s   - Skill badge loads in with progress bar
 *   ~11s  - Claude's detailed response starts typing
 *   ~22s  - Response complete, holds
 *   ~24s  - Composition ends
 */

const CLAUDE_BG = "#F4F3EE";
const SIDEBAR_BG = "#E8E6E1";

// Conversation content - showcasing Claude Skills for marketing strategy
const USER_MESSAGE =
  "We're planning a product launch across 6 European markets next quarter. Can you help build a go-to-market strategy that accounts for regional differences?";

const CLAUDE_INITIAL =
  "That's a great use case for structured strategic planning. Let me load up the right skill for this.";

const CLAUDE_DETAILED =
  "Based on proven multi-market launch frameworks, here's a structured approach:\n\n" +
  "Market Tiering: Classify your 6 markets into Tier 1 (highest readiness, e.g. UK and Germany) and Tier 2 (emerging demand). Launch Tier 1 first to build case studies.\n\n" +
  "Localisation Strategy: Go beyond translation. Each market needs adapted messaging, local proof points, and region-specific compliance review. Budget 3-4 weeks per market.\n\n" +
  "Channel Mix: UK and Nordics index heavily on LinkedIn and content marketing. DACH markets respond better to events and partner channels. Southern Europe favours relationship-led sales.\n\n" +
  "Timeline: Stagger launches 2 weeks apart starting with Tier 1. This lets you iterate messaging based on early market feedback before wider rollout.\n\n" +
  "Want me to build out the detailed timeline and budget allocation for each market tier?";

export const ClaudeChatDemo: React.FC = () => {
  const { fps } = useVideoConfig();

  // Timeline (in frames)
  const userStart = Math.round(0.5 * fps);
  const userTypingFrames = USER_MESSAGE.length * 2; // 2 frames/char
  const userEnd = userStart + userTypingFrames;

  const thinkingStart = userEnd + Math.round(0.5 * fps);
  const thinkingDuration = Math.round(1.5 * fps);

  const initialResponseStart = thinkingStart + thinkingDuration;
  const initialTypingFrames = CLAUDE_INITIAL.length * 2; // 2 frames/char
  const initialEnd = initialResponseStart + initialTypingFrames;

  const skillBadgeStart = initialEnd + Math.round(0.4 * fps);
  const skillLoadTime = Math.round(1.8 * fps); // Time for badge to load

  const detailedResponseStart = skillBadgeStart + skillLoadTime + Math.round(0.3 * fps);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: CLAUDE_BG,
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Sidebar hint */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 48,
          background: SIDEBAR_BG,
          borderRight: "1px solid #d6d3cd",
        }}
      />

      {/* Main chat area */}
      <div
        style={{
          marginLeft: 48,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Header bar */}
        <div
          style={{
            padding: "14px 24px",
            borderBottom: "1px solid #d6d3cd",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#DE7356",
            }}
          />
          <span style={{ fontSize: 14, fontWeight: 500, color: "#374151" }}>
            Claude
          </span>
          <span style={{ fontSize: 12, color: "#9ca3af", marginLeft: 4 }}>
            Sonnet
          </span>
        </div>

        {/* Messages area */}
        <div
          style={{
            flex: 1,
            padding: "24px 32px",
            overflowY: "hidden",
          }}
        >
          {/* User asks about go-to-market strategy */}
          <ChatBubble
            text={USER_MESSAGE}
            isUser={true}
            startFrame={userStart}
            charFrames={2}
          />

          {/* Thinking dots */}
          <ThinkingIndicator
            startFrame={thinkingStart}
            durationFrames={thinkingDuration}
          />

          {/* Claude's initial acknowledgment */}
          <ChatBubble
            text={CLAUDE_INITIAL}
            isUser={false}
            startFrame={initialResponseStart}
            charFrames={2}
            avatar="C"
          />

          {/* Skill loading badge */}
          <SkillLoadBadge
            skillName="Marketing Strategy"
            startFrame={skillBadgeStart}
          />

          {/* Claude's detailed response */}
          <ChatBubble
            text={CLAUDE_DETAILED}
            isUser={false}
            startFrame={detailedResponseStart}
            charFrames={1}
            showCursor={true}
            avatar="C"
          />
        </div>

        {/* Input bar */}
        <div
          style={{
            padding: "12px 24px 16px",
            borderTop: "1px solid #d6d3cd",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 12,
              padding: "10px 16px",
              border: "1px solid #d6d3cd",
              fontSize: 14,
              color: "#9ca3af",
            }}
          >
            Reply to Claude...
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
