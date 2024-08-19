// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';

const 고비용_연산 = () => {
  const randomValue = [1,2,3,4,5].sort(() => Math.random() - 0.5)[0];
  console.log('randomValue', randomValue);
  for(let i = 0; i < 1_000_000_000 * randomValue; i++);
}

export const App = ({ url }: { url: string }) => {

  고비용_연산();

  return (
    <div>
      <h1>Hello from Server-Side Rendered React!</h1>
      <p>This is a simple example of server-side rendering with Express and React.</p>
      <p>url: {url}</p>
    </div>
  );
};
