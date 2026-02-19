const { getDb, query, run, get } = require('./db');

const questions = [
    {
        title: "Largest of Three",
        description: "Write a program to find the largest of three integers.\n\nRead three space-separated integers and print the largest one.\n\nSample Input: 10 20 5\nSample Output: 20",
        difficulty: "Easy",
        starter_code: JSON.stringify({
            java: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt(), b = sc.nextInt(), c = sc.nextInt();\n        // Write your code here\n        \n    }\n}`,
            python: `a, b, c = map(int, input().split())\n# Write your code here\n`,
            javascript: `const [a,b,c] = require('fs').readFileSync('/dev/stdin','utf8').trim().split(' ').map(Number);\n// Write your code here\n`,
            cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int a,b,c;\n    cin>>a>>b>>c;\n    // Write your code here\n    return 0;\n}`,
            c: `#include<stdio.h>\nint main(){\n    int a,b,c;\n    scanf("%d %d %d",&a,&b,&c);\n    // Write your code here\n    return 0;\n}`
        }),
        test_cases: JSON.stringify([
            { input: "10 20 5", expected: "20" },
            { input: "7 3 9", expected: "9" },
            { input: "-1 -5 -3", expected: "-1" },
            { input: "0 0 0", expected: "0" },
            { input: "100 100 99", expected: "100" }
        ])
    },
    {
        title: "Palindrome Check",
        description: "Given a string, determine if it is a palindrome.\n\nPrint YES if it is a palindrome, otherwise NO.\n\nSample Input: racecar\nSample Output: YES",
        difficulty: "Easy",
        starter_code: JSON.stringify({
            java: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine();\n        // Write your code here\n        \n    }\n}`,
            python: `s = input().strip()\n# Write your code here\n`,
            javascript: `const s = require('fs').readFileSync('/dev/stdin','utf8').trim();\n// Write your code here\n`,
            cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s;\n    cin>>s;\n    // Write your code here\n    return 0;\n}`,
            c: `#include<stdio.h>\n#include<string.h>\nint main(){\n    char s[100001];\n    scanf("%s",s);\n    // Write your code here\n    return 0;\n}`
        }),
        test_cases: JSON.stringify([
            { input: "racecar", expected: "YES" },
            { input: "hello", expected: "NO" },
            { input: "madam", expected: "YES" },
            { input: "abcba", expected: "YES" },
            { input: "abcd", expected: "NO" }
        ])
    },
    {
        title: "Sum of Array",
        description: "Given N integers, print their sum.\n\nFirst line: N. Second line: N space-separated integers.\n\nSample Input:\n5\n1 2 3 4 5\nSample Output: 15",
        difficulty: "Easy",
        starter_code: JSON.stringify({
            java: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // Write your code here\n        \n    }\n}`,
            python: `n = int(input())\narr = list(map(int, input().split()))\n# Write your code here\n`,
            javascript: `const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');\nconst n = parseInt(lines[0]);\nconst arr = lines[1].split(' ').map(Number);\n// Write your code here\n`,
            cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin>>n;\n    // Write your code here\n    return 0;\n}`,
            c: `#include<stdio.h>\nint main(){\n    int n;\n    scanf("%d",&n);\n    // Write your code here\n    return 0;\n}`
        }),
        test_cases: JSON.stringify([
            { input: "5\n1 2 3 4 5", expected: "15" },
            { input: "3\n10 20 30", expected: "60" },
            { input: "1\n42", expected: "42" },
            { input: "4\n-1 -2 3 4", expected: "4" },
            { input: "2\n0 0", expected: "0" }
        ])
    },
    {
        title: "Fibonacci Sequence",
        description: "Print the first N Fibonacci numbers (starting from 0), space-separated.\n\nSample Input: 7\nSample Output: 0 1 1 2 3 5 8",
        difficulty: "Medium",
        starter_code: JSON.stringify({
            java: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // Write your code here\n        \n    }\n}`,
            python: `n = int(input())\n# Write your code here\n`,
            javascript: `const n = parseInt(require('fs').readFileSync('/dev/stdin','utf8').trim());\n// Write your code here\n`,
            cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin>>n;\n    // Write your code here\n    return 0;\n}`,
            c: `#include<stdio.h>\nint main(){\n    int n;\n    scanf("%d",&n);\n    // Write your code here\n    return 0;\n}`
        }),
        test_cases: JSON.stringify([
            { input: "1", expected: "0" },
            { input: "2", expected: "0 1" },
            { input: "5", expected: "0 1 1 2 3" },
            { input: "7", expected: "0 1 1 2 3 5 8" },
            { input: "10", expected: "0 1 1 2 3 5 8 13 21 34" }
        ])
    },
    {
        title: "Count Vowels",
        description: "Count the number of vowels (a,e,i,o,u — case insensitive) in a string.\n\nSample Input: Hello World\nSample Output: 3",
        difficulty: "Easy",
        starter_code: JSON.stringify({
            java: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine();\n        // Write your code here\n        \n    }\n}`,
            python: `s = input()\n# Write your code here\n`,
            javascript: `const s = require('fs').readFileSync('/dev/stdin','utf8').trim();\n// Write your code here\n`,
            cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; getline(cin,s);\n    // Write your code here\n    return 0;\n}`,
            c: `#include<stdio.h>\n#include<string.h>\nint main(){\n    char s[100001];\n    fgets(s,sizeof(s),stdin);\n    // Write your code here\n    return 0;\n}`
        }),
        test_cases: JSON.stringify([
            { input: "Hello World", expected: "3" },
            { input: "aeiou", expected: "5" },
            { input: "bcdfg", expected: "0" },
            { input: "Programming", expected: "3" },
            { input: "AEIOU", expected: "5" }
        ])
    },
    {
        title: "Reverse a String",
        description: "Given a string, print it reversed.\n\nSample Input: hello\nSample Output: olleh",
        difficulty: "Easy",
        starter_code: JSON.stringify({
            java: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine();\n        // Write your code here\n        \n    }\n}`,
            python: `s = input()\n# Write your code here\n`,
            javascript: `const s = require('fs').readFileSync('/dev/stdin','utf8').trim();\n// Write your code here\n`,
            cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s; cin>>s;\n    // Write your code here\n    return 0;\n}`,
            c: `#include<stdio.h>\n#include<string.h>\nint main(){\n    char s[100001];\n    scanf("%s",s);\n    // Write your code here\n    return 0;\n}`
        }),
        test_cases: JSON.stringify([
            { input: "hello", expected: "olleh" },
            { input: "racecar", expected: "racecar" },
            { input: "abcde", expected: "edcba" },
            { input: "Java", expected: "avaJ" },
            { input: "12345", expected: "54321" }
        ])
    }
];

async function seed() {
    const db = await getDb();
    run(db, 'DELETE FROM questions');
    for (const q of questions) {
        run(db, `INSERT INTO questions (title, description, difficulty, starter_code, test_cases) VALUES (?,?,?,?,?)`,
            [q.title, q.description, q.difficulty, q.starter_code, q.test_cases]);
    }
    console.log(`✅ Seeded ${questions.length} questions.`);
}

async function seedAdmin() {
    const db = await getDb();
    const bcrypt = require('bcryptjs');
    const admin = get(db, "SELECT * FROM users WHERE username = 'admin'");
    if (!admin) {
        const hash = bcrypt.hashSync('admin123', 10);
        run(db, `INSERT INTO users (username, password, role) VALUES (?,?,?)`, ['admin', hash, 'admin']);
        console.log('✅ Admin account created: admin / admin123');
    } else {
        console.log('ℹ️  Admin account already exists');
    }
}

seed().then(seedAdmin).then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
