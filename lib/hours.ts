const WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

const PT_DAY: Record<string, string> = {
  Mon: "segunda-feira",
  Tue: "terça-feira",
  Wed: "quarta-feira",
  Thu: "quinta-feira",
  Fri: "sexta-feira",
  Sat: "sábado",
  Sun: "domingo",
};

function nyParts(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  const idx = WEEK.indexOf(weekday as (typeof WEEK)[number]);
  return { weekday, mins: hour * 60 + minute, idx: idx < 0 ? 1 : idx };
}

function closeMinute(weekday: string): number | null {
  if (weekday === "Fri") return 12 * 60;
  if (weekday === "Mon" || weekday === "Tue" || weekday === "Wed" || weekday === "Thu") return 17 * 60;
  return null;
}

export function hoursStatus(now = new Date()): { en: string; pt: string } {
  const { weekday, mins, idx } = nyParts(now);
  const open = 8 * 60;
  const close = closeMinute(weekday);
  if (close !== null && mins >= open && mins < close) {
    if (weekday === "Fri") {
      return { en: "Open today · until 12:00 pm", pt: "Aberto hoje · até às 12:00" };
    }
    return { en: "Open today · until 5:00 pm", pt: "Aberto hoje · até às 17:00" };
  }
  let next = idx;
  if (close !== null && mins < open) {
    return { en: "Closed now · opens today 8:00 am", pt: "Encerrado agora · abre hoje às 8:00" };
  }
  for (let step = 1; step <= 7; step++) {
    next = (idx + step) % 7;
    const name = WEEK[next];
    if (closeMinute(name) !== null) {
      if (name === "Mon") {
        return {
          en: "Closed now · opens Monday 8:00 am",
          pt: "Encerrado agora · abre segunda-feira às 8:00",
        };
      }
      const enName =
        name === "Tue" ? "Tuesday" : name === "Wed" ? "Wednesday" : name === "Thu" ? "Thursday" : "Friday";
      return {
        en: `Closed now · opens ${enName} 8:00 am`,
        pt: `Encerrado agora · abre ${PT_DAY[name]} às 8:00`,
      };
    }
  }
  return {
    en: "Closed now · opens Monday 8:00 am",
    pt: "Encerrado agora · abre segunda-feira às 8:00",
  };
}
