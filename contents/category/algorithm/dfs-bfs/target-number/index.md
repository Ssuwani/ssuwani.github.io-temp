---
title: '[프로그래머스-DFS/BFS] 타겟 넘버'
date: '2021-10-04'
category: 'algorithm'
description: ''
emoji: '🔢'
---

[[info | 프로그래머스 타겟 넘버 문제 보러가기]]
| https://programmers.co.kr/learn/courses/30/lessons/43165



#### 배운점

- 처음부터 잘 모르겠어도 적어보니까 점점 문제가 이해가 되고 풀이가 생각이 났다



## 문제 요약

숫자 배열을 받아 적절한 덧셈 혹은 뺄셈 연산을 통해 target과 맞는 경우의 수를 모두 구하는 문제

#### 조건

- 숫자의 개수는 2 이상 20 이하

## 문제 접근 방식

1. 숫자의 개수가 크지 않은 걸 확인하고 완전 탐색을 해야겠다고 생각했다.
2. '+', '-'의 배열로 모든 경우의 수를 찾고자 하였다.
3. 어떻게 모든 경우의 수를 찾을지 고민하다가 ['+', '-']의 배열을 생각하다가 이진법이 생각이 낫다.
4. `bin` 을 통해 000, 001, 010, 011, 100, 101, 111 (numbers의 갯수가 3일때의 예시) 를 모두 구했다.
5. numbers와 적절히 조합하여 eval 함수를 통해 숫자를 구하고 구한 숫자와 target의 일치 여부를 확인했다.
6. 시간초과가 걸렸다.
7. 조건에서 숫자의 갯수는 20까지 이지만 2의 20승은 무려 1048576이다. 작다고 생각했지만 작은수가 아니였던 것이다 ㅠㅠ
8. 한참을 고민하다가 풀이를 보고 풀어버렸다..

## 나의 풀이코드(❗ 시간초과)

```python
def solution(numbers, target):
    
    cnt = 0
    for i in range(2 ** len(numbers)):
        seq = bin(i)[2:].zfill(len(numbers))
        
        k = (eval(''.join([["-", "+"][int(b)] + str(n) for n, b in zip(numbers, seq)])))
        if k == target:
            cnt += 1
    
    return cnt
```



## 정답풀이

```python
def solution(numbers, target):
    sup= [0]
    for i in numbers:
        sub = []
        for j in sup : 
            sub.append(j+i)
            sub.append(j-i)
        sup = sub
    return sup.count(target)
```

