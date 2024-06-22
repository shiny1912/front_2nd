import { useCallback, useState } from "react";
import { BarkButton, MeowButton } from "./UseCallbackTest.components.tsx";

export default function UseCallbackTest() {
  const [meowCount, setMeowCount] = useState(0);
  const [barkedCount, setBarkedCount] = useState(0);

  const meowButtonClick = useCallback(() => {
    setMeowCount((n) => n + 1);
  }, []);

  const barkButtonClick = useCallback(() => {
    setBarkedCount((n) => n + 1);
  }, []);

  return (
    <div>
      <p data-testid="cat">meowCount {meowCount}</p>
      <p data-testid="dog">barkedCount {barkedCount}</p>
      <MeowButton onClick={meowButtonClick} />
      <BarkButton onClick={barkButtonClick} />
    </div>
  );
}
