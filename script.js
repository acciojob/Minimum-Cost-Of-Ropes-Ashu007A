function calculateMinCost() {
  const inputElement = document.getElementById('rope-lengths');
  const resultElement = document.getElementById('result');

  const ropeLengths = inputElement.value.split(',').map(Number);

  if (ropeLengths.length < 2) {
    resultElement.textContent = 'Minimum cost is 0.';
    return;
  }

  // Create a min-heap (priority queue)
  const minHeap = new MinHeap();
  ropeLengths.forEach((length) => minHeap.insert(length));

  let totalCost = 0;
  while (minHeap.size() > 1) {
    const firstRope = minHeap.extractMin();
    const secondRope = minHeap.extractMin();
    const cost = firstRope + secondRope;
    totalCost += cost;
    minHeap.insert(cost);
  }

  resultElement.textContent = `Minimum cost is ${totalCost}.`;
}

// Define a MinHeap class to manage the priority queue
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index] < this.heap[parentIndex]) {
        [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  extractMin() {
    if (this.size() === 0) {
      return undefined;
    }
    if (this.size() === 1) {
      return this.heap.pop();
    }

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.sinkDown(0);
    return min;
  }

  sinkDown(index) {
    const leftIndex = 2 * index + 1;
    const rightIndex = 2 * index + 2;
    let smallest = index;

    if (leftIndex < this.size() && this.heap[leftIndex] < this.heap[smallest]) {
      smallest = leftIndex;
    }
    if (rightIndex < this.size() && this.heap[rightIndex] < this.heap[smallest]) {
      smallest = rightIndex;
    }

    if (smallest !== index) {
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      this.sinkDown(smallest);
    }
  }

  size() {
    return this.heap.length;
  }
}

// Export the MinHeap class for testing purposes (if needed)
window.MinHeap = MinHeap;