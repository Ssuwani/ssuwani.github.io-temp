---
title: '[프로그래머스-해시] 위장'
date: '2021-10-07'
category: 'algorithm'
description: ''
emoji: '👕'
---

[[info | 프로그래머스 위장 문제 보러가기]]
| https://programmers.co.kr/learn/courses/30/lessons/42578



#### 배운점

- reduce 함수로 리스트 안의 요소간의 연산을 할 수 있다.

## 문제 요약

옷과 종류가 주어졌을 때 입을 수 있는 서로 다른 옷의 조합의 수를 구하라

#### 조건

- 같음 이름의 의상은 없다.
- 최소 하루에 1개의 의상은 입는다.

## 문제 접근 방식

1. 먼저 카테고리의 옷이 몇개 있는지 파악해야 했다. 이를 위해 dictionary를 사용할 수도 있지만 Counter로 category만 세면 됐다.
2. 그렇게 카테고리별로 옷이 몇개가 있는지 정해졌으면 입으면 되는데 최소 한개의 옷만 다르게 입으면 된다. 
3. (a + 1)(b + 1)(c + 1) - 1 = (a + b + c) + (ab + bc + ca) + abc
4. 이를 위해 answer라는 변수에 값을 계산할수도 있지만 `reduce`를 사용하면 간편하게 구할 수 있다.
5. `ruduce`를 사용할 수 있겠다는 생각은 했지만 3번째 인자인 *initializer* 는 생각지 못했다. 1을 초기값으로 주고 계산하면 된다!!

## 풀이코드

```python
from collections import Counter
def solution(clothes):
    values = list(Counter([cloth[1] for cloth in clothes]).values())
    answer = 1
    for v in values:
    	answer *= (v+1)
    return answer -1
```

#### Reduce를 이용한 풀이

```python
from collections import Counter
from itertools import reduce
def solution(clothes):
    values = list(Counter([cloth[1] for cloth in clothes]).values())
    return reduce(lambda a, b: a*(b+1), values, 1) - 1
```

