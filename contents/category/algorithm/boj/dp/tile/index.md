---
title: '[백준-다이나믹프로그래밍] 2 X N 타일링'
date: '2021-11-17'
category: 'algorithm'
description: ''
emoji: '1️⃣'

---

[[info | 백준 2 X N 문제 보러가기]]
| https://www.acmicpc.net/problem/11726

## 문제 요약

2×n 크기의 직사각형을 1×2, 2×1 타일로 채우는 방법의 수를 출력하라.

#### 조건

- n은 [1, 1000] 의 자연수 

## 문제 접근 방식

1. 풀어봤던 문제라서 .. 바로 생각이 났다.
1. n번째 타일은 n-1번째 타일을 놓는 방법 + n-2번째 타일을 놓는방법의 합니다. 그거밖에 없다.

## 풀이코드

```python
seq = [0]*1001
seq[1] = 1
seq[2] = 2

n = int(input())
for i in range(3, n+1):
    seq[i] = seq[i-2]+seq[i-1]

print(seq[n]%10007) # 답이 길어져서 나머지를 출력하라고 명시되어 있다.
```





