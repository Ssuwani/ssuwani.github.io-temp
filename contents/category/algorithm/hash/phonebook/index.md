---
title: '[프로그래머스-해시] 전화번호 목록'
date: '2021-10-03'
category: 'algorithm'
description: ''
emoji: '📔'
---

[[info | 프로그래머스 전화번호 목록 문제 보러가기]]
| https://programmers.co.kr/learn/courses/30/lessons/42577



#### 배운점

- 문자열을 정렬하면 문자열 가장 앞에서부터 알파벳을 비교하여 정렬한다.
- 이는 정렬했을 때 앞 뒤의 문자열이 닮아 있음을 수 있음을 의미한다.



## 문제 요약

전화번호 목록이 주어졌을 때 하나의 전화번호가 다른 전화번호의 접두어가 되는지 확인하는 문제

#### 조건

- 전화번호 목록이 1 이상 1,000,000 이하
- 전화번호의 길이가 1 이상 20 이하

## 문제 접근 방식

1. 가장 먼저 생각난 것이 `startswith`를 이용하는 것이다. 
2. 이중 반복문을 사용해 1개와 n-1개를 확인하는 과정을 n번 반복한다.
3. 효율성 검사에서 시간초과를 받았다.
4. 조건을 확인하고 이중 반복문을 사용하면 안되겠다는 생각을 했다.
5. 문자열은 정렬하면 바로 앞 뒤의 문자열이 접두어 관계이다.



## 풀이코드

```python
def solution(phones):
    phones.sort()
    for i in range(len(phones)-1):
        if phones[i+1].startswith(phones[i]):
            return False
    return True
```