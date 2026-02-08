import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ProcessStep } from "../components/ProcessStep";
import { ConnectorLine } from "../components/ConnectorLine";
import { AnimatedMetric } from "../components/AnimatedMetric";

/**
 * SprintProcessAnimation - Animated process visualization for Kowalah services pages.
 *
 * Shows the 4-phase Sprint-first implementation methodology with:
 * - Sequential step reveals with connector lines
 * - Active/completed state cycling
 * - Animated metrics appearing during the active phase
 * - Seamless loop back to start
 *
 * Timeline (30fps, ~20 seconds):
 *   0.0s  (0)    - Header fades in
 *   0.5s  (15)   - Phase 1 appears, becomes active
 *   2.0s  (60)   - Connector 1 draws
 *   2.5s  (75)   - Phase 2 appears
 *   3.5s  (105)  - Phase 1 completes, Phase 2 becomes active
 *   4.5s  (135)  - Connector 2 draws
 *   5.0s  (150)  - Phase 3 appears
 *   6.0s  (180)  - Phase 2 completes, Phase 3 becomes active
 *   7.0s  (210)  - Connector 3 draws
 *   7.5s  (225)  - Phase 4 appears
 *   8.5s  (255)  - Phase 3 completes, Phase 4 becomes active
 *   10.0s (300)  - All phases complete, metrics appear
 *   11.0s (330)  - Metrics fully visible
 *   14.0s (420)  - Hold on completed state
 *   15.0s (450)  - Fade out
 *   16.0s (480)  - Reset, loop begins
 */

const KOWALAH_PINK = "#fa26a0";
const KOWALAH_PURPLE = "#ae10e3";

const STEPS = [
  {
    title: "AI Impact Sprint",
    subtitle: "Find and build the 2-3 use cases tied to your strategic goals",
    icon: "sprint" as const,
    timeline: "Weeks 1-3",
  },
  {
    title: "Platform & Governance",
    subtitle: "Deploy enterprise AI with security and compliance from day one",
    icon: "platform" as const,
    timeline: "Weeks 4-7",
  },
  {
    title: "Training & Enablement",
    subtitle: "Scale adoption using your own Sprint proof points as curriculum",
    icon: "training" as const,
    timeline: "Weeks 8-14",
  },
  {
    title: "Ongoing Delivery",
    subtitle: "Continuous expert requests keep new AI solutions flowing",
    icon: "ongoing" as const,
    timeline: "Week 15+",
  },
];

const METRICS = [
  { value: "3x", label: "Team output quality" },
  { value: "25-30%", label: "Productivity gains" },
  { value: "4x", label: "Faster time-to-value" },
];

export const SprintProcessAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Phase timing (in frames)
  // Header fades in immediately, steps build out left-to-right beneath it
  const headerStart = 0;
  const step1Start = Math.round(0.8 * fps);
  const connector1Start = Math.round(2.3 * fps);
  const step2Start = Math.round(2.8 * fps);
  const step1Complete = Math.round(3.8 * fps);
  const connector2Start = Math.round(4.8 * fps);
  const step3Start = Math.round(5.3 * fps);
  const step2Complete = Math.round(6.3 * fps);
  const connector3Start = Math.round(7.3 * fps);
  const step4Start = Math.round(7.8 * fps);
  const step3Complete = Math.round(8.8 * fps);
  const allCompleteStart = Math.round(10.3 * fps);
  const metricsStart = Math.round(10.8 * fps);
  const fadeOutStart = Math.round(15.0 * fps);
  const fadeOutEnd = Math.round(16.0 * fps);

  const connectorDuration = Math.round(0.6 * fps);

  // Determine active/completed states
  const getStepState = (stepIndex: number) => {
    const activeTimes = [
      [step1Start, step1Complete],
      [step2Start, step2Complete],
      [step3Start, step3Complete],
      [step4Start, allCompleteStart],
    ];
    const completeTimes = [step1Complete, step2Complete, step3Complete, allCompleteStart];

    const [activeStart, activeEnd] = activeTimes[stepIndex];
    const completeTime = completeTimes[stepIndex];

    const isActive = frame >= activeStart && frame < activeEnd;
    const isCompleted = frame >= completeTime;

    return { isActive, isCompleted };
  };

  // Header staggered reveal: label → title → subtitle
  const labelStart = headerStart;
  const titleStart = headerStart + Math.round(0.3 * fps);
  const subtitleStart = headerStart + Math.round(0.6 * fps);

  const labelEntrance = spring({
    frame: frame - labelStart,
    fps,
    config: { damping: 200 },
  });

  const titleEntrance = spring({
    frame: frame - titleStart,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const subtitleEntrance = spring({
    frame: frame - subtitleStart,
    fps,
    config: { damping: 200 },
  });

  // Overall fade out for loop
  const fadeOut =
    frame >= fadeOutStart
      ? interpolate(frame, [fadeOutStart, fadeOutEnd], [1, 0], {
          extrapolateRight: "clamp",
        })
      : 1;

  // Metrics entrance
  const metricsVisible = frame >= metricsStart;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#f8fafc",
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        opacity: fadeOut,
      }}
    >
      {/* Subtle background gradient accent */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(250,38,160,0.06) 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(174,16,227,0.05) 0%, transparent 70%)`,
        }}
      />

      {/* Content container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "0 40px",
          gap: 28,
        }}
      >
        {/* Header — staggered reveal: label, title, subtitle */}
        <div style={{ textAlign: "center" }}>
          {/* Label — fades in first */}
          <div
            style={{
              opacity: labelEntrance,
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              background: `linear-gradient(90deg, ${KOWALAH_PINK}, ${KOWALAH_PURPLE})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: 8,
            }}
          >
            Our Methodology
          </div>
          {/* Title — springs up a beat later */}
          <div
            style={{
              opacity: titleEntrance,
              transform: `translateY(${interpolate(titleEntrance, [0, 1], [16, 0])}px)`,
              fontSize: 20,
              fontWeight: 700,
              color: "#0f172a",
              lineHeight: 1.3,
            }}
          >
            Sprint First, Scale Second
          </div>
          {/* Subtitle — fades in last */}
          <div
            style={{
              opacity: subtitleEntrance,
              transform: `translateY(${interpolate(subtitleEntrance, [0, 1], [8, 0])}px)`,
              fontSize: 13,
              color: "#64748b",
              marginTop: 6,
              maxWidth: 500,
            }}
          >
            Business value in weeks, organization-wide transformation in months
          </div>
        </div>

        {/* Process steps row - left-aligned, builds rightward, fixed height to prevent layout shift */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: 0,
            width: "100%",
            height: 220,
          }}
        >
          {STEPS.map((step, index) => {
            const { isActive, isCompleted } = getStepState(index);
            const stepStarts = [step1Start, step2Start, step3Start, step4Start];
            const connectorStarts = [connector1Start, connector2Start, connector3Start];

            return (
              <div
                key={index}
                style={{ display: "flex", alignItems: "flex-start" }}
              >
                <ProcessStep
                  title={step.title}
                  subtitle={step.subtitle}
                  icon={step.icon}
                  stepNumber={index + 1}
                  startFrame={stepStarts[index]}
                  isActive={isActive}
                  isCompleted={isCompleted}
                />
                {index < STEPS.length - 1 && (
                  <ConnectorLine
                    startFrame={connectorStarts[index]}
                    durationFrames={connectorDuration}
                    isCompleted={frame >= connectorStarts[index] + connectorDuration}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Metrics row (appears after all phases complete), fixed height to prevent layout shift */}
        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            height: 80,
          }}
        >
          {metricsVisible &&
            METRICS.map((metric, index) => (
              <AnimatedMetric
                key={index}
                value={metric.value}
                label={metric.label}
                startFrame={metricsStart}
                index={index}
              />
            ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
