---
title: '[백준-다이나믹프로그래밍] RGB 거리'
date: '2021-11-18'
category: 'algorithm'
description: ''
emoji: '1️⃣'

---

[[info | 백준 RGB 거리 문제 보러가기]]
| https://www.acmicpc.net/problem/1149

## 문제 요약

RGB 거리를 나타내는 리스트가 N가 입력될 때 이웃 집과 겹치지 않게 색칠하는 가장 작은 비용을 구하라.

#### 조건

- 집의 수 N은 [2, 1000]의 정수 

## 문제 접근 방식

1. 첫번째 집도 마찬가지지만 두번째 집을 색칠할 때 RGB 색중 하나를 선택해야 한다. 이때 첫번째 집과 같은색이지 않아야 한다.
1. 두번째 집에서 R로 색칠한다는 건 적어도 첫번째 집에서 R은 아니여야 한다. 그리고 GB 중 비용이 적은걸 골랐어야 한다.
1. 그래서 다음과 같은 식을 구할 수 있다. 2번째 집에 R로 색칠하는 비용 = min(1번째 집 G색 비용, 1번째 집 B색 비용) + 2번째 집 R색 비용
1. 2번째 집에서 G와 B도 마찬가지이며 각각의 경우에서 최선을 다하고 있는 것이다.

## 풀이코드

```python
n = int(input())

seq = [list(map(int, input().split())) for _ in range(n)]

for i in range(1, n):
	seq[i][0] += min(seq[i-1][1], seq[i-1][2])
	seq[i][1] += min(seq[i-1][0], seq[i-1][2])
	seq[i][2] += min(seq[i-1][0], seq[i-1][1])
	
print(min(seq[-1]))
```





