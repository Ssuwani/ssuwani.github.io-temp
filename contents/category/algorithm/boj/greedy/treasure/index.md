---
title: '[백준-그리디] 보물'
date: '2021-12-07'
category: 'algorithm'
description: ''
emoji: '1️⃣'

---

[[info | 백준 보물 문제 보러가기]]
| https://www.acmicpc.net/problem/1026

## 문제 요약

숫자가 담긴 두배열이 주어졌을 때 원소의 곱을 가장 작게 할 수 있는게 재배치하여 가장 작은 곱의 합을 구하라.

#### 조건

- 각 원소의 갯수는 50개 이하이다.

## 문제 접근 방식

1. 두개의 배열 A, B 중 A만 순서를 변경할 수 있다는 것은 문제의 난이도를 올리기 위한 장치라고 생각한다.
1. 두 배열 각 원소의 곱의 최소를 구하는 것이므로 가장 큰 원소와 가장 작은 원소끼리 배치시키면 된다.
1. A만 위치를 변경하든 B도 위치를 변경하든 상관없는 이야기다.

## 풀이코드

```python
input()
A = list(map(int, input().split()))
B = list(map(int, input().split()))
A.sort()
B.sort(reverse=True)
print(sum([a*b for a, b in zip(A,B)]))
```





