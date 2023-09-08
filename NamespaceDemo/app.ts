/// <reference path="utility-functions.ts" />

const maxBooksFor15 = Utility.maxBooksAllowed(15);
console.log('Max allowed number of books for age 15', maxBooksFor15);

import feeUtil = Utility.Fees;
const fee = feeUtil.calculateLateFee(3);