---
title: '[프로그래머스-정렬] H_index'
date: '2021-10-17'
category: 'algorithm'
description: ''
emoji: '1️⃣'
---

[[info | 프로그래머스 H_index 문제 보러가기]]
| https://programmers.co.kr/learn/courses/30/lessons/42747



#### 배운점

- 원하는 바가 뭔지 정확하게 파악할 수록 문제는 더 쉽게 풀린다.

## 문제 요약

논문 인용인수가 적힌 리스트가 입력되었을 때 [H_index](https://namu.wiki/w/h%20%EC%9D%B8%EB%8D%B1%EC%8A%A4)를 구해서 반환하라.

#### 조건

- 논문의 수는 1,000편이하

## 문제 접근 방식

1. 문제의 정의에 따라 코드를 구현하고 있었다.
2. 단지 하나의 아이디어라면 내림차순으로 정렬하면 그리디하게 선택이 된다는 점
3. filter를 통해 list를 구하고 리스트의 길이로 정답을 구하려 했지만 잘 안되었다 ㅠ
4. 그래서 문제의 예시를 조금 더 적어보니 정렬한 뒤 리스트의 인덱스와 구하고자 하는 H_index와의 연관성을 깨닫게 되었다.

## 나의 풀이코드

```python
def solution(citations):
    citations.sort(reverse=True)
    
    for i, c in enumerate(citations):
        if i >= c:
            return i
    return len(citations) # i가 c이상이 될 수 없는 경우는 모든 논문의 인용수가 논문의 수보다 많을 때이다.
```

#### 우주인의 풀이

```python

def solution(citations):
    citations.sort(reverse=True)
    answer = max(map(min, enumerate(citations, start=1)))
    return answer
```

