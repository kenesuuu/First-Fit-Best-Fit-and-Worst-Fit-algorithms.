'use client'
import React, { useState } from 'react';
import { Tooltip, Button } from "@material-tailwind/react";

export function MemoryAllocator() {
 const [inputValue, setInputValue] = useState('');
 const [memoryBlocksInput, setMemoryBlocksInput] = useState('');
 const [mode, setMode] = useState('first-fit');
 const [numbers, setNumbers] = useState([]);
 const [results, setResults] = useState({ firstFit: [], bestFit: [], worstFit: [] });
 const [theme, setTheme] = useState('light');

 const handleInputChange = (event) => {
    setInputValue(event.target.value);
 };

 const handleMemoryBlocksInputChange = (event) => {
    setMemoryBlocksInput(event.target.value);
 };

 const handleEnter = () => {
    const newNumbers = inputValue.split(',').map(Number).filter(num => !isNaN(num));
    const newMemoryBlocks = memoryBlocksInput.split(',').map(Number).filter(num => !isNaN(num));
    setNumbers(newNumbers);
    calculateAllocationStrategies(newNumbers, newMemoryBlocks);
 };

 const toggleMode = () => {
    setMode(prevMode => {
      switch (prevMode) {
        case 'first-fit':
          return 'best-fit';
        case 'best-fit':
          return 'worst-fit';
        case 'worst-fit':
          return 'first-fit';
        default:
          return 'first-fit';
      }
    });
 };

 const calculateAllocationStrategies = (numbers, memoryBlocks) => {
    const allocations = { firstFit: [], bestFit: [], worstFit: [] };

    numbers.forEach(num => {
      const firstFitIndex = memoryBlocks.findIndex(block => block >= num);
      const bestFitIndex = memoryBlocks.map((block, index) => ({ index, block })).filter(item => item.block >= num).sort((a, b) => a.block - b.block)[0].index;
      const worstFitIndex = memoryBlocks.map((block, index) => ({ index, block })).sort((a, b) => b.block - a.block)[0].index;

      const isBlockSufficient = memoryBlocks[firstFitIndex] >= num;

      allocations.firstFit.push({ size: num, allocation: `First Fit: ${memoryBlocks[firstFitIndex]}`, isBlockSufficient });
      allocations.bestFit.push({ size: num, allocation: `Best Fit: ${memoryBlocks[bestFitIndex]}`, isBlockSufficient });
      allocations.worstFit.push({ size: num, allocation: `Worst Fit: ${memoryBlocks[worstFitIndex]}`, isBlockSufficient });
    });

    setResults(allocations);
 };

const placeholder = mode === 'first-fit' ? 'Please input memory sizes for First Fit, for example: 1, 2, 3.' :
mode === 'best-fit' ? 'Please provide memory sizes for Best Fit, like this: 1, 2, 3.' :'Please input memory sizes for Worst Fit, such as: 1, 2, 3.';

return (
 <div id="content" className="flex flex-col min-h-screen justify-center items-center">
    <main className="flex flex-row justify-center items-center w-full md:w-1/2 lg:w-1/3" style={{ margin: 0, padding: 0 }}>
      <div className="relative w-full max-w-xs md:max-w-lg lg:max-w-xl border-0 border-emerald" style={{ margin: '0 auto', padding: 0 }}>
        <div className={`box-container space-y-2 ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
          <h1 className="text-center text-2xl font-bold">First-Fit, Best-Fit, and Worst-Fit algorithms</h1>
          <label htmlFor="memory-size">Memory Sizes</label>
          <input
            id="memory-size"
            inputMode="numeric"
            maxLength={50}
            minLength={1}
            pattern="\d*(,\d*)*"
            placeholder={placeholder}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <label htmlFor="memory-blocks">Memory Blocks</label>
          <input
            id="memory-blocks"
            inputMode="numeric"
            maxLength={50}
            minLength={1}
            pattern="\d*(,\d*)*"
            placeholder="Please enter memory blocks, for instance: 100, 200, 300, 400, 500."
            type="text"
            value={memoryBlocksInput}
            onChange={handleMemoryBlocksInputChange}
          />
          <button onClick={handleEnter}>Enter</button>
          <div>Please enter valid memory sizes and blocks separated by commas.</div>
          <Tooltip content={mode.charAt(0).toUpperCase() + mode.slice(1)}>
            <Button onClick={toggleMode}>Switch Allocation Strategy</Button>
          </Tooltip>
          <div className={`memory-block overflow-auto max-h-64 ${results.firstFit[0]?.isBlockSufficient ? 'sufficient' : 'insufficient'}`}>
            <h3>First Fit Strategy:</h3>
            <ul>
              {results.firstFit.map((result, index) => (
                <li key={index}>Size: {result.size}, Allocation: {result.allocation}</li>
              ))}
            </ul>
          </div>
          <div className={`memory-block overflow-auto max-h-64 ${results.bestFit[0]?.isBlockSufficient ? 'sufficient' : 'insufficient'}`}>
            <h3>Best Fit Strategy:</h3>
            <ul>
              {results.bestFit.map((result, index) => (
                <li key={index}>Size: {result.size}, Allocation: {result.allocation}</li>
              ))}
            </ul>
          </div>
          <div className={`memory-block overflow-auto max-h-64 ${results.worstFit[0]?.isBlockSufficient ? 'sufficient' : 'insufficient'}`}>
            <h3>Worst Fit Strategy:</h3>
            <ul>
              {results.worstFit.map((result, index) => (
                <li key={index}>Size: {result.size}, Allocation: {result.allocation}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
 </div>
);
}
