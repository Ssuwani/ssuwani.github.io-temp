---
title: '[백준-자료구조] 오큰수'
date: '2021-11-27'
category: 'algorithm'
description: ''
emoji: '1️⃣'

---

[[info | 백준 오큰수 문제 보러가기]]
| https://www.acmicpc.net/problem/17298

## 문제 요약

숫자를 담은 리스트가 주어졌을 때 현재의 값보다 크고 오른쪽에 있는 첫번째 수를 반복해서 반환하라

#### 조건

- n은 1,000,000 이하

## 문제 접근 방식

1. 문제를 읽고다니 이중 반복문을 사용하면 손쉽게 해결할 수 있을거라 생각했다.
1. O(n**2)의 시간복잡도를 가지는 풀이였다.
1. 시간초과가 났고 조건을 확인해보니 n이 최대 1,000,000 까지 가능했다.
1. 결국 풀이를 찾아 보았다 ㅠㅠ
1. 너무 잘 설명이 되어있는 [블로그](https://hooongs.tistory.com/329)를 찾았다.
1. 스택을 이용한 풀이가 익숙치 않아 일단 답을 좀 보면서 이해해야 할 것 같다..

## 풀이코드

```python
n = int(input())

seq = list(map(int, input().split()))

result = [-1] * len(seq)
stack = []
for i in range(n):
	while stack and seq[stack[-1]] < seq[i]:
		result[stack.pop()] = seq[i]
	stack.append(i)

print(*result)
```





