---
title: '[백준-그리디] 잃어버린 괄호'
date: '2021-12-08'
category: 'algorithm'
description: ''
emoji: '1️⃣'

---

[[info | 백준 잃어버린 괄호 문제 보러가기]]
| https://www.acmicpc.net/problem/1541

## 문제 요약

괄호가 없는 식이 주어졌을 때 적절히 괄호를 넣어 결과를 최소로 만들어라.

#### 조건

- 식의 길이는 50보다 작거나 같다.

## 문제 접근 방식

1. `55-50+40` 와 같은 식이 주어진다. 문제 이해가 조금 쉽지 않았는데 `55-(50+40)` 일 때 -35로 최솟값이다.
1. 문제의 이해를 위해 하나의 예시는 더 생각해보면 `1-2+3+4-5+6+7` 은 `1-(2+3+4)-(5+6+7)` 이 최솟값이다.
1. 그러니까 -를 기준으로 나눈 뒤 첫번째 부분을 제외한 나머지 부분들 다 더해 빼주면 된다.

## 풀이코드

```python
exp = input()

for i, sub in enumerate(exp.split("-")):
	sub = '+'.join([str(int(num)) for num in sub.split("+")])
	value = eval(sub)
	if i == 0:
		result = value
	else:
		result -= value

print(result)
```





