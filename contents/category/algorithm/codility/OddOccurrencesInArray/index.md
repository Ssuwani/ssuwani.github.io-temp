---
title: '[Codility] OddOccurrencesInArray'
date: '2021-11-09'
category: 'algorithm'
description: ''
emoji: '🔢'
---

[[info | Codility OddOccurrencesInArray 문제 보러가기]]
| https://app.codility.com/c/run/training9FU7PZ-GTR/



## 문제 요약

숫자를 담은 리스트가 주어졌을 때 pair가 되지 않는 숫자를 반환하라.

#### 조건

- 1,000,000 개 이하의 숫자를 담은 리스트가 입력된다.

## 문제 접근 방식

1. 영어 문제다보니 문제를 정확하게 이해하지 않고 입출력 예시를 먼저 보게된다..
1. 입출력 예제가 [9, 3, 9, 3, 9, 7, 9] 이거였다. 하필이면 i, i+2가 같고 i+1과 i+3이 다르다. 이게 다른 숫자인 7이 정답이다.
1. 문제를 제대로 안읽고 입출력 예제를 보고 맘대로 해석한 탓에 조금 오래걸렸다.
1. 리스트 안의 숫자 갯수를 세고 페어가 안되는 즉, 홀수개가 나오는 숫자를 반환하면 된다.

## 풀이코드

```python
from collections import Counter
def solution(A):
    return [key for key, value in Counter(A).items() if value % 2 == 1][0]
```



