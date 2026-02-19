const { getDb, run } = require('./db');

const questions = [
    {
        title: "Second Largest Element",
        description: "Find the second largest element in an array.\n\nInput:\nLine 1: N (size)\nLine 2: N space-separated integers\n\nSample Input:\n5\n10 20 4 45 99\nSample Output:\n45",
        difficulty: "Easy",
        starter_code: JSON.stringify({
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for(int i=0;i<n;i++) arr[i] = sc.nextInt();\n        // Write your code here\n        \n    }\n}`,
            python: `n = int(input())\narr = list(map(int, input().split()))\n# Write your code here\n`,
            javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');\nconst n = +lines[0];\nconst arr = lines[1].trim().split(/\\s+/).map(Number);\n// Write your code here\n`,
            cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin>>n;\n    vector<int> arr(n);\n    for(int i=0;i<n;i++) cin>>arr[i];\n    // Write your code here\n    return 0;\n}`,
            c: `#include<stdio.h>\nint main(){\n    int n;\n    scanf("%d",&n);\n    int arr[n];\n    for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    // Write your code here\n    return 0;\n}`
        }),
        test_cases: JSON.stringify([
            { input: "5\n10 20 4 45 99", expected: "45" },
            { input: "6\n1 2 3 4 5 6", expected: "5" },
            { input: "4\n10 10 10 9", expected: "9" },
            { input: "3\n5 1 2", expected: "2" },
            { input: "2\n100 200", expected: "100" }
        ])
    },
    {
        title: "Third Largest Element",
        description: "Find the third largest element in an array. If there are fewer than 3 distinct elements, print 'Invalid'.\n\nInput:\nLine 1: N\nLine 2: N integers\n\nSample Input:\n6\n10 5 20 8 25 3\nSample Output:\n10",
        difficulty: "Easy",
        starter_code: JSON.stringify({
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for(int i=0;i<n;i++) arr[i] = sc.nextInt();\n        // Write your code here\n        \n    }\n}`,
            python: `n = int(input())\narr = list(map(int, input().split()))\n# Write your code here\n`,
            javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');\nconst n = +lines[0];\nconst arr = lines[1].trim().split(/\\s+/).map(Number);\n// Write your code here\n`,
            cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin>>n;\n    vector<int> arr(n);\n    for(int i=0;i<n;i++) cin>>arr[i];\n    // Write your code here\n    return 0;\n}`,
            c: `#include<stdio.h>\nint main(){\n    int n;\n    scanf("%d",&n);\n    int arr[n];\n    for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    // Write your code here\n    return 0;\n}`
        }),
        test_cases: JSON.stringify([
            { input: "6\n10 5 20 8 25 3", expected: "10" },
            { input: "5\n1 2 3 4 5", expected: "3" },
            { input: "2\n10 20", expected: "Invalid" }
        ])
    },
    {
        title: "Reverse an Array",
        description: "Reverse the given array.\n\nSample Input:\n5\n1 2 3 4 5\nSample Output:\n5 4 3 2 1",
        difficulty: "Easy",
        starter_code: JSON.stringify({
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for(int i=0;i<n;i++) arr[i] = sc.nextInt();\n        // Write your code here\n        \n    }\n}`,
            python: `n = int(input())\narr = list(map(int, input().split()))\n# Write your code here\n`,
            javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');\nconst n = +lines[0];\nconst arr = lines[1].trim().split(/\\s+/).map(Number);\n// Write your code here\n`,
            cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin>>n;\n    vector<int> arr(n);\n    for(int i=0;i<n;i++) cin>>arr[i];\n    // Write your code here\n    return 0;\n}`,
            c: `#include<stdio.h>\nint main(){\n    int n;\n    scanf("%d",&n);\n    int arr[n];\n    for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    // Write your code here\n    return 0;\n}`
        }),
        test_cases: JSON.stringify([
            { input: "5\n1 2 3 4 5", expected: "5 4 3 2 1" },
            { input: "3\n10 20 30", expected: "30 20 10" },
            { input: "1\n99", expected: "99" }
        ])
    },
    {
        title: "Reverse Array in Groups",
        description: "Reverse every sub-array group of size K.\n\nInput:\nLine 1: N\nLine 2: N integers\nLine 3: K\n\nSample Input:\n8\n1 2 3 4 5 6 7 8\n3\nSample Output:\n3 2 1 6 5 4 8 7",
        difficulty: "Medium",
        starter_code: JSON.stringify({
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for(int i=0;i<n;i++) arr[i] = sc.nextInt();\n        int k = sc.nextInt();\n        // Write your code here\n        \n    }\n}`,
            python: `n = int(input())\narr = list(map(int, input().split()))\nk = int(input())\n# Write your code here\n`,
            javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');\nconst n = +lines[0];\nconst arr = lines[1].trim().split(/\\s+/).map(Number);\nconst k = +lines[2];\n// Write your code here\n`,
            cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n,k; cin>>n;\n    vector<int> arr(n);\n    for(int i=0;i<n;i++) cin>>arr[i];\n    cin>>k;\n    // Write your code here\n    return 0;\n}`,
            c: `#include<stdio.h>\nint main(){\n    int n,k;\n    scanf("%d",&n);\n    int arr[n];\n    for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    scanf("%d",&k);\n    // Write your code here\n    return 0;\n}`
        }),
        test_cases: JSON.stringify([
            { input: "8\n1 2 3 4 5 6 7 8\n3", expected: "3 2 1 6 5 4 8 7" },
            { input: "5\n1 2 3 4 5\n3", expected: "3 2 1 5 4" },
            { input: "4\n10 20 30 40\n2", expected: "20 10 40 30" }
        ])
    },
    {
        title: "Rotate Array",
        description: "Cyclically rotate the array counter-clockwise by one.\n\nSample Input:\n5\n1 2 3 4 5\nSample Output:\n2 3 4 5 1",
        difficulty: "Easy",
        starter_code: JSON.stringify({
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for(int i=0;i<n;i++) arr[i] = sc.nextInt();\n        // Write your code here\n        \n    }\n}`,
            python: `n = int(input())\narr = list(map(int, input().split()))\n# Write your code here\n`,
            javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');\nconst n = +lines[0];\nconst arr = lines[1].trim().split(/\\s+/).map(Number);\n// Write your code here\n`,
            cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin>>n;\n    vector<int> arr(n);\n    for(int i=0;i<n;i++) cin>>arr[i];\n    // Write your code here\n    return 0;\n}`,
            c: `#include<stdio.h>\nint main(){\n    int n;\n    scanf("%d",&n);\n    int arr[n];\n    for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    // Write your code here\n    return 0;\n}`
        }),
        test_cases: JSON.stringify([
            { input: "5\n1 2 3 4 5", expected: "2 3 4 5 1" },
            { input: "3\n10 20 30", expected: "20 30 10" },
            { input: "1\n99", expected: "99" }
        ])
    },
    {
        title: "Three Great Candidates",
        description: "Find the maximum product of any three numbers in the array.\n\nSample Input:\n5\n-10 -3 5 6 -2\nSample Output:\n180",
        difficulty: "Medium",
        starter_code: JSON.stringify({
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for(int i=0;i<n;i++) arr[i] = sc.nextInt();\n        // Write your code here\n        \n    }\n}`,
            python: `n = int(input())\narr = list(map(int, input().split()))\n# Write your code here\n`,
            javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');\nconst n = +lines[0];\nconst arr = lines[1].trim().split(/\\s+/).map(Number);\n// Write your code here\n`,
            cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin>>n;\n    vector<int> arr(n);\n    for(int i=0;i<n;i++) cin>>arr[i];\n    // Write your code here\n    return 0;\n}`,
            c: `#include<stdio.h>\nint main(){\n    int n;\n    scanf("%d",&n);\n    int arr[n];\n    for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    // Write your code here\n    return 0;\n}`
        }),
        test_cases: JSON.stringify([
            { input: "5\n-10 -3 5 6 -2", expected: "180" }, // -10*-3*6 = 180
            { input: "5\n1 2 3 4 5", expected: "60" },
            { input: "4\n-10 -20 5 2", expected: "1000" } // -10*-20*5 = 1000
        ])
    },
    {
        title: "Max Consecutive Ones",
        description: "Find the maximum number of consecutive 1s in a binary array.\n\nSample Input:\n6\n1 1 0 1 1 1\nSample Output:\n3",
        difficulty: "Easy",
        starter_code: JSON.stringify({
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for(int i=0;i<n;i++) arr[i] = sc.nextInt();\n        // Write your code here\n        \n    }\n}`,
            python: `n = int(input())\narr = list(map(int, input().split()))\n# Write your code here\n`,
            javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');\nconst n = +lines[0];\nconst arr = lines[1].trim().split(/\\s+/).map(Number);\n// Write your code here\n`,
            cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin>>n;\n    vector<int> arr(n);\n    for(int i=0;i<n;i++) cin>>arr[i];\n    // Write your code here\n    return 0;\n}`,
            c: `#include<stdio.h>\nint main(){\n    int n;\n    scanf("%d",&n);\n    int arr[n];\n    for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    // Write your code here\n    return 0;\n}`
        }),
        test_cases: JSON.stringify([
            { input: "6\n1 1 0 1 1 1", expected: "3" },
            { input: "5\n1 0 1 0 1", expected: "1" },
            { input: "4\n1 1 1 1", expected: "4" },
            { input: "3\n0 0 0", expected: "0" }
        ])
    },
    {
        title: "Move All Zeroes To End",
        description: "Move all zeroes to the end of the array while maintaining the relative order of non-zero elements.\n\nSample Input:\n6\n1 0 2 0 3 4\nSample Output:\n1 2 3 4 0 0",
        difficulty: "Easy",
        starter_code: JSON.stringify({
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for(int i=0;i<n;i++) arr[i] = sc.nextInt();\n        // Write your code here\n        \n    }\n}`,
            python: `n = int(input())\narr = list(map(int, input().split()))\n# Write your code here\n`,
            javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');\nconst n = +lines[0];\nconst arr = lines[1].trim().split(/\\s+/).map(Number);\n// Write your code here\n`,
            cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin>>n;\n    vector<int> arr(n);\n    for(int i=0;i<n;i++) cin>>arr[i];\n    // Write your code here\n    return 0;\n}`,
            c: `#include<stdio.h>\nint main(){\n    int n;\n    scanf("%d",&n);\n    int arr[n];\n    for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    // Write your code here\n    return 0;\n}`
        }),
        test_cases: JSON.stringify([
            { input: "6\n1 0 2 0 3 4", expected: "1 2 3 4 0 0" },
            { input: "3\n0 0 0", expected: "0 0 0" },
            { input: "3\n1 2 3", expected: "1 2 3" },
            { input: "5\n0 1 0 3 0", expected: "1 3 0 0 0" }
        ])
    },
    {
        title: "Wave Array",
        description: "Sort the array into a wave-like array. Arr[0] >= Arr[1] <= Arr[2] >= Arr[3]...\n\nSample Input:\n6\n1 2 3 4 5 6\nSample Output:\n2 1 4 3 6 5",
        difficulty: "Medium",
        starter_code: JSON.stringify({
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for(int i=0;i<n;i++) arr[i] = sc.nextInt();\n        // Write your code here\n        \n    }\n}`,
            python: `n = int(input())\narr = list(map(int, input().split()))\n# Write your code here\n`,
            javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');\nconst n = +lines[0];\nconst arr = lines[1].trim().split(/\\s+/).map(Number);\n// Write your code here\n`,
            cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin>>n;\n    vector<int> arr(n);\n    for(int i=0;i<n;i++) cin>>arr[i];\n    // Write your code here\n    return 0;\n}`,
            c: `#include<stdio.h>\nint main(){\n    int n;\n    scanf("%d",&n);\n    int arr[n];\n    for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    // Write your code here\n    return 0;\n}`
        }),
        test_cases: JSON.stringify([
            { input: "6\n1 2 3 4 5 6", expected: "2 1 4 3 6 5" },
            { input: "4\n10 5 6 3", expected: "5 3 6 10" },
            { input: "3\n1 2 3", expected: "2 1 3" }
        ])
    },
    {
        title: "Plus One",
        description: "Given a non-negative integer represented as an array of digits, add one to the number.\n\nSample Input:\n3\n1 2 9\nSample Output:\n1 3 0",
        difficulty: "Easy",
        starter_code: JSON.stringify({
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for(int i=0;i<n;i++) arr[i] = sc.nextInt();\n        // Write your code here\n        \n    }\n}`,
            python: `n = int(input())\narr = list(map(int, input().split()))\n# Write your code here\n`,
            javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');\nconst n = +lines[0];\nconst arr = lines[1].trim().split(/\\s+/).map(Number);\n// Write your code here\n`,
            cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin>>n;\n    vector<int> arr(n);\n    for(int i=0;i<n;i++) cin>>arr[i];\n    // Write your code here\n    return 0;\n}`,
            c: `#include<stdio.h>\nint main(){\n    int n;\n    scanf("%d",&n);\n    int arr[n];\n    for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    // Write your code here\n    return 0;\n}`
        }),
        test_cases: JSON.stringify([
            { input: "3\n1 2 9", expected: "1 3 0" },
            { input: "3\n1 2 3", expected: "1 2 4" },
            { input: "1\n9", expected: "1 0" },
            { input: "3\n9 9 9", expected: "1 0 0 0" }
        ])
    },
    {
        title: "Stock Buy and Sell – One Transaction",
        description: "Maximum profit with one transaction.\n\nSample Input:\n6\n7 1 5 3 6 4\nSample Output:\n5",
        difficulty: "Easy",
        starter_code: JSON.stringify({
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for(int i=0;i<n;i++) arr[i] = sc.nextInt();\n        // Write your code here\n        \n    }\n}`,
            python: `n = int(input())\narr = list(map(int, input().split()))\n# Write your code here\n`,
            javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');\nconst n = +lines[0];\nconst arr = lines[1].trim().split(/\\s+/).map(Number);\n// Write your code here\n`,
            cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin>>n;\n    vector<int> arr(n);\n    for(int i=0;i<n;i++) cin>>arr[i];\n    // Write your code here\n    return 0;\n}`,
            c: `#include<stdio.h>\nint main(){\n    int n;\n    scanf("%d",&n);\n    int arr[n];\n    for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    // Write your code here\n    return 0;\n}`
        }),
        test_cases: JSON.stringify([
            { input: "6\n7 1 5 3 6 4", expected: "5" },
            { input: "5\n7 6 4 3 1", expected: "0" },
            { input: "3\n1 2 3", expected: "2" }
        ])
    },
    {
        title: "Stock Buy and Sell – Multiple Transactions",
        description: "Maximum profit with multiple transactions permitted.\n\nSample Input:\n6\n7 1 5 3 6 4\nSample Output:\n7",
        difficulty: "Medium",
        starter_code: JSON.stringify({
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for(int i=0;i<n;i++) arr[i] = sc.nextInt();\n        // Write your code here\n        \n    }\n}`,
            python: `n = int(input())\narr = list(map(int, input().split()))\n# Write your code here\n`,
            javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');\nconst n = +lines[0];\nconst arr = lines[1].trim().split(/\\s+/).map(Number);\n// Write your code here\n`,
            cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin>>n;\n    vector<int> arr(n);\n    for(int i=0;i<n;i++) cin>>arr[i];\n    // Write your code here\n    return 0;\n}`,
            c: `#include<stdio.h>\nint main(){\n    int n;\n    scanf("%d",&n);\n    int arr[n];\n    for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    // Write your code here\n    return 0;\n}`
        }),
        test_cases: JSON.stringify([
            { input: "6\n7 1 5 3 6 4", expected: "7" }, // (5-1) + (6-3) = 4 + 3 = 7
            { input: "5\n1 2 3 4 5", expected: "4" }, // 5-1 = 4
            { input: "5\n7 6 4 3 1", expected: "0" }
        ])
    },
    {
        title: "Remove Duplicates from Sorted Array",
        description: "Remove duplicates in-place and print unique elements.\n\nSample Input:\n7\n1 1 2 2 3 4 4\nSample Output:\n1 2 3 4",
        difficulty: "Easy",
        starter_code: JSON.stringify({
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for(int i=0;i<n;i++) arr[i] = sc.nextInt();\n        // Write your code here\n        \n    }\n}`,
            python: `n = int(input())\narr = list(map(int, input().split()))\n# Write your code here\n`,
            javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');\nconst n = +lines[0];\nconst arr = lines[1].trim().split(/\\s+/).map(Number);\n// Write your code here\n`,
            cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin>>n;\n    vector<int> arr(n);\n    for(int i=0;i<n;i++) cin>>arr[i];\n    // Write your code here\n    return 0;\n}`,
            c: `#include<stdio.h>\nint main(){\n    int n;\n    scanf("%d",&n);\n    int arr[n];\n    for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    // Write your code here\n    return 0;\n}`
        }),
        test_cases: JSON.stringify([
            { input: "7\n1 1 2 2 3 4 4", expected: "1 2 3 4" },
            { input: "3\n1 1 2", expected: "1 2" },
            { input: "3\n1 1 1", expected: "1" }
        ])
    },
    {
        title: "Alternate Positive Negative",
        description: "Rearrange the array to alternate positive and negative numbers.\n\nSample Input:\n6\n1 2 -3 -4 5 -6\nSample Output:\n1 -3 2 -4 5 -6",
        difficulty: "Medium",
        starter_code: JSON.stringify({
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for(int i=0;i<n;i++) arr[i] = sc.nextInt();\n        // Write your code here\n        \n    }\n}`,
            python: `n = int(input())\narr = list(map(int, input().split()))\n# Write your code here\n`,
            javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');\nconst n = +lines[0];\nconst arr = lines[1].trim().split(/\\s+/).map(Number);\n// Write your code here\n`,
            cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin>>n;\n    vector<int> arr(n);\n    for(int i=0;i<n;i++) cin>>arr[i];\n    // Write your code here\n    return 0;\n}`,
            c: `#include<stdio.h>\nint main(){\n    int n;\n    scanf("%d",&n);\n    int arr[n];\n    for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    // Write your code here\n    return 0;\n}`
        }),
        test_cases: JSON.stringify([
            { input: "6\n1 2 -3 -4 5 -6", expected: "1 -3 2 -4 5 -6" },
            { input: "4\n1 2 3 4", expected: "1 2 3 4" }, // No negatives
            { input: "4\n-1 -2 -3 -4", expected: "-1 -2 -3 -4" } // No positives
        ])
    },
    {
        title: "Array Leaders",
        description: "An element is a leader if it is greater than all the elements to its right side.\n\nSample Input:\n6\n16 17 4 3 5 2\nSample Output:\n17 5 2",
        difficulty: "Medium",
        starter_code: JSON.stringify({
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for(int i=0;i<n;i++) arr[i] = sc.nextInt();\n        // Write your code here\n        \n    }\n}`,
            python: `n = int(input())\narr = list(map(int, input().split()))\n# Write your code here\n`,
            javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');\nconst n = +lines[0];\nconst arr = lines[1].trim().split(/\\s+/).map(Number);\n// Write your code here\n`,
            cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin>>n;\n    vector<int> arr(n);\n    for(int i=0;i<n;i++) cin>>arr[i];\n    // Write your code here\n    return 0;\n}`,
            c: `#include<stdio.h>\nint main(){\n    int n;\n    scanf("%d",&n);\n    int arr[n];\n    for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    // Write your code here\n    return 0;\n}`
        }),
        test_cases: JSON.stringify([
            { input: "6\n16 17 4 3 5 2", expected: "17 5 2" },
            { input: "5\n1 2 3 4 5", expected: "5" },
            { input: "3\n5 4 3", expected: "5 4 3" }
        ])
    },
    {
        title: "Missing and Repeating in Array",
        description: "Find the missing and repeating number in an unsorted array of size N containing numbers 1 to N.\n\nSample Input:\n5\n1 3 3 4 5\nSample Output:\nMissing = 2\nRepeating = 3",
        difficulty: "Hard",
        starter_code: JSON.stringify({
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for(int i=0;i<n;i++) arr[i] = sc.nextInt();\n        // Write your code here\n        \n    }\n}`,
            python: `n = int(input())\narr = list(map(int, input().split()))\n# Write your code here\n`,
            javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');\nconst n = +lines[0];\nconst arr = lines[1].trim().split(/\\s+/).map(Number);\n// Write your code here\n`,
            cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin>>n;\n    vector<int> arr(n);\n    for(int i=0;i<n;i++) cin>>arr[i];\n    // Write your code here\n    return 0;\n}`,
            c: `#include<stdio.h>\nint main(){\n    int n;\n    scanf("%d",&n);\n    int arr[n];\n    for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    // Write your code here\n    return 0;\n}`
        }),
        test_cases: JSON.stringify([
            { input: "5\n1 3 3 4 5", expected: "Missing = 2\nRepeating = 3" },
            { input: "2\n2 2", expected: "Missing = 1\nRepeating = 2" },
            { input: "3\n1 1 3", expected: "Missing = 2\nRepeating = 1" }
        ])
    },
    {
        title: "Missing Ranges of Numbers",
        description: "Find the missing ranges between low and high. Input: Array, lower, upper.\n\nSample Input:\n5\n0 1 3 50 75\nlower = 0\nupper = 99\n(Format input: N, Array, lower, upper)\nSample Output:\n2\n4->49\n51->74\n76->99",
        difficulty: "Medium",
        starter_code: JSON.stringify({
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for(int i=0;i<n;i++) arr[i] = sc.nextInt();\n        int lower = sc.nextInt(); String s1 = sc.next(); int l = sc.nextInt();\n        int upper = sc.nextInt(); String s2 = sc.next(); int u = sc.nextInt();\n        // Write your code here\n    }\n}`,
            python: `# Input format matches sample: N, Array lines, then consume 'lower = ' and 'upper = ' lines\nn = int(input())\narr = list(map(int, input().split()))\nlow_line = input().split()[-1]; lower = int(low_line)\nup_line = input().split()[-1]; upper = int(up_line)\n# Write your code here\n`,
            javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');\nconst n = +lines[0];\nconst arr = lines[1].trim().split(/\\s+/).map(Number);\nconst lower = parseInt(lines[2].split('=').pop());\nconst upper = parseInt(lines[3].split('=').pop());\n// Write your code here\n`,
            cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin>>n;\n    vector<int> arr(n);\n    for(int i=0;i<n;i++) cin>>arr[i];\n    string dump; int lower, upper;\n    cin>>dump>>dump>>lower;\n    cin>>dump>>dump>>upper;\n    // Write your code here\n    return 0;\n}`,
            c: `#include<stdio.h>\nint main(){\n    int n, lower, upper;\n    scanf("%d",&n);\n    int arr[n];\n    for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    scanf("%*s %*s %d", &lower);\n    scanf("%*s %*s %d", &upper);\n    // Write your code here\n    return 0;\n}`
        }),
        test_cases: JSON.stringify([
            { input: "5\n0 1 3 50 75\nlower = 0\nupper = 99", expected: "2\n4->49\n51->74\n76->99" }
        ])
    },
    {
        title: "Sum of All Subarrays",
        description: "Calculate the sum of all subarrays of the given array.\n\nSample Input:\n3\n1 2 3\nSample Output:\n20",
        difficulty: "Medium",
        starter_code: JSON.stringify({
            java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for(int i=0;i<n;i++) arr[i] = sc.nextInt();\n        // Write your code here\n        \n    }\n}`,
            python: `n = int(input())\narr = list(map(int, input().split()))\n# Write your code here\n`,
            javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');\nconst n = +lines[0];\nconst arr = lines[1].trim().split(/\\s+/).map(Number);\n// Write your code here\n`,
            cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin>>n;\n    vector<int> arr(n);\n    for(int i=0;i<n;i++) cin>>arr[i];\n    // Write your code here\n    return 0;\n}`,
            c: `#include<stdio.h>\nint main(){\n    int n;\n    scanf("%d",&n);\n    int arr[n];\n    for(int i=0;i<n;i++) scanf("%d",&arr[i]);\n    // Write your code here\n    return 0;\n}`
        }),
        test_cases: JSON.stringify([
            { input: "3\n1 2 3", expected: "20" }, // [1]=1, [2]=2, [3]=3, [1,2]=3, [2,3]=5, [1,2,3]=6 => 1+2+3+3+5+6 = 20
            { input: "2\n1 2", expected: "6" }, // [1]=1, [2]=2, [1,2]=3 => 6
            { input: "1\n5", expected: "5" }
        ])
    }
];

async function seed() {
    const db = await getDb();

    console.log('🗑️ Clearing existing questions...');
    run(db, 'DELETE FROM questions');
    // Reset sequence
    run(db, 'DELETE FROM sqlite_sequence WHERE name="questions"');

    console.log(`🌱 Seeding ${questions.length} new questions...`);
    for (const q of questions) {
        run(db, `INSERT INTO questions (title, description, difficulty, starter_code, test_cases) VALUES (?,?,?,?,?)`,
            [q.title, q.description, q.difficulty, q.starter_code, q.test_cases]);
    }
    console.log(`✅ Successfully added ${questions.length} questions!`);
}

// Run the seed function
seed().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
