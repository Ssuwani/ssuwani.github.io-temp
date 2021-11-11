---
title: '[Codility] CyclicRotation'
date: '2021-11-11'
category: 'algorithm'
description: ''
emoji: '🔢'
---

[[info | Codility CyclicRotation 문제 보러가기]]
| https://app.codility.com/c/run/trainingYGAQE9-YAQ/



## 문제 요약

숫자를 담은 리스트가 주어졌을 때 K번 오른쪽으로 rotate 한 리스트를 반환하라.

#### 조건

- 리스트의 길이 N과 K는 100 이하의 자연수이다.

## 문제 접근 방식

1. rotate하는 것이여서 적용해보니 리스트에서 안된다고 한다. 찾아보니 Collections의 deque에서 사용가능하다. - deque를 이용한 풀이로도 정답을 받을 수 있었다.
1. list를 deque에 넣어서 풀수도 있지만 단순하게 제일 위에 원소를 제일 앞으로 옮기는 작업을 K번 반복하면 된다

## 풀이코드

```python
def solution(A, K):
    for _ in range(K):
        A = A[-1:] + A[:-1]
    return A
```

#### Deque의 rotate를 이용한 풀이

```python
from collections import deque
def solution(A, K):
    A = deque(A)
    A.rotate(K)
    return list(A)
```





