import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const calculateTimeLeft = (): TimeLeft => {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.expired) {
    return (
      <div className="rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 p-4 text-center">
        <p className="text-sm font-semibold text-dark/80">
          This webinar has started or concluded. Check back for the recording in our archive!
        </p>
      </div>
    );
  }

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="countdown-timer">
      <p className="mb-3 text-center text-sm font-semibold uppercase tracking-wide text-dark/70">
        Time Until Webinar
      </p>
      <div className="grid grid-cols-4 gap-3">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 p-3"
          >
            <div className="text-2xl font-bold text-dark md:text-3xl lg:text-4xl">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wide text-dark/70 md:text-sm">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
