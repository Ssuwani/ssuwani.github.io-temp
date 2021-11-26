---
title: '[백준-자료구조] 제로'
date: '2021-11-26'
category: 'algorithm'
description: ''
emoji: '1️⃣'

---

[[info | 백준 제로 문제 보러가기]]
| https://www.acmicpc.net/problem/10773

## 문제 요약

n개의 숫자가 입력된다. 0이 입력되면 이전의 입력을 지운다. 입력된 숫자의 총합을 출력하라

#### 조건

- 100,000 개 이하의 숫자가 주어진다.

## 문제 접근 방식

1. 마지막에 입력된 숫자가 먼저 나가게된다. LIFO 즉, 스택의 자료구조 형태를 가진다.

## 풀이코드

```python
n = int(input())
stack = []
for _ in range(n):
	num = int(input())
	if num:
		stack.append(num)
	else:
		stack.pop()
print(sum(stack))
```





