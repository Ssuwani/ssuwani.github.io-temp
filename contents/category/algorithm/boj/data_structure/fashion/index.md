---
title: '[백준-자료구조] 패션왕 신해빈'
date: '2021-11-29'
category: 'algorithm'
description: ''
emoji: '1️⃣'

---

[[info | 백준 괄호 문제 보러가기]]
| https://www.acmicpc.net/problem/9375

## 문제 요약

의상과 의상의 종류가 주어졌을 때 발가벗지 않고 다닐 수 있는 날의 수를 반환하라

#### 조건

- 테스트 케이스는 최대 100개이고 케이스당 의상 수는 30개 이하로 주어진다.

## 문제 접근 방식

1. 상의가 2개 맨투맨, 니트가 있다고 가정하면 맨투맨을 입거나(1가지), 니트를 입거나(2가지), 벗거나(3가지)가 있다.
1. 바지가 2개 청바지, 면바지가 있다고 가정하면 청바지를 입거나(1가지), 면바지를 입거나(2가지), 벗거나(3가지)가 있다.
1. 이로써 알 수 있는 것은 (A 카테고리 옷 개수 + 1) * (B 카테고리 옷 개수 + 1) 의 식으로 전체 경우의 수를 구할 수 있다는 것이다.
1. 다만 다 벗을 순 없으므로 마지막에 -1을 해주자
1. defaultdict를 사용해서 코드를 조금 더 간결하게 할 수 있었다.

## 풀이코드

```python
from collections import defaultdict

n = int(input())

for _ in range(n):
	m = int(input())
	clothes = defaultdict(int)
	for _ in range(m):
		name, category = input().split()
		clothes[category] += 1
	days = 1
	for cnt in clothes.values():
		days *= cnt + 1
	print(days-1)
```





