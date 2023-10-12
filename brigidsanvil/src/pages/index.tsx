import Head from "next/head";
import { Inter } from "next/font/google";
import Homepage from "@/components/ui/Homepage/homepage";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>{"Brigid's Anvil"}</title>
        <meta
          name="description"
          content="Brigid's Anvil is a community-developed WorldAnvil extension application first concepted and architected by Hanhula."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={`${styles.main}`}>
          <Homepage />
        </div>
      </main>
    </>
  );
}
