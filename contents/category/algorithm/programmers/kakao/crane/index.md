---
title: '[프로그래머스-2019 카카오 겨울 인턴십] 크레인 인형뽑기 게임'
date: '2021-10-22'
category: 'algorithm'
description: ''
emoji: '🏗'
---

[[info | 프로그래머스 크레인 인형뽑기 게임 문제 보러가기]]
| https://programmers.co.kr/learn/courses/30/lessons/64061



## 문제 요약

인형뽑기를 하는데 바구니에 같은 인형이 연속으로 담기면 점수를 획득한다.

#### 조건

- board의 크기는 [5 X 5] 이상 [30 X 30] 이하이다.
- 인형은 1000개 이하로 뽑는다.

## 문제 접근 방식

3. 이차원 리스트가 입력되는데 행렬을 바꾸면 인형을 유무 체크가 쉬울 것 같다는 생각을 했다.
2. 행렬을 바꿨는데 0을 뽑으면 뛰어 넘어줘야 해서 번거로웠다. 
3. 0을 리스트에서 다 제거했다.
4. 원하는 인형을 뽑고 리스트에 담았다. 이때 뽑은 인형과 마지막 인형이 같다면 점수를 2점을 추가한다.
5. 첫번째 인형을 뽑는 상황을 위해 리스트에 -1 값을 추가했다.

## 풀이코드

```python
def solution(board, moves):
    board = list(map(list, zip(*board))) # 행렬 바꾸기
    board = [list(filter(lambda x: x>0, b)) for b in board] # 0보다 큰놈만 남기기

    box = [-1]
    score = 0
    for move in moves:
        move = move - 1
        if board[move]:
            item = board[move].pop(0)
            if item == box[-1]: # 현재 아이템과 마지막 아이템이 같으면
                score += 2 # 점수는 2점
                box.pop(-1) # 마지막 아이템 빼주기
            else:
                box.append(item)
        
    return score
```