---
title: '[프로그래머스-연습문제] 피보나치 수'
date: '2021-11-03'
category: 'algorithm'
description: ''
emoji: '1️⃣'
---

[[info | 프로그래머스 피보나치 수 문제 보러가기]]
| https://programmers.co.kr/learn/courses/30/lessons/12945

## 문제 요약

n번째 피보나치 수를 반환하라.

#### 조건

- n은 2 이상 100,000 이하의 자연수이다.

## 문제 접근 방식

1. 피보나치 수 문제는 `f(n) = f(n-1) + f(n-2)` 를 계산한다.
2. 식을 점화식 형태로 나타낼 수 있으니 다이나믹 프로그래밍 기법을 이용하면 빠르게 풀 수 있다.
3. n은 2이상 이라는 조건이 없다면 0이 입력되었을 때 dp[-1]인 1이 반환되지 않도록 주의해야 한다.

## 풀이코드

```python
def solution(n):
    dp = [0, 1]
    for i in range(n-1):
        dp.append((dp[-1] + dp[-2]) % 1234567)
    return dp[-1]
```