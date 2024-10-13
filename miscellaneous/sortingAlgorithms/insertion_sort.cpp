#include <iostream>
#include <chrono>
#include <fstream>
#include <random>
using namespace std;
using namespace std::chrono;

void insertion_sort(int arr[], int n) {
    int i;
    int next_item;
    int sorted_size = 1;
    while (sorted_size < n) {
        next_item = arr[sorted_size];
        i = sorted_size - 1;
        while (i >= 0 && next_item < arr[i]) {
            arr[i+1] = arr[i];
            i--;
        }
        arr[i+1] = next_item;
        sorted_size++;
    }
}

bool array_equals(int arr1[], int n1, int arr2[], int n2) {
	if (n1 != n2)
		return false;
	for (int i = 0; i < n1; i++){
		if (arr1[i] != arr2[i]){
			return false;
		}
	}
	return true;
}

bool test(void (*func)(int*, int)) {
    // this takes the sorting function as an argument
	bool pass = true;

	int test1[5] = {1, 4, 2, 3, 5};
	int test1_ans[5] = {1, 2, 3, 4, 5};
	func(test1, 5);
	if (!array_equals(test1, 5, test1_ans, 5)) {
		cout << "Test 1 failed" << endl;
		pass = false;
	}

	// ten example tests here
    int test2[5] = {};
    int test2_ans[5] = {};
    func(test2, 5);
    if (!array_equals(test2, 5, test2_ans, 5)) {
		cout << "Test 2 failed" << endl;
		pass = false;
	}

    int test3[1] = {3};
    int test3_ans[1] = {3};
    func(test3, 1);
    if (!array_equals(test3, 1, test3_ans, 1)) {
		cout << "Test 3 failed" << endl;
		pass = false;
	}

    int test4[7] = {4, 2, 6, 7, 5, 1, 3};
    int test4_ans[7] = {1, 2, 3, 4, 5, 6, 7};
    func(test4, 7);
    if (!array_equals(test4, 7, test4_ans, 7)) {
		cout << "Test 4 failed" << endl;
		pass = false;
	}

    int test5[5] = {1, 0, 1, 0, 1};
    int test5_ans[5] = {0, 0, 1, 1, 1};
    func(test5, 5);
    if (!array_equals(test5, 5, test5_ans, 5)) {
		cout << "Test 5 failed" << endl;
		pass = false;
	}

    int test6[10] = {10, 9, 8, 7, 6, 5, 4, 3, 2, 1};
    int test6_ans[10] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    func(test6, 10);
    if (!array_equals(test6, 10, test6_ans, 10)) {
		cout << "Test 6 failed" << endl;
		pass = false;
	}

    int test7[3] = {1, 2, 3};
    int test7_ans[3] = {1, 2, 3};
    func(test7, 3);
    if (!array_equals(test7, 3, test7_ans, 3)) {
		cout << "Test 7 failed" << endl;
		pass = false;
	}

    int test8[4] = {0, 0, 0, 0};
    int test8_ans[4] = {0, 0, 0, 0};
    func(test4, 7);
    if (!array_equals(test8, 4, test8_ans, 4)) {
		cout << "Test 8 failed" << endl;
		pass = false;
	}

    int test9[5] = {100, 50, 75, 25, 0};
    int test9_ans[5] = {0, 25, 50, 75, 100};
    func(test9, 5);
    if (!array_equals(test9, 5, test9_ans, 5)) {
		cout << "Test 9 failed" << endl;
		pass = false;
	}

    int test10[6] = {20, 10, 0, 0, 10, 20};
    int test10_ans[6] = {0, 0, 10, 10, 20, 20};
    func(test10, 6);
    if (!array_equals(test10, 6, test10_ans, 6)) {
		cout << "Test 10 failed" << endl;
		pass = false;
	}

    int test11[4] = {11, 11, 11, 7};
    int test11_ans[4] = {7, 11, 11, 11};
    func(test11, 4);
    if (!array_equals(test11, 4, test11_ans, 4)) {
		cout << "Test 11 failed" << endl;
		pass = false;
	}

	if (pass) {
		cout << "All tests passed!" << endl;
	}
	return pass; // returns true if all tests pass, otherwise returns false
}

void timing_experiment(void (*func)(int*, int)) {
    // open output file
    ofstream my_file;
    my_file.open("insertion_sort_runtimes.csv");
    my_file << "n, time\n";

    for (int i = 0; i <= 1000; i += 10) { // create arrays with 0, 10, 20, ..., 1000 size
        int* test = new int[i]; // array with size i
        int total_time = 0; // total time for one size
        for (int trials = 0; trials <= 1000; trials++) { // test the current size 1000 times
            for (int j = 0; j < i; j++) { // fill array with random integers
                test[j] = rand();
            }
            auto start = steady_clock::now();		
            func(test, i);
            auto stop = steady_clock::now();
            auto duration = duration_cast<nanoseconds>(stop - start);
            total_time += duration.count();
        }
        int avg_time = total_time / 1000; // average time for the current size with 1000 trials
        my_file << i << "," << avg_time << "\n"; // write result to the csv file
        cout << "Average time for an array of size " << i << ": " << avg_time << endl;
        delete[] test; // deallocate memory
    }

    my_file.close(); // close file
}

int main() {

    // insertion sort: part a
    int arr[10] = {6, 2, 8, 3, 7, 11, 23, 1, -5, -2};
    insertion_sort(arr, 10);
    for (int i = 0; i < 10; i++){
        cout << arr[i] << endl;
    }

    // part b
    test(insertion_sort);

    // part c
    timing_experiment(insertion_sort);

    return 0;
}