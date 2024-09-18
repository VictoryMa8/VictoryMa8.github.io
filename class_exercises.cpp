#include <iostream>
#include <string>
using namespace std;

int my_function(int num) {
    int sum = 0;
    for (int i = 0; i <= num; i++) {
        sum += i;
    }
    cout << sum << endl;
    return sum;
}

int computeFactorial(int num) {
    int result = 1;
    int i = 1;
    while (i <= num) {
        result *= i;
        i++;
    }
    return result;
}

string isGreaterThan10(int x) {
    if (x > 10) {
        return "It is greater than 10!";
    }
    else {
        return "It is less than 10.";
    }
}

int main() {
    my_function(100);
    cout << computeFactorial(11) << endl;
    cout << isGreaterThan10(100) << endl;
    cout << isGreaterThan10(5) << endl;
    return 0;
}