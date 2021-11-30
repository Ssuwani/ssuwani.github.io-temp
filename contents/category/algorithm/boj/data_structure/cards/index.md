---
title: '[백준-자료구조] 카드 정렬하기'
date: '2021-11-30'
category: 'algorithm'
description: ''
emoji: '1️⃣'

---

[[info | 백준 카드 정렬하기 문제 보러가기]]
| https://www.acmicpc.net/problem/1715

## 문제 요약

N개의 카드덱이 주어졌을 때 카드를 섞는다. 섞기 위해서 카드를 봐야하는데 최소로 카드를 보는 경우를 구하라

#### 조건

- 카드 덱의 수 N은 100,000 이하의 자연수

## 문제 접근 방식

1. 처음엔 조금 잘못 생각해서 덱을 정렬 한 뒤, 가장 많은 카드 수를 가진 덱은 1번, 그다음은 2번.. 이렇게 구하면 된다고 생각했다. 테스트 케이스에서는 잘 동작했는데 실제로 제출해보니 틀렸다.
1. 생각해보니 내가 작성한 방식은 가장 작은 수의 덱과 그다음 작은 수의 덱의 합이 전체 덱에서 가장 작은 수의 카드일때만 가능한 이야기였다.
1. 가장 작은 수의 덱과 그다음 작은 수의 덱의 합을 다시 리스트에 넣어 정렬하고 다시 가장 작은 수의 덱과 그 다음 작은 수의 덱을 합해 다시 리스트에 넣어 정렬하고를 반복해야 했다.
1. 계속해서 정렬해야 하므로 힙을 사용하는 것이 타당했다.

## 풀이코드

```python
import heapq


n = int(input())
cards = []
for _ in range(n):
	heapq.heappush(cards, int(input()))
if n == 1:
	print(0)
else:
	result = 0
	while True:
		min_1 = heapq.heappop(cards)
		min_2 = heapq.heappop(cards)
		new_value = min_1+min_2
		result += new_value
		heapq.heappush(cards, new_value)

		if len(cards) == 1:
			break
	print(result)
```





