import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { DrawCircle, DrawPath, DrawRect, FadeElement } from "../components/DrawSVG";
import { TypedNarrator } from "../components/TypedNarrator";

// ─── Brand colors ──────────────────────────────────────────────────────────────
const PINK = "#fa26a0";
const PURPLE = "#ae10e3";
const SLATE_300 = "#cbd5e1";
const SLATE_400 = "#94a3b8";
const SLATE_500 = "#64748b";
const GREEN = "#059669";
const RED = "#ef4444";

// ─── Layout constants ──────────────────────────────────────────────────────────
const LEFT_CX = 300; // center x of left panel
const RIGHT_CX = 900; // center x of right panel
const ORG_CY = 280; // center y of org chart (pushed down for title clearance)
const DIVIDER_X = 600;

// ─── Org chart positions (relative to panel center) ────────────────────────────
const CEO = { x: 0, y: -90, r: 7 };
const VPS = [
  { x: -80, y: -35, r: 6 },
  { x: 0, y: -35, r: 6 },
  { x: 80, y: -35, r: 6 },
];
const TEAMS = [
  [
    { x: -100, y: 20, r: 5 },
    { x: -80, y: 20, r: 5 },
    { x: -60, y: 20, r: 5 },
  ],
  [
    { x: -20, y: 20, r: 5 },
    { x: 0, y: 20, r: 5 },
    { x: 20, y: 20, r: 5 },
  ],
  [
    { x: 60, y: 20, r: 5 },
    { x: 80, y: 20, r: 5 },
    { x: 100, y: 20, r: 5 },
  ],
];

// Flatten for iteration
const ALL_PEOPLE = [CEO, ...VPS, ...TEAMS.flat()];

// Generate org chart connector lines (CEO→VPs, VPs→Teams)
function getOrgLines() {
  const lines: string[] = [];
  VPS.forEach((vp) => {
    lines.push(`M ${CEO.x} ${CEO.y + CEO.r} L ${vp.x} ${vp.y - vp.r}`);
  });
  VPS.forEach((vp, i) => {
    TEAMS[i].forEach((m) => {
      lines.push(`M ${vp.x} ${vp.y + vp.r} L ${m.x} ${m.y - m.r}`);
    });
  });
  return lines;
}

const ORG_LINES = getOrgLines();

// Scattered AI tool positions (relative to panel center)
const AI_TOOLS = [
  { x: -95, y: 8 },
  { x: 15, y: 8 },
  { x: 75, y: 8 },
  { x: -75, y: -50 },
  { x: 85, y: -50 },
];

// Sprint-circled people (middle person of each team)
const SPRINT_PEOPLE = [TEAMS[0][1], TEAMS[1][1], TEAMS[2][1]];

// ─── Narrator texts ────────────────────────────────────────────────────────────
const NARRATOR_1 = "Two companies. Same industry. Same headcount. Both know AI matters.";
const NARRATOR_2 = "One trained everyone. One built with the people who matter most.";
const NARRATOR_3 = "One is still planning. The other is pulling ahead.";
const NARRATOR_4 = "The gap doesn't close. It compounds.";
const NARRATOR_5 = "Which company are you building?";

// ─── Main composition ──────────────────────────────────────────────────────────
export const TwoCompaniesAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ── Scene timing (in frames) ──
  const S1 = 0;                         // Scene 1: Same starting line (0–6s)
  const S2 = Math.round(6 * fps);       // Scene 2: Different first moves (6–13s)
  const S3 = Math.round(13 * fps);      // Scene 3: The gap opens (13–21s)
  const S4 = Math.round(21 * fps);      // Scene 4: Compounding returns (21–28s)
  const S5 = Math.round(28 * fps);      // Scene 5: The question (28–35s)
  const FADE_START = Math.round(33 * fps);
  const FADE_END = Math.round(35 * fps);

  // ── Scene 1 sub-timing ──
  const orgLinesStart = Math.round(0.3 * fps);
  const orgPeopleStart = Math.round(1.0 * fps);
  const aiToolsStart = Math.round(2.5 * fps);
  const narrator1Start = Math.round(3.0 * fps);

  // ── Scene 2 sub-timing ──
  const trainingBannerStart = S2;
  const timeSkipStart = S2 + Math.round(1.5 * fps);
  const lightbulbStart = S2 + Math.round(2.5 * fps);
  const backlogStart = S2 + Math.round(3.5 * fps);
  const lightbulbDim = S2 + Math.round(4.5 * fps);
  const sprintCircleStart = S2 + Math.round(0.3 * fps);
  const solutionCardsStart = S2 + Math.round(2.0 * fps);
  const sprintMetricStart = S2 + Math.round(3.5 * fps);
  const narrator2Start = S2 + Math.round(5.0 * fps);

  // ── Scene 3 sub-timing (3 vignettes, ~2.5s each) ──
  const vig1Start = S3;
  const vig2Start = S3 + Math.round(2.7 * fps);
  const vig3Start = S3 + Math.round(5.4 * fps);
  const narrator3Start = S3 + Math.round(6.5 * fps);

  // ── Scene 4 sub-timing ──
  const leftDimStart = S4;
  const networkSpreadStart = S4 + Math.round(0.5 * fps);
  const solutionStreamStart = S4 + Math.round(2.0 * fps);
  const metricsStart = S4 + Math.round(3.5 * fps);
  const narrator4Start = S4 + Math.round(5.0 * fps);

  // ── Scene 5 sub-timing ──
  const questionStart = S5 + Math.round(0.5 * fps);
  const ctaStart = S5 + Math.round(3.5 * fps);

  // ── Derived animation values ──

  // Left side dims in Scene 4
  const leftDim = interpolate(frame, [leftDimStart, leftDimStart + Math.round(1 * fps)], [1, 0.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 5: everything fades, question appears
  const scene5Fade = interpolate(frame, [S5, S5 + Math.round(0.8 * fps)], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Divider fade in Scene 5
  const dividerOpacity = interpolate(frame, [S5, S5 + Math.round(0.5 * fps)], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Content fade for loop
  const contentFade =
    frame >= FADE_START
      ? interpolate(frame, [FADE_START, FADE_END], [1, 0], {
          extrapolateRight: "clamp",
        })
      : 1;

  // ── Helper: render org chart for one side ──
  function renderOrgChart(cx: number, startDelay: number, sideOpacity: number) {
    const drawDur = Math.round(0.4 * fps);
    return (
      <g opacity={sideOpacity}>
        {/* Connector lines */}
        {ORG_LINES.map((d, i) => (
          <DrawPath
            key={`line-${i}`}
            d={d.replace(/(-?\d+\.?\d*)\s+(-?\d+\.?\d*)/g, (_, x, y) => {
              // This won't work with replace — use offset approach instead
              return `${x} ${y}`;
            })}
            // We need to offset the path coordinates — let's use a <g transform>
            startFrame={startDelay + orgLinesStart + i * 3}
            durationFrames={drawDur}
            stroke={SLATE_300}
            strokeWidth={1.5}
          />
        ))}
        {/* People circles */}
        {ALL_PEOPLE.map((p, i) => (
          <DrawCircle
            key={`person-${i}`}
            cx={p.x}
            cy={p.y}
            r={p.r}
            startFrame={startDelay + orgPeopleStart + i * 2}
            durationFrames={drawDur}
            stroke={SLATE_400}
            strokeWidth={1.5}
            fill="#f1f5f9"
          />
        ))}
        {/* Scattered AI tool diamonds */}
        {AI_TOOLS.map((t, i) => (
          <DrawPath
            key={`tool-${i}`}
            d={`M ${t.x} ${t.y - 5} L ${t.x + 5} ${t.y} L ${t.x} ${t.y + 5} L ${t.x - 5} ${t.y} Z`}
            startFrame={startDelay + aiToolsStart + i * 4}
            durationFrames={Math.round(0.3 * fps)}
            stroke={SLATE_400}
            strokeWidth={1}
            fill="#e2e8f0"
          />
        ))}
      </g>
    );
  }

  // ── Helper: Scene 2 Left — Training + Enthusiasm Gap ──
  function renderScene2Left() {
    if (frame < S2) return null;
    // Fade out before Scene 3 (vignettes replace this content)
    const s2Fade = interpolate(
      frame,
      [S3 - Math.round(0.8 * fps), S3],
      [1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    if (s2Fade <= 0) return null;
    const opacity = frame >= S4 ? leftDim : 1;

    // Lightbulb positions (above 3 random team members)
    const bulbPeople = [TEAMS[0][0], TEAMS[1][2], TEAMS[2][0]];

    // Lightbulb dims after backlog
    const bulbOpacity = interpolate(
      frame,
      [lightbulbDim, lightbulbDim + Math.round(1 * fps)],
      [1, 0.15],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    return (
      <g opacity={s2Fade * opacity * (frame >= S5 ? scene5Fade : 1)}>
        {/* Training banner */}
        <DrawRect
          x={-120}
          y={-110}
          width={240}
          height={165}
          rx={12}
          startFrame={trainingBannerStart}
          durationFrames={Math.round(0.8 * fps)}
          stroke={SLATE_400}
          strokeWidth={1.5}
          opacity={interpolate(
            frame,
            [timeSkipStart, timeSkipStart + Math.round(0.8 * fps)],
            [1, 0.3],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )}
        />

        {/* "TRAINING" label */}
        {frame >= trainingBannerStart + Math.round(0.5 * fps) && (
          <text
            x={0}
            y={-118}
            textAnchor="middle"
            fontSize={11}
            fontWeight={600}
            fill={SLATE_500}
            letterSpacing={1.5}
            opacity={interpolate(
              frame,
              [
                trainingBannerStart + Math.round(0.5 * fps),
                trainingBannerStart + Math.round(0.8 * fps),
                timeSkipStart,
                timeSkipStart + Math.round(0.5 * fps),
              ],
              [0, 1, 1, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )}
          >
            TRAINING PROGRAM
          </text>
        )}

        {/* "12 WEEKS LATER..." */}
        {frame >= timeSkipStart && (
          <text
            x={0}
            y={-118}
            textAnchor="middle"
            fontSize={11}
            fontWeight={600}
            fill={SLATE_500}
            letterSpacing={1}
            opacity={interpolate(
              frame,
              [timeSkipStart, timeSkipStart + Math.round(0.5 * fps)],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )}
          >
            12 WEEKS LATER...
          </text>
        )}

        {/* Lightbulbs */}
        {bulbPeople.map((p, i) => {
          const bulbStart = lightbulbStart + i * 8;
          const bulbY = p.y - 20;
          const bulbProgress = interpolate(
            frame,
            [bulbStart, bulbStart + Math.round(0.4 * fps)],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          if (bulbProgress <= 0) return null;

          // Float upward toward backlog
          const floatUp =
            frame >= backlogStart
              ? interpolate(
                  frame,
                  [backlogStart, backlogStart + Math.round(1.5 * fps)],
                  [0, -55],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                )
              : 0;

          return (
            <g
              key={`bulb-${i}`}
              transform={`translate(${p.x}, ${bulbY + floatUp})`}
              opacity={bulbProgress * bulbOpacity}
            >
              {/* Simple lightbulb: circle + small base */}
              <circle r={5} fill="#fbbf24" stroke="#f59e0b" strokeWidth={1} />
              <path d="M -2 5 L 2 5 L 1 8 L -1 8 Z" fill="#f59e0b" />
            </g>
          );
        })}

        {/* BACKLOG label */}
        {frame >= backlogStart && (
          <g
            opacity={interpolate(
              frame,
              [backlogStart, backlogStart + Math.round(0.5 * fps)],
              [0, bulbOpacity],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )}
          >
            <rect
              x={-35}
              y={-80}
              width={70}
              height={22}
              rx={4}
              fill="#fef3c7"
              stroke="#f59e0b"
              strokeWidth={1}
            />
            <text
              x={0}
              y={-66}
              textAnchor="middle"
              fontSize={9}
              fontWeight={600}
              fill="#92400e"
            >
              IT BACKLOG
            </text>
          </g>
        )}
      </g>
    );
  }

  // ── Helper: Scene 2 Right — Sprint circles + solutions ──
  function renderScene2Right() {
    if (frame < S2) return null;

    // Solution detail fades out before Scene 3 (Sprint circles persist)
    const detailFade = interpolate(
      frame,
      [S3 - Math.round(0.8 * fps), S3],
      [1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    return (
      <g opacity={frame >= S5 ? scene5Fade : 1}>
        {/* Gradient circles around Sprint people */}
        {SPRINT_PEOPLE.map((p, i) => (
          <DrawCircle
            key={`sprint-${i}`}
            cx={p.x}
            cy={p.y}
            r={14}
            startFrame={sprintCircleStart + i * 10}
            durationFrames={Math.round(0.5 * fps)}
            stroke={i === 1 ? PURPLE : PINK}
            strokeWidth={2}
          />
        ))}

        {/* Connector lines between Sprint people */}
        {[0, 1].map((i) => (
          <DrawPath
            key={`sprint-conn-${i}`}
            d={`M ${SPRINT_PEOPLE[i].x + 14} ${SPRINT_PEOPLE[i].y} L ${SPRINT_PEOPLE[i + 1].x - 14} ${SPRINT_PEOPLE[i + 1].y}`}
            startFrame={sprintCircleStart + Math.round(1.2 * fps) + i * 8}
            durationFrames={Math.round(0.4 * fps)}
            stroke={PINK}
            strokeWidth={1.5}
          />
        ))}

        {/* Solution cards + metric — fade out before Scene 3 */}
        <g opacity={detailFade}>
        {SPRINT_PEOPLE.map((p, i) => {
          const labels = ["Workflow", "Custom GPT", "AI Agent"];
          const cardStart = solutionCardsStart + i * 12;
          const cardProgress = interpolate(
            frame,
            [cardStart, cardStart + Math.round(0.5 * fps)],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          if (cardProgress <= 0) return null;

          return (
            <g
              key={`card-${i}`}
              transform={`translate(${p.x}, ${p.y + 22})`}
              opacity={cardProgress}
            >
              <rect
                x={-28}
                y={0}
                width={56}
                height={18}
                rx={4}
                fill="white"
                stroke={PINK}
                strokeWidth={1}
              />
              <text
                x={0}
                y={12}
                textAnchor="middle"
                fontSize={8}
                fontWeight={600}
                fill={PURPLE}
              >
                {labels[i]}
              </text>
            </g>
          );
        })}

        {/* "3 weeks. 3 working solutions." */}
        {frame >= sprintMetricStart && (
          <text
            x={0}
            y={85}
            textAnchor="middle"
            fontSize={12}
            fontWeight={700}
            fill={PINK}
            opacity={interpolate(
              frame,
              [sprintMetricStart, sprintMetricStart + Math.round(0.5 * fps)],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )}
          >
            3 weeks. 3 working solutions.
          </text>
        )}
        </g>
      </g>
    );
  }

  // ── Helper: Scene 3 — Vignettes ──
  function renderScene3Vignettes(side: "left" | "right") {
    if (frame < S3) return null;
    // Fade out before Scene 4 (network spread replaces vignettes)
    const s3Fade = interpolate(
      frame,
      [S4 - Math.round(0.5 * fps), S4],
      [1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    if (s3Fade <= 0) return null;

    const isLeft = side === "left";
    const sideOpacity = isLeft
      ? interpolate(frame, [leftDimStart, leftDimStart + Math.round(1 * fps)], [1, 0.2], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

    // Each vignette fades in and out
    const vigOpacity = (start: number) => {
      const nextStart = start + Math.round(2.7 * fps);
      const fadeIn = interpolate(
        frame,
        [start, start + Math.round(0.4 * fps)],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      );
      // Only fade out if there's a next vignette (not the last one)
      const fadeOut =
        start < vig3Start
          ? interpolate(
              frame,
              [nextStart - Math.round(0.3 * fps), nextStart],
              [1, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )
          : 1;
      return fadeIn * fadeOut;
    };

    const vigY = 130; // Y offset for vignettes (below org chart area)

    return (
      <g opacity={sideOpacity * s3Fade}>
        {/* Vignette 1: Lost deal / Won deal */}
        {frame >= vig1Start && (
          <g transform={`translate(0, ${vigY})`} opacity={vigOpacity(vig1Start)}>
            {isLeft ? (
              <>
                {/* Two companies competing for a client — we lose */}
                <rect x={-50} y={-15} width={24} height={24} rx={3} fill="#f1f5f9" stroke={SLATE_400} strokeWidth={1} />
                <rect x={26} y={-15} width={24} height={24} rx={3} fill="#f1f5f9" stroke={GREEN} strokeWidth={1.5} />
                {/* Client diamond */}
                <path d="M 0 -12 L 8 -3 L 0 6 L -8 -3 Z" fill="#fef3c7" stroke="#f59e0b" strokeWidth={1} />
                {/* Arrow to competitor */}
                <DrawPath d="M 6 -3 L 22 -3" startFrame={vig1Start + 10} durationFrames={10} stroke={GREEN} strokeWidth={1.5} />
                {/* X on us */}
                <g opacity={interpolate(frame, [vig1Start + 15, vig1Start + 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
                  <path d="M -44 -9 L -32 3" stroke={RED} strokeWidth={2} strokeLinecap="round" />
                  <path d="M -32 -9 L -44 3" stroke={RED} strokeWidth={2} strokeLinecap="round" />
                </g>
                <text x={0} y={28} textAnchor="middle" fontSize={9} fill={RED} fontWeight={600}>
                  Deal lost to AI-ready competitor
                </text>
              </>
            ) : (
              <>
                {/* We win the deal */}
                <rect x={-50} y={-15} width={24} height={24} rx={3} fill="#f1f5f9" stroke={PINK} strokeWidth={1.5} />
                <rect x={26} y={-15} width={24} height={24} rx={3} fill="#f1f5f9" stroke={SLATE_300} strokeWidth={1} />
                <path d="M 0 -12 L 8 -3 L 0 6 L -8 -3 Z" fill="#fef3c7" stroke="#f59e0b" strokeWidth={1} />
                <DrawPath d="M -6 -3 L -22 -3" startFrame={vig1Start + 10} durationFrames={10} stroke={PINK} strokeWidth={1.5} />
                {/* Checkmark on us */}
                <g opacity={interpolate(frame, [vig1Start + 15, vig1Start + 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
                  <path d="M -44 -3 L -40 1 L -34 -7" stroke={GREEN} strokeWidth={2} strokeLinecap="round" fill="none" />
                </g>
                <text x={0} y={28} textAnchor="middle" fontSize={9} fill={GREEN} fontWeight={600}>
                  New client won with AI-powered proposal
                </text>
              </>
            )}
          </g>
        )}

        {/* Vignette 2: Talent leaves / joins */}
        {frame >= vig2Start && (
          <g transform={`translate(0, ${vigY})`} opacity={vigOpacity(vig2Start)}>
            {isLeft ? (
              <>
                {/* Person walking away */}
                <circle cx={-20} cy={-3} r={6} fill="#f1f5f9" stroke={SLATE_400} strokeWidth={1.5} />
                {/* Arrow pointing away */}
                <DrawPath d="M -10 -3 L 40 -3" startFrame={vig2Start + 8} durationFrames={15} stroke={RED} strokeWidth={1.5} />
                <g opacity={interpolate(frame, [vig2Start + 20, vig2Start + 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
                  <path d="M 36 -7 L 42 -3 L 36 1" stroke={RED} strokeWidth={1.5} strokeLinecap="round" fill="none" />
                </g>
                <text x={0} y={28} textAnchor="middle" fontSize={9} fill={RED} fontWeight={600}>
                  Top analyst left for an AI-forward company
                </text>
              </>
            ) : (
              <>
                {/* Person joining */}
                <circle cx={20} cy={-3} r={6} fill="#f0fdf4" stroke={GREEN} strokeWidth={1.5} />
                <DrawPath d="M 10 -3 L -40 -3" startFrame={vig2Start + 8} durationFrames={15} stroke={GREEN} strokeWidth={1.5} />
                <g opacity={interpolate(frame, [vig2Start + 20, vig2Start + 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
                  <path d="M -36 -7 L -42 -3 L -36 1" stroke={GREEN} strokeWidth={1.5} strokeLinecap="round" fill="none" />
                </g>
                {/* Small star badge */}
                <circle cx={28} cy={-9} r={4} fill="#fbbf24" stroke="#f59e0b" strokeWidth={0.5} />
                <text x={0} y={28} textAnchor="middle" fontSize={9} fill={GREEN} fontWeight={600}>
                  Senior hire attracted by AI culture
                </text>
              </>
            )}
          </g>
        )}

        {/* Vignette 3: Revenue plateau / climb */}
        {frame >= vig3Start && (
          <g transform={`translate(0, ${vigY})`} opacity={vigOpacity(vig3Start)}>
            {isLeft ? (
              <>
                {/* Revenue chart — rises then flattens */}
                <path d="M -50 15 L -50 -15 M -50 15 L 50 15" stroke={SLATE_300} strokeWidth={1} />
                <DrawPath
                  d="M -45 10 C -30 5 -15 -5 0 -8 C 15 -10 30 -9 45 -8"
                  startFrame={vig3Start + 5}
                  durationFrames={20}
                  stroke={RED}
                  strokeWidth={2}
                />
                {/* Competitor line going up */}
                <DrawPath
                  d="M -45 12 C -20 5 10 -5 45 -15"
                  startFrame={vig3Start + 10}
                  durationFrames={20}
                  stroke={SLATE_400}
                  strokeWidth={1}
                  strokeDasharray="0.03 0.02"
                />
                <text x={0} y={35} textAnchor="middle" fontSize={9} fill={RED} fontWeight={600}>
                  Growth stalling while competitors accelerate
                </text>
              </>
            ) : (
              <>
                {/* Revenue chart — steady climb, pulling away */}
                <path d="M -50 15 L -50 -15 M -50 15 L 50 15" stroke={SLATE_300} strokeWidth={1} />
                <DrawPath
                  d="M -45 12 C -20 0 10 -10 45 -18"
                  startFrame={vig3Start + 5}
                  durationFrames={20}
                  stroke={PINK}
                  strokeWidth={2}
                />
                {/* Competitor line, flatter */}
                <DrawPath
                  d="M -45 12 C -30 8 -10 5 45 2"
                  startFrame={vig3Start + 10}
                  durationFrames={20}
                  stroke={SLATE_400}
                  strokeWidth={1}
                  strokeDasharray="0.03 0.02"
                />
                <text x={0} y={35} textAnchor="middle" fontSize={9} fill={GREEN} fontWeight={600}>
                  Revenue growing, outpacing the industry
                </text>
              </>
            )}
          </g>
        )}
      </g>
    );
  }

  // ── Helper: Scene 4 — Network spread + metrics (right side) ──
  function renderScene4Right() {
    if (frame < S4 || frame >= S5) return null;

    // Network lines radiating from Sprint people to all team members
    const allTeamMembers = TEAMS.flat();
    const nonSprintMembers = allTeamMembers.filter(
      (m) => !SPRINT_PEOPLE.some((sp) => sp.x === m.x && sp.y === m.y)
    );

    return (
      <g>
        {/* Radiate connections from Sprint people to everyone */}
        {nonSprintMembers.map((m, i) => {
          // Connect to nearest Sprint person
          const nearest = SPRINT_PEOPLE.reduce((a, b) =>
            Math.abs(a.x - m.x) < Math.abs(b.x - m.x) ? a : b
          );
          return (
            <DrawPath
              key={`net-${i}`}
              d={`M ${nearest.x} ${nearest.y} L ${m.x} ${m.y}`}
              startFrame={networkSpreadStart + i * 5}
              durationFrames={Math.round(0.3 * fps)}
              stroke={PINK}
              strokeWidth={1}
              opacity={0.6}
            />
          );
        })}

        {/* Connect Sprint people to VPs */}
        {VPS.map((vp, i) => (
          <DrawPath
            key={`vp-net-${i}`}
            d={`M ${SPRINT_PEOPLE[i].x} ${SPRINT_PEOPLE[i].y} L ${vp.x} ${vp.y}`}
            startFrame={networkSpreadStart + Math.round(1 * fps) + i * 5}
            durationFrames={Math.round(0.3 * fps)}
            stroke={PURPLE}
            strokeWidth={1}
            opacity={0.6}
          />
        ))}

        {/* Connect VPs to CEO */}
        {VPS.map((vp, i) => (
          <DrawPath
            key={`ceo-net-${i}`}
            d={`M ${vp.x} ${vp.y} L ${CEO.x} ${CEO.y}`}
            startFrame={networkSpreadStart + Math.round(1.5 * fps) + i * 5}
            durationFrames={Math.round(0.3 * fps)}
            stroke={PURPLE}
            strokeWidth={1.5}
            opacity={0.6}
          />
        ))}

        {/* Small sparkle on each person as they connect */}
        {allTeamMembers.map((m, i) => {
          const sparkStart = networkSpreadStart + i * 5 + Math.round(0.3 * fps);
          const sparkOpacity = interpolate(
            frame,
            [sparkStart, sparkStart + 8, sparkStart + 20],
            [0, 1, 0.5],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          if (sparkOpacity <= 0) return null;
          return (
            <circle
              key={`spark-${i}`}
              cx={m.x}
              cy={m.y}
              r={m.r + 3}
              fill="none"
              stroke={PINK}
              strokeWidth={1}
              opacity={sparkOpacity}
            />
          );
        })}

        {/* Solution stream — small cards flowing in from the right */}
        {[0, 1, 2, 3, 4].map((i) => {
          const cardStart = solutionStreamStart + i * 12;
          const cardProgress = interpolate(
            frame,
            [cardStart, cardStart + Math.round(0.8 * fps)],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          if (cardProgress <= 0) return null;

          const xPos = interpolate(cardProgress, [0, 1], [130, 90 - i * 35]);
          return (
            <rect
              key={`stream-${i}`}
              x={xPos}
              y={70 + (i % 2 === 0 ? 0 : 10)}
              width={24}
              height={14}
              rx={3}
              fill="white"
              stroke={PINK}
              strokeWidth={1}
              opacity={cardProgress * 0.8}
            />
          );
        })}
      </g>
    );
  }

  // ── Helper: Scene 4 Metrics ──
  function renderMetrics() {
    if (frame < metricsStart || frame >= S5) return null;

    const metrics = [
      { value: "42 AI solutions", label: "deployed" },
      { value: "31% productivity", label: "gain" },
      { value: "Competitors", label: "asking how" },
    ];

    return (
      <g>
        {metrics.map((m, i) => {
          const mStart = metricsStart + i * 12;
          const entrance = spring({
            frame: frame - mStart,
            fps,
            config: { damping: 12, stiffness: 160 },
            delay: 0,
          });

          if (frame < mStart) return null;

          const yOffset = interpolate(entrance, [0, 1], [15, 0]);

          return (
            <g
              key={`metric-${i}`}
              transform={`translate(${-80 + i * 80}, 110)`}
              opacity={entrance}
            >
              <g transform={`translate(0, ${yOffset})`}>
                <rect
                  x={-35}
                  y={-14}
                  width={70}
                  height={28}
                  rx={6}
                  fill="white"
                  stroke={PINK}
                  strokeWidth={1.5}
                />
                <text
                  x={0}
                  y={-2}
                  textAnchor="middle"
                  fontSize={10}
                  fontWeight={700}
                  fill={PURPLE}
                >
                  {m.value}
                </text>
                <text
                  x={0}
                  y={9}
                  textAnchor="middle"
                  fontSize={8}
                  fontWeight={500}
                  fill={SLATE_500}
                >
                  {m.label}
                </text>
              </g>
            </g>
          );
        })}
      </g>
    );
  }

  // ── Helper: Scene 5 — Question + CTA ──
  function renderScene5() {
    if (frame < S5) return null;

    const questionEntrance = spring({
      frame: frame - questionStart,
      fps,
      config: { damping: 15, stiffness: 100 },
    });

    const ctaEntrance = spring({
      frame: frame - ctaStart,
      fps,
      config: { damping: 12, stiffness: 120 },
    });

    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        {/* The question */}
        {frame >= questionStart && (
          <div
            style={{
              opacity: questionEntrance,
              transform: `translateY(${interpolate(questionEntrance, [0, 1], [20, 0])}px)`,
            }}
          >
            <TypedNarrator
              text={NARRATOR_5}
              startFrame={questionStart}
              framesPerChar={2}
              style={{
                fontSize: 24,
                fontWeight: 700,
                fontStyle: "normal",
                color: "#0f172a",
                letterSpacing: -0.3,
              }}
            />
          </div>
        )}

        {/* CTA button */}
        {frame >= ctaStart && (
          <a
            href="/contact"
            style={{
              marginTop: 24,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 28px",
              borderRadius: 10,
              background: `linear-gradient(135deg, ${PINK}, ${PURPLE})`,
              color: "white",
              fontSize: 15,
              fontWeight: 600,
              fontFamily: 'Inter, -apple-system, sans-serif',
              textDecoration: "none",
              opacity: ctaEntrance,
              transform: `translateY(${interpolate(ctaEntrance, [0, 1], [15, 0])}px)`,
              boxShadow: "0 4px 16px rgba(250, 38, 160, 0.3)",
              pointerEvents: frame >= ctaStart ? "auto" : "none",
              cursor: "pointer",
            }}
          >
            Book a Conversation
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </div>
    );
  }

  // ── Narrator timing ──
  // Each narrator line fades out when the next scene starts
  const narratorFade = (start: number, nextScene: number) =>
    frame >= nextScene - Math.round(0.5 * fps)
      ? interpolate(
          frame,
          [nextScene - Math.round(0.5 * fps), nextScene],
          [1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        )
      : undefined;

  // ═══════════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════════

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#fafafa",
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Content wrapper — fades for loop transition */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: contentFade,
        }}
      >
        {/* ── Background accents ── */}
        <div
          style={{
            position: "absolute",
            top: -60,
            left: -60,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(250,38,160,0.04) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -40,
            right: -40,
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(174,16,227,0.03) 0%, transparent 70%)",
          }}
        />

        {/* ── Section title (static, above the video content) ── */}
        <div
          style={{
            position: "absolute",
            top: 18,
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 5,
            opacity: frame >= S5 ? scene5Fade : 1,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              background: `linear-gradient(90deg, ${PINK}, ${PURPLE})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: 4,
              opacity: spring({
                frame,
                fps,
                config: { damping: 200 },
              }),
            }}
          >
            How It Works
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#0f172a",
              opacity: spring({
                frame: frame - Math.round(0.2 * fps),
                fps,
                config: { damping: 15, stiffness: 120 },
              }),
            }}
          >
            Two paths. One choice.
          </div>
        </div>

        {/* ── SVG canvas for all drawing elements ── */}
        <svg
          viewBox="0 0 1200 675"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          {/* Center divider line */}
          <line
            x1={DIVIDER_X}
            y1={70}
            x2={DIVIDER_X}
            y2={630}
            stroke={SLATE_300}
            strokeWidth={1}
            opacity={
              dividerOpacity *
              interpolate(frame, [Math.round(0.5 * fps), Math.round(1 * fps)], [0, 0.5], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            }
            strokeDasharray="6 4"
          />

          {/* ── Left side org chart ── */}
          <g
            transform={`translate(${LEFT_CX}, ${ORG_CY}) scale(1.6)`}
            opacity={(frame >= S4 ? leftDim : 1) * (frame >= S5 ? scene5Fade : 1)}
          >
            {renderOrgChart(LEFT_CX, 0, 1)}
          </g>

          {/* ── Right side org chart ── */}
          <g
            transform={`translate(${RIGHT_CX}, ${ORG_CY}) scale(1.6)`}
            opacity={frame >= S5 ? scene5Fade : 1}
          >
            {renderOrgChart(RIGHT_CX, 2, 1)}
          </g>

          {/* ── Scene 2: Left — Training + Enthusiasm Gap ── */}
          <g transform={`translate(${LEFT_CX}, ${ORG_CY}) scale(1.6)`}>
            {renderScene2Left()}
          </g>

          {/* ── Scene 2: Right — Sprint + Solutions ── */}
          <g transform={`translate(${RIGHT_CX}, ${ORG_CY}) scale(1.6)`}>
            {renderScene2Right()}
          </g>

          {/* ── Scene 3: Vignettes ── */}
          <g transform={`translate(${LEFT_CX}, ${ORG_CY}) scale(1.6)`}>
            {renderScene3Vignettes("left")}
          </g>
          <g transform={`translate(${RIGHT_CX}, ${ORG_CY}) scale(1.6)`}>
            {renderScene3Vignettes("right")}
          </g>

          {/* ── Scene 4: Network spread + metrics (right side) ── */}
          <g transform={`translate(${RIGHT_CX}, ${ORG_CY}) scale(1.6)`}>
            {renderScene4Right()}
            {renderMetrics()}
          </g>
        </svg>

        {/* ── Narrator overlay (HTML for better text rendering) ── */}
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: 60,
            right: 60,
            zIndex: 5,
            opacity: frame >= S5 ? scene5Fade : 1,
          }}
        >
          {/* Scene 1 narrator */}
          <TypedNarrator
            text={NARRATOR_1}
            startFrame={narrator1Start}
            fadeOutFrame={S2 - Math.round(0.5 * fps)}
          />

          {/* Scene 2 narrator */}
          <TypedNarrator
            text={NARRATOR_2}
            startFrame={narrator2Start}
            fadeOutFrame={S3 - Math.round(0.5 * fps)}
          />

          {/* Scene 3 narrator */}
          <TypedNarrator
            text={NARRATOR_3}
            startFrame={narrator3Start}
            fadeOutFrame={S4 - Math.round(0.5 * fps)}
          />

          {/* Scene 4 narrator */}
          <TypedNarrator
            text={NARRATOR_4}
            startFrame={narrator4Start}
            fadeOutFrame={S5 - Math.round(0.5 * fps)}
          />
        </div>

        {/* ── Scene 5: Question + CTA (HTML overlay) ── */}
        {renderScene5()}
      </div>
    </AbsoluteFill>
  );
};
