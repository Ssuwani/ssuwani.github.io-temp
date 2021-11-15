---
title: '[백준-다이나믹프로그래밍] 1, 2, 3 더하기'
date: '2021-11-15'
category: 'algorithm'
description: ''
emoji: '1️⃣'

---

[[info | 백준 1, 2, 3 더하기 문제 보러가기]]
| https://www.acmicpc.net/problem/9095

## 문제 요약

1, 2, 3의 조합으로 특정 숫자를 나타낼 수 있는 경우의 수를 출력하는 문제

#### 조건

- 대싱이 되는 특정 숫자는 11 미만의 자연수다.

## 문제 접근 방식

1. 이런 문제를 보면 점화식을 구할 수 있는지 먼저 생각하면 된다.
1. n이 1일때 1가지, 2일때 2가지, 3일때 4가지, 4일때 7가지, 5일때 13가지였다. 
1. 이를통해 `a(n) = a(n-3) + a(n-2) + a(n-1)` 이라는 점화식을 찾아낼 수 있었다.

## 풀이코드

```python
seq = [0] * 11
seq[1] = 1
seq[2] = 2
seq[3] = 4

for i in range(4, 11):
    seq[i] = seq[i-3] + seq[i-2] + seq[i-1]
    
for i in range(int(input())):
    n = int(input())
    print(seq[n])
```





