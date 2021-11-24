---
title: '[백준-자료구조] 괄호'
date: '2021-11-24'
category: 'algorithm'
description: ''
emoji: '1️⃣'

---

[[info | 백준 괄호 문제 보러가기]]
| https://www.acmicpc.net/problem/9012

## 문제 요약

괄호 문자열이 주어졌을 때 올바른 괄호열이면 YES 아니면 NO를 출력하라

#### 조건

- 괄호 문자열의 길이는 2 이상 50 이하 이다

## 문제 접근 방식

1. 먼저 홀수개의 괄호가 들어온다면 무조건 올바르지 않은 괄호열이라는 생각이 들었다.
1. 열린 괄호와 닫는 괄호가 입력되는데 닫는 괄호가 열린 괄호보다 많아진다면 잘못된 괄호이다.

## 풀이코드

```python
n = int(input())

for _ in range(n):
    ps = input()
    if len(ps) % 2:
        print("NO")
        continue
    open_p = 0
    for p in ps:
        if p == "(":
            open_p += 1
        else:
            open_p -= 1
        if open_p < 0:
            break
    if open_p:
        print("NO")
    else:
        print("YES")

```





