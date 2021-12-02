---
title: '[백준-구현] 완전 제곱수'
date: '2021-12-02'
category: 'algorithm'
description: ''
emoji: '1️⃣'

---

[[info | 백준 완전 제곱수 문제 보러가기]]
| https://www.acmicpc.net/problem/1977

## 문제 요약

주어진 숫자 사이에 완전 제곱수를 찾아 전체 합과 가장 작은 완전 제곱수를 출력하라

#### 조건

- 10000 이하의 자연수가 입력된다.

## 문제 접근 방식

1. 완전 제곱수의 판단은 다양한 방법이 있겠지만 `math.sqrt` 를 사용했다.
1. 제곱근을 취해주는 함수이다. 결과를 1로 나눠 나머지가 0이라면 완전 제곱수로 생각했다.

## 풀이코드

```python
m = int(input())
n = int(input())

import math
total = 0
min_value = n+1
for num in range(m, n+1):
	if not math.sqrt(num) % 1:
		total += num
		min_value = min(min_value, num)

if not total:
	print(-1)
else:
	print(total)
	print(min_value)
```





