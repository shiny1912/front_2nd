export function jsx(type, props, ...children) {
  return { type, props: props || {}, children };
}

export function createElement(node) {
  // jsx를 dom으로 변환
  // Create the element with the given tag name
  const rootElement = document.createElement(node.type);
  // Set attributes if provided
  // if (node.props) {
  //   for (const key in node.props) {
  //     rootElement.setAttribute(key, node.props[key]);
  //   }
  // }
  if (node.props) {
    const propsArray = Object.keys(node.props);
    propsArray.map((key) => rootElement.setAttribute(key, node.props[key]));
  }
  //node
  if (typeof node === "string" || typeof node === "number") {
    return document.createTextNode(String(node));
  }
  // Append children if provided
  if (node.children) {
    node.children.forEach(child => {
      // Append text nodes directly or recursively handle nested jsx calls
      if (typeof child === 'string') {
        rootElement.appendChild(document.createTextNode(child));
      } else if (typeof child === 'object') { //jsx가 객체를 return하기 때문
        rootElement.appendChild(createElement(child));
      } else {
        rootElement.appendChild(createElement(child));
      }
    });
  }

  return rootElement;
}

function updateAttributes(target, newProps, oldProps) {
  // newProps들을 반복하여 각 속성과 값을 확인
  //   만약 oldProps에 같은 속성이 있고 값이 동일하다면
  //     다음 속성으로 넘어감 (변경 불필요)
  //   만약 위 조건에 해당하지 않는다면 (속성값이 다르거나 구속성에 없음)
  //     target에 해당 속성을 새 값으로 설정

  // oldProps을 반복하여 각 속성 확인
  //   만약 newProps들에 해당 속성이 존재한다면
  //     다음 속성으로 넘어감 (속성 유지 필요)
  //   만약 newProps들에 해당 속성이 존재하지 않는다면
  //     target에서 해당 속성을 제거
  if (newProps) {
    for (const prop in newProps) {
      if (newProps[prop] !== oldProps[prop]) {
        target.setAttribute(prop, newProps[prop]);
      }
    }
  }
  // Remove old attributes not present in newProps
  if (oldProps) {
    for (const prop in oldProps) {
      if (!(prop in newProps)) {
        target.removeAttribute(prop);
      }
    }
  }

}

export function render(parent, newNode, oldNode, index = 0) {
  if (!newNode && !oldNode) {
    return;
  }
  // 1. 만약 newNode가 없고 oldNode만 있다면
  //   parent에서 oldNode를 제거
  //   종료
  if (!newNode && oldNode) {
    parent.removeChild(parent.childNodes[index])
    return;
  }

  // 2. 만약 newNode가 있고 oldNode가 없다면
  //   newNode를 생성하여 parent에 추가
  //   종료
  if (newNode && !oldNode) {
    let newDom = createElement(newNode);
    parent.appendChild(newDom);
    return;
  }

  // 3. 만약 newNode와 oldNode 둘 다 문자열이고 서로 다르다면
  //   oldNode를 newNode로 교체
  //   종료
  if (typeof newNode === 'string' && typeof oldNode === 'string' && newNode !== oldNode) {
    parent.replaceChild(createElement(newNode), parent.childNodes[index]);
    return;
  }

  // 4. 만약 newNode와 oldNode의 타입이 다르다면
  //   oldNode를 newNode로 교체
  //   종료
  if (newNode.type !== oldNode.type) {
    parent.replaceChild(createElement(newNode), parent.childNodes[index]);
    return;
  }

  // 5. newNode와 oldNode에 대해 updateAttributes 실행
  updateAttributes(parent.childNodes[index], newNode.props, oldNode.props);

  // 6. newNode와 oldNode 자식노드들 중 더 긴 길이를 가진 것을 기준으로 반복
  //   각 자식노드에 대해 재귀적으로 render 함수 호출
  // console.log(newNode.children)
  // console.log(oldNode.children)
  // const maxLength = Math.max(newNode.children.length, oldNode.children.length);
  const newChildren = newNode.children || [];
  const oldChildren = oldNode.children || [];
  const length = Math.max(newChildren.length, oldChildren.length);

  for (let i = 0; i < length; i++) {
    //render에 parent.childNode를 인수로
    render(parent.childNodes[index], newNode.children[i], oldNode.children[i], i)
  }


}
