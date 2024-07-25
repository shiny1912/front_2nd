import { ComponentProps, memo, PropsWithChildren } from "react";

type Props = {
  countRendering?: () => void;
}

const PureComponent = memo(({ children, countRendering, ...props }: PropsWithChildren<ComponentProps<'div'> & Props>) => {
  countRendering?.();
  return <div {...props}>{children}</div>
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let outerCount = 1

// react의 라이프사이클(state, props 등)과 연관없는 것들의 경우, 컴포넌트 바깥에 선언해줍니다.
// 이렇게 해야 동일한 메모리를 참조하게 됩니다.
const style = { width: '100px', height: '100px' };
const fn = () => { outerCount += 1; };

// useMemo, useCallback 등을 사용하지 않고 이 컴포넌트를 개선해보세요.
export default function RequireRefactoring({ countRendering }: Props) {
  return (
    <PureComponent
      style={style}
      onClick={fn}
      countRendering={countRendering}
    >
      test component
    </PureComponent>
  );
}
