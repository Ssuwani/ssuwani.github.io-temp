---
title: '[프로그래머스-연습문제] 최댓값과 최솟값'
date: '2021-11-02'
category: 'algorithm'
description: ''
emoji: '1️⃣'
---

[[info | 프로그래머스 최댓값과 최솟값 문제 보러가기]]
| https://programmers.co.kr/learn/courses/30/lessons/12939

## 문제 요약

공백으로 구분된 문자열이 주어졌을 때 "(최소값) (최대값)" 형태로 값을 반환하라.

#### 조건

- 입력 문자열에는 둘 이상의 정수가 공백으로 구분되어 있다.

## 문제 접근 방식

1. s.split()을 사용해서 공백으로 구분했다.
2. 그런 뒤 min, max를 사용하려 했는데 split()의 결과는 string 타입으로 저장되기 때문에 음수에서 크고 작음을 제대로 비교하지 못했다.
3. map(int, iterable) 을 이용해서 리스트내 문자를 숫자로 변환해주었다.
4. f-string을 이용해서 간단하게 결과를 만들어내 반환했다.

## 풀이코드

```python
def solution(s):
    s = list(map(int, s.split(" ")))
    return f"{min(s)} {max(s)}"
```