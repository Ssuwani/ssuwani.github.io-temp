---
title: '[백준-자료구조] 문자열 폭발'
date: '2021-12-01'
category: 'algorithm'
description: ''
emoji: '1️⃣'

---

[[info | 백준 문자열 폭발 문제 보러가기]]
| https://www.acmicpc.net/problem/9935

## 문제 요약

문자열과 폭발 문자열이 주어진다. 문자열 내 폭발 문자열이 있으면 해당 문자열은 사라진다. 폭발 될 수 있는 문자열들을 다 제거한 뒤 출력하자

#### 조건

- 문자열의 길이는 1,000,000 보다 작거나 같고 폭발 문자열의 길이는 36보다 작다.

## 문제 접근 방식

1. 첫번째로 생각나는 가장 쉬운 방식은 index를 이용해 특정 문자열을 찾는 것이다. 
1. `"Hello world".index("world")` 는 "world"의 시작 인덱스인 6을 출력해준다. 6 부터 world의 길이인 5를 더해 6:11 까지를 지워주면 되는 것이다.
1. 하지만 이는 느리다. index를 찾는것은 O(n)의 시간복잡도를 가지는데 최악의 경우 n번 반복해야 하기 때문이다. 1,000,000 이 O(n**2)으로 동작하면 무조건 시간초과라고 생각하면 된다 ㅠㅠ
1. 이를 해결하기 위해 스택을 이용한 풀이이다.
1. n번 반복해야 한다. 시간복잡도는  O(n*폭발 문자열의 길이이다)이다. 

## 풀이코드

```python
import sys

s = input()
p = input()

stack = []
for i in range(len(s)):
    stack.append(s[i])

    if len(stack) >= len(p):
        tmp = "".join(stack[-len(p) :])
        if tmp == p:
            cnt = 0
            while cnt < len(p):
                stack.pop()
                cnt += 1

if len(stack) == 0:
    print("FRULA")
else:
    print("".join(stack))
```

#### 시간초과 풀이

```python
s = input()
p = input()
length = len(p)
while True:
	if p in s:
		start = s.index(p)
		s = s[:start] + s[start+length:]
	else:
		break

print(s) if s else print("FRUNA")

```





