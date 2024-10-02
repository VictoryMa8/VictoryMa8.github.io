#include <stdio.h>

int num1;
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
    printA(a);
    printA(b);
    printf("%d\n", a);
    printf("Enter a number: \n");
    scanf("%d", &num1);
    printf("%d is definitely a number!\n", num1);
    return 0;
}