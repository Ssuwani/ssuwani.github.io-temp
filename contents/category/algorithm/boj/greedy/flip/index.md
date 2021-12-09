---
title: '[백준-그리디] 뒤집기'
date: '2021-12-09'
category: 'algorithm'
description: ''
emoji: '1️⃣'

---

[[info | 백준 뒤집기 문제 보러가기]]
| https://www.acmicpc.net/problem/1439

## 문제 요약

0과 1로 이루어진 숫자에서 연속된 하나 이상의 숫자를 뒤집어 모두 같은 숫자를 만들고자 한다. 최소로 뒤집어 같은 숫자로 만들수 있는 경우의 수를 구하라

#### 조건

- 문자열 S는 100보다 작다.

## 문제 접근 방식

1. 0이 3개가 연속으로 있다면 3개를 한번에 1로 바꿀 수 있다. 이는 0이 한개 있는 것과 마찬가지의 이야기이다.
1. 0이 여러개가 연속적으로 나온다면 0으로 치환하고 1이 연속적으로 나온다면 1로 치환하자.
1. 이후 0와 1일 수를 세 최솟값이 정답이다.

## 풀이코드

```python
seq = input()

compress = []
prev = seq[0]
for s in seq[1:]:
	if prev != s:
		compress.append(prev)
	prev = s
compress.append(prev)

print(min(compress.count('1'), compress.count('0')))
```





