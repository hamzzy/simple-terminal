"use client"; // This is a client component 👈🏽

import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react';
import { VStack, Box, Input, Text } from '@chakra-ui/react';
import { FaTerminal } from 'react-icons/fa';
import { ChakraProvider, Container } from '@chakra-ui/react';
import Head from 'next/head';
import { invoke } from '@tauri-apps/api/tauri'
import Terminal from 'terminal-in-react';

export default function Home() {
  const [command, setCommand] = useState("ls");
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleKeyPress = (event:any) => {
    if (event.key === 'Enter') {
      processInput();
    }
  };



  const processInput = () => {
    // Process the input here (e.g., execute a command)
    // Update the output state based on the processed input
    setInput('');

    invoke<string>('execute_command', { command:input })
    .then((message) => {
      setOutput((prevOutput) => `${prevOutput}\n${message}`);
    })
    .catch((error) => console.error(error))
  };
  
  useEffect(() => {
    
  }, [])
  
  return (
    <main>

<Box>
      <Box bg="black" color="white" p={2}>
        <Text>$</Text>
        <Input
          autoFocus
          variant="unstyled"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </Box>
      <Box bg="black" color="green" p={2}>
        <Text whiteSpace="pre-wrap">{output}</Text>
      </Box>
    </Box>

    </main>
  )
}
