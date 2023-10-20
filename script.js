function calculateMinCost() {
  const ropeLengthsInput = document.getElementById('rope-lengths').value;
  const ropeLengths = ropeLengthsInput.split(',').map(length => parseInt(length.trim()));

  if (ropeLengths.length < 2) {
    document.getElementById('result').textContent = 'Minimum cost: 0';
    return;
  }

  // Helper function to create a min-heap
  function createMinHeap(array) {
    for (let i = Math.floor(array.length / 2); i >= 0; i--) {
      minHeapify(array, i);
    }
  }

  // Helper function to maintain min-heap property
  function minHeapify(array, index) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let smallest = index;

    if (left < array.length && array[left] < array[smallest]) {
      smallest = left;
    }

    if (right < array.length && array[right] < array[smallest]) {
      smallest = right;
    }

    if (smallest !== index) {
      [array[index], array[smallest]] = [array[smallest], array[index]];
      minHeapify(array, smallest);
    }
  }

  // Create a min-heap from rope lengths
  createMinHeap(ropeLengths);

  let totalCost = 0;
  while (ropeLengths.length > 1) {
    const first = ropeLengths.shift();
    const second = ropeLengths.shift();
    const cost = first + second;
    totalCost += cost;
    ropeLengths.unshift(cost);
    minHeapify(ropeLengths, 0);
  }

  document.getElementById('result').textContent = `Minimum cost: ${totalCost}`;
}