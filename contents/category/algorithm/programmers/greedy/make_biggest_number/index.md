---
title: '[프로그래머스-탐욕법] 큰 수 만들기'
date: '2021-10-30'
category: 'algorithm'
description: ''
emoji: '1️⃣'
---

[[info | 프로그래머스 큰 수 만들기 문제 보러가기]]
| https://programmers.co.kr/learn/courses/30/lessons/42883



못 풀어서 답을 봤다. 풀이를 보고나니 조금 더 생각하면 풀 수 있었다는 생각에 아쉬웠다.

## 문제 요약

어떤 숫자가 주어졌을 때 k개의 수를 제거하여 얻을 수 있는 가장 큰수를 반환하라.

#### 조건

- 입력되는 숫자는 1,000,000자리 이하의 수

## 문제 접근 방식

1. k개의 수를 제거해야 하므로 기본적으로 k번 반복해야 한다고 생각했다. 

2. k번 반복하는데 현재의 인덱스의 숫자가 다음 인덱스부터 마지막 - k 까지의 인덱스를 조회하여 제거할지 말지를 선택하면 된다고 생각했다.

3. 그러면 시간복잡도는 k * n 으로 계산된다.

    ```python
    for i in range(k):
        for j in range(len(number)):
            pass
    ```

    위의 코드로 테스트 케이스 7,8, 10번에서 시간초과가 났다.

4. max를 사용해도 O(n)을 가지므로 큰 차이가 없기 때문에 위의 방법에서 early stop 시키는 방법을 계속 생각해봤는데 모르겠다 ㅠ

5. 구글신께서 답을 알려주셧다.. ㅎㅎ

## 풀이코드

```python
def solution(number, k):
    stack = []
    for num in number:
        while len(stack) > 0 and stack[-1] < num and k > 0:
            k -= 1
            stack.pop()
        stack.append(num)
    if k != 0:
        stack = stack[:-k]
    return ''.join(stack)
```