#include <iostream>
#include <chrono>
#include <fstream>
#include <random>

using namespace std;
using namespace std::chrono;

// FUNCTIONS FOR COMPUTING SUMS //////////////////////////////////////////////////////////////////////////////////////

int sum1(int n) {
	// arguments: an integer n
	// returns: the sum of numbers 1 through n. If n <= 0, returns 0.
	// TO DO: implement this function according to description in the instructions

	return 0;
}

int sum2(int n) {
	// arguments: an integer n
	// returns: the sum of numbers 1 through n. If n <= 0, returns 0.
	// TO DO: implement this function according to the description in the instructions

	return 0;
}

// FUNCTIONS FOR TIMING EXPERIMENT //////////////////////////////////////////////////////////////////////////////////////

int time(int n, int (*func)(int)){
	// helper function for timing experiment
	// arguments: integer (n), pointer to a function that takes n
	// calls the function (intended for sum1 and sum2) on the integer n, and returns the time taken by this function call (in nanoseconds)

    auto start = steady_clock::now();		
    func(n);
	auto stop = steady_clock::now();

	auto duration = duration_cast<nanoseconds>(stop - start);
	return duration.count();
}

int avg_time(int n, int (*func)(int), int trials){
	// helper function for timing experiment
	// arguments: integer (n), function to time (intended for sum1 and sum2), integer for number of trials (trials)
    // times the function called on arrays of given size, averages over number of trials given by trials.

    int total_time = 0;
    for (int i = 0; i < trials; i++){			// repeat for number of trials
        total_time += time(n, func);  	// time call on n, add to total time						
    }
    
    return total_time / trials;
}

// MAIN //////////////////////////////////////////////////////////////////////////////////////

int main() {
	// TO DO: test function sum1

	// TO DO: test function sum2

	// Call the test function

	cout << "Running tests:" << endl;

	// these variable determine what values of n we test, and the number of trials
	int max_size = 10000;
    int interval = 10;
    int num_trials = 1000;

    // results of timing are written to the file sum1_runtimes.csv
    ofstream my_file;

    my_file.open("sum1_runtimes.csv");
    my_file << "n, time\n";			// header for csv file: column names are n, time

    for (int n = 0; n < max_size; n += interval){		// for each n
        int time = avg_time(n, sum1, num_trials);			// compute average time for function call on array of that size
        my_file << n << "," << time << "\n";					// write result to the csv file
        cout << "Time taken by sum1 on n=" << n << ": "
         << time << " nanoseconds" << endl;						// print the result as well
    }
    my_file.close();

    my_file.open("sum2_runtimes.csv");
    my_file << "n, time\n";			// header for csv file: column names are n, time

    for (int n = 0; n < max_size; n += interval){		// for each n
        int time = avg_time(n, sum2, num_trials);			// compute average time for function call on array of that size
        my_file << n << "," << time << "\n";					// write result to the csv file
        cout << "Time taken by sum2 on n=" << n << ": "
         << time << " nanoseconds" << endl;						// print the result as well
    }
    my_file.close();


    return 0;
}