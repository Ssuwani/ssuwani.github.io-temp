---
title: '[프로그래머스-완전탐색] 카펫'
date: '2021-10-12'
category: 'algorithm'
description: ''
emoji: '🧞'
---

[[info | 프로그래머스 카펫 문제 보러가기]]
| https://programmers.co.kr/learn/courses/30/lessons/42842


## 문제 요약

카펫의 가장 바깥부분은 brown, 안쪽은 yellow로 칠해지는데 격자모양으로 나눠 색깔의 갯수를 입력받았을 때 카펫의 크기를 리턴하라.

#### 조건

- 가로의 길이가 세로의 길이보다 크거다 같다.

## 문제 접근 방식

1. 각 색의 수를 더하면 전체 카펫의 크기가 된다. 크기는 카펫의 세로길이 x, 가로길이 y의 곱이다.
2. 또한 가로의 길이와 세로의 길이로 brown 색의 크기를 구할 수 있다. ((x-2) * 2) + ((y-2) * 2) + 4
3. 카펫의 크기의 약수가 x, y 이므로 약수를 찾고 2번의 조건에 만족하면 그것이 답이다.



## 풀이코드

```python
def solution(b, y):
    num = b + y
    # x가 더 크거나 같다.
    for x in range(num // 2 + 1, 2, -1):
        if num % x != 0:
            continue
        y = num // x
        if 2*x + 2*y == b+4:
            return [x, y]
```