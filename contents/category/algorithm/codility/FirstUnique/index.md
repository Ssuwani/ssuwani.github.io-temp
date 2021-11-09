---
title: '[Codility] FirstUnique'
date: '2021-11-10'
category: 'algorithm'
description: ''
emoji: '🔢'
---

[[info | Codility FirstUnique 문제 보러가기]]
| https://app.codility.com/programmers/trainings/4/first_unique/start/



## 문제 요약

숫자를 담은 리스트가 주어졌을 때 유니크한 숫자들 중 가장 먼저 나온 숫자를 반환하라.

#### 조건

- 리스트의 길이는 100,000 이하이다.

## 문제 접근 방식

1. 어제 풀었던 문제와 비슷하게 리스트 원소 갯수를 세기 위한 Counter를 사용하면 되겠다고 생각했다.
1. 유니크한 리스트 원소를 찾아야 하므로 `items()` 의 key, value 중 value가 1인 key 값을 찾으면 됐다.
1. 한가지 걸렸던 점은 Counter 객체가 입력받은 순서대로 값을 저장하고 있을까? 였는데 [공식문서](https://docs.python.org/3/library/collections.html#collections.Counter)에서 아래와 같은 글을 확인할 수 있었다.
1. As a [`dict`](https://docs.python.org/3/library/stdtypes.html#dict) subclass, [`Counter`](https://docs.python.org/3/library/collections.html#collections.Counter) Inherited the capability to remember insertion order

## 풀이코드

```python
from collections import Counter
def solution(A):
    for key, value in Counter(A).items():
        if value == 1:
            return key
    return -1
```



