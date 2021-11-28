---
title: '[백준-자료구조] 가운데를 말해요'
date: '2021-11-28'
category: 'algorithm'
description: ''
emoji: '1️⃣'

---

[[info | 백준 가운데를 말해요 문제 보러가기]]
| https://www.acmicpc.net/submit/1655

## 문제 요약

n개의 숫자를 순서대로 말한다. 이때 들은 숫자 중 중간 숫자를 말하면 된다. 짝수개의 숫자라면 중간 숫자는 두개 중 작은 값이다.

#### 조건

- N은 100,000 이하의 자연수이다.

## 문제 접근 방식

1. 조건이 100,000 이하길래 O(n**2) 으로 풀어도 되겠다고 생각했다.
1. 그래서 아래에 첫번째 풀이가 있는데, 시간초과 판정을 받았다.
1. 특이하게 이 문제는 시간제한이 0.1초였다 ㅠㅠ 
1. 오늘도 잘 설명된 [다른 블로그](https://inspirit941.tistory.com/200)를 보고 풀었다 ..
1. 입력되는 숫자들을 반 나눠서 두개의 힙에 저장한다. 
1. 작은 값들이 저장되는 힙은 내림차순으로 큰 값들이 저장되는 힙은 오름차순으로 정의하였다.
1. 이때 왼쪽 힙의 값의 첫번째 요소가 오른쪽 힙의 첫번째 요소보다 작아야만 한다. 크면 바꿔주자
1. 왼쪽 힙의 첫번째 요소가 중간값임을 보장할 수 있다.

## 풀이코드

```python
import heapq
import sys
input = sys.stdin.readline


left, right = [], []
n = int(input())
for _ in range(n):
	num = int(input())

	if len(left) == len(right):
		heapq.heappush(left, (-num, num))
	else:
		heapq.heappush(right, (num, num))

	if right and left[0][1] > right[0][1]:
		left_value = heapq.heappop(left)[1]
		right_value = heapq.heappop(right)[1]
		heapq.heappush(right, (left_value, left_value))
		heapq.heappush(left, (-right_value, right_value))

	print(left[0][1])
```



#### 첫번째 시도: 시간초과

```python
n = int(input())
seq = []

for _ in range(n):
	num = int(input())
	seq.append(num)
	seq.sort()
	mid = len(seq) // 2 if len(seq) % 2 else len(seq) // 2 - 1
	print(seq[mid])
```





