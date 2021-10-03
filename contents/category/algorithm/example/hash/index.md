---
title: '[Template] 백준 1000. A+B'
date: '2021-10-02'
category: 'algorithm'
description: ''
emoji: '👨‍💻'
---

[[info | 백준 1000. A+B 문제 보러가기]]
| https://www.acmicpc.net/problem/1000

## 문제 요약

두 정수 A, B 입력받아서 A+B를 출력하는 문제

#### 조건

- A > 0
- B < 10

## 문제 접근 방식

단순히 A와 B를 더하는 문제이다. 

## 풀이코드

```python
a, b = map(int, input().split())
print(a+b)
```