import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <p>main page</p>
      <Link href="/post">to post</Link>
    </main>
  )
}
