---
title: '[백준-다이나믹프로그래밍] 피보나치 수 5'
date: '2021-11-16'
category: 'algorithm'
description: ''
emoji: '1️⃣'
---

[[info | 백준 피보나치 수 5 문제 보러가기]]
| https://www.acmicpc.net/problem/10870

## 문제 요약

n번째 피보나치 수를 출력하라

#### 조건

- 입력되는 n의 범위는 [0, 20] 의 자연수

## 문제 접근 방식

1. 피보나치 수는 전형적인 DP의 유형이다.
1. `a[n] = a[n-2] + a[n-1]`

## 풀이코드

```python
n = int(input())

dp = [0] * 21
dp[1] = 1
for i in range(2, n+1):
    dp[i] = dp[i-2] + dp[i-1]

print(dp[n])
```



