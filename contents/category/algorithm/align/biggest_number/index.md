---
title: '[프로그래머스-정렬] 가장 큰 수'
date: '2021-10-05'
category: 'algorithm'
description: ''
emoji: '1️⃣'
---

[[info | 프로그래머스 가장 큰 수 문제 보러가기]]
| https://programmers.co.kr/learn/courses/30/lessons/42746



#### 배운점

- 이전 [전화번호 목록](https://ssuwani.github.io/category/algorithm/hash/phonebook/) 문제에서 배웠던 것처럼 문자열 정렬은 앞에서부터 문자를 비교할 수 있다.

## 문제 요약

숫자 리스트가 주어졌을 때 숫자들을 조합하여 나타낼 수 있는 가장 큰수를 출력하라

#### 조건

- numbers의 각각의 원소는 0 이상 1,000 이하

## 문제 접근 방식

1. 숫자 6과 숫자 10중 앞에 와야할 숫자는 6과 10을 비교하는 것이 아니라 6과 1을 비교해야 한다.
2. 그래서 숫자를 있을 그대로 정렬하면 안된다.
3. 이전에 배웠던 문자열처럼 정렬해야 겠다고 생각했다.
4. 문자열로 변환해서 정렬하니 '3', '30'의 비교에서 '30'이 더 크다고 판정되었다.
5. 문자열에 각각 2를 곱해서 비교하면 원하는 대로 비교할 수 있었다. '33' > '3030'
6. 조건에서 각 원소가 0~1000 값을 가지므로 3을 곱해주는 것만으로 충분했다.



## 풀이코드

```python
def solution(numbers):
    numbers = list(map(str, numbers))
    
    numbers.sort(key=lambda x: x*3, reverse=True)
    
    return str(int(''.join(numbers)))
```