#include <iostream>
using namespace std;

class MaxHeap {
private:
	int* heap;
	int size;
	int capacity;
public:
	MaxHeap(int inputCapacity) {
		capacity = inputCapacity;
		size = 0;
		heap = new int[capacity];
	}

	MaxHeap(int* inputHeap, int inputSize, int inputCapacity) {
		capacity = inputCapacity;
		size = inputSize;
		heap = new int[capacity];
		for (int i = 0; i < inputSize; i++) {
			heap[i] = inputHeap[i];
		}
	}

	int getSize() { return size; }

	int getCapacity() { return capacity; }

	int parentIndex(int i) {
		return floor((i - 1) / 2);
	}

	int leftChildIndex(int i) {
		return ((i * 2) + 1);
	}

	int rightChildIndex(int i) {
		return ((i * 2) + 2);
	}

	int getMax() {
		if (size == 0) {
			throw out_of_range("Heap is empty");
		}
		else {
			return heap[0];
		}
	}

	int extractMax() {
		if (size == 0) {
			cout << "Heap is empty; unable to extract max\n";
			return -1;
		}
		int temp;
		int max = heap[0];
		// swap the current max with the last item in the heap
		heap[0] = heap[size - 1];
		heap[size - 1] = max;
		// decrement the size of the heap
		size--;
		// set current to index 0 (the root)
		int current = 0;
		// find the index of the left and right children of the root
		int left = leftChildIndex(current);
		int right = rightChildIndex(current);
		// while the current index is in range, and:
		while (leftChildIndex(current) < size) {
			// the index of the left child is in range and the left child is greater than the current value
			// or
			// the index of the right child is in range and the right child is greater than the current value
			if ((left < size && heap[left] > heap[current]) || (right < size && heap[right] > heap[current])) {
			// if both indices are in range and the left child is greater than the right child, or if the right child is out of range
				if ((right >= size) || heap[left] > heap[right]) {
				// swap current with its left child
				// update the index of current
				temp = heap[current];
				heap[current] = heap[left];
				heap[left] = temp;
				current = left;
				}
							// else if right child is in range
				else {
					// swap current with its right child
					// update the index of current
					temp = heap[current];
					heap[current] = heap[right];
					heap[right] = temp;
					current = rightChildIndex(current);
				}
			}
			else {
				break;
			}
			// update the indices of the left and right children for the new index of current
			left = leftChildIndex(current);
			right = rightChildIndex(current);
		}
		// return the maximum value which was removed
		return max;
	}

	void insert(int val) {
		if (capacity == size) { 
        	cout << "Heap is full; unable to insert\n"; 
        	return; 
    	}
		int temp;
    	// assign val to the next open index
		heap[size] = val;
    	// increment size
		size++;
    	// set current to be the index where val was just added
		int current = size - 1;
    	// find the parent index of current
		int parentIndex1 = parentIndex(current);
    	// while the parent index is at least 0 and the parent is less than current
    		// swap parent and current
    		// update the index of current
    		// update the index of parent for the new index of current
		while (parentIndex1 >= 0 && heap[parentIndex1] < heap[current]) {
			temp = heap[parentIndex1];
			heap[parentIndex1] = heap[current];
			heap[current] = temp;
			current = parentIndex1;
			parentIndex1 = parentIndex(current);
		}
    	return;
	}

	void printHeap() {
		int level = 1;
		int levelCount = 1;
		for (int i=0; i < size; i++) {
			cout << heap[i] << " ";
			if (levelCount == level) {
				cout << endl;
				level *= 2;
				levelCount = 1;
			}
			else {
				levelCount++;
			}
		}
		cout << endl;
	}
};

int main() {
	int heapEntries[] = {7,6,5,4,3,2,1};
	MaxHeap testHeap(heapEntries, 7, 15);

	cout << "The heap entries are:\n";
	testHeap.printHeap();
	cout << endl;

	for (int i = 1; i <= 6; i++) {
		cout << "The parent of index " << i << " is at index " << testHeap.parentIndex(i) << endl;
	}
	for (int i = 0; i <= 2; i++) {
		cout << "The left child of index " << i << " is at index " << testHeap.leftChildIndex(i) << endl;
		cout << "The right child of index " << i << " is at index " << testHeap.rightChildIndex(i) << endl;
	}
	cout << endl;

	cout << "The maximum value in the heap is " << testHeap.getMax() << endl << endl;

	testHeap.insert(10);
	cout << "After inserting 10, the heap entries are:\n";
	testHeap.printHeap();

	testHeap.insert(15);
	cout << "After inserting 15, the heap entries are:\n";
	testHeap.printHeap();

	testHeap.insert(12);
	cout << "After inserting 12, the heap entries are:\n";
	testHeap.printHeap();

	testHeap.insert(9);
	cout << "After inserting 9, the heap entries are:\n";
	testHeap.printHeap();

	cout << "The maximum value is " << testHeap.extractMax() << endl;
	cout << "After removing the maximum, the heap values are:\n";
	testHeap.printHeap();

	testHeap.insert(14);
	cout << "After inserting 14, the heap entries are:\n";
	testHeap.printHeap();

	testHeap.insert(18);
	cout << "After inserting 18, the heap entries are:\n";
	testHeap.printHeap();

	cout << "The maximum value is " << testHeap.extractMax() << endl;
	cout << "After removing the maximum, the heap values are:\n";
	testHeap.printHeap();

	cout << "The maximum value is " << testHeap.extractMax() << endl;
	cout << "After removing the maximum, the heap values are:\n";
	testHeap.printHeap();

	cout << "The maximum value is " << testHeap.extractMax() << endl;
	cout << "After removing the maximum, the heap values are:\n";
	testHeap.printHeap();

	testHeap.insert(11);
	cout << "After inserting 11, the heap entries are:\n";
	testHeap.printHeap();

	cout << "The maximum value is " << testHeap.extractMax() << endl;
	cout << "After removing the maximum, the heap values are:\n";
	testHeap.printHeap();

	cout << "The maximum value is " << testHeap.extractMax() << endl;
	cout << "After removing the maximum, the heap values are:\n";
	testHeap.printHeap();

	testHeap.insert(20);
	cout << "After inserting 20, the heap entries are:\n";
	testHeap.printHeap();

	cout << "The maximum value is " << testHeap.extractMax() << endl;
	cout << "After removing the maximum, the heap values are:\n";
	testHeap.printHeap();

	cout << "The maximum value is " << testHeap.extractMax() << endl;
	cout << "After removing the maximum, the heap values are:\n";
	testHeap.printHeap();

	cout << "The maximum value is " << testHeap.extractMax() << endl;
	cout << "After removing the maximum, the heap values are:\n";
	testHeap.printHeap();
}