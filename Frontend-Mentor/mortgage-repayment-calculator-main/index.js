// Function to calculate the EMI (Equated Monthly Installment) for repayment mortgage
function calculateEMI(loanAmount, interestRate, loanTenure) {
    let monthlyInterestRate = interestRate / 12 / 100;
    let numberOfMonths = loanTenure * 12;

    let emi = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths) / (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);

    return emi.toFixed(2);
}

// Function to calculate the interest-only payment
function calculateInterestOnly(loanAmount, interestRate) {
    let monthlyInterestRate = interestRate / 12 / 100;
    let monthlyPayment = loanAmount * monthlyInterestRate;

    return monthlyPayment.toFixed(2);
}

// Function to calculate the total payment and total interest
function calculateLoanDetails(loanAmount, interestRate, loanTenure, isInterestOnly) {
    let emi, totalPayment;

    if (isInterestOnly) {
        emi = calculateInterestOnly(loanAmount, interestRate);
        totalPayment = (emi * loanTenure * 12 + loanAmount).toFixed(2); // total payment is all interest payments plus the principal
    } else {
        emi = calculateEMI(loanAmount, interestRate, loanTenure);
        totalPayment = (emi * loanTenure * 12).toFixed(2); // total payment is EMI * number of months
    }

    return {
        emi: emi,
        totalPayment: totalPayment
    };
}

// Function to calculate and display the results
function calculateAndDisplayResults() {
    // Get form values
    let loanAmount = parseFloat(document.getElementById('mortgage-amount').value);
    let interestRate = parseFloat(document.getElementById('interest-rate').value);
    let loanTenure = parseFloat(document.getElementById('mortgage-term').value);
    let isInterestOnly = document.getElementById('interest-only').checked; // Check if interest-only option is selected

    // Validate the inputs
    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTenure)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    // Calculate loan details based on mortgage type
    let loanDetails = calculateLoanDetails(loanAmount, interestRate, loanTenure, isInterestOnly);

    // Update the results in the HTML
    document.getElementById('monthly-repayment').textContent = `$${loanDetails.emi}`;
    document.getElementById('total-repayment').textContent = `$${loanDetails.totalPayment}`;
}