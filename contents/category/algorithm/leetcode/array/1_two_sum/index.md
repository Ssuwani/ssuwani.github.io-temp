---
title: '[LeetCode - Array] 1. Two Sum'
date: '2021-10-27'
category: 'algorithm'
description: ''
emoji: '🔢'
---

[[info | LeetCode 1. Two Sum 문제 보러가기]]
| https://leetcode.com/problems/two-sum/



LeetCode에서 푸는 첫번째 문제인데, LeetCode로 문제를 풀어야겠다고 생각아 든 이유는 기본 문제의 풀이 템플릿이 Class 이기 때문이다. 신나는님께서 어떤 문제를 `__iter__` 로 이터러블 객체로 만들어 쉽게 풀 수 있다고 이야기해주셨다! 꽂혔다! 



## 문제 요약

숫자가 담긴 리스트가 주어지고 target number가 주어진다. 리스트의 몇번째 인덱스의 합으로 target number를 표현할 수 있는가?

#### 조건

- `2 <= nums.length <= 104`
- `-109 <= nums[i] <= 109`
- `-109 <= target <= 109`
- **Only one valid answer exists.**

## 문제 접근 방식

1. 조건에서 배열의 크기가 크지 않으니 이중 반복문을 사용해도 충분했다.

## 풀이코드

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        for i in range(len(nums)-1):
            for j in range(i+1, len(nums)):
                if nums[i] + nums[j] == target:
                    return [i, j]
```



