---
title: '[백준-다이나믹프로그래밍] 피보나치 함수'
date: '2021-11-14'
category: 'algorithm'
description: ''
emoji: '1️⃣'
---

[[info | 백준 피보나치 함수 문제 보러가기]]
| https://www.acmicpc.net/problem/1003

## 문제 요약

피보나치 수를 구하는 문제에서 재귀적으로 0과 1이 각각 몇번 출력되는지 반환하라.

#### 조건

- 피보나치 수는 최대 40까지 주어진다.

## 문제 접근 방식

1. 가장 먼저 생각할 수 있는 것은 재귀함수를 만들어서 재귀적으로 n == 0 일때 0을 세는 count를 증가시키고 n == 1 일때 1을 세는 count를 증가시킬 수 있다. 이러한 방식은 구해야하는 피보나치수가 커질수록 0과 1의 호출 횟수는 비하급수적으로 증가한다!  비효율적이다. 
1. 예를들어 피보나치수 40 을 구할 때 0을 호출한 횟수는 63245986 1을 호출한 횟수는 102334155번이다. 
1. 아래에 코드를 적어두긴 했는데 시간초과를 받았다.
1. 0에서의 답, 1에서의 답, 2에서의 답 ... 적어보다 보면 규칙을 찾을 수 있다. 0이 호출되는 횟수는 이전 단계에서 1이 호출된 횟수와 같고 1이 호출된 횟수는 이전 단계에서 0이 호출된 횟수 + 1이 호출된 횟수와 같다.
1. 이러한 규칙이 왜 생기는지에 대해서 고민을 해봤는데 ㅠㅠ 잘 모르겠다.. 

## 풀이코드

```python
for _ in range(int(input())):
    zero = 1
    one = 0
    for i in range(int(input())):
        zero,one=one,zero+one
    print(zero,one)
```

#### 재귀함수를 이용한 풀이(시간초과받음)

```python
def fibo(n):
    global cnt_0
    global cnt_1
    if n == 0:
        cnt_0 += 1
        return True
    elif n == 1:
        cnt_1 += 1
        return True
    return fibo(n-1) + fibo(n-2)

for i in range(int(input())):
    n = int(input())
    cnt_0 = 0
    cnt_1 = 0

    fibo(n)
    print(cnt_0, cnt_1)

```

