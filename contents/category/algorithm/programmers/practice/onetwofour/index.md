---
title: '[프로그래머스-연습문제] 124 나라의 숫자'
date: '2021-10-21'
category: 'algorithm'
description: ''
emoji: '1️⃣'
---

[[info | 프로그래머스 124 나라의 숫자 문제 보러가기]]
| https://programmers.co.kr/learn/courses/30/lessons/12899



#### 배운점

- 풀이를 잘 모르겠으면 TestCase를 계속해서 적어보자.

## 문제 요약

십진수의 숫자가 주어질 때 1,2,4로 나타나는 숫자를 반환하라.

#### 조건

- 입력되는 숫자는 500,000,000 이하의 숫자

## 문제 접근 방식

1. 십진수를 2진수로 혹은 8진수로 나타내는 방법들을 생각해보았다.
2. 몫과 나머지와의 관계가 깊었다.
3. 그래도 감이 잡히지 않아 주어진 10 이후의 숫자도 계속해서 적어보았다.

## 풀이코드

```python
def solution(n):
    if n <= 3:
        return '124'[n - 1]
    q, r = divmod(n-1, 3)
    return solution(q) + '124'[r]
```