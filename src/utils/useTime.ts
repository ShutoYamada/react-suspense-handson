import { useEffect, useState } from "react";

const formatter = Intl.DateTimeFormat("ja-JP", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  fractionalSecondDigits: 1,
});

// 0.1秒毎にstateを更新するHooks
const useTime = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatter.format(new Date()));
    }, 100);
    return () => clearInterval(interval);
  });
  return time;
}

export default useTime;