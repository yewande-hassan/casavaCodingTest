import Head from 'next/head'
import React from 'react'
import { Inter } from 'next/font/google'
import {ReusableButton} from '../components';
import { Flex } from '@chakra-ui/react';
import Link from 'next/link';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

 

  return (
    <>
      <Head>
        <title>Casava Coding Test</title>
      </Head>
      <Flex
      h={'100vh'}
      display='flex'
      justifyContent='center'
      alignItems='center'
      >
        <Link href='/register'>
      <ReusableButton type="button" action='Register'/>
      </Link>
      <Link href='/login'>
      <ReusableButton type="button" action='Login'/>
      </Link>
      </Flex>
    </>
  );
}
