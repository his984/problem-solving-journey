### The Logic of Binary to Decimal Conversion

The entire process is based on a single, simple concept: **Place Value**. A digit's value depends on its position within the number.

#### 1. The Concept in our Decimal System (Base-10)

Think about the number **345**. We intuitively understand this as:

- The **5** is in the "ones" place ($10^0$), so its value is $5 \times 1 = 5$.
- The **4** is in the "tens" place ($10^1$), so its value is $4 \times 10 = 40$.
- The **3** is in the "hundreds" place ($10^2$), so its value is $3 \times 100 = 300$.

The final number is the sum of these values: $300 + 40 + 5 = 345$.

The formula is: Sum of `(digit * 10^position)`.

---

### 2. Applying the Same Logic to Binary (Base-2) 🧠

Binary follows the **exact same principle**, but the **base is 2**, not 10.

The place values are powers of 2: `...16, 8, 4, 2, 1` (which are `$2^4, 2^3, 2^2, 2^1, 2^0$`).

#### Step-by-Step Example: Convert `1101`

**1. Write down the binary number and assign a position (power) to each digit, starting from 0 on the right.**

```
Binary Digit:   1   1   0   1
Position:       3   2   1   0
```

**2. For each digit, calculate `digit * (2^position)`.**

- Rightmost digit: `1 * (2^0)` = `1 * 1` = **1**
- Next digit:      `0 * (2^1)` = `0 * 2` = **0**
- Next digit:      `1 * (2^2)` = `1 * 4` = **4**
- Leftmost digit:  `1 * (2^3)` = `1 * 8` = **8**

**3. Sum the results.**

$$8 + 4 + 0 + 1 = 13$$

✅ **Result**: The binary number `1101` is equal to the decimal number **13**.