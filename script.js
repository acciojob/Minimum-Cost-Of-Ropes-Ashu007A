function calculateMinCost() {
    // Get the input value and parse it into an array of numbers
    const input = document.getElementById('rope-lengths').value;
    const ropes = input.split(',').map(Number);

    if (ropes.some(isNaN)) {
        document.getElementById('result').innerHTML = 'Invalid input, please enter comma-separated numbers.';
        return;
    }

    // Min-Heap (Priority Queue) to efficiently get the smallest ropes
    const minHeap = [...ropes].sort((a, b) => a - b);
    let totalCost = 0;

    while (minHeap.length > 1) {
        // Get the two smallest ropes
        const first = minHeap.shift();
        const second = minHeap.shift();

        // Connect the ropes and add the cost
        const cost = first + second;
        totalCost += cost;

        // Add the new rope back to the heap
        minHeap.push(cost);
        minHeap.sort((a, b) => a - b);
    }

    // Display the result
    document.getElementById('result').innerHTML = `Minimum cost to connect ropes: ${totalCost}`;
}