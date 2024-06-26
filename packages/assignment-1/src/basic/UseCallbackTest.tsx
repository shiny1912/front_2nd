import { useCallback, useState } from "react";
import { BarkButton, MeowButton } from "./UseCallbackTest.components.tsx";

export default function UseCallbackTest() {
  const [meowCount, setMeowCount] = useState(0);
  const [barkedCount, setBarkedCount] = useState(0);

  // useCallback을 통해서 dependency가 변경될 경우에만 함수를 다시 만들도록 합니다.
  const incrementMeowCount = useCallback(() => setMeowCount(n => n + 1), []);
  const incrementBarkedCount = useCallback(() => setBarkedCount(n => n + 1), []);

  return (
    <div>
      <p data-testid="cat">meowCount {meowCount}</p>
      <p data-testid="dog">barkedCount {barkedCount}</p>
      <MeowButton onClick={incrementMeowCount} />
      <BarkButton onClick={incrementBarkedCount} />
    </div>
  );
}
