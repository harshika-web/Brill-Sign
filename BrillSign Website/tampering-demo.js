// Interactive Document Tampering Demo for Encrypted eSign Page

class TamperingDemo {
    constructor() {
        this.isTampered = false;
        this.originalDate = "February 7, 2026";
        this.originalSalary = "$120,000";
        this.tamperedDate = "January 1, 2025";
        this.tamperedSalary = "$250,000";

        this.originalHash = ["a3f9c284", "7b2e1d56", "9c4f8a21", "3e7d6b90"];
        this.tamperedHash = ["f7e2b891", "4c9d3a65", "2b1f8e47", "9a6c5d23"];

        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.bindEvents());
        } else {
            this.bindEvents();
        }
    }

    bindEvents() {
        const tamperButton = document.getElementById('tamperButton');
        const resetButton = document.getElementById('resetButton');

        if (tamperButton) {
            tamperButton.addEventListener('click', () => this.tamperDocument());
        }

        if (resetButton) {
            resetButton.addEventListener('click', () => this.resetDemo());
        }
    }

    tamperDocument() {
        if (this.isTampered) return;

        this.isTampered = true;

        // Animate document changes
        this.animateTextChange('editableDate', this.tamperedDate);
        this.animateTextChange('editableSalary', this.tamperedSalary);

        // Animate hash change
        setTimeout(() => this.animateHashChange(), 400);

        // Break the seal
        setTimeout(() => this.breakSeal(), 800);

        // Show alert
        setTimeout(() => this.showAlert(), 1200);

        // Hide tamper button, show reset button
        const tamperButton = document.getElementById('tamperButton');
        const resetButton = document.getElementById('resetButton');

        if (tamperButton) {
            tamperButton.style.opacity = '0';
            setTimeout(() => {
                tamperButton.style.display = 'none';
                if (resetButton) {
                    resetButton.style.display = 'flex';
                    setTimeout(() => resetButton.style.opacity = '1', 50);
                }
            }, 300);
        }
    }

    animateTextChange(elementId, newText) {
        const element = document.getElementById(elementId);
        if (!element) return;

        // Add highlight and shake
        element.classList.add('text-changing');

        setTimeout(() => {
            element.textContent = newText;
            element.classList.remove('text-changing');
            element.classList.add('text-tampered');
        }, 300);
    }

    animateHashChange() {
        const hashValue = document.getElementById('hashValue');
        if (!hashValue) return;

        const segments = hashValue.querySelectorAll('.hash-segment');

        // Add morphing animation
        hashValue.classList.add('hash-morphing');

        segments.forEach((segment, index) => {
            setTimeout(() => {
                segment.classList.add('segment-changing');
                setTimeout(() => {
                    segment.textContent = this.tamperedHash[index];
                    segment.classList.remove('segment-changing');
                    segment.classList.add('segment-tampered');
                }, 200);
            }, index * 100);
        });

        setTimeout(() => {
            hashValue.classList.remove('hash-morphing');
        }, 800);
    }

    breakSeal() {
        const sealStatus = document.getElementById('sealStatus');
        const sealState = document.getElementById('sealState');
        const sealIndicator = document.getElementById('sealIndicator');
        const sealCrack = document.getElementById('sealCrack');

        if (!sealStatus) return;

        // Add broken state
        sealStatus.classList.add('seal-broken');

        // Show crack animation
        if (sealCrack) {
            sealCrack.classList.add('crack-visible');
        }

        // Update text
        if (sealState) {
            sealState.textContent = 'Seal Broken - Tampering Detected';
        }

        // Change indicator
        if (sealIndicator) {
            sealIndicator.innerHTML = '<i class="fas fa-times-circle"></i>';
        }
    }

    showAlert() {
        const alert = document.getElementById('tamperAlert');
        if (!alert) return;

        alert.style.display = 'flex';
        setTimeout(() => {
            alert.classList.add('alert-visible');
        }, 50);
    }

    resetDemo() {
        this.isTampered = false;

        // Reset text
        const dateElement = document.getElementById('editableDate');
        const salaryElement = document.getElementById('editableSalary');

        if (dateElement) {
            dateElement.textContent = this.originalDate;
            dateElement.classList.remove('text-tampered');
        }

        if (salaryElement) {
            salaryElement.textContent = this.originalSalary;
            salaryElement.classList.remove('text-tampered');
        }

        // Reset hash
        const hashValue = document.getElementById('hashValue');
        if (hashValue) {
            const segments = hashValue.querySelectorAll('.hash-segment');
            segments.forEach((segment, index) => {
                segment.textContent = this.originalHash[index];
                segment.classList.remove('segment-tampered');
            });
        }

        // Reset seal
        const sealStatus = document.getElementById('sealStatus');
        const sealState = document.getElementById('sealState');
        const sealIndicator = document.getElementById('sealIndicator');
        const sealCrack = document.getElementById('sealCrack');

        if (sealStatus) sealStatus.classList.remove('seal-broken');
        if (sealCrack) sealCrack.classList.remove('crack-visible');
        if (sealState) sealState.textContent = 'Cryptographically Sealed';
        if (sealIndicator) sealIndicator.innerHTML = '<i class="fas fa-check-circle"></i>';

        // Hide alert
        const alert = document.getElementById('tamperAlert');
        if (alert) {
            alert.classList.remove('alert-visible');
            setTimeout(() => alert.style.display = 'none', 300);
        }

        // Show tamper button, hide reset button
        const tamperButton = document.getElementById('tamperButton');
        const resetButton = document.getElementById('resetButton');

        if (resetButton) {
            resetButton.style.opacity = '0';
            setTimeout(() => {
                resetButton.style.display = 'none';
                if (tamperButton) {
                    tamperButton.style.display = 'flex';
                    setTimeout(() => tamperButton.style.opacity = '1', 50);
                }
            }, 300);
        }
    }
}

// Initialize the demo when script loads
const tamperingDemo = new TamperingDemo();
