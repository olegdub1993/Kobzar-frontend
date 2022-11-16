import Head from 'next/head'
import Image from 'next/image'
import Navigation from '../components/Navbar'
import MainLayout from '../layouts/MainLayout'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <MainLayout>
        <div className={styles.container}>
          <h1 className={styles.title}>Welcome to KOBZAR</h1>
          <h3 className={styles.subtitle}>All Ukrainian songs are collected here</h3>
          <img src="https://glavcom.ua/img/article/7412/49_main-v1615278831.png" />
        </div>
      </MainLayout>
    </>
  )
}
