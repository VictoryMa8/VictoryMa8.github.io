#include <stdio.h>

float num1;
float num2;

char a = 'a';
char b = 'b';

int printA(char a) {
    if (a == 'a') {
        printf("Yippee!\n");
    }
    else {
        printf("Booooo...\n");
    }
    return 0;
}

int main(void) {

    printf("Enter a number: ");
    scanf("%g", &num1);
    printf("Enter a number: ");
    scanf("%g", &num2);

    printf("%g + %g = %g\n", num1, num2, num1 + num2);
    printf("%g - %g = %g\n", num1, num2, num1 - num2);
    printf("%g * %g = %g\n", num1, num2, num1 * num2);
    printf("%g / %g = %g\n", num1, num2, num1 / num2);
    
    return 0;
}