---
title: '[Codility] PermMissingElem'
date: '2021-11-12'
category: 'algorithm'
description: ''
emoji: '🔢'
---

[[info | Codility PermMissingElem 문제 보러가기]]
| https://app.codility.com/demo/results/trainingJQ7WCX-DWW

## 문제 요약

숫자를 담은 리스트가 주어지는데 리스트는 1부터 리스트의 길이 + 1 까지의 숫자 중 1개 빼고 들어있다. 빠진 1개를 반환하라.

#### 조건

- 리스트의 길이는 100,000 이하이다.

## 문제 접근 방식

1. 입력된 리스트를 정렬하고 1부터 리스트의 길이 + 1까지의 숫자를 담은 리스트를 생성하여 하나씩 비교해 나가야겠다고 생각했다.
2. `itertools`의 `zip_longest`를 사용해 문제를 해결할 수 있었다.
3. 같이 문제를 풀고 있는 친구의 코드가 궁금해 확인해보니 천재가 아닌가 하는 생각이 들었다.

## 풀이코드

```python
from itertools import zip_longest

def solution(A):
    A.sort()
    B = range(1, len(A) + 2)
    for a, b in zip_longest(A, B):
        if a != b:
            return b
```

#### 어느 천재 친구의 풀이

```python
def solution(A):
    return sum(range(len(A)+2)) - sum(A)
 
```











